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
          <h2 className="text-center mb-4 text-primary">Registro de Cliente</h2>
          <p className="text-center text-muted mb-5">
            Únete a nuestra base de clientes y obtén beneficios exclusivos
          </p>
        </Col>
      </Row>

      {showSuccess && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              <Alert.Heading>¡Registro Exitoso!</Alert.Heading>
              <p>Tu información ha sido registrada correctamente. Te contactaremos pronto.</p>
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
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">👤 Información Personal</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre *</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Apellidos *</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
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
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>Dirección</Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Ciudad</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha de Nacimiento</Form.Label>
                      <Form.Control
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                {/* Información del Vehículo */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">🚗 Información del Vehículo</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Marca del Vehículo *</Form.Label>
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
                          <Form.Label>Modelo *</Form.Label>
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
                          <Form.Label>Año *</Form.Label>
                          <Form.Control
                            type="number"
                            name="vehicleYear"
                            value={formData.vehicleYear}
                            onChange={handleInputChange}
                            min="1990"
                            max={new Date().getFullYear() + 1}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Placa *</Form.Label>
                          <Form.Control
                            type="text"
                            name="vehiclePlate"
                            value={formData.vehiclePlate}
                            onChange={handleInputChange}
                            placeholder="Ej: ABC-123"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Contacto de Emergencia */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">🚨 Contacto de Emergencia</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre del Contacto</Form.Label>
                          <Form.Control
                            type="text"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Teléfono del Contacto</Form.Label>
                          <Form.Control
                            type="tel"
                            name="emergencyPhone"
                            value={formData.emergencyPhone}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <div className="text-center">
                  <Button variant="primary" type="submit" size="lg" className="px-5">
                    📝 Registrar Cliente
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
