import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import Notification from './Notification';

const Home = ({ onSectionChange, onAddToCart }) => {
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    variant: 'success'
  });
  const features = [
    {
      icon: "🔧",
      title: "Servicio Profesional",
      description: "Mecánicos certificados con más de 10 años de experiencia"
    },
    {
      icon: "⚡",
      title: "Diagnóstico Rápido",
      description: "Tecnología moderna para diagnósticos precisos y rápidos"
    },
    {
      icon: "🛡️",
      title: "Garantía Total",
      description: "Garantía en todos nuestros servicios y repuestos"
    },
    {
      icon: "💰",
      title: "Precios Justos",
      description: "Los mejores precios del mercado con calidad garantizada"
    }
  ];

  const stats = [
    { number: "500+", label: "Clientes Satisfechos" },
    { number: "15+", label: "Años de Experiencia" },
    { number: "24/7", label: "Servicio de Emergencia" },
    { number: "100%", label: "Garantía en Repuestos" }
  ];

  // Función para mostrar notificaciones
  const showNotification = (message, variant = 'success') => {
    setNotification({
      show: true,
      message,
      variant
    });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Funciones para manejar los botones
  const handleViewServices = () => {
    showNotification('Redirigiendo a nuestros servicios...', 'info');
    setTimeout(() => {
      onSectionChange('services');
    }, 500);
  };

  const handleContact = () => {
    showNotification('Redirigiendo a información de contacto...', 'info');
    setTimeout(() => {
      onSectionChange('contact');
    }, 500);
  };

  const handleCallNow = () => {
    showNotification('Iniciando llamada al taller...', 'success');
    setTimeout(() => {
      window.open('tel:+573001234567', '_self');
    }, 1000);
  };

  const handleScheduleAppointment = () => {
    showNotification('Redirigiendo al sistema de citas...', 'info');
    setTimeout(() => {
      onSectionChange('appointments');
    }, 500);
  };

  const handleServiceClick = (serviceType) => {
    showNotification('Redirigiendo a información del servicio...', 'info');
    setTimeout(() => {
      onSectionChange('services');
    }, 500);
  };

  const handleMoreInfo = (serviceName) => {
    showNotification(`Mostrando más información sobre ${serviceName}...`, 'info');
    setTimeout(() => {
      onSectionChange('services');
    }, 500);
  };

  const handleQuickAddToCart = (serviceName, serviceType) => {
    // Crear un objeto de servicio básico para agregar al carrito
    const serviceMap = {
      'oil-change': {
        id: 1,
        title: "Cambio de Aceite",
        price: 25000,
        duration: "30 min",
        icon: "fas fa-oil-can"
      },
      'inspection': {
        id: 2,
        title: "Revisión Técnica",
        price: 45000,
        duration: "1 hora",
        icon: "fas fa-search"
      },
      'brakes': {
        id: 3,
        title: "Sistema de Frenos",
        price: 80000,
        duration: "2 horas",
        icon: "fas fa-hand-paper"
      }
    };

    const service = serviceMap[serviceType];
    if (service && onAddToCart) {
      onAddToCart({
        ...service,
        type: 'servicio'
      });
      showNotification(`✅ ${serviceName} agregado al carrito`, 'success');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                🔧 Taller Mecánico AutoMax
              </h1>
              <p className="lead mb-4">
                Tu taller de confianza para el mantenimiento y reparación de tu vehículo. 
                Servicio profesional con garantía total y los mejores precios del mercado.
              </p>
              <div className="d-flex gap-3">
                <Button variant="light" size="lg" onClick={handleViewServices}>
                  Ver Servicios
                </Button>
                <Button variant="outline-light" size="lg" onClick={handleContact}>
                  Contactar
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="hero-image">
                <span style={{ fontSize: '15rem', opacity: 0.3 }}>🚗</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <Col md={3} key={index} className="text-center mb-4">
                <div className="stat-item">
                  <h2 className="display-6 fw-bold text-primary">{stat.number}</h2>
                  <p className="text-muted">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center mb-5 text-primary">¿Por qué elegir AutoMax?</h2>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body>
                    <div className="feature-icon mb-3">
                      <span style={{ fontSize: '3rem' }}>{feature.icon}</span>
                    </div>
                    <Card.Title className="text-primary">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Services Preview */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center mb-5 text-primary">Servicios Destacados</h2>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 service-card" style={{ cursor: 'pointer' }} onClick={() => handleServiceClick('oil-change')}>
                <Card.Body className="text-center">
                  <i className="fas fa-oil-can text-primary" style={{ fontSize: '3rem' }}></i>
                  <Card.Title className="mt-3">Cambio de Aceite</Card.Title>
                  <Card.Text>
                    Mantén tu motor en perfecto estado con nuestro servicio de cambio de aceite.
                  </Card.Text>
                  <Badge bg="success">Desde $25.000</Badge>
                  <div className="mt-3 d-grid gap-2">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoreInfo('Cambio de Aceite');
                      }}
                    >
                      Más Información
                    </Button>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAddToCart('Cambio de Aceite', 'oil-change');
                      }}
                    >
                      <i className="fas fa-shopping-cart me-1"></i>
                        Agregar al Carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 service-card" style={{ cursor: 'pointer' }} onClick={() => handleServiceClick('inspection')}>
                <Card.Body className="text-center">
                  <i className="fas fa-search text-primary" style={{ fontSize: '3rem' }}></i>
                  <Card.Title className="mt-3">Revisión Técnica</Card.Title>
                  <Card.Text>
                    Diagnóstico completo de tu vehículo para detectar problemas a tiempo.
                  </Card.Text>
                  <Badge bg="success">$45.000</Badge>
                  <div className="mt-3 d-grid gap-2">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoreInfo('Revisión Técnica');
                      }}
                    >
                      Más Información
                    </Button>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAddToCart('Revisión Técnica', 'inspection');
                      }}
                    >
                      <i className="fas fa-shopping-cart me-1"></i>
                        Agregar al Carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 service-card" style={{ cursor: 'pointer' }} onClick={() => handleServiceClick('brakes')}>
                <Card.Body className="text-center">
                  <i className="fas fa-hand-paper text-primary" style={{ fontSize: '3rem' }}></i>
                  <Card.Title className="mt-3">Sistema de Frenos</Card.Title>
                  <Card.Text>
                    Reparación y mantenimiento del sistema de frenos para tu seguridad.
                  </Card.Text>
                  <Badge bg="success">Desde $80.000</Badge>
                  <div className="mt-3 d-grid gap-2">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoreInfo('Sistema de Frenos');
                      }}
                    >
                      Más Información
                    </Button>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAddToCart('Sistema de Frenos', 'brakes');
                      }}
                    >
                      <i className="fas fa-shopping-cart me-1"></i>
                        Agregar al Carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="mb-4">¿Necesitas servicio para tu vehículo?</h2>
              <p className="lead mb-4">
                Contáctanos ahora y programa tu cita. Estamos aquí para ayudarte.
              </p>
              <Button variant="light" size="lg" className="me-3" onClick={handleCallNow}>
                <i className="fas fa-phone me-2"></i>
                Llamar Ahora
              </Button>
              <Button variant="outline-light" size="lg" onClick={handleScheduleAppointment}>
                <i className="fas fa-calendar-alt me-2"></i>
                Programar Cita
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Notification Component */}
      <Notification
        show={notification.show}
        message={notification.message}
        variant={notification.variant}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default Home;
