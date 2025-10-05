import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mensaje enviado:', formData);
    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Dirección",
      info: "Carrera 15 # 45-67, Centro, Bogotá",
      description: "Estamos ubicados en el corazón de la ciudad"
    },
    {
      icon: "fas fa-phone",
      title: "Teléfono",
      info: "(+57) 1 234-5678",
      description: "Llámanos de lunes a sábado"
    },
    {
      icon: "fas fa-envelope",
      title: "Email",
      info: "info@automax.com",
      description: "Escríbenos y te respondemos pronto"
    },
    {
      icon: "fas fa-clock",
      title: "Horarios",
      info: "Lun - Sáb: 7:00 AM - 6:00 PM",
      description: "Domingos: Emergencias únicamente"
    }
  ];

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4 text-primary">Contacto</h2>
          <p className="text-center text-muted mb-5">
            Estamos aquí para ayudarte. Contáctanos y resolveremos todas tus dudas
          </p>
        </Col>
      </Row>

      {showSuccess && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              <Alert.Heading>¡Mensaje Enviado!</Alert.Heading>
              <p>Gracias por contactarnos. Te responderemos en las próximas 24 horas.</p>
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        {/* Información de contacto */}
        <Col lg={4} className="mb-4">
          <Card className="h-100 shadow">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-phone me-2"></i>
                Información de Contacto
              </h5>
            </Card.Header>
            <Card.Body>
              {contactInfo.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="d-flex align-items-start">
                    <i className={`${item.icon} text-primary`} style={{ fontSize: '1.5rem', marginRight: '15px' }}></i>
                    <div>
                      <h6 className="mb-1">{item.title}</h6>
                      <p className="mb-1 fw-bold text-primary">{item.info}</p>
                      <small className="text-muted">{item.description}</small>
                    </div>
                  </div>
                  {index < contactInfo.length - 1 && <hr className="my-3" />}
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* Mapa (placeholder) */}
          <Card className="mt-4">
            <Card.Header>
              <h6 className="mb-0">🗺️ Ubicación</h6>
            </Card.Header>
            <Card.Body className="text-center">
              <div className="map-placeholder bg-light p-4 rounded">
                <span style={{ fontSize: '3rem' }}>🗺️</span>
                <p className="mt-2 text-muted">Mapa interactivo</p>
                <small>Carrera 15 # 45-67, Centro, Bogotá</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulario de contacto */}
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">✉️ Envíanos un Mensaje</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre Completo *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Asunto *</Form.Label>
                      <Form.Select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccione un asunto</option>
                        <option value="consulta">Consulta General</option>
                        <option value="cita">Programar Cita</option>
                        <option value="servicio">Información de Servicios</option>
                        <option value="reclamo">Reclamo</option>
                        <option value="sugerencia">Sugerencia</option>
                        <option value="otro">Otro</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Mensaje *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  />
                </Form.Group>
                <div className="text-end">
                  <Button variant="primary" type="submit" size="lg">
                    📤 Enviar Mensaje
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FAQ Section */}
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">❓ Preguntas Frecuentes</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>¿Cuánto tiempo toma un cambio de aceite?</h6>
                  <p className="text-muted">Un cambio de aceite típico toma aproximadamente 30 minutos.</p>
                  
                  <h6>¿Ofrecen garantía en sus servicios?</h6>
                  <p className="text-muted">Sí, ofrecemos garantía en todos nuestros servicios y repuestos.</p>
                  
                  <h6>¿Puedo programar una cita en línea?</h6>
                  <p className="text-muted">Sí, puedes usar nuestro formulario de contacto o llamarnos directamente.</p>
                </Col>
                <Col md={6}>
                  <h6>¿Qué métodos de pago aceptan?</h6>
                  <p className="text-muted">Aceptamos efectivo, tarjetas de crédito/débito y transferencias.</p>
                  
                  <h6>¿Trabajan con todas las marcas de vehículos?</h6>
                  <p className="text-muted">Sí, trabajamos con todas las marcas y modelos de vehículos.</p>
                  
                  <h6>¿Ofrecen servicio de emergencia?</h6>
                  <p className="text-muted">Sí, ofrecemos servicio de emergencia 24/7 para casos urgentes.</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
