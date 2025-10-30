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
    // El carrito ya está guardado en localStorage, solo navegar a citas
    setCurrentSection('appointments');
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
        return <Dashboard />;
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
      <footer className="bg-dark text-white py-4 mt-5">
        <Container>
          <div className="text-center">
            <h5>🔧 Taller Mecánico AutoMax</h5>
            <p className="mb-2">Tu taller de confianza desde 2009</p>
            <p className="mb-0">
              <small>&copy; 2024 AutoMax. Todos los derechos reservados.</small>
            </p>
          </div>
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
