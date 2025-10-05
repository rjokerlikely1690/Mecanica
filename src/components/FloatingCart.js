import React, { useState } from 'react';
import { Badge, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import ShoppingCart from './ShoppingCart';

const FloatingCart = ({ cartItems, onRemoveItem, onClearCart, onCheckout }) => {
  const [show, setShow] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) {
    return null; // No mostrar el carrito flotante si está vacío
  }

  const popover = (
    <Popover id="cart-popover" style={{ width: '350px', maxWidth: '90vw' }}>
      <Popover.Header as="h6" className="bg-primary text-white">
        <i className="fas fa-shopping-cart me-2"></i>
        Carrito de Compra ({totalItems} items)
      </Popover.Header>
      <Popover.Body className="p-0">
        <ShoppingCart
          cartItems={cartItems}
          onRemoveItem={onRemoveItem}
          onClearCart={onClearCart}
          onCheckout={onCheckout}
          isFloating={true}
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="floating-cart">
      <OverlayTrigger
        trigger="click"
        placement="left"
        overlay={popover}
        show={show}
        onToggle={setShow}
      >
        <Button
          variant="primary"
          className="floating-cart-button"
          size="lg"
        >
          <i className="fas fa-shopping-cart"></i>
          {totalItems > 0 && (
            <Badge bg="danger" className="floating-cart-badge">
              {totalItems}
            </Badge>
          )}
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default FloatingCart;
