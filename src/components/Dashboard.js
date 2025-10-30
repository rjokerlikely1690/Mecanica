import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { exportAllDataToExcel } from '../utils/excelExport';

const Dashboard = ({ onSectionChange }) => {
  const stats = [
    {
      title: 'Órdenes Activas',
      value: '12',
      change: '+3 esta semana',
      icon: 'fas fa-clipboard-list',
      color: 'primary',
      trend: 'up'
    },
    {
      title: 'Ingresos del Mes',
      value: '$2,450,000',
      change: '+15% vs mes anterior',
      icon: 'fas fa-dollar-sign',
      color: 'success',
      trend: 'up'
    },
    {
      title: 'Clientes Atendidos',
      value: '89',
      change: '+12 esta semana',
      icon: 'fas fa-users',
      color: 'info',
      trend: 'up'
    },
    {
      title: 'Vehículos en Taller',
      value: '5',
      change: '3 completados hoy',
      icon: 'fas fa-car',
      color: 'warning',
      trend: 'neutral'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'Nueva orden creada', customer: 'Juan Pérez', time: 'Hace 5 min', status: 'success' },
    { id: 2, action: 'Cotización enviada', customer: 'María García', time: 'Hace 15 min', status: 'info' },
    { id: 3, action: 'Servicio completado', customer: 'Carlos López', time: 'Hace 30 min', status: 'success' },
    { id: 4, action: 'Cita programada', customer: 'Ana Martínez', time: 'Hace 1 hora', status: 'warning' },
    { id: 5, action: 'Pago recibido', customer: 'Roberto Silva', time: 'Hace 2 horas', status: 'success' }
  ];

  const upcomingAppointments = [
    { id: 1, customer: 'Pedro García', vehicle: 'Toyota Corolla', service: 'Cambio de aceite', time: '09:00 AM' },
    { id: 2, customer: 'Laura Rodríguez', vehicle: 'Honda Civic', service: 'Revisión técnica', time: '10:30 AM' },
    { id: 3, customer: 'Miguel Torres', vehicle: 'Nissan Sentra', service: 'Reparación de frenos', time: '02:00 PM' },
    { id: 4, customer: 'Carmen López', vehicle: 'Ford Focus', service: 'Mantenimiento general', time: '03:30 PM' }
  ];

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-1 text-gray-800">Dashboard</h1>
              <p className="text-muted mb-0">Resumen del taller mecánico AutoMax</p>
            </div>
            <div>
              <Button 
                variant="primary" 
                className="me-2"
                onClick={() => onSectionChange && onSectionChange('work-orders')}
              >
                <i className="fas fa-plus me-2"></i>
                Nueva Orden
              </Button>
              <Button 
                variant="success"
                onClick={exportAllDataToExcel}
                title="Exportar todos los datos del sistema a Excel"
              >
                <i className="fas fa-file-excel me-2"></i>
                Exportar Todo
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col lg={3} md={6} key={index} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center">
                  <div className={`bg-${stat.color} bg-opacity-10 rounded-circle p-3 me-3`}>
                    <i className={`${stat.icon} text-${stat.color} fs-4`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="text-muted mb-1">{stat.title}</h6>
                    <h3 className="mb-1 fw-bold text-gray-800">{stat.value}</h3>
                    <small className={`text-${stat.trend === 'up' ? 'success' : stat.trend === 'down' ? 'danger' : 'muted'}`}>
                      {stat.change}
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Recent Activities */}
        <Col lg={8} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-gray-800">
                  <i className="fas fa-history me-2 text-primary"></i>
                  Actividad Reciente
                </h5>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => onSectionChange && onSectionChange('work-orders')}
                >
                  <i className="fas fa-eye me-1"></i>
                  Ver todo
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="list-group-item border-0 px-4 py-3">
                    <div className="d-flex align-items-center">
                      <div className={`bg-${activity.status} bg-opacity-10 rounded-circle p-2 me-3`}>
                        <i className={`fas fa-circle text-${activity.status}`} style={{ fontSize: '8px' }}></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 text-gray-800">{activity.action}</h6>
                        <p className="mb-0 text-muted small">{activity.customer}</p>
                      </div>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming Appointments */}
        <Col lg={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-gray-800">
                  <i className="fas fa-calendar-alt me-2 text-primary"></i>
                  Próximas Citas
                </h5>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => onSectionChange && onSectionChange('appointments')}
                >
                  <i className="fas fa-calendar-check me-1"></i>
                  Ver todo
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="list-group-item border-0 px-4 py-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                        <i className="fas fa-clock text-primary"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 text-gray-800">{appointment.customer}</h6>
                        <p className="mb-1 text-muted small">{appointment.vehicle}</p>
                        <p className="mb-0 text-muted small">{appointment.service}</p>
                      </div>
                      <div className="text-end">
                        <strong className="text-primary">{appointment.time}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mt-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0 text-gray-800">
                <i className="fas fa-bolt me-2 text-warning"></i>
                Acciones Rápidas
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                <Col md={3} className="mb-3">
                  <Button 
                    variant="outline-primary" 
                    className="w-100 h-100 p-3 d-flex flex-column align-items-center"
                    onClick={() => onSectionChange && onSectionChange('work-orders')}
                  >
                    <i className="fas fa-plus-circle mb-2 fs-3"></i>
                    <span>Nueva Orden</span>
                  </Button>
                </Col>
                <Col md={3} className="mb-3">
                  <Button 
                    variant="outline-success" 
                    className="w-100 h-100 p-3 d-flex flex-column align-items-center"
                    onClick={() => onSectionChange && onSectionChange('quotes')}
                  >
                    <i className="fas fa-file-invoice-dollar mb-2 fs-3"></i>
                    <span>Crear Cotización</span>
                  </Button>
                </Col>
                <Col md={3} className="mb-3">
                  <Button 
                    variant="outline-info" 
                    className="w-100 h-100 p-3 d-flex flex-column align-items-center"
                    onClick={() => onSectionChange && onSectionChange('appointments')}
                  >
                    <i className="fas fa-calendar-plus mb-2 fs-3"></i>
                    <span>Programar Cita</span>
                  </Button>
                </Col>
                <Col md={3} className="mb-3">
                  <Button 
                    variant="outline-warning" 
                    className="w-100 h-100 p-3 d-flex flex-column align-items-center"
                    onClick={() => onSectionChange && onSectionChange('income')}
                  >
                    <i className="fas fa-chart-bar mb-2 fs-3"></i>
                    <span>Ver Reportes</span>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

