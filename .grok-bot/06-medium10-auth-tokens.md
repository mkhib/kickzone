<system_role>
You are a deterministic Senior Identity & Authentication Engineer working inside the Kickzone Nx monorepo (`mkhib/kickzone`). You follow instructions literally, read every target file before editing, strictly obey `<file_ownership_boundary>` so you never cause Git merge conflicts with parallel sessions, and write unit tests with 100% coverage.
</system_role>

<file_ownership_boundary>

### ALLOWED FILES TO READ AND MODIFY IN THIS SESSION:

- `libs/server/services/src/lib/token.service.ts`
- `libs/server/services/src/lib/token.service.spec.ts`
- `libs/server/services/src/lib/auth.service.ts`
- `libs/server/services/src/lib/auth.service.spec.ts`

### READ-ONLY CONTEXT FILES (DO NOT MODIFY):

- `libs/server/entities/src/lib/refresh-token.entity.ts` (or existing token/user entities in `libs/server/entities/src/lib/`)

### STRICTLY FORBIDDEN FILES (BEING EDITED BY PARALLEL SESSIONS — DO NOT TOUCH):

- `libs/server/entities/src/lib/order.entity.ts`
- `libs/server/services/src/lib/order.service.ts`
- `libs/server/services/src/lib/cart.service.ts`
- `libs/server/services/src/lib/shipping-calculation.service.ts`
- All other files in the repository.
  </file_ownership_boundary>

<context>
### Confirmed Bug: Medium 10 — Password reset tokens are process-local; old sessions stay valid
- **Root Cause:** `TokenService` (`libs/server/services/src/lib/token.service.ts`) stores password-reset and account-setup tokens in a process-local in-memory `Map` (which is lost on process restart or across multi-instance deployments), and `AuthService.resetPassword` (`libs/server/services/src/lib/auth.service.ts` ~lines 186–198) updates the user's password without revoking their existing ~30-day refresh tokens.
- **How to Persist Tokens in Postgres Without Touching Shared Entity Index Files:**
  - Inspect `libs/server/services/src/lib/token.service.ts`, `libs/server/services/src/lib/auth.service.ts`, and `libs/server/entities/src/lib/` (read-only).
  - Check whether `RefreshToken` entity or `DataSource` is available.
  - In `TokenService`, you can inject `@Optional() private readonly dataSource?: DataSource` (or `@InjectRepository(RefreshToken)` if appropriate) and persist SHA-256 hashed tokens in PostgreSQL (e.g., via a self-initializing table `password_reset_tokens` using `this.dataSource.query(...)` or existing token repository, with an automatic fallback for unit tests when `dataSource` is not provided or mocked), **OR** sign stateless HMAC-SHA256 + DB-verified / `DataSource`-backed single-use tokens so tokens survive restarts and multi-instance deployments without modifying `libs/server/entities/src/index.ts`!
</context>

<task>
Execute the following steps in exact sequential order:

### Step 1: Read `token.service.ts` and `auth.service.ts`

1. Read `libs/server/services/src/lib/token.service.ts` and `libs/server/services/src/lib/token.service.spec.ts` (if present).
2. Read `libs/server/services/src/lib/auth.service.ts` (especially `resetPassword`, `forgotPassword`, `logout`, and refresh token methods) and `libs/server/services/src/lib/auth.service.spec.ts`.

### Step 2: Upgrade `TokenService` to Persist Hashed Single-Use Tokens in PostgreSQL

1. Inspect all public methods of `TokenService` in `libs/server/services/src/lib/token.service.ts` and how `AuthService` calls them.
2. Refactor `TokenService` so reset/setup tokens are **not** lost across restarts or multiple instances:
   - Hash every raw token with SHA-256 (`crypto.createHash('sha256').update(token).digest('hex')`) before storing or looking up in the database.
   - Inject `@Optional() @InjectDataSource() private readonly dataSource?: DataSource` (from `@nestjs/typeorm` / `typeorm`).
   - When `this.dataSource` is present:
     - Ensure table `auth_action_tokens (token_hash VARCHAR(64) PRIMARY KEY, user_id VARCHAR(255), email VARCHAR(255), user_type VARCHAR(50), token_type VARCHAR(50), expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())` exists (`CREATE TABLE IF NOT EXISTS auth_action_tokens ...`) once on initialization.
     - Store, validate (checking `expires_at > NOW()`), and delete/consume (`DELETE FROM auth_action_tokens WHERE token_hash = $1 RETURNING *`) tokens directly in PostgreSQL so any instance/worker shares the exact same token state and single-use consumption is atomic!
   - Also keep clean support when `dataSource` is mocked in unit tests (check if `TokenService` methods are sync or `async`—if `AuthService` awaits them or calls them synchronously, inspect all callers in `auth.service.ts` and update `auth.service.ts` to `await` them cleanly!).

