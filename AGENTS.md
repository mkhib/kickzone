<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors

<!-- nx configuration end-->

## AI Context Index

Before scanning or reading raw source files across the monorepo, check `.ai-context/` for pre-computed indexes:

- `.ai-context/ARCHITECTURE_MAP.md` — High-level domain topology, database entities, API contract flows, and blast-radius hotspots.
- `.ai-context/repo-skeleton.xml` — Tree-sitter compressed AST signatures (interfaces, types, classes, GraphQL/DTO schemas, exported function signatures without implementation bodies).
- `.ai-context/dependency-graph.md` — Mermaid file-level dependency graph (cross-module and entity-to-UI import chains).
- `.ai-context/nx-project-graph.json` — Nx project-level topology and workspace library boundaries.

**Regenerate on demand:** `yarn ai:sync`  
**Auto-regenerates on commit** via `husky` + `lint-staged` pre-commit hooks.

## Workspace Architecture Reference

- **API (NestJS)**: `apps/kickzone-api`
- **Customer Storefront (React / Vite)**: `apps/client/customers`
- **Seller Portal (React / Vite)**: `apps/client/sellers`
- **Admin Dashboard (React / Vite)**: `apps/client/admins`
- **Shared Contracts & Libraries**: `libs/`
