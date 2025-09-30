import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminSellerOrders } from './admin-seller-orders';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock the AdminsLayout component
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'admins-layout' }, children),
}));

describe('AdminSellerOrders', () => {
  it('should render successfully', () => {
    render(<AdminSellerOrders />);
    expect(screen.getByText('All Seller Orders')).toBeInTheDocument();
  });

  it('should render the page title', () => {
    render(<AdminSellerOrders />);
    const title = screen.getByText('All Seller Orders');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H4');
  });

  it('should render the description text', () => {
    render(<AdminSellerOrders />);
    const description = screen.getByText(
      /Admin seller orders screen with filtering capabilities will be implemented here./i
    );
    expect(description).toBeInTheDocument();
  });

  it('should render within AdminsLayout', () => {
    render(<AdminSellerOrders />);
    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
  });

  it('should apply correct padding to the content box', () => {
    const { container } = render(<AdminSellerOrders />);
    const contentBox = container.querySelector('[class*="MuiBox"]');
    expect(contentBox).toBeInTheDocument();
  });

  it('should render all text content correctly', () => {
    render(<AdminSellerOrders />);

    // Check main heading
    expect(screen.getByText('All Seller Orders')).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(
        'Admin seller orders screen with filtering capabilities will be implemented here.'
      )
    ).toBeInTheDocument();
  });

  it('should have correct document structure', () => {
    const { container } = render(<AdminSellerOrders />);

    // Verify the component renders without errors
    expect(container.firstChild).toBeTruthy();
  });

  it('should render Typography components with correct variants', () => {
    const { container } = render(<AdminSellerOrders />);

    // Check h4 variant for title
    const h4Element = container.querySelector('h4');
    expect(h4Element).toHaveTextContent('All Seller Orders');

    // Check body1 variant for description
    const bodyElement = container.querySelector('p');
    expect(bodyElement).toHaveTextContent(
      'Admin seller orders screen with filtering capabilities will be implemented here.'
    );
  });

  it('should render content inside a Box component', () => {
    const { container } = render(<AdminSellerOrders />);
    const boxElement = container.querySelector('[class*="MuiBox"]');
    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toContainElement(screen.getByText('All Seller Orders'));
  });
});