### Step 3: Revoke All Active Refresh Tokens Upon Password Reset in `AuthService`

1. In `libs/server/services/src/lib/auth.service.ts` inside `resetPassword` (~lines 186–198, and any seller/admin password reset/setup method if present):
   - Locate how `AuthService` stores and revokes refresh tokens (e.g., `this.refreshTokenRepository.delete({ userId })` or `this.refreshTokenRepository.update({ userId, ... }, { isRevoked: true })` or `revokeAllUserRefreshTokens`).
   - Immediately after updating the user's password and consuming the reset token, **revoke/delete ALL existing refresh tokens for that user**!
   - Ensure that any refresh token issued prior to `resetPassword` can no longer be used to obtain new access tokens.

### Step 4: Write Comprehensive Unit Tests (100% Coverage)

1. Create or update `libs/server/services/src/lib/token.service.spec.ts`:
   - **Cross-Instance / Process Restart Persistence Test:** Create a token with `TokenService` instance 1 (backed by a shared mock `DataSource`), then instantiate a brand-new `TokenService` instance 2 (with an empty local memory state, backed by the same mock `DataSource`). Assert instance 2 successfully validates and consumes the token!
   - **SHA-256 Hash-at-Rest Test:** Verify the SQL `INSERT` parameter contains the 64-char SHA-256 hex digest, NEVER the raw plaintext token.
   - **Single-Use / Replay Prevention Test:** Consuming a token once succeeds; attempting to validate/consume it a second time returns `null` / `false`.
   - **Expiration Test:** Expired token is rejected and cleaned up.
2. Update `libs/server/services/src/lib/auth.service.spec.ts`:
   - **Refresh Token Revocation on `resetPassword` Test:** Call `resetPassword` with a valid reset token and new password. Assert:
     1. User password hash is updated and saved.
     2. Reset token is invalidated/consumed.
     3. All existing refresh tokens for that user are revoked/deleted in `refreshTokenRepository`.
   - **Invalid / Expired Reset Token Test:** Assert `resetPassword` throws `BadRequestException` / `UnauthorizedException` and does not revoke tokens or change the password.

### Step 5: Run Nx Verification Commands

```bash
nx test server-services --coverage
nx lint server-services
nx typecheck server-services
```

</task>

<constraints>
- **DO NOT** modify any file outside `<file_ownership_boundary>`. Specifically, do NOT touch `libs/server/entities/src/index.ts` or `order.service.ts` so parallel sessions have zero merge conflicts.
- **DO NOT** store plaintext reset tokens in the database.
- **DO NOT** leave old refresh tokens valid after `resetPassword`.
</constraints>

<output_format>

1. `<thinking>`:
   - Trace how `TokenService` is called in `auth.service.ts` and how refresh tokens are stored/revoked in `auth.service.ts`.
   - Confirm only `token.service.ts`, `token.service.spec.ts`, `auth.service.ts`, and `auth.service.spec.ts` are modified.
2. `### Root Cause`: One-sentence summary.
3. `### Surgical Changes`: File-by-file diff summary.
4. `### Verification Results`: Output of `nx test`, `nx lint`, and `nx typecheck`.
   </output_format>

<example>
<thinking>
1. Inspected `token.service.ts` and `auth.service.ts`.
2. `TokenService` used an in-memory `Map`, and `AuthService.resetPassword` updated the user password without deleting/revoking entries in `refreshTokenRepository`.
3. Adding `DataSource`-backed SHA-256 token persistence in `TokenService` and calling `refreshTokenRepository.delete({ userId })` (or `update`) inside `AuthService.resetPassword` resolves both vulnerabilities without touching any shared entity index files.
</thinking>
### Root Cause
`TokenService` kept password reset tokens in a volatile in-memory `Map`, and `AuthService.resetPassword` did not revoke the user's active refresh tokens after changing their password.
### Surgical Changes
- `libs/server/services/src/lib/token.service.ts`: Added PostgreSQL `DataSource` persistence with SHA-256 hashing and atomic single-use deletion.
- `libs/server/services/src/lib/auth.service.ts`: Revoked all refresh tokens for the user inside `resetPassword`.
### Verification Results
- `nx test server-services --coverage`: PASS
- `nx lint server-services`: PASS
- `nx typecheck server-services`: PASS
</example>
