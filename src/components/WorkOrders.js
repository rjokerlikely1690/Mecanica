import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form } from 'react-bootstrap';

const WorkOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [workOrders, setWorkOrders] = useState([
    {
      id: 'WO-001',
      customer: 'Juan Pérez',
      vehicle: 'Toyota Corolla 2020',
      service: 'Cambio de aceite y filtros',
      status: 'En Proceso',
      priority: 'Normal',
      assignedMechanic: 'Carlos López',
      startDate: '2024-01-15',
      estimatedTime: '2 horas',
      totalCost: 85000
    },
    {
      id: 'WO-002',
      customer: 'María García',
      vehicle: 'Honda Civic 2019',
      service: 'Revisión completa del sistema de frenos',
      status: 'Pendiente',
      priority: 'Alta',
      assignedMechanic: 'Ana Martínez',
      startDate: '2024-01-16',
      estimatedTime: '3 horas',
      totalCost: 150000
    },
    {
      id: 'WO-003',
      customer: 'Roberto Silva',
      vehicle: 'Nissan Sentra 2021',
      service: 'Diagnóstico de motor',
      status: 'Completada',
      priority: 'Baja',
      assignedMechanic: 'Luis Rodríguez',
      startDate: '2024-01-14',
      estimatedTime: '4 horas',
      totalCost: 200000
    }
  ]);

  const [formData, setFormData] = useState({
    customer: '',
    vehicle: '',
    service: '',
    priority: 'Normal',
    assignedMechanic: '',
    estimatedTime: '',
    totalCost: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkOrder = {
      id: `WO-${String(workOrders.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Pendiente',
      startDate: new Date().toISOString().split('T')[0],
      totalCost: parseInt(formData.totalCost)
    };
    
    setWorkOrders([...workOrders, newWorkOrder]);
    setFormData({
      customer: '',
      vehicle: '',
      service: '',
      priority: 'Normal',
      assignedMechanic: '',
      estimatedTime: '',
      totalCost: ''
    });
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Pendiente': 'badge-pending',
      'En Proceso': 'badge-in-progress',
      'Completada': 'badge-completed',
      'Cancelada': 'badge-cancelled'
    };
    return <span className={`status-badge ${variants[status]}`}>{status}</span>;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'Baja': 'badge-normal',
      'Normal': 'badge-normal',
      'Alta': 'badge-high',
      'Crítica': 'badge-critical'
    };
    return <span className={`status-badge ${variants[priority]}`}>{priority}</span>;
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-primary mb-1">📋 Órdenes de Trabajo</h2>
              <p className="text-muted">Gestiona las órdenes de trabajo del taller</p>
            </div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              ➕ Nueva Orden
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Lista de Órdenes de Trabajo</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Vehículo</th>
                    <th>Servicio</th>
                    <th>Estado</th>
                    <th>Prioridad</th>
                    <th>Mecánico</th>
                    <th>Fecha</th>
                    <th>Tiempo Est.</th>
                    <th>Costo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrders.map((order) => (
                    <tr key={order.id}>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.customer}</td>
                      <td>{order.vehicle}</td>
                      <td>{order.service}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{getPriorityBadge(order.priority)}</td>
                      <td>{order.assignedMechanic}</td>
                      <td>{order.startDate}</td>
                      <td>{order.estimatedTime}</td>
                      <td><strong>${order.totalCost.toLocaleString('es-CO')}</strong></td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-1">
                          👁️
                        </Button>
                        <Button variant="outline-success" size="sm">
                          ✏️
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para nueva orden */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>📋 Nueva Orden de Trabajo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cliente *</Form.Label>
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
                  <Form.Label>Vehículo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    placeholder="Marca Modelo Año"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Descripción del Servicio *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Prioridad</Form.Label>
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Baja">Baja</option>
                    <option value="Normal">Normal</option>
                    <option value="Alta">Alta</option>
                    <option value="Crítica">Crítica</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Mecánico Asignado</Form.Label>
                  <Form.Select
                    name="assignedMechanic"
                    value={formData.assignedMechanic}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Carlos López">Carlos López</option>
                    <option value="Ana Martínez">Ana Martínez</option>
                    <option value="Luis Rodríguez">Luis Rodríguez</option>
                    <option value="Pedro García">Pedro García</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Tiempo Estimado</Form.Label>
                  <Form.Control
                    type="text"
                    name="estimatedTime"
                    value={formData.estimatedTime}
                    onChange={handleInputChange}
                    placeholder="Ej: 2 horas"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Costo Estimado (COP)</Form.Label>
              <Form.Control
                type="number"
                name="totalCost"
                value={formData.totalCost}
                onChange={handleInputChange}
                placeholder="0"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Crear Orden
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default WorkOrders;
