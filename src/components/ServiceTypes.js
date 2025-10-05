import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge } from 'react-bootstrap';

const ServiceTypes = () => {
  const [serviceTypes, setServiceTypes] = useState([
    {
      id: 1,
      name: 'Mantenimiento Preventivo',
      description: 'Servicios de mantenimiento regular para prevenir fallas',
      duration: 120,
      basePrice: 150000,
      isActive: true,
      category: 'Preventivo'
    },
    {
      id: 2,
      name: 'Reparación de Motor',
      description: 'Diagnóstico y reparación de problemas del motor',
      duration: 240,
      basePrice: 300000,
      isActive: true,
      category: 'Reparación'
    },
    {
      id: 3,
      name: 'Sistema de Frenos',
      description: 'Revisión y reparación del sistema de frenos',
      duration: 180,
      basePrice: 200000,
      isActive: true,
      category: 'Seguridad'
    },
    {
      id: 4,
      name: 'Sistema Eléctrico',
      description: 'Diagnóstico y reparación de sistemas eléctricos',
      duration: 150,
      basePrice: 180000,
      isActive: true,
      category: 'Eléctrico'
    },
    {
      id: 5,
      name: 'Aire Acondicionado',
      description: 'Mantenimiento y reparación de A/C',
      duration: 90,
      basePrice: 120000,
      isActive: true,
      category: 'Climatización'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    basePrice: '',
    category: '',
    isActive: true
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  const categories = ['Preventivo', 'Reparación', 'Seguridad', 'Eléctrico', 'Climatización', 'Diagnóstico'];

  const handleShowModal = (type = null) => {
    if (type) {
      setEditingType(type);
      setFormData(type);
    } else {
      setEditingType(null);
      setFormData({
        name: '',
        description: '',
        duration: '',
        basePrice: '',
        category: '',
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
      duration: '',
      basePrice: '',
      category: '',
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
      setServiceTypes(prev => prev.map(type => 
        type.id === editingType.id 
          ? { ...formData, id: editingType.id }
          : type
      ));
      setAlert({ show: true, message: 'Tipo de servicio actualizado exitosamente', variant: 'success' });
    } else {
      // Crear nuevo tipo
      const newType = {
        ...formData,
        id: Math.max(...serviceTypes.map(t => t.id)) + 1,
        duration: parseInt(formData.duration),
        basePrice: parseInt(formData.basePrice)
      };
      setServiceTypes(prev => [...prev, newType]);
      setAlert({ show: true, message: 'Tipo de servicio creado exitosamente', variant: 'success' });
    }
    
    handleCloseModal();
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este tipo de servicio?')) {
      setServiceTypes(prev => prev.filter(type => type.id !== id));
      setAlert({ show: true, message: 'Tipo de servicio eliminado exitosamente', variant: 'warning' });
      setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
    }
  };

  const toggleActive = (id) => {
    setServiceTypes(prev => prev.map(type => 
      type.id === id ? { ...type, isActive: !type.isActive } : type
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
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
                <i className="fas fa-tools text-primary me-2"></i>
                Tipos de Servicio
              </h2>
              <p className="text-muted mb-0">Gestiona los diferentes tipos de servicios del taller</p>
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
                Catálogo de Servicios ({serviceTypes.length})
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Duración</th>
                      <th>Precio Base</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceTypes.map((type) => (
                      <tr key={type.id}>
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
                          <i className="fas fa-clock text-muted me-1"></i>
                          {formatDuration(type.duration)}
                        </td>
                        <td>
                          <strong className="text-success">{formatPrice(type.basePrice)}</strong>
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
            <i className="fas fa-tools me-2"></i>
            {editingType ? 'Editar Tipo de Servicio' : 'Nuevo Tipo de Servicio'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Servicio *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Cambio de Aceite"
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
                placeholder="Describe el servicio..."
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duración (minutos) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="120"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio Base (COP) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="150000"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Servicio Activo"
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

export default ServiceTypes;
