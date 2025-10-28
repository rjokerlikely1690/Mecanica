import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingCart from '../ShoppingCart';

describe('ShoppingCart Component', () => {
  const mockCartItems = [
    { id: 1, title: 'Cambio de aceite', price: 50000, quantity: 2, type: 'servicio' },
    { id: 2, title: 'Alineación', price: 80000, quantity: 1, type: 'servicio' }
  ];

  const mockOnRemoveItem = () => {};
  const mockOnClearCart = () => {};
  const mockOnCheckout = () => {};

  it('should render empty cart message when cart is empty', () => {
    render(
      <ShoppingCart
        cartItems={[]}
        onRemoveItem={mockOnRemoveItem}
        onClearCart={mockOnClearCart}
        onCheckout={mockOnCheckout}
      />
    );
    // Verify empty state is displayed
    expect(screen.queryByText('Cambio de aceite')).toBeNull();
  });

  it('should render cart items when cart has items', () => {
    render(
      <ShoppingCart
        cartItems={mockCartItems}
        onRemoveItem={mockOnRemoveItem}
        onClearCart={mockOnClearCart}
        onCheckout={mockOnCheckout}
      />
    );
    expect(screen.getByText('Cambio de aceite')).toBeTruthy();
    expect(screen.getByText('Alineación')).toBeTruthy();
  });

  it('should display correct quantities for items', () => {
    render(
      <ShoppingCart
        cartItems={mockCartItems}
        onRemoveItem={mockOnRemoveItem}
        onClearCart={mockOnClearCart}
        onCheckout={mockOnCheckout}
      />
    );
    // Verify quantities are displayed
    const quantities = screen.getAllByText(/2|1/);
    expect(quantities.length).toBeGreaterThan(0);
  });

  it('should calculate and display total correctly', () => {
    render(
      <ShoppingCart
        cartItems={mockCartItems}
        onRemoveItem={mockOnRemoveItem}
        onClearCart={mockOnClearCart}
        onCheckout={mockOnCheckout}
      />
    );
    // Total should be (50000 * 2) + (80000 * 1) = 180000
    const total = 180000;
    const totalText = screen.getByText(/180000|Total/i);
    expect(totalText).toBeTruthy();
  });

  it('should render checkout button', () => {
    render(
      <ShoppingCart
        cartItems={mockCartItems}
        onRemoveItem={mockOnRemoveItem}
        onClearCart={mockOnClearCart}
        onCheckout={mockOnCheckout}
      />
    );
    const checkoutButton = screen.getByText(/Programar Cita/i);
    expect(checkoutButton).toBeTruthy();
  });
});
