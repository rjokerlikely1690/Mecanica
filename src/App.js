import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

// Import components
import Navigation from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Services from './components/Services';
import Inventory from './components/Inventory';
import Appointments from './components/Appointments';
import CustomerRegistration from './components/CustomerRegistration';
import Contact from './components/Contact';
import ShoppingCart from './components/ShoppingCart';
import WorkOrders from './components/WorkOrders';
import Quotes from './components/Quotes';
import VehicleHistory from './components/VehicleHistory';
import Dashboard from './components/Dashboard';
import FloatingCart from './components/FloatingCart';
import Checkout from './components/Checkout';
import ServiceTypes from './components/ServiceTypes';
import VehicleTypes from './components/VehicleTypes';
import Brands from './components/Brands';
import Mechanics from './components/Mechanics';
import Income from './components/Income';
import ExportExcel from './components/ExportExcel';

function App() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [cartItems, setCartItems] = useState(() => {
    // Cargar carrito desde localStorage al inicializar
    const savedCart = localStorage.getItem('automax-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showSidebar, setShowSidebar] = useState(false);

  // Funciones para manejar el carrito
  const handleAddToCart = (service) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === service.id && item.type === service.type);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === service.id && item.type === service.type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...service, quantity: 1 }];
      }
      
      // Guardar en localStorage
      localStorage.setItem('automax-cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter((_, i) => i !== index);
      localStorage.setItem('automax-cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('automax-cart');
  };

  const handleCheckout = () => {
    // Navegar a la página de checkout
    setCurrentSection('checkout');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home onSectionChange={setCurrentSection} onAddToCart={handleAddToCart} />;
      case 'services':
        return (
          <Row>
            <Col lg={8}>
              <Services onAddToCart={handleAddToCart} />
            </Col>
            <Col lg={4}>
              <ShoppingCart
                cartItems={cartItems}
                onRemoveItem={handleRemoveFromCart}
                onClearCart={handleClearCart}
                onCheckout={handleCheckout}
              />
            </Col>
          </Row>
        );
          case 'inventory':
            return (
              <Row>
                <Col lg={8}>
                  <Inventory onAddToCart={handleAddToCart} />
                </Col>
                <Col lg={4}>
                  <ShoppingCart
                    cartItems={cartItems}
                    onRemoveItem={handleRemoveFromCart}
                    onClearCart={handleClearCart}
                    onCheckout={handleCheckout}
                  />
                </Col>
              </Row>
            );
      case 'appointments':
        return <Appointments />;
      case 'checkout':
        return (
          <Checkout 
            cartItems={cartItems}
            onClearCart={handleClearCart}
            onSectionChange={setCurrentSection}
          />
        );
      case 'register':
        return <CustomerRegistration />;
      case 'contact':
        return <Contact />;
      // Nuevas secciones del sistema de gestión
      case 'work-orders':
        return <WorkOrders />;
      case 'quotes':
        return <Quotes />;
      case 'vehicle-history':
        return <VehicleHistory />;
      case 'service-types':
        return <ServiceTypes />;
      case 'vehicle-types':
        return <VehicleTypes />;
      case 'brands':
        return <Brands />;
      case 'mechanics':
        return <Mechanics />;
      case 'income':
        return <Income />;
      case 'export-excel':
        return <ExportExcel />;
      case 'generate-quotes':
        return <Quotes />;
      case 'dashboard':
        return <Dashboard onSectionChange={setCurrentSection} />;
      default:
        return <Home onSectionChange={setCurrentSection} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="App">
          <Navigation 
            onSectionChange={setCurrentSection}
            onShowSidebar={() => setShowSidebar(true)}
            currentSection={currentSection}
          />
          <Sidebar 
            show={showSidebar}
            onHide={() => setShowSidebar(false)}
            onSectionChange={setCurrentSection}
            currentSection={currentSection}
          />
      <main>
        <Container fluid>
          {renderSection()}
        </Container>
      </main>
      
      {/* Footer */}
      <footer className="bg-dark text-white py-5 mt-5">
        <Container>
          <Row className="g-4">
            {/* Información de Contacto */}
            <Col md={4}>
              <h5 className="mb-3">
                <i className="fas fa-wrench me-2 text-warning"></i>
                Taller Mecánico AutoMax
              </h5>
              <p className="text-light mb-3">
                <small>Tu taller de confianza desde 2009. Especialistas en mantención y reparación automotriz.</small>
              </p>
              <div className="d-flex align-items-start mb-2">
                <i className="fas fa-map-marker-alt text-warning me-2 mt-1"></i>
                <div>
                  <strong>Dirección:</strong><br />
                  <small>Av. La Bajada #456<br />
                  Chillán, Región de Ñuble<br />
                  Chile</small>
                </div>
              </div>
            </Col>

            {/* Horarios y Contacto */}
            <Col md={4}>
              <h5 className="mb-3">
                <i className="fas fa-clock me-2 text-warning"></i>
                Horarios de Atención
              </h5>
              <div className="mb-2">
                <i className="fas fa-calendar-day text-warning me-2"></i>
                <strong>Lunes a Viernes:</strong><br />
                <small className="ms-4">9:00 AM - 7:00 PM</small>
              </div>
              <div className="mb-3">
                <i className="fas fa-calendar-week text-warning me-2"></i>
                <strong>Sábados:</strong><br />
                <small className="ms-4">9:00 AM - 2:00 PM</small>
              </div>
              <div className="mb-2">
                <i className="fas fa-phone text-warning me-2"></i>
                <strong>Teléfono:</strong> <a href="tel:+56422234567" className="text-light text-decoration-none">+56 42 223 4567</a>
              </div>
              <div>
                <i className="fas fa-envelope text-warning me-2"></i>
                <strong>Email:</strong> <a href="mailto:contacto@automaxchillan.cl" className="text-light text-decoration-none">contacto@automaxchillan.cl</a>
              </div>
            </Col>

            {/* Servicios y Redes Sociales */}
            <Col md={4}>
              <h5 className="mb-3">
                <i className="fas fa-tools me-2 text-warning"></i>
                Nuestros Servicios
              </h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <small>Mantención Preventiva</small>
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <small>Diagnóstico Computarizado</small>
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <small>Frenos y Suspensión</small>
                </li>
                <li className="mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <small>Reparación de Motor</small>
                </li>
              </ul>
              <div className="d-flex gap-3">
                <a href="#facebook" className="text-light" title="Facebook">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
                <a href="#instagram" className="text-light" title="Instagram">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
                <a href="#whatsapp" className="text-light" title="WhatsApp">
                  <i className="fab fa-whatsapp fa-2x"></i>
                </a>
                <a href="#twitter" className="text-light" title="Twitter">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              </div>
            </Col>
          </Row>

          {/* Línea divisoria */}
          <hr className="my-4 border-secondary" />

          {/* Copyright y certificaciones */}
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <small>&copy; 2025 AutoMax Chillán. Todos los derechos reservados.</small>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <small>
                <i className="fas fa-certificate text-warning me-2"></i>
                Taller Certificado | 
                <i className="fas fa-shield-alt text-warning ms-2 me-2"></i>
                Garantía en Todos los Servicios
              </small>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Floating Cart - Always visible when there are items */}
      <FloatingCart
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;
