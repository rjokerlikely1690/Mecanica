import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge } from 'react-bootstrap';

const Brands = () => {
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: 'Toyota',
      country: 'Japón',
      isActive: true,
      vehicleTypes: ['Automóvil', 'Camioneta'],
      logo: 'fas fa-car',
      description: 'Fabricante japonés de automóviles'
    },
    {
      id: 2,
      name: 'Chevrolet',
      country: 'Estados Unidos',
      isActive: true,
      vehicleTypes: ['Automóvil', 'Camioneta'],
      logo: 'fas fa-car',
      description: 'Marca estadounidense de General Motors'
    },
    {
      id: 3,
      name: 'Honda',
      country: 'Japón',
      isActive: true,
      vehicleTypes: ['Automóvil', 'Motocicleta'],
      logo: 'fas fa-car',
      description: 'Fabricante japonés de automóviles y motocicletas'
    },
    {
      id: 4,
      name: 'BMW',
      country: 'Alemania',
      isActive: true,
      vehicleTypes: ['Automóvil'],
      logo: 'fas fa-car',
      description: 'Fabricante alemán de vehículos de lujo'
    },
    {
      id: 5,
      name: 'Mercedes-Benz',
      country: 'Alemania',
      isActive: true,
      vehicleTypes: ['Automóvil', 'Bus'],
      logo: 'fas fa-car',
      description: 'Fabricante alemán de vehículos de lujo'
    },
    {
      id: 6,
      name: 'Yamaha',
      country: 'Japón',
      isActive: true,
      vehicleTypes: ['Motocicleta'],
      logo: 'fas fa-motorcycle',
      description: 'Fabricante japonés de motocicletas'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    description: '',
    vehicleTypes: [],
    logo: 'fas fa-car',
    isActive: true
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  const countries = ['Japón', 'Estados Unidos', 'Alemania', 'Francia', 'Italia', 'Corea del Sur', 'China', 'Colombia'];
  const vehicleTypesOptions = ['Automóvil', 'Camioneta', 'Motocicleta', 'Camión', 'Bus'];
  const logos = [
    'fas fa-car', 'fas fa-motorcycle', 'fas fa-truck', 'fas fa-bus',
    'fas fa-car-side', 'fas fa-truck-pickup', 'fas fa-van-shuttle'
  ];

  const handleShowModal = (brand = null) => {
    if (brand) {
      setEditingBrand(brand);
      setFormData(brand);
    } else {
      setEditingBrand(null);
      setFormData({
        name: '',
        country: '',
        description: '',
        vehicleTypes: [],
        logo: 'fas fa-car',
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBrand(null);
    setFormData({
      name: '',
      country: '',
      description: '',
      vehicleTypes: [],
      logo: 'fas fa-car',
      isActive: true
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVehicleTypeChange = (vehicleType) => {
    setFormData(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(vehicleType)
        ? prev.vehicleTypes.filter(type => type !== vehicleType)
        : [...prev.vehicleTypes, vehicleType]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingBrand) {
      // Actualizar marca existente
      setBrands(prev => prev.map(brand => 
        brand.id === editingBrand.id 
          ? { ...formData, id: editingBrand.id }
          : brand
      ));
      setAlert({ show: true, message: 'Marca actualizada exitosamente', variant: 'success' });
    } else {
      // Crear nueva marca
      const newBrand = {
        ...formData,
        id: Math.max(...brands.map(b => b.id)) + 1
      };
      setBrands(prev => [...prev, newBrand]);
      setAlert({ show: true, message: 'Marca creada exitosamente', variant: 'success' });
    }
    
    handleCloseModal();
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta marca?')) {
      setBrands(prev => prev.filter(brand => brand.id !== id));
      setAlert({ show: true, message: 'Marca eliminada exitosamente', variant: 'warning' });
      setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
    }
  };

  const toggleActive = (id) => {
    setBrands(prev => prev.map(brand => 
      brand.id === id ? { ...brand, isActive: !brand.isActive } : brand
    ));
  };

  return (
    <Container fluid className="py-4">
      {alert.show && (
        <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false, message: '', variant: 'success' })}>
          {alert.message}
        </Alert>
      )}

      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">
                <i className="fas fa-tags text-primary me-2"></i>
                Marcas de Vehículos
              </h2>
              <p className="text-muted mb-0">Gestiona las marcas de vehículos que atiende el taller</p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => handleShowModal()}
              className="d-flex align-items-center"
            >
              <i className="fas fa-plus me-2"></i>
              Nueva Marca
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Catálogo de Marcas ({brands.length})
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Logo</th>
                      <th>Nombre</th>
                      <th>País</th>
                      <th>Tipos de Vehículo</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map((brand) => (
                      <tr key={brand.id}>
                        <td>
                          <i className={`${brand.logo} text-primary`} style={{ fontSize: '1.5rem' }}></i>
                        </td>
                        <td>
                          <div>
                            <strong>{brand.name}</strong>
                            <br />
                            <small className="text-muted">{brand.description}</small>
                          </div>
                        </td>
                        <td>
                          <Badge bg="info">{brand.country}</Badge>
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            {brand.vehicleTypes.map((type, index) => (
                              <Badge key={index} bg="secondary" className="small">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td>
                          <Badge bg={brand.isActive ? 'success' : 'secondary'}>
                            {brand.isActive ? 'Activa' : 'Inactiva'}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => handleShowModal(brand)}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              size="sm"
                              variant={brand.isActive ? 'outline-warning' : 'outline-success'}
                              onClick={() => toggleActive(brand.id)}
                            >
                              <i className={brand.isActive ? 'fas fa-pause' : 'fas fa-play'}></i>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDelete(brand.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para crear/editar */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-tags me-2"></i>
            {editingBrand ? 'Editar Marca' : 'Nueva Marca'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la Marca *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Toyota"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>País de Origen *</Form.Label>
                  <Form.Select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar país</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe la marca..."
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Logo</Form.Label>
                  <Form.Select
                    name="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                  >
                    {logos.map(logo => (
                      <option key={logo} value={logo}>
                        {logo.replace('fas fa-', '').replace('-', ' ')}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipos de Vehículo</Form.Label>
                  <div className="border rounded p-2" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                    {vehicleTypesOptions.map(type => (
                      <Form.Check
                        key={type}
                        type="checkbox"
                        label={type}
                        checked={formData.vehicleTypes.includes(type)}
                        onChange={() => handleVehicleTypeChange(type)}
                        className="mb-1"
                      />
                    ))}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Marca Activa"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              <i className="fas fa-times me-2"></i>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              <i className="fas fa-save me-2"></i>
              {editingBrand ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Brands;
