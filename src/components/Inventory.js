import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';

const Inventory = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const inventoryItems = [
    {
      id: 1,
      name: "Aceite Motor 5W-30",
      category: "Lubricantes",
      brand: "Mobil",
      price: 45000,
      stock: 25,
      image: "fas fa-oil-can",
      description: "Aceite sintético para motor, 4 litros"
    },
    {
      id: 2,
      name: "Filtro de Aceite",
      category: "Filtros",
      brand: "Fram",
      price: 15000,
      stock: 50,
      image: "fas fa-filter",
      description: "Filtro de aceite compatible con múltiples marcas"
    },
    {
      id: 3,
      name: "Pastillas de Freno",
      category: "Frenos",
      brand: "Bosch",
      price: 85000,
      stock: 15,
      image: "fas fa-hand-paper",
      description: "Pastillas de freno delanteras, juego completo"
    },
    {
      id: 4,
      name: "Batería 12V",
      category: "Eléctrico",
      brand: "ACDelco",
      price: 180000,
      stock: 8,
      image: "fas fa-battery-full",
      description: "Batería 12V 70Ah, garantía 2 años"
    },
    {
      id: 5,
      name: "Amortiguador",
      category: "Suspensión",
      brand: "Monroe",
      price: 120000,
      stock: 12,
      image: "fas fa-car",
      description: "Amortiguador delantero, lado izquierdo"
    },
    {
      id: 6,
      name: "Filtro de Aire",
      category: "Filtros",
      brand: "K&N",
      price: 35000,
      stock: 20,
      image: "fas fa-wind",
      description: "Filtro de aire de alto flujo"
    },
    {
      id: 7,
      name: "Refrigerante",
      category: "Refrigeración",
      brand: "Prestone",
      price: 25000,
      stock: 30,
      image: "fas fa-snowflake",
      description: "Refrigerante concentrado, 1 galón"
    },
    {
      id: 8,
      name: "Correa de Distribución",
      category: "Motor",
      brand: "Gates",
      price: 95000,
      stock: 6,
      image: "fas fa-cog",
      description: "Kit completo de correa de distribución"
    }
  ];

  const categories = ['all', 'Lubricantes', 'Filtros', 'Frenos', 'Eléctrico', 'Suspensión', 'Refrigeración', 'Motor'];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4 text-primary">Inventario de Repuestos</h2>
          <p className="text-center text-muted mb-5">
            Contamos con un amplio inventario de repuestos originales y de calidad
          </p>
        </Col>
      </Row>

      {/* Filtros de búsqueda */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o marca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Inventario */}
      <Row>
        {filteredItems.map((item) => (
          <Col md={6} lg={4} key={item.id} className="mb-4">
            <Card className="h-100 shadow-sm inventory-card">
              <Card.Body>
                <div className="text-center mb-3">
                  <i className={`${item.image} text-primary`} style={{ fontSize: '3rem' }}></i>
                </div>
                <Card.Title className="text-primary">{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.brand}</Card.Subtitle>
                <Card.Text className="text-muted">{item.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Badge bg="info">{item.category}</Badge>
                  <Badge bg={item.stock > 10 ? "success" : item.stock > 5 ? "warning" : "danger"}>
                    Stock: {item.stock}
                  </Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <strong className="text-success fs-5">{formatPrice(item.price)}</strong>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">
                      Consultar
                    </Button>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={() => onAddToCart({
                        id: item.id,
                        title: item.name,
                        price: item.price,
                        duration: "Inmediato",
                        icon: item.image,
                        type: "repuesto",
                        description: item.description,
                        brand: item.brand,
                        category: item.category
                      })}
                    >
                      <i className="fas fa-shopping-cart me-1"></i>
                      Agregar
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredItems.length === 0 && (
        <Row>
          <Col className="text-center">
            <div className="py-5">
              <h4 className="text-muted">No se encontraron productos</h4>
              <p className="text-muted">Intenta con otros términos de búsqueda</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Inventory;
