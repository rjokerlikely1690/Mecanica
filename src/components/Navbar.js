import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation = ({ onSectionChange, onShowSidebar, currentSection }) => {
  const handleNavClick = (section, e) => {
    e.preventDefault();
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  const getSectionName = (section) => {
    const sectionNames = {
      'dashboard': 'Dashboard',
      'services': 'Servicios',
      'inventory': 'Inventario',
      'appointments': 'Citas',
      'register': 'Registro',
      'contact': 'Contacto',
      'work-orders': 'Órdenes',
      'quotes': 'Cotizaciones',
      'vehicle-history': 'Historial',
      'service-types': 'Servicios',
      'vehicle-types': 'Vehículos',
      'brands': 'Marcas',
      'mechanics': 'Mecánicos',
      'income': 'Ingresos',
      'export-excel': 'Excel',
      'generate-quotes': 'Cotizaciones'
    };
    return sectionNames[section] || 'Sección';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Button 
          variant="outline-light" 
          className="sidebar-toggle-btn me-3"
          onClick={onShowSidebar}
        >
          <i className="fas fa-bars"></i>
        </Button>
        <Navbar.Brand 
          href="#home" 
          className="fw-bold d-flex align-items-center"
          onClick={(e) => handleNavClick('home', e)}
        >
          <i className="fas fa-tools me-2"></i>
          <span>Taller Mecánico AutoMax</span>
          {currentSection && currentSection !== 'home' && (
            <span className="badge bg-light text-dark ms-2" style={{ fontSize: '0.65rem' }}>
              {getSectionName(currentSection)}
            </span>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href="#home" 
              onClick={(e) => handleNavClick('home', e)}
              className={currentSection === 'home' ? 'active' : ''}
            >
              <i className="fas fa-home me-1"></i>
              Inicio
            </Nav.Link>
            <Nav.Link 
              href="#services" 
              onClick={(e) => handleNavClick('services', e)}
              className={currentSection === 'services' ? 'active' : ''}
            >
              <i className="fas fa-cogs me-1"></i>
              Servicios
            </Nav.Link>
            <Nav.Link 
              href="#inventory" 
              onClick={(e) => handleNavClick('inventory', e)}
              className={currentSection === 'inventory' ? 'active' : ''}
            >
              <i className="fas fa-boxes me-1"></i>
              Inventario
            </Nav.Link>
            <Nav.Link 
              href="#appointments" 
              onClick={(e) => handleNavClick('appointments', e)}
              className={currentSection === 'appointments' ? 'active' : ''}
            >
              <i className="fas fa-calendar-alt me-1"></i>
              Citas
            </Nav.Link>
            <Nav.Link 
              href="#contact" 
              onClick={(e) => handleNavClick('contact', e)}
              className={currentSection === 'contact' ? 'active' : ''}
            >
              <i className="fas fa-phone me-1"></i>
              Contacto
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link 
              href="#register" 
              onClick={(e) => handleNavClick('register', e)}
              className={currentSection === 'register' ? 'active' : ''}
            >
              <i className="fas fa-user-plus me-1"></i>
              Registro
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
