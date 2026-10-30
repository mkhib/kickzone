import { BadRequestException } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { AuthResolver } from './auth.resolver';
import { UserResolver } from './user.resolver';
import { ZodValidationPipe } from './zod-validation.pipe';
import { UserRole } from '@kickzone-workspace/entities';
import { userRoleSchema } from '@kickzone-workspace/validation';

describe('Auth/User resolver argument validation pipes', () => {

  function getParamMetadata(target: object, methodName: string) {
    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, (target as any).constructor, methodName) ?? {};
    return Object.values(args) as Array<any>;
  }

  function findPipeForArg(paramMetadata: Array<any>, argIndex: number): ZodValidationPipe<any> | undefined {
    const param = paramMetadata.find((p: any) => p.index === argIndex);
    return param?.pipes?.find((pipe: any) => pipe instanceof ZodValidationPipe);
  }

  describe('AuthResolver', () => {
    describe('login', () => {
      it('has ZodValidationPipe for email (arg 0)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'login');
        const pipe = findPipeForArg(metadata, 0);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('has ZodValidationPipe for password (arg 1)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'login');
        const pipe = findPipeForArg(metadata, 1);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('email pipe validates correctly', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'login');
        const pipe = findPipeForArg(metadata, 0) as ZodValidationPipe<any>;
        expect(() => pipe.transform('  TEST@EXAMPLE.COM  ')).not.toThrow();
        const result = pipe.transform('  TEST@EXAMPLE.COM  ');
        expect(result).toBe('TEST@EXAMPLE.COM');
      });

      it('email pipe rejects invalid email', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'login');
        const pipe = findPipeForArg(metadata, 0) as ZodValidationPipe<any>;
        expect(() => pipe.transform('not-an-email')).toThrow(BadRequestException);
      });

      it('password pipe accepts short legacy password', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'login');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<any>;
        expect(() => pipe.transform('abc')).not.toThrow();
      });

      it('password pipe rejects empty', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'login');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<any>;
        expect(() => pipe.transform('')).toThrow(BadRequestException);
      });
    });

    describe('register', () => {
      it('has ZodValidationPipe for name (arg 0)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'register');
        const pipe = findPipeForArg(metadata, 0);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('has ZodValidationPipe for email (arg 1)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'register');
        const pipe = findPipeForArg(metadata, 1);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('has ZodValidationPipe for password (arg 2)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'register');
        const pipe = findPipeForArg(metadata, 2);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('password pipe rejects 7 chars (register uses newPasswordSchema)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'register');
        const pipe = findPipeForArg(metadata, 2) as ZodValidationPipe<any>;
        expect(() => pipe.transform('short7')).toThrow(BadRequestException);
      });

      it('password pipe accepts 8 chars', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'register');
        const pipe = findPipeForArg(metadata, 2) as ZodValidationPipe<any>;
        expect(() => pipe.transform('validPass')).not.toThrow();
      });
    });

    describe('forgotPassword', () => {
      it('has ZodValidationPipe for email (arg 0)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'forgotPassword');
        const pipe = findPipeForArg(metadata, 0);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('has ZodValidationPipe for baseUrl (arg 1)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'forgotPassword');
        const pipe = findPipeForArg(metadata, 1);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('baseUrl pipe accepts https URL', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'forgotPassword');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<any>;
        expect(() => pipe.transform('https://kickzone.ir/x')).not.toThrow();
      });

      it('baseUrl pipe rejects javascript: protocol', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'forgotPassword');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<any>;
        expect(() => pipe.transform('javascript:alert(1)')).toThrow(BadRequestException);
      });
    });

    describe('initiatePasswordSetup', () => {
      it('has ZodValidationPipe for email (arg 0)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'initiatePasswordSetup');
        const pipe = findPipeForArg(metadata, 0);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('has ZodValidationPipe for baseUrl (arg 1)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'initiatePasswordSetup');
        const pipe = findPipeForArg(metadata, 1);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });
    });

    describe('resetPassword', () => {
      it('has ZodValidationPipe for token (arg 0)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'resetPassword');
        const pipe = findPipeForArg(metadata, 0);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('has ZodValidationPipe for newPassword (arg 1)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'resetPassword');
        const pipe = findPipeForArg(metadata, 1);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('token pipe rejects whitespace only', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'resetPassword');
        const pipe = findPipeForArg(metadata, 0) as ZodValidationPipe<any>;
        expect(() => pipe.transform('  ')).toThrow(BadRequestException);
      });

      it('newPassword pipe rejects 7 chars', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'resetPassword');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<any>;
        expect(() => pipe.transform('short7')).toThrow(BadRequestException);
      });
    });

    describe('setupPassword', () => {
      it('has ZodValidationPipe for token (arg 0)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'setupPassword');
        const pipe = findPipeForArg(metadata, 0);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('has ZodValidationPipe for newPassword (arg 1)', () => {
        const metadata = getParamMetadata(AuthResolver.prototype, 'setupPassword');
        const pipe = findPipeForArg(metadata, 1);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });
    });
  });

  describe('UserResolver', () => {
    describe('createUser', () => {
      it('has ZodValidationPipe for createUserInput (arg 0)', () => {
        const metadata = getParamMetadata(UserResolver.prototype, 'createUser');
        const pipe = findPipeForArg(metadata, 0);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('pipe validates createUserInput correctly', () => {
        const metadata = getParamMetadata(UserResolver.prototype, 'createUser');
        const pipe = findPipeForArg(metadata, 0) as ZodValidationPipe<any>;
        const validInput = {
          name: 'John',
          lastName: 'Doe',
          username: 'john_doe',
          email: 'john@example.com',
          password: 'securePassword123',
          role: 'CUSTOMER',
        };
        expect(() => pipe.transform(validInput)).not.toThrow();
        const result = pipe.transform(validInput);
        expect(result.email).toBe('john@example.com');
      });

      it('pipe rejects invalid role', () => {
        const metadata = getParamMetadata(UserResolver.prototype, 'createUser');
        const pipe = findPipeForArg(metadata, 0) as ZodValidationPipe<any>;
        const invalidInput = {
          name: 'John',
          lastName: 'Doe',
          username: 'john_doe',
          email: 'john@example.com',
          password: 'securePassword123',
          role: 'ROOT',
        };
        expect(() => pipe.transform(invalidInput)).toThrow(BadRequestException);
      });
    });

    describe('adminCreateUser', () => {
      it('has ZodValidationPipe for createUserInput (arg 0)', () => {
        const metadata = getParamMetadata(UserResolver.prototype, 'adminCreateUser');
        const pipe = findPipeForArg(metadata, 0);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });
    });
  });

  describe('userRoleSchema sync with UserRole enum', () => {
    it('userRoleSchema.options equals Object.values(UserRole) sorted', () => {
      const schemaOptions = [...userRoleSchema.options].sort();
      const enumValues = Object.values(UserRole).sort();
      expect(schemaOptions).toEqual(enumValues);
    });
  });
});