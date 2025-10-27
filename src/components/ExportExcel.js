import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge } from 'react-bootstrap';

const ExportExcel = () => {
  const [exportConfig, setExportConfig] = useState({
    dataType: 'services',
    dateFrom: '',
    dateTo: '',
    includeDetails: true,
    includeCharts: false,
    format: 'xlsx'
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [isExporting, setIsExporting] = useState(false);

  const dataTypes = [
    { value: 'services', label: 'Servicios Realizados', icon: 'fas fa-tools' },
    { value: 'appointments', label: 'Citas Programadas', icon: 'fas fa-calendar-alt' },
    { value: 'customers', label: 'Clientes', icon: 'fas fa-users' },
    { value: 'inventory', label: 'Inventario', icon: 'fas fa-boxes' },
    { value: 'income', label: 'Reportes de Ingresos', icon: 'fas fa-money-bill-wave' },
    { value: 'mechanics', label: 'Mecánicos', icon: 'fas fa-user-tie' },
    { value: 'vehicles', label: 'Vehículos', icon: 'fas fa-car' }
  ];

  const formats = [
    { value: 'xlsx', label: 'Excel (.xlsx)', icon: 'fas fa-file-excel' },
    { value: 'csv', label: 'CSV (.csv)', icon: 'fas fa-file-csv' },
    { value: 'pdf', label: 'PDF (.pdf)', icon: 'fas fa-file-pdf' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExportConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulación de exportación
    setTimeout(() => {
      setIsExporting(false);
      setAlert({ 
        show: true, 
        message: `Archivo ${exportConfig.dataType}.${exportConfig.format} exportado exitosamente`, 
        variant: 'success' 
      });
      setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 5000);
    }, 2000);
  };

  const getSelectedDataTypeInfo = () => {
    return dataTypes.find(dt => dt.value === exportConfig.dataType);
  };

  return (
    <Container fluid className="py-4">
      {alert.show && (
        <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false, message: '', variant: 'success' })}>
          <i className="fas fa-download me-2"></i>
          {alert.message}
        </Alert>
      )}

      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">
                <i className="fas fa-file-export text-primary me-2"></i>
                Exportar a Excel
              </h2>
              <p className="text-muted mb-0">Exporta datos del sistema a diferentes formatos</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-cogs me-2"></i>
                Configuración de Exportación
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                {/* Tipo de Datos */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">
                    <i className="fas fa-database me-2"></i>
                    Tipo de Datos a Exportar *
                  </Form.Label>
                  <Row>
                    {dataTypes.map((type) => (
                      <Col md={6} key={type.value} className="mb-2">
                        <Form.Check
                          type="radio"
                          id={type.value}
                          name="dataType"
                          value={type.value}
                          checked={exportConfig.dataType === type.value}
                          onChange={handleInputChange}
                          label={
                            <div className="d-flex align-items-center">
                              <i className={`${type.icon} text-primary me-2`}></i>
                              {type.label}
                            </div>
                          }
                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>

                {/* Rango de Fechas */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Fecha Desde</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateFrom"
                        value={exportConfig.dateFrom}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Fecha Hasta</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateTo"
                        value={exportConfig.dateTo}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Formato de Archivo */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">
                    <i className="fas fa-file me-2"></i>
                    Formato de Archivo *
                  </Form.Label>
                  <Row>
                    {formats.map((format) => (
                      <Col md={4} key={format.value}>
                        <Form.Check
                          type="radio"
                          id={format.value}
                          name="format"
                          value={format.value}
                          checked={exportConfig.format === format.value}
                          onChange={handleInputChange}
                          label={
                            <div className="d-flex align-items-center">
                              <i className={`${format.icon} text-success me-2`}></i>
                              {format.label}
                            </div>
                          }
                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>

                {/* Opciones Adicionales */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">
                    <i className="fas fa-sliders-h me-2"></i>
                    Opciones Adicionales
                  </Form.Label>
                  <div className="border rounded p-3 bg-light">
                    <Form.Check
                      type="checkbox"
                      id="includeDetails"
                      name="includeDetails"
                      checked={exportConfig.includeDetails}
                      onChange={handleInputChange}
                      label="Incluir detalles completos"
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      id="includeCharts"
                      name="includeCharts"
                      checked={exportConfig.includeCharts}
                      onChange={handleInputChange}
                      label="Incluir gráficos (solo PDF)"
                    />
                  </div>
                </Form.Group>

                {/* Botón de Exportación */}
                <div className="d-flex justify-content-center">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleExport}
                    disabled={isExporting}
                    className="px-5"
                  >
                    {isExporting ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Exportando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-download me-2"></i>
                        Exportar Datos
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Vista Previa */}
          <Card className="shadow mb-4">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">
                <i className="fas fa-eye me-2"></i>
                Vista Previa
              </h5>
            </Card.Header>
            <Card.Body>
              {getSelectedDataTypeInfo() && (
                <div className="text-center">
                  <i className={`${getSelectedDataTypeInfo().icon} text-primary mb-3`} style={{ fontSize: '3rem' }}></i>
                  <h5>{getSelectedDataTypeInfo().label}</h5>
                  <p className="text-muted">
                    Se exportarán los datos de {getSelectedDataTypeInfo().label.toLowerCase()} 
                    {exportConfig.dateFrom && exportConfig.dateTo && (
                      <span> desde {exportConfig.dateFrom} hasta {exportConfig.dateTo}</span>
                    )}
                  </p>
                  <Badge bg="success" className="mb-2">
                    Formato: {formats.find(f => f.value === exportConfig.format)?.label}
                  </Badge>
                  {exportConfig.includeDetails && (
                    <div>
                      <Badge bg="info">Detalles completos</Badge>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Estadísticas */}
          <Card className="shadow">
            <Card.Header className="bg-warning text-white">
              <h5 className="mb-0">
                <i className="fas fa-chart-bar me-2"></i>
                Estadísticas
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <Row>
                  <Col md={6} className="mb-3">
                    <i className="fas fa-file-excel text-success mb-2" style={{ fontSize: '2rem' }}></i>
                    <h6 className="text-muted">Exportaciones</h6>
                    <h4 className="text-success">24</h4>
                  </Col>
                  <Col md={6} className="mb-3">
                    <i className="fas fa-download text-info mb-2" style={{ fontSize: '2rem' }}></i>
                    <h6 className="text-muted">Este Mes</h6>
                    <h4 className="text-info">8</h4>
                  </Col>
                </Row>
                <hr />
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Los archivos se descargan automáticamente
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExportExcel;





