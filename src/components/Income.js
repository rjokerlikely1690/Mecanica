import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Alert, Badge } from 'react-bootstrap';

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    serviceType: '',
    mechanic: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  // Datos de ejemplo
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        date: '2024-01-15',
        customerName: 'Juan Pérez',
        vehicle: 'Toyota Corolla 2020',
        serviceType: 'Mantenimiento Preventivo',
        mechanic: 'Carlos Rodríguez',
        laborCost: 150000,
        partsCost: 85000,
        totalCost: 235000,
        status: 'Completado'
      },
      {
        id: 2,
        date: '2024-01-14',
        customerName: 'María García',
        vehicle: 'Chevrolet Spark 2019',
        serviceType: 'Reparación de Frenos',
        mechanic: 'Luis Martínez',
        laborCost: 200000,
        partsCost: 120000,
        totalCost: 320000,
        status: 'Completado'
      },
      {
        id: 3,
        date: '2024-01-13',
        customerName: 'Pedro López',
        vehicle: 'Honda Civic 2021',
        serviceType: 'Sistema Eléctrico',
        mechanic: 'María González',
        laborCost: 180000,
        partsCost: 95000,
        totalCost: 275000,
        status: 'Completado'
      },
      {
        id: 4,
        date: '2024-01-12',
        customerName: 'Ana Herrera',
        vehicle: 'BMW X3 2020',
        serviceType: 'Aire Acondicionado',
        mechanic: 'Ana Herrera',
        laborCost: 120000,
        partsCost: 150000,
        totalCost: 270000,
        status: 'Completado'
      },
      {
        id: 5,
        date: '2024-01-11',
        customerName: 'Carlos Silva',
        vehicle: 'Ford Ranger 2018',
        serviceType: 'Reparación de Motor',
        mechanic: 'Carlos Rodríguez',
        laborCost: 300000,
        partsCost: 250000,
        totalCost: 550000,
        status: 'Completado'
      }
    ];
    setIncomeData(mockData);
    setFilteredData(mockData);
  }, []);

  const serviceTypes = ['Mantenimiento Preventivo', 'Reparación de Motor', 'Sistema de Frenos', 'Sistema Eléctrico', 'Aire Acondicionado'];
  const mechanics = ['Carlos Rodríguez', 'María González', 'Luis Martínez', 'Ana Herrera', 'Pedro Silva'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let filtered = [...incomeData];

    if (filters.dateFrom) {
      filtered = filtered.filter(item => item.date >= filters.dateFrom);
    }

    if (filters.dateTo) {
      filtered = filtered.filter(item => item.date <= filters.dateTo);
    }

    if (filters.serviceType) {
      filtered = filtered.filter(item => item.serviceType === filters.serviceType);
    }

    if (filters.mechanic) {
      filtered = filtered.filter(item => item.mechanic === filters.mechanic);
    }

    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      serviceType: '',
      mechanic: ''
    });
    setFilteredData(incomeData);
  };

  const exportToExcel = () => {
    // Simulación de exportación
    setAlert({ show: true, message: 'Datos exportados a Excel exitosamente', variant: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CO');
  };

  // Calcular totales
  const totalIncome = filteredData.reduce((sum, item) => sum + item.totalCost, 0);
  const totalLabor = filteredData.reduce((sum, item) => sum + item.laborCost, 0);
  const totalParts = filteredData.reduce((sum, item) => sum + item.partsCost, 0);
  const completedServices = filteredData.filter(item => item.status === 'Completado').length;

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
                <i className="fas fa-money-bill-wave text-primary me-2"></i>
                Reportes de Ingresos
              </h2>
              <p className="text-muted mb-0">Análisis de ingresos y rentabilidad del taller</p>
            </div>
            <Button 
              variant="success" 
              onClick={exportToExcel}
              className="d-flex align-items-center"
            >
              <i className="fas fa-file-excel me-2"></i>
              Exportar Excel
            </Button>
          </div>
        </Col>
      </Row>

      {/* Resumen de Ingresos */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-dollar-sign text-success mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1 text-success">{formatPrice(totalIncome)}</h4>
              <p className="text-muted mb-0">Ingresos Totales</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-tools text-info mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1 text-info">{formatPrice(totalLabor)}</h4>
              <p className="text-muted mb-0">Mano de Obra</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-cogs text-warning mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1 text-warning">{formatPrice(totalParts)}</h4>
              <p className="text-muted mb-0">Repuestos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-check-circle text-primary mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1 text-primary">{completedServices}</h4>
              <p className="text-muted mb-0">Servicios Completados</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filtros */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-light">
              <h5 className="mb-0">
                <i className="fas fa-filter me-2"></i>
                Filtros de Búsqueda
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha Desde</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateFrom"
                      value={filters.dateFrom}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha Hasta</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateTo"
                      value={filters.dateTo}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de Servicio</Form.Label>
                    <Form.Select
                      name="serviceType"
                      value={filters.serviceType}
                      onChange={handleFilterChange}
                    >
                      <option value="">Todos los servicios</option>
                      {serviceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mecánico</Form.Label>
                    <Form.Select
                      name="mechanic"
                      value={filters.mechanic}
                      onChange={handleFilterChange}
                    >
                      <option value="">Todos los mecánicos</option>
                      {mechanics.map(mechanic => (
                        <option key={mechanic} value={mechanic}>{mechanic}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="d-flex gap-2">
                    <Button variant="primary" onClick={applyFilters}>
                      <i className="fas fa-search me-2"></i>
                      Aplicar Filtros
                    </Button>
                    <Button variant="outline-secondary" onClick={clearFilters}>
                      <i className="fas fa-times me-2"></i>
                      Limpiar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabla de Ingresos */}
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-table me-2"></i>
                Detalle de Ingresos ({filteredData.length} registros)
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Vehículo</th>
                      <th>Servicio</th>
                      <th>Mecánico</th>
                      <th>Mano de Obra</th>
                      <th>Repuestos</th>
                      <th>Total</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <i className="fas fa-calendar text-muted me-1"></i>
                          {formatDate(item.date)}
                        </td>
                        <td>
                          <strong>{item.customerName}</strong>
                        </td>
                        <td>
                          <small className="text-muted">{item.vehicle}</small>
                        </td>
                        <td>
                          <Badge bg="info">{item.serviceType}</Badge>
                        </td>
                        <td>
                          <i className="fas fa-user-tie text-muted me-1"></i>
                          {item.mechanic}
                        </td>
                        <td>
                          <span className="text-info fw-bold">{formatPrice(item.laborCost)}</span>
                        </td>
                        <td>
                          <span className="text-warning fw-bold">{formatPrice(item.partsCost)}</span>
                        </td>
                        <td>
                          <strong className="text-success">{formatPrice(item.totalCost)}</strong>
                        </td>
                        <td>
                          <Badge bg="success">{item.status}</Badge>
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

      {/* Resumen al final */}
      {filteredData.length > 0 && (
        <Row className="mt-4">
          <Col>
            <Card className="border-success">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                  <i className="fas fa-chart-line me-2"></i>
                  Resumen de Período
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <div className="text-center">
                      <h6 className="text-muted">Promedio por Servicio</h6>
                      <h4 className="text-primary">{formatPrice(totalIncome / filteredData.length)}</h4>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <h6 className="text-muted">Margen de Mano de Obra</h6>
                      <h4 className="text-info">{((totalLabor / totalIncome) * 100).toFixed(1)}%</h4>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <h6 className="text-muted">Margen de Repuestos</h6>
                      <h4 className="text-warning">{((totalParts / totalIncome) * 100).toFixed(1)}%</h4>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Income;





