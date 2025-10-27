import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const CustomBreadcrumb = ({ currentSection }) => {
  const getSectionInfo = (section) => {
    const sectionMap = {
      'dashboard': { name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
      'home': { name: 'Inicio', icon: 'fas fa-home' },
      'services': { name: 'Servicios', icon: 'fas fa-cogs' },
      'inventory': { name: 'Inventario', icon: 'fas fa-boxes' },
      'appointments': { name: 'Citas', icon: 'fas fa-calendar-alt' },
      'register': { name: 'Registro de Clientes', icon: 'fas fa-user-plus' },
      'contact': { name: 'Contacto', icon: 'fas fa-phone' },
      'work-orders': { name: 'Órdenes de Trabajo', icon: 'fas fa-clipboard-list' },
      'quotes': { name: 'Cotizaciones', icon: 'fas fa-file-invoice-dollar' },
      'vehicle-history': { name: 'Historial de Vehículos', icon: 'fas fa-car' },
      'service-types': { name: 'Tipos de Servicio', icon: 'fas fa-tools' },
      'vehicle-types': { name: 'Tipos de Vehículos', icon: 'fas fa-car-side' },
      'brands': { name: 'Marcas', icon: 'fas fa-tag' },
      'mechanics': { name: 'Mecánicos', icon: 'fas fa-user-cog' },
      'income': { name: 'Ingresos', icon: 'fas fa-dollar-sign' },
      'export-excel': { name: 'Exportar a Excel', icon: 'fas fa-file-excel' },
      'generate-quotes': { name: 'Generar Cotizaciones', icon: 'fas fa-file-invoice' },
      'subscriptions': { name: 'Suscripciones', icon: 'fas fa-bell' }
    };
    
    return sectionMap[section] || { name: 'Sección', icon: 'fas fa-folder' };
  };

  const sectionInfo = getSectionInfo(currentSection);

  return (
    <div className="breadcrumb-container">
      <Breadcrumb className="mb-0">
        <Breadcrumb.Item href="#" className="d-flex align-items-center">
          <i className="fas fa-home me-1"></i>
          <span>AutoMax</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="d-flex align-items-center">
          <i className={`${sectionInfo.icon} me-1`}></i>
          <span>{sectionInfo.name}</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default CustomBreadcrumb;

