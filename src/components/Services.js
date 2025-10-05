import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';

const Services = ({ onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Cambio de Aceite",
      description: "Cambio completo de aceite y filtros para mantener el motor en óptimas condiciones.",
      price: 25000,
      duration: "30 min",
      icon: "fas fa-oil-can",
      displayPrice: "$25.000"
    },
    {
      id: 2,
      title: "Revisión Técnica",
      description: "Inspección completa del vehículo para detectar problemas y mantener la seguridad.",
      price: 45000,
      duration: "1 hora",
      icon: "fas fa-search",
      displayPrice: "$45.000"
    },
    {
      id: 3,
      title: "Frenos",
      description: "Revisión y reparación del sistema de frenos para garantizar la seguridad.",
      price: 80000,
      duration: "2 horas",
      icon: "fas fa-hand-paper",
      displayPrice: "$80.000"
    },
    {
      id: 4,
      title: "Motor",
      description: "Diagnóstico y reparación de problemas del motor y sistemas relacionados.",
      price: 120000,
      duration: "Variable",
      icon: "fas fa-cog",
      displayPrice: "Desde $120.000"
    },
    {
      id: 5,
      title: "Suspensión",
      description: "Revisión y reparación del sistema de suspensión para una conducción suave.",
      price: 90000,
      duration: "1.5 horas",
      icon: "fas fa-car",
      displayPrice: "$90.000"
    },
    {
      id: 6,
      title: "Aire Acondicionado",
      description: "Mantenimiento y reparación del sistema de aire acondicionado.",
      price: 60000,
      duration: "1 hora",
      icon: "fas fa-snowflake",
      displayPrice: "$60.000"
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

      const handleAddToCart = (service) => {
        onAddToCart({
          ...service,
          type: 'servicio'
        });
        setShowModal(false);
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
      <Row>
        {services.map((service) => (
          <Col md={6} lg={4} key={service.id} className="mb-4">
            <Card className="h-100 shadow-sm service-card">
              <Card.Body className="text-center">
                <div className="service-icon mb-3">
                  <i className={`${service.icon} text-primary`} style={{ fontSize: '3rem' }}></i>
                </div>
                <Card.Title className="text-primary">{service.title}</Card.Title>
                <Card.Text className="text-muted">{service.description}</Card.Text>
                <div className="mb-3">
                  <strong className="text-success">{service.displayPrice}</strong>
                  <br />
                  <small className="text-muted">
                    <i className="fas fa-clock me-1"></i>
                    {service.duration}
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
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`${selectedService?.icon} text-primary me-2`}></i>
            Solicitar Servicio: {selectedService?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control type="text" placeholder="Ingrese su nombre" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="tel" placeholder="Ingrese su teléfono" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Ingrese su email" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Marca y Modelo del Vehículo</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Toyota Corolla 2020" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Preferida</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora Preferida</Form.Label>
              <Form.Select>
                <option>Seleccione una hora</option>
                <option>08:00 AM</option>
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comentarios Adicionales</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Describa cualquier problema específico o comentario adicional" />
            </Form.Group>
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
            <Button variant="primary">
              <i className="fas fa-calendar-check me-2"></i>
              Confirmar Cita Directa
            </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Services;
