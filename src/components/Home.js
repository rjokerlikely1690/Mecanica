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
      icon: "fas fa-tools",
      title: "Servicio Profesional",
      description: "Mecánicos certificados con más de 10 años de experiencia",
      color: "primary",
      bgColor: "rgba(13, 110, 253, 0.1)"
    },
    {
      icon: "fas fa-bolt",
      title: "Diagnóstico Rápido",
      description: "Tecnología moderna para diagnósticos precisos y rápidos",
      color: "warning",
      bgColor: "rgba(255, 193, 7, 0.1)"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Garantía Total",
      description: "Garantía en todos nuestros servicios y repuestos",
      color: "success",
      bgColor: "rgba(25, 135, 84, 0.1)"
    },
    {
      icon: "fas fa-dollar-sign",
      title: "Precios Justos",
      description: "Los mejores precios del mercado con calidad garantizada",
      color: "info",
      bgColor: "rgba(13, 202, 240, 0.1)"
    }
  ];

  const stats = [
    { icon: "fas fa-users", number: "500+", label: "Clientes Satisfechos", color: "primary" },
    { icon: "fas fa-award", number: "15+", label: "Años de Experiencia", color: "success" },
    { icon: "fas fa-clock", number: "24/7", label: "Servicio de Emergencia", color: "danger" },
    { icon: "fas fa-certificate", number: "100%", label: "Garantía en Repuestos", color: "warning" }
  ];

  const services = [
    {
      id: 'oil-change',
      icon: "fas fa-droplet",
      title: "Cambio de Aceite",
      description: "Mantén tu motor en perfecto estado con nuestro servicio de cambio de aceite premium.",
      price: "$25.000",
      duration: "30 min",
      color: "primary",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 'inspection',
      icon: "fas fa-magnifying-glass",
      title: "Revisión Técnica",
      description: "Diagnóstico completo de tu vehículo para detectar problemas a tiempo.",
      price: "$45.000",
      duration: "1 hora",
      color: "success",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 'brakes',
      icon: "fas fa-circle-stop",
      title: "Sistema de Frenos",
      description: "Reparación y mantenimiento del sistema de frenos para tu seguridad total.",
      price: "$80.000",
      duration: "2 horas",
      color: "danger",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80"
    }
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
      window.open('tel:+56422234567', '_self');
    }, 1000);
  };

  const handleScheduleAppointment = () => {
    showNotification('Redirigiendo al sistema de citas...', 'info');
    setTimeout(() => {
      onSectionChange('appointments');
    }, 500);
  };

  const handleServiceClick = (serviceId) => {
    showNotification('Redirigiendo a información del servicio...', 'info');
    setTimeout(() => {
      onSectionChange('services');
    }, 500);
  };

  const handleQuickAddToCart = (serviceName, serviceId) => {
    const serviceMap = {
      'oil-change': {
        id: 1,
        title: "Cambio de Aceite",
        price: 25000,
        duration: "30 min",
        icon: "fas fa-droplet"
      },
      'inspection': {
        id: 2,
        title: "Revisión Técnica",
        price: 45000,
        duration: "1 hora",
        icon: "fas fa-magnifying-glass"
      },
      'brakes': {
        id: 3,
        title: "Sistema de Frenos",
        price: 80000,
        duration: "2 horas",
        icon: "fas fa-circle-stop"
      }
    };

    const service = serviceMap[serviceId];
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
      {/* Hero Section with Gradient */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '100px 0',
        marginBottom: '50px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
        }}></div>

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
              <div className="animate__animated animate__fadeInLeft">
                <Badge bg="light" text="dark" className="mb-3 px-3 py-2">
                  <i className="fas fa-star text-warning me-2"></i>
                  Taller Certificado
                </Badge>
                <h1 className="display-3 fw-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                  <i className="fas fa-wrench me-3"></i>
                  Taller Mecánico AutoMax
                </h1>
                <p className="lead mb-4" style={{ fontSize: '1.3rem', lineHeight: '1.8' }}>
                  Tu taller de confianza para el mantenimiento y reparación de tu vehículo. 
                  <strong> Servicio profesional</strong> con garantía total y los mejores precios del mercado.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                  <Button 
                    variant="light" 
                    size="lg" 
                    onClick={handleViewServices}
                    className="px-4 py-3 fw-bold"
                    style={{ 
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <i className="fas fa-tools me-2"></i>
                    Ver Servicios
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="lg" 
                    onClick={handleContact}
                    className="px-4 py-3 fw-bold"
                    style={{ 
                      borderWidth: '2px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <i className="fas fa-phone me-2"></i>
                    Contactar
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="animate__animated animate__fadeInRight" style={{
                animation: 'float 3s ease-in-out infinite'
              }}>
                <i className="fas fa-car-side" style={{ 
                  fontSize: '20rem',
                  opacity: 0.9,
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                }}></i>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section with Icons */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col md={6} lg={3} key={index}>
                <Card 
                  className="h-100 border-0 shadow-sm text-center"
                  style={{
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}
                >
                  <Card.Body className="py-4">
                    <div 
                      className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                      style={{
                        width: '80px',
                        height: '80px',
                        background: `var(--bs-${stat.color})`,
                        boxShadow: `0 4px 15px rgba(var(--bs-${stat.color}-rgb), 0.3)`
                      }}
                    >
                      <i className={`${stat.icon} text-white`} style={{ fontSize: '2rem' }}></i>
                    </div>
                    <h2 className={`display-5 fw-bold text-${stat.color} mb-2`}>{stat.number}</h2>
                    <p className="text-muted mb-0">{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold mb-3">
                <i className="fas fa-star text-warning me-3"></i>
                ¿Por qué elegir AutoMax?
              </h2>
              <p className="lead text-muted">Experiencia, calidad y confianza en cada servicio</p>
            </Col>
          </Row>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index}>
                <Card 
                  className="h-100 border-0 shadow-sm text-center"
                  style={{
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}
                >
                  <Card.Body className="p-4">
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: '100px',
                        height: '100px',
                        background: feature.bgColor,
                        border: `3px solid var(--bs-${feature.color})`
                      }}
                    >
                      <i className={`${feature.icon} text-${feature.color}`} style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h5 className={`fw-bold text-${feature.color} mb-3`}>{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Services Preview with Gradients */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold mb-3">
                <i className="fas fa-cogs text-primary me-3"></i>
                Servicios Destacados
              </h2>
              <p className="lead text-muted">Los servicios más solicitados por nuestros clientes</p>
            </Col>
          </Row>
          <Row className="g-4">
            {services.map((service, index) => (
              <Col md={4} key={index}>
                <Card 
                  className="h-100 border-0 shadow-lg"
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-15px) rotate(2deg)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                  }}
                  onClick={() => handleServiceClick(service.id)}
                >
                  {/* Image Header */}
                  <div 
                    className="position-relative"
                    style={{
                      height: '250px',
                      overflow: 'hidden',
                      background: service.gradient
                    }}
                  >
                    <img 
                      src={service.image}
                      alt={service.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))`
                      }}
                    ></div>
                    {/* Icon Badge */}
                    <div 
                      className="position-absolute top-50 start-50 translate-middle"
                    >
                      <div 
                        className="rounded-circle bg-white d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: '80px',
                          height: '80px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}
                      >
                        <i className={`${service.icon} text-${service.color}`} style={{ fontSize: '2.5rem' }}></i>
                      </div>
                    </div>
                  </div>

                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Badge bg={service.color} className="px-3 py-2" style={{ fontSize: '1rem' }}>
                        {service.price}
                      </Badge>
                      <small className="text-muted">
                        <i className="fas fa-clock me-1"></i>
                        {service.duration}
                      </small>
                    </div>

                    <h5 className="fw-bold mb-3">{service.title}</h5>
                    <p className="text-muted mb-4">{service.description}</p>

                    <div className="d-grid gap-2">
                      <Button 
                        variant={service.color}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service.id);
                        }}
                      >
                        <i className="fas fa-info-circle me-2"></i>
                        Más Información
                      </Button>
                      <Button 
                        variant="outline-success"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickAddToCart(service.title, service.id);
                        }}
                      >
                        <i className="fas fa-cart-plus me-2"></i>
                        Agregar al Carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section 
        className="py-5 text-white position-relative"
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          overflow: 'hidden'
        }}
      >
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
        }}></div>

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="text-center">
            <Col>
              <i className="fas fa-tools mb-4" style={{ fontSize: '4rem' }}></i>
              <h2 className="display-5 fw-bold mb-4">¿Necesitas servicio para tu vehículo?</h2>
              <p className="lead mb-5" style={{ fontSize: '1.3rem' }}>
                Contáctanos ahora y programa tu cita. Estamos aquí para ayudarte las 24 horas.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button 
                  variant="light" 
                  size="lg" 
                  onClick={handleCallNow}
                  className="px-5 py-3 fw-bold"
                  style={{
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  <i className="fas fa-phone-alt me-2"></i>
                  Llamar Ahora
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  onClick={handleScheduleAppointment}
                  className="px-5 py-3 fw-bold"
                  style={{
                    borderWidth: '2px'
                  }}
                >
                  <i className="fas fa-calendar-check me-2"></i>
                  Programar Cita
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Notification Component */}
      <Notification
        show={notification.show}
        message={notification.message}
        variant={notification.variant}
      />

      {/* Add floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
