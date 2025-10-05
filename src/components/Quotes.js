import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge } from 'react-bootstrap';

const Quotes = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      quoteNumber: 'COT-2024-001',
      date: '2024-01-15',
      customerName: 'Juan Pérez',
      customerEmail: 'juan.perez@email.com',
      customerPhone: '300-123-4567',
      vehicle: 'Toyota Corolla 2020',
      licensePlate: 'ABC-123',
      services: [
        { name: 'Cambio de Aceite', price: 85000, quantity: 1 },
        { name: 'Filtro de Aire', price: 45000, quantity: 1 }
      ],
      totalAmount: 130000,
      status: 'Pendiente',
      validUntil: '2024-01-22',
      notes: 'Cotización válida por 7 días'
    },
    {
      id: 2,
      quoteNumber: 'COT-2024-002',
      date: '2024-01-14',
      customerName: 'María García',
      customerEmail: 'maria.garcia@email.com',
      customerPhone: '300-234-5678',
      vehicle: 'Chevrolet Spark 2019',
      licensePlate: 'DEF-456',
      services: [
        { name: 'Reparación de Frenos', price: 200000, quantity: 1 },
        { name: 'Pastillas de Freno', price: 120000, quantity: 1 }
      ],
      totalAmount: 320000,
      status: 'Aprobada',
      validUntil: '2024-01-21',
      notes: 'Cliente aprobó la cotización'
    },
    {
      id: 3,
      quoteNumber: 'COT-2024-003',
      date: '2024-01-13',
      customerName: 'Pedro López',
      customerEmail: 'pedro.lopez@email.com',
      customerPhone: '300-345-6789',
      vehicle: 'Honda Civic 2021',
      licensePlate: 'GHI-789',
      services: [
        { name: 'Diagnóstico Eléctrico', price: 150000, quantity: 1 },
        { name: 'Reparación Alternador', price: 300000, quantity: 1 }
      ],
      totalAmount: 450000,
      status: 'Vencida',
      validUntil: '2024-01-20',
      notes: 'Cotización expiró'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    vehicle: '',
    licensePlate: '',
    services: [{ name: '', price: '', quantity: 1 }],
    notes: '',
    validUntil: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  const serviceOptions = [
    'Cambio de Aceite', 'Filtro de Aire', 'Reparación de Frenos', 'Pastillas de Freno',
    'Diagnóstico Eléctrico', 'Reparación Alternador', 'Mantenimiento Preventivo',
    'Reparación de Motor', 'Sistema de A/C', 'Transmisión'
  ];

  const handleShowModal = (quote = null) => {
    if (quote) {
      setEditingQuote(quote);
      setFormData(quote);
    } else {
      setEditingQuote(null);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 7);
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        vehicle: '',
        licensePlate: '',
        services: [{ name: '', price: '', quantity: 1 }],
        notes: '',
        validUntil: tomorrow.toISOString().split('T')[0]
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingQuote(null);
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      vehicle: '',
      licensePlate: '',
      services: [{ name: '', price: '', quantity: 1 }],
      notes: '',
      validUntil: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', price: '', quantity: 1 }]
    }));
  };

  const removeService = (index) => {
    if (formData.services.length > 1) {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateTotal = () => {
    return formData.services.reduce((total, service) => {
      return total + (parseFloat(service.price) || 0) * (parseInt(service.quantity) || 1);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingQuote) {
      // Actualizar cotización existente
      setQuotes(prev => prev.map(quote => 
        quote.id === editingQuote.id 
          ? { 
              ...formData, 
              id: editingQuote.id,
              quoteNumber: editingQuote.quoteNumber,
              date: editingQuote.date,
              totalAmount: calculateTotal()
            }
          : quote
      ));
      setAlert({ show: true, message: 'Cotización actualizada exitosamente', variant: 'success' });
    } else {
      // Crear nueva cotización
      const newQuote = {
        ...formData,
        id: Math.max(...quotes.map(q => q.id)) + 1,
        quoteNumber: `COT-2024-${String(Math.max(...quotes.map(q => q.id)) + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        totalAmount: calculateTotal(),
        status: 'Pendiente'
      };
      setQuotes(prev => [...prev, newQuote]);
      setAlert({ show: true, message: 'Cotización creada exitosamente', variant: 'success' });
    }
    
    handleCloseModal();
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleStatusChange = (id, newStatus) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === id ? { ...quote, status: newStatus } : quote
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cotización?')) {
      setQuotes(prev => prev.filter(quote => quote.id !== id));
      setAlert({ show: true, message: 'Cotización eliminada exitosamente', variant: 'warning' });
      setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
    }
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pendiente': { bg: 'warning', text: 'Pendiente' },
      'Aprobada': { bg: 'success', text: 'Aprobada' },
      'Rechazada': { bg: 'danger', text: 'Rechazada' },
      'Vencida': { bg: 'secondary', text: 'Vencida' }
    };
    const config = statusConfig[status] || { bg: 'secondary', text: status };
    return <Badge bg={config.bg}>{config.text}</Badge>;
  };

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
                <i className="fas fa-file-invoice-dollar text-primary me-2"></i>
                Gestión de Cotizaciones
              </h2>
              <p className="text-muted mb-0">Crea, edita y gestiona cotizaciones para clientes</p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => handleShowModal()}
              className="d-flex align-items-center"
            >
              <i className="fas fa-plus me-2"></i>
              Nueva Cotización
            </Button>
          </div>
        </Col>
      </Row>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-file-invoice text-primary mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1">{quotes.length}</h4>
              <p className="text-muted mb-0">Total Cotizaciones</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-clock text-warning mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1">{quotes.filter(q => q.status === 'Pendiente').length}</h4>
              <p className="text-muted mb-0">Pendientes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-check-circle text-success mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1">{quotes.filter(q => q.status === 'Aprobada').length}</h4>
              <p className="text-muted mb-0">Aprobadas</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <i className="fas fa-dollar-sign text-info mb-2" style={{ fontSize: '2rem' }}></i>
              <h4 className="mb-1">{formatPrice(quotes.reduce((sum, q) => sum + q.totalAmount, 0))}</h4>
              <p className="text-muted mb-0">Valor Total</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Lista de Cotizaciones ({quotes.length})
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>N° Cotización</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Vehículo</th>
                      <th>Servicios</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Válida Hasta</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote) => (
                      <tr key={quote.id}>
                        <td>
                          <strong className="text-primary">{quote.quoteNumber}</strong>
                        </td>
                        <td>
                          <i className="fas fa-calendar text-muted me-1"></i>
                          {formatDate(quote.date)}
                        </td>
                        <td>
                          <div>
                            <strong>{quote.customerName}</strong>
                            <br />
                            <small className="text-muted">{quote.customerPhone}</small>
                          </div>
                        </td>
                        <td>
                          <div>
                            <strong>{quote.vehicle}</strong>
                            <br />
                            <small className="text-muted">{quote.licensePlate}</small>
                          </div>
                        </td>
                        <td>
                          <div>
                            {quote.services.map((service, index) => (
                              <Badge key={index} bg="info" className="me-1 mb-1">
                                {service.name}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td>
                          <strong className="text-success">{formatPrice(quote.totalAmount)}</strong>
                        </td>
                        <td>
                          {getStatusBadge(quote.status)}
                        </td>
                        <td>
                          <small className="text-muted">{formatDate(quote.validUntil)}</small>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => handleShowModal(quote)}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={() => handleStatusChange(quote.id, 'Aprobada')}
                            >
                              <i className="fas fa-check"></i>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDelete(quote.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
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

      {/* Modal para crear/editar */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-file-invoice-dollar me-2"></i>
            {editingQuote ? 'Editar Cotización' : 'Nueva Cotización'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Cliente *</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Juan Pérez"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email del Cliente</Form.Label>
                  <Form.Control
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="cliente@email.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono del Cliente *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="300-123-4567"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Vehículo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    required
                    placeholder="Toyota Corolla 2020"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Placa *</Form.Label>
                  <Form.Control
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    required
                    placeholder="ABC-123"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Válida Hasta *</Form.Label>
                  <Form.Control
                    type="date"
                    name="validUntil"
                    value={formData.validUntil}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Servicios *</Form.Label>
              {formData.services.map((service, index) => (
                <div key={index} className="border rounded p-3 mb-3">
                  <Row>
                    <Col md={5}>
                      <Form.Control
                        type="text"
                        placeholder="Nombre del servicio"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                        list="serviceOptions"
                      />
                      <datalist id="serviceOptions">
                        {serviceOptions.map(option => (
                          <option key={option} value={option} />
                        ))}
                      </datalist>
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="number"
                        placeholder="Precio"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        type="number"
                        placeholder="Cantidad"
                        value={service.quantity}
                        onChange={(e) => handleServiceChange(index, 'quantity', e.target.value)}
                        min="1"
                      />
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeService(index)}
                        disabled={formData.services.length === 1}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
              <Button variant="outline-primary" onClick={addService}>
                <i className="fas fa-plus me-2"></i>
                Agregar Servicio
              </Button>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Notas adicionales..."
              />
            </Form.Group>

            <div className="border rounded p-3 bg-light">
              <h5 className="text-success">
                Total: {formatPrice(calculateTotal())}
              </h5>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              <i className="fas fa-times me-2"></i>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              <i className="fas fa-save me-2"></i>
              {editingQuote ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Quotes;