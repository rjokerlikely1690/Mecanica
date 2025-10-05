import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge } from 'react-bootstrap';

const VehicleTypes = () => {
  const [vehicleTypes, setVehicleTypes] = useState([
    {
      id: 1,
      name: 'Automóvil',
      description: 'Vehículos de pasajeros con 4 ruedas',
      category: 'Pasajeros',
      maxWeight: 3500,
      isActive: true,
      icon: 'fas fa-car'
    },
    {
      id: 2,
      name: 'Camioneta',
      description: 'Vehículos utilitarios para carga y pasajeros',
      category: 'Utilitario',
      maxWeight: 4500,
      isActive: true,
      icon: 'fas fa-truck-pickup'
    },
    {
      id: 3,
      name: 'Motocicleta',
      description: 'Vehículos de 2 ruedas',
      category: 'Motocicleta',
      maxWeight: 400,
      isActive: true,
      icon: 'fas fa-motorcycle'
    },
    {
      id: 4,
      name: 'Camión',
      description: 'Vehículos pesados para carga',
      category: 'Pesado',
      maxWeight: 12000,
      isActive: true,
      icon: 'fas fa-truck'
    },
    {
      id: 5,
      name: 'Bus',
      description: 'Vehículos para transporte público',
      category: 'Transporte',
      maxWeight: 15000,
      isActive: true,
      icon: 'fas fa-bus'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    maxWeight: '',
    icon: 'fas fa-car',
    isActive: true
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  const categories = ['Pasajeros', 'Utilitario', 'Motocicleta', 'Pesado', 'Transporte', 'Deportivo'];
  const icons = [
    'fas fa-car', 'fas fa-truck-pickup', 'fas fa-motorcycle', 'fas fa-truck',
    'fas fa-bus', 'fas fa-car-side', 'fas fa-van-shuttle', 'fas fa-truck-monster'
  ];

  const handleShowModal = (type = null) => {
    if (type) {
      setEditingType(type);
      setFormData(type);
    } else {
      setEditingType(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        maxWeight: '',
        icon: 'fas fa-car',
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingType(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      maxWeight: '',
      icon: 'fas fa-car',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingType) {
      // Actualizar tipo existente
      setVehicleTypes(prev => prev.map(type => 
        type.id === editingType.id 
          ? { ...formData, id: editingType.id, maxWeight: parseInt(formData.maxWeight) }
          : type
      ));
      setAlert({ show: true, message: 'Tipo de vehículo actualizado exitosamente', variant: 'success' });
    } else {
      // Crear nuevo tipo
      const newType = {
        ...formData,
        id: Math.max(...vehicleTypes.map(t => t.id)) + 1,
        maxWeight: parseInt(formData.maxWeight)
      };
      setVehicleTypes(prev => [...prev, newType]);
      setAlert({ show: true, message: 'Tipo de vehículo creado exitosamente', variant: 'success' });
    }
    
    handleCloseModal();
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este tipo de vehículo?')) {
      setVehicleTypes(prev => prev.filter(type => type.id !== id));
      setAlert({ show: true, message: 'Tipo de vehículo eliminado exitosamente', variant: 'warning' });
      setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
    }
  };

  const toggleActive = (id) => {
    setVehicleTypes(prev => prev.map(type => 
      type.id === id ? { ...type, isActive: !type.isActive } : type
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
                <i className="fas fa-car-side text-primary me-2"></i>
                Tipos de Vehículos
              </h2>
              <p className="text-muted mb-0">Gestiona los diferentes tipos de vehículos que atiende el taller</p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => handleShowModal()}
              className="d-flex align-items-center"
            >
              <i className="fas fa-plus me-2"></i>
              Nuevo Tipo
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
                Catálogo de Tipos ({vehicleTypes.length})
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Icono</th>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Peso Máximo (kg)</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleTypes.map((type) => (
                      <tr key={type.id}>
                        <td>
                          <i className={`${type.icon} text-primary`} style={{ fontSize: '1.5rem' }}></i>
                        </td>
                        <td>
                          <div>
                            <strong>{type.name}</strong>
                            <br />
                            <small className="text-muted">{type.description}</small>
                          </div>
                        </td>
                        <td>
                          <Badge bg="info">{type.category}</Badge>
                        </td>
                        <td>
                          <span className="fw-bold">{type.maxWeight.toLocaleString()} kg</span>
                        </td>
                        <td>
                          <Badge bg={type.isActive ? 'success' : 'secondary'}>
                            {type.isActive ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => handleShowModal(type)}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              size="sm"
                              variant={type.isActive ? 'outline-warning' : 'outline-success'}
                              onClick={() => toggleActive(type.id)}
                            >
                              <i className={type.isActive ? 'fas fa-pause' : 'fas fa-play'}></i>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDelete(type.id)}
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
            <i className="fas fa-car-side me-2"></i>
            {editingType ? 'Editar Tipo de Vehículo' : 'Nuevo Tipo de Vehículo'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Tipo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Automóvil"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría *</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
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
                placeholder="Describe el tipo de vehículo..."
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Peso Máximo (kg) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxWeight"
                    value={formData.maxWeight}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="3500"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Icono</Form.Label>
                  <Form.Select
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                  >
                    {icons.map(icon => (
                      <option key={icon} value={icon}>
                        {icon.replace('fas fa-', '').replace('-', ' ')}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Tipo Activo"
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
              {editingType ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default VehicleTypes;
