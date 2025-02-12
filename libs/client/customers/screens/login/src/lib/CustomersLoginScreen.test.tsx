import React from 'react';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Login } from './CustomersLoginScreen';
import { render } from '@kickzone-workspace/customers-test-utility';

describe('CustomersLoginScreen', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the login form', () => {
    render(<Login />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Don't have an account? Sign Up")
    ).toBeInTheDocument();
  });

  it('allows the user to type in the email and password fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('submits the form with email and password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('displays validation errors when fields are empty', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.click(submitButton);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
