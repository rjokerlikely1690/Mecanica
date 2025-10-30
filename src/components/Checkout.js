import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup, Alert } from 'react-bootstrap';

const Checkout = ({ cartItems, onClearCart, onSectionChange }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    metodoPago: 'efectivo',
    notas: ''
  });

  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ordenNumero, setOrdenNumero] = useState('');
  const [ordenConfirmada, setOrdenConfirmada] = useState(null);

  useEffect(() => {
    // Si no hay items en el carrito y no estamos en pantalla de éxito, redirigir a servicios
    if (cartItems.length === 0 && !showSuccess) {
      // Pequeño delay para evitar redirección inmediata
      const timer = setTimeout(() => {
        onSectionChange('services');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [cartItems, onSectionChange, showSuccess]);

  // Calcular totales
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const iva = subtotal * 0.19; // IVA 19%
  const total = subtotal + iva;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generarNumeroOrden = () => {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000);
    return `ORD-${año}${mes}${dia}-${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Validar que haya items en el carrito
    if (cartItems.length === 0) {
      alert('⚠️ El carrito está vacío. Por favor, agrega servicios o productos antes de continuar.');
      onSectionChange('services');
      return;
    }

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Generar número de orden
    const numeroOrden = generarNumeroOrden();
    setOrdenNumero(numeroOrden);

    // Guardar orden en localStorage
    const orden = {
      numeroOrden,
      fecha: new Date().toISOString(),
      cliente: formData,
      items: cartItems,
      subtotal,
      iva,
      total,
      estado: 'pendiente'
    };

    // Guardar en historial de órdenes
    const ordenes = JSON.parse(localStorage.getItem('automax-ordenes') || '[]');
    ordenes.push(orden);
    localStorage.setItem('automax-ordenes', JSON.stringify(ordenes));

    // Guardar orden confirmada en estado (antes de limpiar carrito)
    setOrdenConfirmada(orden);

    // Limpiar carrito
    onClearCart();

    // Mostrar éxito
    setShowSuccess(true);

    // Scroll al inicio
    window.scrollTo(0, 0);
  };

  if (showSuccess) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg border-0">
              <Card.Body className="text-center p-5">
                <div className="mb-4">
                  <i className="fas fa-check-circle text-success" style={{ fontSize: '80px' }}></i>
                </div>
                <h2 className="text-success mb-3">¡Orden Confirmada!</h2>
                <p className="lead mb-4">
                  Su orden ha sido procesada exitosamente
                </p>
                
                <Alert variant="info" className="mb-4">
                  <h5 className="mb-3">Número de Orden:</h5>
                  <h3 className="text-primary mb-0">
                    <strong>{ordenNumero}</strong>
                  </h3>
                </Alert>

                <Card className="mb-4 border-primary">
                  <Card.Body>
                    <h5 className="mb-3">Resumen de la Orden</h5>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <strong>${ordenConfirmada?.subtotal.toLocaleString('es-CL') || '0'}</strong>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <span>IVA (19%):</span>
                        <strong>${ordenConfirmada?.iva.toLocaleString('es-CL') || '0'}</strong>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between bg-light">
                        <span className="h5 mb-0">Total:</span>
                        <span className="h5 mb-0 text-primary">
                          <strong>${ordenConfirmada?.total.toLocaleString('es-CL') || '0'}</strong>
                        </span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>

                <div className="d-flex flex-column flex-md-row gap-2 justify-content-center">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => {
                      setShowSuccess(false);
                      setOrdenConfirmada(null);
                      onSectionChange('services');
                    }}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    Seguir Comprando
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="lg"
                    onClick={() => {
                      setShowSuccess(false);
                      setOrdenConfirmada(null);
                      onSectionChange('dashboard');
                    }}
                  >
                    <i className="fas fa-home me-2"></i>
                    Ir al Inicio
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  // Si el carrito está vacío, mostrar mensaje
  if (cartItems.length === 0 && !showSuccess) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="warning" className="text-center">
              <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem' }}></i>
              <h4 className="mt-3">Carrito Vacío</h4>
              <p>No tienes productos en el carrito. Agrega servicios o repuestos para continuar.</p>
              <Button variant="primary" onClick={() => onSectionChange('services')}>
                <i className="fas fa-shopping-cart me-2"></i>
                Ir a Servicios
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">
                <i className="fas fa-credit-card me-2"></i>
                Información de Pago
              </h4>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre *</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        placeholder="Ingrese su nombre"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su nombre
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido *</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        required
                        placeholder="Ingrese su apellido"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su apellido
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="correo@ejemplo.com"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese un email válido
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                        placeholder="+56 9 1234 5678"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su teléfono
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Dirección *</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                    placeholder="Calle, Número, Departamento"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese su dirección
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ciudad *</Form.Label>
                      <Form.Control
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                        required
                        placeholder="Ciudad"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su ciudad
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Código Postal</Form.Label>
                      <Form.Control
                        type="text"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                        placeholder="Código Postal"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Método de Pago *</Form.Label>
                  <Form.Select
                    name="metodoPago"
                    value={formData.metodoPago}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="efectivo">💵 Efectivo</option>
                    <option value="transferencia">🏦 Transferencia Bancaria</option>
                    <option value="tarjeta-debito">💳 Tarjeta de Débito</option>
                    <option value="tarjeta-credito">💳 Tarjeta de Crédito</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Notas Adicionales</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                    placeholder="Instrucciones especiales, horario preferido, etc."
                  />
                </Form.Group>

                <div className="d-flex gap-2 justify-content-between">
                  <Button 
                    variant="outline-secondary"
                    onClick={() => onSectionChange('services')}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Volver
                  </Button>
                  <Button 
                    variant="success" 
                    type="submit"
                    size="lg"
                  >
                    <i className="fas fa-check me-2"></i>
                    Confirmar Orden
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Header className="bg-light">
              <h5 className="mb-0">
                <i className="fas fa-shopping-bag me-2"></i>
                Resumen de la Orden
              </h5>
            </Card.Header>
            <Card.Body>
              <h6 className="text-muted mb-3">Items en el Carrito ({cartItems.length})</h6>
              <ListGroup variant="flush" className="mb-3">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index} className="px-0">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <div className="fw-bold">{item.title}</div>
                        <small className="text-muted">Cantidad: {item.quantity}</small>
                      </div>
                      <div className="text-end ms-2">
                        <div className="fw-bold">
                          ${(item.price * item.quantity).toLocaleString('es-CL')}
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <hr />

              <ListGroup variant="flush">
                <ListGroup.Item className="px-0 d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString('es-CL')}</span>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex justify-content-between">
                  <span>IVA (19%):</span>
                  <span>${iva.toLocaleString('es-CL')}</span>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex justify-content-between bg-light">
                  <span className="h5 mb-0">Total:</span>
                  <span className="h5 mb-0 text-success">
                    <strong>${total.toLocaleString('es-CL')}</strong>
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;

