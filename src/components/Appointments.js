import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Badge, Modal, Alert } from 'react-bootstrap';
import { exportAppointmentsToExcel } from '../utils/excelExport';

const Appointments = () => {
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [appointments, setAppointments] = useState([]);

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

  // Cargar items del carrito y citas desde localStorage
  useEffect(() => {
    // Cargar carrito
    const savedCartItems = localStorage.getItem('automax-cart');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    // Cargar citas guardadas
    const savedAppointments = localStorage.getItem('automax-appointments');
    if (savedAppointments) {
      const parsedAppointments = JSON.parse(savedAppointments);
      // Mapear las citas al formato del componente
      const formattedAppointments = parsedAppointments.map(apt => ({
        id: apt.id,
        customer: apt.customer.name,
        phone: apt.customer.phone,
        email: apt.customer.email,
        vehicle: `Vehículo (${apt.service})`, // Placeholder ya que no guardamos vehicle en Services
        service: apt.service,
        date: apt.date,
        time: apt.time,
        status: apt.status || 'Programada',
        notes: apt.comments,
        totalPrice: apt.price,
        duration: apt.duration
      }));
      setAppointments(formattedAppointments);
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
      id: Date.now(),
      ...formData,
      service: cartServices || formData.service,
      cartItems: cartItems,
      totalPrice: totalPrice,
      status: "Pendiente"
    };
    
    // Actualizar estado local
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    
    // Guardar en localStorage en el mismo formato que Services.js
    const savedAppointments = JSON.parse(localStorage.getItem('automax-appointments') || '[]');
    savedAppointments.push({
      id: newAppointment.id,
      service: newAppointment.service,
      serviceId: null,
      price: newAppointment.totalPrice,
      duration: "Variable",
      customer: {
        name: newAppointment.customer,
        email: newAppointment.email,
        phone: newAppointment.phone
      },
      date: newAppointment.date,
      time: newAppointment.time,
      comments: newAppointment.notes,
      status: newAppointment.status,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('automax-appointments', JSON.stringify(savedAppointments));
    
    // Limpiar formulario
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
    
    alert('✅ Cita programada exitosamente');
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      // Eliminar del estado local
      const updatedAppointments = appointments.filter(apt => apt.id !== appointmentId);
      setAppointments(updatedAppointments);
      
      // Eliminar de localStorage
      const savedAppointments = JSON.parse(localStorage.getItem('automax-appointments') || '[]');
      const filteredAppointments = savedAppointments.filter(apt => apt.id !== appointmentId);
      localStorage.setItem('automax-appointments', JSON.stringify(filteredAppointments));
      
      alert('✅ Cita eliminada exitosamente');
    }
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
        <Col className="d-flex justify-content-end gap-2">
          <Button 
            variant="success"
            onClick={exportAppointmentsToExcel}
            title="Exportar todas las citas a Excel"
          >
            <i className="fas fa-file-excel me-2"></i>
            Exportar Citas
          </Button>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            <i className="fas fa-calendar-plus me-2"></i>
            Nueva Cita {cartItems.length > 0 && `(${cartItems.length} servicios)`}
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
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-5">
                        <i className="fas fa-calendar-times text-muted mb-3" style={{ fontSize: '4rem' }}></i>
                        <h5 className="text-muted">No hay citas programadas</h5>
                        <p className="text-muted">
                          Las citas que programes desde "Servicios" o desde aquí aparecerán en esta tabla.
                        </p>
                        <Button variant="primary" onClick={() => setShowForm(true)}>
                          <i className="fas fa-plus me-2"></i>
                          Programar Primera Cita
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appointment) => (
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
                        <div className="d-flex gap-1">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowViewModal(true);
                            }}
                            title="Ver detalles"
                          >
                            <i className="fas fa-eye"></i>
                          </Button>
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setFormData({
                                customer: appointment.customer,
                                phone: appointment.phone,
                                email: appointment.email || '',
                                vehicle: appointment.vehicle,
                                service: appointment.service,
                                date: appointment.date,
                                time: appointment.time,
                                notes: appointment.notes || ''
                              });
                              setShowEditModal(true);
                            }}
                            title="Editar cita"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            title="Eliminar cita"
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                    ))
                  )}
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

      {/* Modal para Ver Detalles */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-calendar-check me-2"></i>
            Detalles de la Cita
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <div>
              <Row className="mb-4">
                <Col md={6}>
                  <Card className="border-0 bg-light">
                    <Card.Body>
                      <h6 className="text-muted mb-3">
                        <i className="fas fa-user text-primary me-2"></i>
                        Información del Cliente
                      </h6>
                      <p className="mb-2">
                        <strong>Nombre:</strong> {selectedAppointment.customer}
                      </p>
                      <p className="mb-2">
                        <strong>Teléfono:</strong> {selectedAppointment.phone}
                      </p>
                      {selectedAppointment.email && (
                        <p className="mb-0">
                          <strong>Email:</strong> {selectedAppointment.email}
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="border-0 bg-light">
                    <Card.Body>
                      <h6 className="text-muted mb-3">
                        <i className="fas fa-car text-success me-2"></i>
                        Información del Vehículo
                      </h6>
                      <p className="mb-0">
                        <strong>Vehículo:</strong> {selectedAppointment.vehicle}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={12}>
                  <Card className="border-0 bg-light">
                    <Card.Body>
                      <h6 className="text-muted mb-3">
                        <i className="fas fa-tools text-warning me-2"></i>
                        Detalles del Servicio
                      </h6>
                      <Row>
                        <Col md={6}>
                          <p className="mb-2">
                            <strong>Servicio:</strong> {selectedAppointment.service}
                          </p>
                          <p className="mb-2">
                            <strong>Fecha:</strong>{' '}
                            <Badge bg="info">
                              <i className="fas fa-calendar me-1"></i>
                              {selectedAppointment.date}
                            </Badge>
                          </p>
                        </Col>
                        <Col md={6}>
                          <p className="mb-2">
                            <strong>Hora:</strong>{' '}
                            <Badge bg="secondary">
                              <i className="fas fa-clock me-1"></i>
                              {selectedAppointment.time}
                            </Badge>
                          </p>
                          <p className="mb-0">
                            <strong>Estado:</strong> {getStatusBadge(selectedAppointment.status)}
                          </p>
                        </Col>
                      </Row>
                      {selectedAppointment.totalPrice && (
                        <p className="mb-0 mt-3">
                          <strong>Precio Total:</strong>{' '}
                          <span className="text-success fs-5">
                            ${selectedAppointment.totalPrice.toLocaleString('es-CO')}
                          </span>
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {selectedAppointment.notes && (
                <Row>
                  <Col md={12}>
                    <Card className="border-0 bg-light">
                      <Card.Body>
                        <h6 className="text-muted mb-3">
                          <i className="fas fa-sticky-note text-danger me-2"></i>
                          Notas Adicionales
                        </h6>
                        <p className="mb-0">{selectedAppointment.notes}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            <i className="fas fa-times me-2"></i>
            Cerrar
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              setShowViewModal(false);
              setFormData({
                customer: selectedAppointment.customer,
                phone: selectedAppointment.phone,
                email: selectedAppointment.email || '',
                vehicle: selectedAppointment.vehicle,
                service: selectedAppointment.service,
                date: selectedAppointment.date,
                time: selectedAppointment.time,
                notes: selectedAppointment.notes || ''
              });
              setShowEditModal(true);
            }}
          >
            <i className="fas fa-edit me-2"></i>
            Editar Cita
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Editar */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>
            <i className="fas fa-edit me-2"></i>
            Editar Cita
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-user text-primary me-2"></i>
                    Nombre Completo *
                  </Form.Label>
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
                  <Form.Label>
                    <i className="fas fa-phone text-success me-2"></i>
                    Teléfono *
                  </Form.Label>
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
                  <Form.Label>
                    <i className="fas fa-car text-warning me-2"></i>
                    Vehículo *
                  </Form.Label>
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
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-tools text-danger me-2"></i>
                    Servicio *
                  </Form.Label>
                  <Form.Select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione un servicio</option>
                    <option value="Cambio de Aceite">Cambio de Aceite</option>
                    <option value="Revisión Técnica">Revisión Técnica</option>
                    <option value="Reparación de Frenos">Reparación de Frenos</option>
                    <option value="Alineación y Balanceo">Alineación y Balanceo</option>
                    <option value="Revisión de Motor">Revisión de Motor</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-calendar text-info me-2"></i>
                    Fecha *
                  </Form.Label>
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
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-clock text-secondary me-2"></i>
                    Hora *
                  </Form.Label>
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
              <Form.Label>
                <i className="fas fa-sticky-note text-warning me-2"></i>
                Notas Adicionales
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Describa cualquier detalle adicional..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            <i className="fas fa-times me-2"></i>
            Cancelar
          </Button>
          <Button 
            variant="success" 
            onClick={() => {
              // Actualizar la cita
              setAppointments(appointments.map(apt => 
                apt.id === selectedAppointment.id 
                  ? { ...apt, ...formData }
                  : apt
              ));
              setShowEditModal(false);
              alert('✅ Cita actualizada exitosamente');
            }}
          >
            <i className="fas fa-save me-2"></i>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Appointments;
