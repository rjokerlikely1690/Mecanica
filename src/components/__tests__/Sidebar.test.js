import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';

describe('Sidebar Component', () => {
  const mockOnHide = () => {};
  const mockOnSectionChange = () => {};

  it('should render sidebar with AutoMax branding', () => {
    render(
      <Sidebar 
        show={true}
        onHide={mockOnHide}
        onSectionChange={mockOnSectionChange}
        currentSection="dashboard"
      />
    );
    const branding = screen.getByText('AutoMax');
    expect(branding).toBeTruthy();
  });

  it('should render system title', () => {
    render(
      <Sidebar 
        show={true}
        onHide={mockOnHide}
        onSectionChange={mockOnSectionChange}
        currentSection="dashboard"
      />
    );
    const systemTitle = screen.getByText('Sistema de Gestión');
    expect(systemTitle).toBeTruthy();
  });

  it('should render menu sections', () => {
    render(
      <Sidebar 
        show={true}
        onHide={mockOnHide}
        onSectionChange={mockOnSectionChange}
        currentSection="dashboard"
      />
    );
    expect(screen.getByText('ATENCIÓN DE CLIENTES')).toBeTruthy();
    expect(screen.getByText('CATÁLOGOS')).toBeTruthy();
    expect(screen.getByText('REPORTES')).toBeTruthy();
  });

  it('should render navigation items', () => {
    render(
      <Sidebar 
        show={true}
        onHide={mockOnHide}
        onSectionChange={mockOnSectionChange}
        currentSection="dashboard"
      />
    );
    expect(screen.getByText('Órdenes de trabajo')).toBeTruthy();
    expect(screen.getByText('Cotizaciones')).toBeTruthy();
    expect(screen.getByText('Tipos de Servicio')).toBeTruthy();
  });

  it('should render search input', () => {
    render(
      <Sidebar 
        show={true}
        onHide={mockOnHide}
        onSectionChange={mockOnSectionChange}
        currentSection="dashboard"
      />
    );
    const searchInput = screen.getByPlaceholderText('Buscar "software para taller mecanico"');
    expect(searchInput).toBeTruthy();
  });
});
