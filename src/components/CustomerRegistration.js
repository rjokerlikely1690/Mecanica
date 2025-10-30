import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    birthDate: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    vehiclePlate: '',
    emergencyContact: '',
    emergencyPhone: ''
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
    // Aquí se procesaría el registro del cliente
    console.log('Datos del cliente:', formData);
    setShowSuccess(true);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      birthDate: '',
      vehicleBrand: '',
      vehicleModel: '',
      vehicleYear: '',
      vehiclePlate: '',
      emergencyContact: '',
      emergencyPhone: ''
    });
  };

  const vehicleBrands = [
    'Toyota', 'Honda', 'Nissan', 'Mazda', 'Hyundai', 'Kia',
    'Ford', 'Chevrolet', 'Volkswagen', 'BMW', 'Mercedes-Benz',
    'Audi', 'Renault', 'Peugeot', 'Fiat', 'Suzuki', 'Mitsubishi'
  ];

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <div className="text-center mb-5">
            <h2 className="mb-3">
              <i className="fas fa-clipboard-list text-primary me-3"></i>
              <span className="text-primary">Registro de Cliente</span>
            </h2>
            <p className="text-muted lead">
              <i className="fas fa-star text-warning me-2"></i>
              Únete a nuestra base de clientes y obtén beneficios exclusivos
            </p>
            <div className="d-flex justify-content-center gap-4 mt-3">
              <small className="text-muted">
                <i className="fas fa-check-circle text-success me-1"></i>
                Atención Prioritaria
              </small>
              <small className="text-muted">
                <i className="fas fa-check-circle text-success me-1"></i>
                Descuentos Especiales
              </small>
              <small className="text-muted">
                <i className="fas fa-check-circle text-success me-1"></i>
                Historial de Servicio
              </small>
            </div>
          </div>
        </Col>
      </Row>

      {showSuccess && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible className="shadow-sm">
              <Alert.Heading>
                <i className="fas fa-check-circle me-2"></i>
                ¡Registro Exitoso!
              </Alert.Heading>
              <p className="mb-2">
                <i className="fas fa-thumbs-up me-2"></i>
                Tu información ha sido registrada correctamente.
              </p>
              <hr />
              <p className="mb-0">
                <i className="fas fa-headset me-2"></i>
                Nuestro equipo te contactará pronto para confirmar tu registro.
              </p>
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="shadow">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Información Personal */}
                <Card className="mb-4 border-primary">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">
                      <i className="fas fa-user-circle me-2"></i>
                      Información Personal
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-user text-primary me-2"></i>
                            Nombre *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Ingrese su nombre"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-user-tag text-primary me-2"></i>
                            Apellidos *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Ingrese sus apellidos"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-envelope text-danger me-2"></i>
                            Email *
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="correo@ejemplo.com"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-phone-alt text-success me-2"></i>
                            Teléfono *
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+56 9 1234 5678"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-map-marker-alt text-warning me-2"></i>
                            Dirección
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Calle, Número, Depto."
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-city text-info me-2"></i>
                            Ciudad
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Chillán"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="fas fa-birthday-cake text-danger me-2"></i>
                        Fecha de Nacimiento
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        placeholder="dd/mm/aaaa"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                {/* Información del Vehículo */}
                <Card className="mb-4 border-success">
                  <Card.Header className="bg-success text-white">
                    <h5 className="mb-0">
                      <i className="fas fa-car-side me-2"></i>
                      Información del Vehículo
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-copyright text-success me-2"></i>
                            Marca del Vehículo *
                          </Form.Label>
                          <Form.Select
                            name="vehicleBrand"
                            value={formData.vehicleBrand}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Seleccione una marca</option>
                            {vehicleBrands.map(brand => (
                              <option key={brand} value={brand}>{brand}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-car text-primary me-2"></i>
                            Modelo *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="vehicleModel"
                            value={formData.vehicleModel}
                            onChange={handleInputChange}
                            placeholder="Ej: Corolla, Civic, Sentra"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-calendar-alt text-info me-2"></i>
                            Año *
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name="vehicleYear"
                            value={formData.vehicleYear}
                            onChange={handleInputChange}
                            min="1990"
                            max={new Date().getFullYear() + 1}
                            placeholder="2024"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-address-card text-warning me-2"></i>
                            Placa *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="vehiclePlate"
                            value={formData.vehiclePlate}
                            onChange={handleInputChange}
                            placeholder="Ej: ABC-123 o ABCD-12"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Contacto de Emergencia */}
                <Card className="mb-4 border-danger">
                  <Card.Header className="bg-danger text-white">
                    <h5 className="mb-0">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      Contacto de Emergencia
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Alert variant="info" className="mb-3">
                      <i className="fas fa-info-circle me-2"></i>
                      <small>Persona a contactar en caso de emergencia durante el servicio</small>
                    </Alert>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-user-shield text-danger me-2"></i>
                            Nombre del Contacto
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                            placeholder="Nombre completo"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-phone-volume text-danger me-2"></i>
                            Teléfono del Contacto
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="emergencyPhone"
                            value={formData.emergencyPhone}
                            onChange={handleInputChange}
                            placeholder="+56 9 8765 4321"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <div className="text-center">
                  <Button variant="primary" type="submit" size="lg" className="px-5 py-3">
                    <i className="fas fa-user-plus me-2"></i>
                    Registrar Cliente
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerRegistration;

