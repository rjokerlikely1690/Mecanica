import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge } from 'react-bootstrap';

const Mechanics = () => {
  const [mechanics, setMechanics] = useState([
    {
      id: 1,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@automax.com',
      phone: '300-123-4567',
      specialty: 'Motor',
      experience: 8,
      hourlyRate: 25000,
      isActive: true,
      avatar: 'fas fa-user-tie'
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria.gonzalez@automax.com',
      phone: '300-234-5678',
      specialty: 'Eléctrico',
      experience: 5,
      hourlyRate: 22000,
      isActive: true,
      avatar: 'fas fa-user-tie'
    },
    {
      id: 3,
      name: 'Luis Martínez',
      email: 'luis.martinez@automax.com',
      phone: '300-345-6789',
      specialty: 'Frenos',
      experience: 12,
      hourlyRate: 30000,
      isActive: true,
      avatar: 'fas fa-user-tie'
    },
    {
      id: 4,
      name: 'Ana Herrera',
      email: 'ana.herrera@automax.com',
      phone: '300-456-7890',
      specialty: 'A/C',
      experience: 6,
      hourlyRate: 23000,
      isActive: true,
      avatar: 'fas fa-user-tie'
    },
    {
      id: 5,
      name: 'Pedro Silva',
      email: 'pedro.silva@automax.com',
      phone: '300-567-8901',
      specialty: 'General',
      experience: 15,
      hourlyRate: 35000,
      isActive: false,
      avatar: 'fas fa-user-tie'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingMechanic, setEditingMechanic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    experience: '',
    hourlyRate: '',
    avatar: 'fas fa-user-tie',
    isActive: true
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  const specialties = ['Motor', 'Eléctrico', 'Frenos', 'A/C', 'General', 'Transmisión', 'Suspensión'];
  const avatars = ['fas fa-user-tie', 'fas fa-user', 'fas fa-user-circle', 'fas fa-user-md'];

  const handleShowModal = (mechanic = null) => {
    if (mechanic) {
      setEditingMechanic(mechanic);
      setFormData(mechanic);
    } else {
      setEditingMechanic(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        experience: '',
        hourlyRate: '',
        avatar: 'fas fa-user-tie',
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMechanic(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialty: '',
      experience: '',
      hourlyRate: '',
      avatar: 'fas fa-user-tie',
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
    
    if (editingMechanic) {
      // Actualizar mecánico existente
      setMechanics(prev => prev.map(mechanic => 
        mechanic.id === editingMechanic.id 
          ? { 
              ...formData, 
              id: editingMechanic.id,
              experience: parseInt(formData.experience),
              hourlyRate: parseInt(formData.hourlyRate)
            }
          : mechanic
      ));
      setAlert({ show: true, message: 'Mecánico actualizado exitosamente', variant: 'success' });
    } else {
      // Crear nuevo mecánico
      const newMechanic = {
        ...formData,
        id: Math.max(...mechanics.map(m => m.id)) + 1,
        experience: parseInt(formData.experience),
        hourlyRate: parseInt(formData.hourlyRate)
      };
      setMechanics(prev => [...prev, newMechanic]);
      setAlert({ show: true, message: 'Mecánico creado exitosamente', variant: 'success' });
    }
    
    handleCloseModal();
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este mecánico?')) {
      setMechanics(prev => prev.filter(mechanic => mechanic.id !== id));
      setAlert({ show: true, message: 'Mecánico eliminado exitosamente', variant: 'warning' });
      setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
    }
  };

  const toggleActive = (id) => {
    setMechanics(prev => prev.map(mechanic => 
      mechanic.id === id ? { ...mechanic, isActive: !mechanic.isActive } : mechanic
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
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
                <i className="fas fa-user-tie text-primary me-2"></i>
                Mecánicos
              </h2>
              <p className="text-muted mb-0">Gestiona el personal técnico del taller</p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => handleShowModal()}
              className="d-flex align-items-center"
            >
              <i className="fas fa-plus me-2"></i>
              Nuevo Mecánico
            </Button>
          </div>
        </Col>
      </Row>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-users text-primary mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1">{mechanics.length}</h4>
              <p className="text-muted mb-0">Total Mecánicos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-user-check text-success mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1">{mechanics.filter(m => m.isActive).length}</h4>
              <p className="text-muted mb-0">Activos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-cogs text-info mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1">{new Set(mechanics.map(m => m.specialty)).size}</h4>
              <p className="text-muted mb-0">Especialidades</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-clock text-warning mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1">{Math.round(mechanics.reduce((sum, m) => sum + m.experience, 0) / mechanics.length)}</h4>
              <p className="text-muted mb-0">Años Promedio</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Lista de Mecánicos ({mechanics.length})
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Avatar</th>
                      <th>Nombre</th>
                      <th>Contacto</th>
                      <th>Especialidad</th>
                      <th>Experiencia</th>
                      <th>Tarifa/Hora</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mechanics.map((mechanic) => (
                      <tr key={mechanic.id}>
                        <td>
                          <i className={`${mechanic.avatar} text-primary`} style={{ fontSize: '1.5rem' }}></i>
                        </td>
                        <td>
                          <div>
                            <strong>{mechanic.name}</strong>
                          </div>
                        </td>
                        <td>
                          <div>
                            <small className="text-muted">
                              <i className="fas fa-envelope me-1"></i>
                              {mechanic.email}
                            </small>
                            <br />
                            <small className="text-muted">
                              <i className="fas fa-phone me-1"></i>
                              {mechanic.phone}
                            </small>
                          </div>
                        </td>
                        <td>
                          <Badge bg="info">{mechanic.specialty}</Badge>
                        </td>
                        <td>
                          <span className="fw-bold">{mechanic.experience} años</span>
                        </td>
                        <td>
                          <strong className="text-success">{formatPrice(mechanic.hourlyRate)}</strong>
                        </td>
                        <td>
                          <Badge bg={mechanic.isActive ? 'success' : 'secondary'}>
                            {mechanic.isActive ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => handleShowModal(mechanic)}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              size="sm"
                              variant={mechanic.isActive ? 'outline-warning' : 'outline-success'}
                              onClick={() => toggleActive(mechanic.id)}
                            >
                              <i className={mechanic.isActive ? 'fas fa-pause' : 'fas fa-play'}></i>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDelete(mechanic.id)}
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
            <i className="fas fa-user-tie me-2"></i>
            {editingMechanic ? 'Editar Mecánico' : 'Nuevo Mecánico'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
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
                    placeholder="Ej: Carlos Rodríguez"
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
                    placeholder="carlos@automax.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="300-123-4567"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Especialidad *</Form.Label>
                  <Form.Select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar especialidad</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Años de Experiencia *</Form.Label>
                  <Form.Control
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="5"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tarifa por Hora (COP) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="25000"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Select
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                  >
                    {avatars.map(avatar => (
                      <option key={avatar} value={avatar}>
                        {avatar.replace('fas fa-', '').replace('-', ' ')}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Form.Group className="mb-3 w-100">
                  <Form.Check
                    type="checkbox"
                    label="Mecánico Activo"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              <i className="fas fa-times me-2"></i>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              <i className="fas fa-save me-2"></i>
              {editingMechanic ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Mechanics;
