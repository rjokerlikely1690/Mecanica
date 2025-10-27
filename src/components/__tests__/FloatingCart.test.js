import React from 'react';
import { render, screen } from '@testing-library/react';
import FloatingCart from '../FloatingCart';

describe('FloatingCart Component', () => {
  const mockOnRemoveItem = () => {};
  const mockOnClearCart = () => {};
  const mockOnCheckout = () => {};

  it('should not render when cart is empty', () => {
    const { container } = render(
      <FloatingCart 
        cartItems={[]}
        onRemoveItem={mockOnRemoveItem}
        onClearCart={mockOnClearCart}
        onCheckout={mockOnCheckout}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render floating cart button when cart has items', () => {
    const cartItems = [
      { id: 1, name: 'Test Item', price: 100, quantity: 1 }
    ];
    render(
      <FloatingCart 
        cartItems={cartItems}
        onRemoveItem={mockOnRemoveItem}
        onClearCart={mockOnClearCart}
        onCheckout={mockOnCheckout}
      />
    );
    const cartButton = screen.getByRole('button');
    expect(cartButton).toBeTruthy();
  });

  it('should display cart icon', () => {
    const cartItems = [
      { id: 1, name: 'Test Item', price: 100, quantity: 1 }
    ];
    const { container } = render(
      <FloatingCart 
        cartItems={cartItems}
        onRemoveItem={mockOnRemoveItem}
        onClearCart={mockOnClearCart}
        onCheckout={mockOnCheckout}
      />
    );
    const icon = container.querySelector('i');
    expect(icon).toBeTruthy();
  });

  it('should display badge with correct item count', () => {
    const cartItems = [
      { id: 1, name: 'Test Item', price: 100, quantity: 5 }
    ];
    render(
      <FloatingCart 
        cartItems={cartItems}
        onRemoveItem={mockOnRemoveItem}
        onClearCart={mockOnClearCart}
        onCheckout={mockOnCheckout}
      />
    );
    const badge = screen.getByText('5');
    expect(badge).toBeTruthy();
  });

  it('should calculate total items correctly', () => {
    const cartItems = [
      { id: 1, name: 'Item 1', price: 100, quantity: 2 },
      { id: 2, name: 'Item 2', price: 200, quantity: 3 }
    ];
    render(
      <FloatingCart 
        cartItems={cartItems}
        onRemoveItem={mockOnRemoveItem}
        onClearCart={mockOnClearCart}
        onCheckout={mockOnCheckout}
      />
    );
    // Total quantity should be 2 + 3 = 5
    const badge = screen.getByText('5');
    expect(badge).toBeTruthy();
  });
});
