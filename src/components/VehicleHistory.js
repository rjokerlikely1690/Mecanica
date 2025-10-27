import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form, InputGroup } from 'react-bootstrap';

const VehicleHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plate: 'ABC-123',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      owner: 'Juan Pérez',
      phone: '3001234567',
      lastService: '2024-01-10',
      totalServices: 5,
      totalSpent: 450000,
      nextService: '2024-04-10',
      services: [
        { date: '2024-01-10', service: 'Cambio de aceite', cost: 25000, mechanic: 'Carlos López' },
        { date: '2023-12-15', service: 'Revisión técnica', cost: 45000, mechanic: 'Ana Martínez' },
        { date: '2023-11-20', service: 'Cambio de filtros', cost: 35000, mechanic: 'Luis Rodríguez' },
        { date: '2023-10-10', service: 'Mantenimiento general', cost: 120000, mechanic: 'Carlos López' },
        { date: '2023-09-05', service: 'Revisión de frenos', cost: 80000, mechanic: 'Pedro García' }
      ]
    },
    {
      id: 2,
      plate: 'DEF-456',
      brand: 'Honda',
      model: 'Civic',
      year: 2019,
      owner: 'María García',
      phone: '3109876543',
      lastService: '2024-01-08',
      totalServices: 3,
      totalSpent: 180000,
      nextService: '2024-03-08',
      services: [
        { date: '2024-01-08', service: 'Reparación de frenos', cost: 80000, mechanic: 'Ana Martínez' },
        { date: '2023-11-15', service: 'Cambio de aceite', cost: 25000, mechanic: 'Carlos López' },
        { date: '2023-09-10', service: 'Revisión técnica', cost: 45000, mechanic: 'Luis Rodríguez' }
      ]
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewHistory = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowHistoryModal(true);
  };

  const getServiceStatus = (lastService) => {
    const lastServiceDate = new Date(lastService);
    const today = new Date();
    const daysSinceService = Math.floor((today - lastServiceDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceService < 30) return { status: 'Reciente', variant: 'success' };
    if (daysSinceService < 60) return { status: 'Regular', variant: 'warning' };
    return { status: 'Necesita Servicio', variant: 'danger' };
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-primary mb-1">🚗 Historial de Vehículos</h2>
              <p className="text-muted">Consulta el historial completo de servicios por vehículo</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Barra de búsqueda */}
      <Row className="mb-4">
        <Col>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Buscar por placa, propietario, marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-primary">{vehicles.length}</h4>
              <small>Vehículos Registrados</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-success">
                {vehicles.reduce((sum, v) => sum + v.totalServices, 0)}
              </h4>
              <small>Servicios Realizados</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-info">
                ${vehicles.reduce((sum, v) => sum + v.totalSpent, 0).toLocaleString('es-CO')}
              </h4>
              <small>Ingresos Totales</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-warning">
                {vehicles.filter(v => {
                  const status = getServiceStatus(v.lastService);
                  return status.variant === 'danger';
                }).length}
              </h4>
              <small>Necesitan Servicio</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Registro de Vehículos</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Vehículo</th>
                    <th>Propietario</th>
                    <th>Último Servicio</th>
                    <th>Total Servicios</th>
                    <th>Total Gastado</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((vehicle) => {
                    const serviceStatus = getServiceStatus(vehicle.lastService);
                    return (
                      <tr key={vehicle.id}>
                        <td><strong>{vehicle.plate}</strong></td>
                        <td>{vehicle.brand} {vehicle.model} {vehicle.year}</td>
                        <td>
                          <div>
                            <strong>{vehicle.owner}</strong>
                            <br />
                            <small className="text-muted">{vehicle.phone}</small>
                          </div>
                        </td>
                        <td>{vehicle.lastService}</td>
                        <td>{vehicle.totalServices}</td>
                        <td><strong>${vehicle.totalSpent.toLocaleString('es-CO')}</strong></td>
                        <td>
                          <Badge bg={serviceStatus.variant}>
                            {serviceStatus.status}
                          </Badge>
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => viewHistory(vehicle)}
                          >
                            📋 Ver Historial
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de historial */}
      <Modal show={showHistoryModal} onHide={() => setShowHistoryModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            📋 Historial de Servicios - {selectedVehicle?.plate}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVehicle && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Vehículo:</strong> {selectedVehicle.brand} {selectedVehicle.model} {selectedVehicle.year}
                </Col>
                <Col md={6}>
                  <strong>Propietario:</strong> {selectedVehicle.owner}
                </Col>
              </Row>
              
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Servicio</th>
                    <th>Costo</th>
                    <th>Mecánico</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedVehicle.services.map((service, index) => (
                    <tr key={index}>
                      <td>{service.date}</td>
                      <td>{service.service}</td>
                      <td>${service.cost.toLocaleString('es-CO')}</td>
                      <td>{service.mechanic}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              <div className="mt-3 p-3 bg-light rounded">
                <Row>
                  <Col md={4}>
                    <strong>Total Servicios:</strong> {selectedVehicle.totalServices}
                  </Col>
                  <Col md={4}>
                    <strong>Total Gastado:</strong> ${selectedVehicle.totalSpent.toLocaleString('es-CO')}
                  </Col>
                  <Col md={4}>
                    <strong>Próximo Servicio:</strong> {selectedVehicle.nextService}
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHistoryModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default VehicleHistory;

