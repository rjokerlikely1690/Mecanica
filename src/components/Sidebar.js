import React from 'react';
import { Offcanvas, Nav, Button, Form, InputGroup } from 'react-bootstrap';

const Sidebar = ({ show, onHide, onSectionChange, currentSection }) => {

  const handleSectionClick = (section) => {
    onSectionChange(section);
  };

  const menuSections = [
    {
      title: "ATENCIÓN DE CLIENTES",
      color: "success",
      items: [
        { id: 'work-orders', label: 'Órdenes de trabajo', icon: 'fas fa-clipboard-list' },
        { id: 'quotes', label: 'Cotizaciones', icon: 'fas fa-file-invoice-dollar' },
        { id: 'vehicle-history', label: 'Historial de Vehículos', icon: 'fas fa-car' }
      ]
    },
    {
      title: "CATÁLOGOS",
      color: "warning",
      items: [
        { id: 'service-types', label: 'Tipos de Servicio', icon: 'fas fa-tools' },
        { id: 'vehicle-types', label: 'Tipos de vehículos', icon: 'fas fa-car-side' },
        { id: 'brands', label: 'Marcas', icon: 'fas fa-tags' },
        { id: 'mechanics', label: 'Mecánicos', icon: 'fas fa-user-tie' }
      ]
    },
    {
      title: "REPORTES",
      color: "danger",
      items: [
        { id: 'income', label: 'Ingresos', icon: 'fas fa-money-bill-wave' },
        { id: 'export-excel', label: 'Exportar a Excel', icon: 'fas fa-file-export' }
      ]
    }
  ];

  return (
    <Offcanvas show={show} onHide={onHide} placement="start" style={{ width: '350px' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className="d-flex align-items-center">
            <div className="me-3">
              <div className="bg-white rounded-circle p-2" style={{ width: '40px', height: '40px' }}>
                <i className="fas fa-tools text-primary"></i>
              </div>
            </div>
            <div>
              <div className="fw-bold text-white">AutoMax</div>
              <small className="text-white-50">Sistema de Gestión</small>
            </div>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body className="p-0">
        {/* Quick Actions */}
        <div className="p-4">
          <div className="d-flex flex-column gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              className="sidebar-action-btn"
              onClick={() => handleSectionClick('subscriptions')}
            >
              <i className="fas fa-play me-2"></i>
              Suscripciones
            </Button>
            <Button 
              variant="outline-info" 
              size="sm"
              className="sidebar-action-btn"
              onClick={() => handleSectionClick('dashboard')}
            >
              <i className="fas fa-chart-line me-2"></i>
              Dashboard
            </Button>
          </div>
        </div>

        {/* Generate Quotes Banner */}
        <div className="px-4 pb-3">
          <Button 
            variant="primary" 
            className="w-100"
            onClick={() => handleSectionClick('generate-quotes')}
            style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }}
          >
            <i className="fas fa-file-invoice-dollar me-2"></i>
            GENERAR COTIZACIONES
          </Button>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="sidebar-section">
            <div className="sidebar-section-header">
              {section.title}
            </div>
            <Nav className="sidebar-nav">
              {section.items.map((item) => (
                <Nav.Link
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`sidebar-nav-link ${
                    currentSection === item.id ? 'active' : ''
                  }`}
                >
                  <i className={`nav-icon ${item.icon}`}></i>
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </div>
        ))}

        {/* Search Section */}
        <div className="sidebar-search">
          <InputGroup size="sm">
            <Form.Control 
              placeholder='Buscar "software para taller mecanico"' 
              className="border-end-0"
            />
            <Button variant="outline-secondary" className="border-start-0">
              <i className="fas fa-search"></i>
            </Button>
          </InputGroup>
        </div>

        {/* Footer Section */}
        <div className="sidebar-footer">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div className="bg-primary rounded-circle p-2 me-2" style={{ width: '24px', height: '24px' }}>
              <i className="fas fa-cog text-white" style={{ fontSize: '10px' }}></i>
            </div>
            <span className="fw-bold text-gray-700">@SistemasWebyMas</span>
          </div>
          <Button variant="outline-primary" size="sm" className="mb-3">
            <i className="fas fa-bell me-1"></i>
            Suscribirse
          </Button>
          <div className="small text-muted">
            Sistema para Taller Mecánico #tallermecánico
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
