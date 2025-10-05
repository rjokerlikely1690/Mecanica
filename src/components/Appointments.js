import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Badge, Modal, Alert } from 'react-bootstrap';

const Appointments = () => {
  const [showForm, setShowForm] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customer: "Juan Pérez",
      phone: "3001234567",
      vehicle: "Toyota Corolla 2020",
      service: "Cambio de Aceite",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "Confirmada",
      notes: "Primera vez en el taller"
    },
    {
      id: 2,
      customer: "María García",
      phone: "3109876543",
      vehicle: "Honda Civic 2019",
      service: "Revisión Técnica",
      date: "2024-01-15",
      time: "02:00 PM",
      status: "Pendiente",
      notes: "Revisión anual"
    },
    {
      id: 3,
      customer: "Carlos López",
      phone: "3154567890",
      vehicle: "Nissan Sentra 2021",
      service: "Reparación de Frenos",
      date: "2024-01-16",
      time: "09:00 AM",
      status: "En Proceso",
      notes: "Ruido en frenos delanteros"
    }
  ]);

  const [formData, setFormData] = useState({
    customer: '',
    phone: '',
    email: '',
    vehicle: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  // Cargar items del carrito desde localStorage
  useEffect(() => {
    const savedCartItems = localStorage.getItem('automax-cart');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const services = [
    "Cambio de Aceite",
    "Revisión Técnica",
    "Frenos",
    "Motor",
    "Suspensión",
    "Aire Acondicionado",
    "Diagnóstico General"
  ];

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear servicios string desde el carrito
    const cartServices = cartItems.map(item => `${item.title} (x${item.quantity})`).join(', ');
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newAppointment = {
      id: appointments.length + 1,
      ...formData,
      service: cartServices || formData.service,
      cartItems: cartItems,
      totalPrice: totalPrice,
      status: "Pendiente"
    };
    
    setAppointments([...appointments, newAppointment]);
    setFormData({
      customer: '',
      phone: '',
      email: '',
      vehicle: '',
      service: '',
      date: '',
      time: '',
      notes: ''
    });
    
        // Limpiar carrito después de confirmar la cita
        setCartItems([]);
        localStorage.removeItem('automax-cart');
    setShowForm(false);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Confirmada': 'success',
      'Pendiente': 'warning',
      'En Proceso': 'info',
      'Completada': 'primary',
      'Cancelada': 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4 text-primary">Gestión de Citas</h2>
          <p className="text-center text-muted mb-5">
            Administra las citas de tus clientes y programa nuevas citas
          </p>
        </Col>
      </Row>

      {/* Mostrar carrito si hay items */}
      {cartItems.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Alert variant="info">
              <Alert.Heading>
                <i className="fas fa-shopping-cart me-2"></i>
                Servicios en el Carrito
              </Alert.Heading>
              <p>Has agregado {cartItems.length} servicio(s) al carrito. Estos se incluirán automáticamente en tu cita.</p>
              <div className="d-flex flex-wrap gap-2">
                {cartItems.map((item, index) => (
                  <Badge key={index} bg="primary" className="d-flex align-items-center gap-1">
                    <i className={`${item.icon} me-1`}></i> {item.title} (x{item.quantity})
                  </Badge>
                ))}
              </div>
              <hr />
              <p className="mb-0">
                <strong>Total: ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('es-CO')}</strong>
              </p>
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowForm(true)}>
            📅 Nueva Cita {cartItems.length > 0 && `(${cartItems.length} servicios)`}
          </Button>
        </Col>
      </Row>

      {/* Tabla de citas */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Citas Programadas</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Teléfono</th>
                    <th>Vehículo</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.customer}</td>
                      <td>{appointment.phone}</td>
                      <td>{appointment.vehicle}</td>
                      <td>{appointment.service}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>
                        {appointment.totalPrice ? (
                          <strong className="text-success">
                            ${appointment.totalPrice.toLocaleString('es-CO')}
                          </strong>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>{getStatusBadge(appointment.status)}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-2">
                          Ver
                        </Button>
                        <Button variant="outline-success" size="sm">
                          Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para nueva cita */}
      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>📅 Programar Nueva Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Cliente *</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Vehículo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    placeholder="Ej: Toyota Corolla 2020"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Servicio *</Form.Label>
                  <Form.Select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione un servicio</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha *</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Hora *</Form.Label>
                  <Form.Select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione hora</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Notas Adicionales</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Describa cualquier detalle adicional sobre la cita..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Programar Cita
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Appointments;
