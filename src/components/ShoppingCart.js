import React from 'react';
import { Card, Button, Badge, Row, Col, Alert } from 'react-bootstrap';
import { exportCartToExcel } from '../utils/excelExport';

const ShoppingCart = ({ cartItems, onRemoveItem, onClearCart, onCheckout, isFloating = false }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const total = calculateTotal();

  if (cartItems.length === 0) {
    if (isFloating) {
      return null; // No mostrar nada si es flotante y está vacío
    }
    return (
      <Card className="sticky-top" style={{ top: '20px' }}>
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">
            <i className="fas fa-shopping-cart me-2"></i>
            Carrito de Compra
          </h5>
        </Card.Header>
        <Card.Body className="text-center">
          <div className="py-4">
            <i className="fas fa-shopping-cart text-muted" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
            <p className="text-muted mt-3">Tu carrito está vacío</p>
            <p className="text-muted small">
              Agrega servicios o repuestos desde las secciones correspondientes
            </p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="sticky-top" style={{ top: '20px' }}>
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="fas fa-shopping-cart me-2"></i>
          Carrito de Compra
        </h5>
        <Badge bg="light" text="dark">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
        </Badge>
      </Card.Header>
      <Card.Body>
        <div className="cart-items mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {cartItems.map((item, index) => (
            <div key={index} className="border-bottom py-2 mb-2">
              <Row className="align-items-center">
                <Col xs={2}>
                  <i className={`${item.icon} text-primary`} style={{ fontSize: '1.5rem' }}></i>
                </Col>
                <Col xs={6}>
                  <h6 className="mb-1">{item.title}</h6>
                  <div className="d-flex align-items-center gap-2">
                    <Badge 
                      bg={item.type === 'servicio' ? 'primary' : item.type === 'repuesto' ? 'success' : 'secondary'}
                      style={{ fontSize: '0.65rem' }}
                    >
                      {item.type === 'servicio' ? 'Servicio' : item.type === 'repuesto' ? 'Repuesto' : 'Item'}
                    </Badge>
                    <small className="text-muted">
                      {item.type === 'servicio' && item.duration && (
                        <span><i className="fas fa-clock me-1"></i>{item.duration}</span>
                      )}
                      {item.type === 'repuesto' && item.brand && (
                        <span><i className="fas fa-tag me-1"></i>{item.brand}</span>
                      )}
                    </small>
                  </div>
                </Col>
                <Col xs={3} className="text-end">
                  <div className="d-flex align-items-center justify-content-end">
                    <Badge bg="secondary" className="me-2">
                      {item.quantity}
                    </Badge>
                    <small className="fw-bold text-primary">
                      {formatPrice(item.price)}
                    </small>
                  </div>
                </Col>
                <Col xs={1}>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onRemoveItem(index)}
                    className="p-1"
                  >
                    ✕
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <Row className="border-top pt-3">
            <Col xs={6}>
              <h6 className="mb-0">Total:</h6>
            </Col>
            <Col xs={6} className="text-end">
              <h5 className="mb-0 text-primary fw-bold">
                {formatPrice(total)}
              </h5>
            </Col>
          </Row>
          
          <Alert variant="info" className="mt-3 mb-3">
            <small>
              <i className="fas fa-lightbulb me-1"></i> <strong>Tip:</strong> Los servicios incluyen mano de obra. Los repuestos son de marca original y tienen garantía.
            </small>
          </Alert>

          <div className="d-grid gap-2">
            <Button 
              variant="success" 
              size="lg"
              onClick={onCheckout}
              className="mb-2"
            >
              <i className="fas fa-credit-card me-2"></i>
              Proceder al Pago
            </Button>
            <Button 
              variant="info" 
              size="sm"
              onClick={exportCartToExcel}
              className="mb-2"
            >
              <i className="fas fa-file-excel me-2"></i>
              Exportar Carrito a Excel
            </Button>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={onClearCart}
            >
              <i className="fas fa-trash me-2"></i>
              Limpiar Carrito
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ShoppingCart;
