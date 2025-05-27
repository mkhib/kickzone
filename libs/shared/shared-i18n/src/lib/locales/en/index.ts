import type { BaseTranslation } from '../i18n-types';

const en = {
  button: {
    submit: 'Submit',
    cancel: 'Cancel',
  },
  greeting: 'Hello',
  authorization: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    forgotPassword: 'Forgot Password',
    resetPassword: 'Reset Password',
    verifyEmail: 'Verify Email',
    resendVerificationEmail: 'Resend Verification Email',
    emailVerification: 'Email Verification',
    emailVerificationSent: 'Email Verification Sent',
    emailVerificationFailed: 'Email Verification Failed',
    emailVerificationSuccess: 'Email Verification Success',
    wrongEmailOrPassword: 'Wrong Email or Password',
  },
  errors: {
    unauthorized: 'You are not authorized. Please log in.',
    unknown: 'An unknown error occurred. Please try again.',
  },
} satisfies BaseTranslation;

export default en;
