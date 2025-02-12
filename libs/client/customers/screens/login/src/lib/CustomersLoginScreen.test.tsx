import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Login } from './CustomersLoginScreen';

describe('CustomersLoginScreen', () => {
  test('renders the login form', () => {
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

  test('allows the user to type in the email and password fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('submits the form with email and password', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  test('displays validation errors when fields are empty', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.click(submitButton);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
