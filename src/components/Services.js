import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';

const Services = ({ onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    comments: ''
  });

  const services = [
    {
      id: 1,
      title: "Cambio de Aceite",
      description: "Cambio completo de aceite y filtros para mantener el motor en óptimas condiciones.",
      price: 25000,
      duration: "30 min",
      icon: "fas fa-droplet",
      displayPrice: "$25.000",
      image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=600&q=80",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Revisión Técnica",
      description: "Inspección completa del vehículo para detectar problemas y mantener la seguridad.",
      price: 45000,
      duration: "1 hora",
      icon: "fas fa-magnifying-glass",
      displayPrice: "$45.000",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "Frenos",
      description: "Revisión y reparación del sistema de frenos para garantizar la seguridad.",
      price: 80000,
      duration: "2 horas",
      icon: "fas fa-circle-stop",
      displayPrice: "$80.000",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      title: "Motor",
      description: "Diagnóstico y reparación de problemas del motor y sistemas relacionados.",
      price: 120000,
      duration: "Variable",
      icon: "fas fa-gear",
      displayPrice: "Desde $120.000",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      id: 5,
      title: "Suspensión",
      description: "Revisión y reparación del sistema de suspensión para una conducción suave.",
      price: 90000,
      duration: "1.5 horas",
      icon: "fas fa-car-side",
      displayPrice: "$90.000",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    },
    {
      id: 6,
      title: "Aire Acondicionado",
      description: "Mantenimiento y reparación del sistema de aire acondicionado.",
      price: 60000,
      duration: "1 hora",
      icon: "fas fa-wind",
      displayPrice: "$60.000",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
    // Reset form when opening modal
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      comments: ''
    });
  };

  const handleAddToCart = (service) => {
    onAddToCart({
      ...service,
      type: 'servicio'
    });
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmAppointment = () => {
    // Validar campos requeridos
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setNotificationMessage('⚠️ Por favor, complete todos los campos obligatorios');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setNotificationMessage('⚠️ Por favor, ingrese un email válido');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    // Crear objeto de cita
    const appointment = {
      id: Date.now(),
      service: selectedService.title,
      serviceId: selectedService.id,
      price: selectedService.price,
      duration: selectedService.duration,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      date: formData.date,
      time: formData.time,
      comments: formData.comments,
      status: 'Programada',
      createdAt: new Date().toISOString()
    };

    // Guardar en localStorage
    const appointments = JSON.parse(localStorage.getItem('automax-appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('automax-appointments', JSON.stringify(appointments));

    // Agregar servicio al carrito automáticamente
    onAddToCart({
      ...selectedService,
      type: 'servicio'
    });

    // Mostrar notificación de éxito
    setNotificationMessage(`✅ ¡Cita confirmada! ${selectedService.title} programado para ${formData.date} a las ${formData.time}`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);

    // Cerrar modal
    setShowModal(false);

    // Limpiar formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      comments: ''
    });
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4 text-primary">Nuestros Servicios</h2>
          <p className="text-center text-muted mb-5">
            Ofrecemos servicios profesionales de mecánica automotriz con la más alta calidad
          </p>
        </Col>
      </Row>
      <Row className="g-4" style={{ marginBottom: '80px' }}>
        {services.map((service) => (
          <Col md={6} lg={4} key={service.id} style={{ marginBottom: '60px' }}>
            <Card 
              className="h-100 shadow-sm service-card border-0"
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                overflow: 'visible'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              {/* Image Section */}
              <div 
                className="position-relative"
                style={{
                  height: '220px',
                  overflow: 'hidden',
                  background: service.gradient
                }}
              >
                <img 
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                {/* Gradient Overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))'
                  }}
                ></div>
                {/* Price Badge */}
                <div 
                  className="position-absolute top-0 end-0 m-3"
                >
                  <span 
                    className="badge bg-success text-white px-3 py-2"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }}
                  >
                    {service.displayPrice}
                  </span>
                </div>
              </div>

              <Card.Body className="text-center pb-4" style={{ paddingTop: '20px', position: 'relative' }}>
                {/* Icon Badge - Ahora dentro del Card.Body */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2
                  }}
                >
                  <div 
                    className="rounded-circle bg-white d-flex align-items-center justify-content-center"
                    style={{
                      width: '80px',
                      height: '80px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      border: '3px solid #fff'
                    }}
                  >
                    <i className={`${service.icon} text-primary`} style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </div>
                
                {/* Espaciador para el icono */}
                <div style={{ height: '50px' }}></div>
                <Card.Title className="text-primary fw-bold mb-3">{service.title}</Card.Title>
                <Card.Text className="text-muted mb-3" style={{ minHeight: '60px' }}>
                  {service.description}
                </Card.Text>
                <div className="mb-3">
                  <small className="text-muted">
                    <i className="fas fa-clock me-2 text-primary"></i>
                    Duración: <strong>{service.duration}</strong>
                  </small>
                </div>
                <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={() => handleServiceClick(service)}
                    >
                      <i className="fas fa-clipboard-list me-2"></i>
                      Solicitar Servicio
                    </Button>
                    <Button
                      variant="outline-success"
                      onClick={() => handleAddToCart(service)}
                      size="sm"
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      Agregar al Carrito
                    </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para solicitar servicio */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className={`${selectedService?.icon} me-2`}></i>
            Solicitar Servicio: {selectedService?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Service Image Preview */}
          {selectedService && (
            <div className="mb-4">
              <div 
                className="position-relative"
                style={{
                  height: '200px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: selectedService.gradient
                }}
              >
                <img 
                  src={selectedService.image}
                  alt={selectedService.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    padding: '20px'
                  }}
                >
                  <h5 className="text-white mb-1">{selectedService.title}</h5>
                  <p className="text-white-50 mb-0 small">{selectedService.description}</p>
                  <div className="mt-2">
                    <span className="badge bg-success me-2">{selectedService.displayPrice}</span>
                    <span className="badge bg-info">
                      <i className="fas fa-clock me-1"></i>
                      {selectedService.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Notification Alert */}
          {showNotification && (
            <Alert variant={notificationMessage.includes('⚠️') ? 'warning' : 'success'} className="mb-3">
              {notificationMessage}
            </Alert>
          )}

          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo *</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Ingrese su nombre" 
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
                    onChange={handleFormChange}
                    placeholder="Ingrese su teléfono" 
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Ingrese su email" 
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Preferida *</Form.Label>
              <Form.Control 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora Preferida *</Form.Label>
              <Form.Select
                name="time"
                value={formData.time}
                onChange={handleFormChange}
                required
              >
                <option value="">Seleccione una hora</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comentarios Adicionales</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="comments"
                value={formData.comments}
                onChange={handleFormChange}
                placeholder="Describa cualquier problema específico o comentario adicional" 
              />
            </Form.Group>
            <small className="text-muted">* Campos obligatorios</small>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              <i className="fas fa-times me-2"></i>
              Cancelar
            </Button>
            <Button
              variant="outline-success"
              onClick={() => handleAddToCart(selectedService)}
              className="me-2"
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Agregar al Carrito
            </Button>
            <Button 
              variant="primary"
              onClick={handleConfirmAppointment}
            >
              <i className="fas fa-calendar-check me-2"></i>
              Confirmar Cita Directa
            </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Services;
