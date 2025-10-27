import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from '../Navbar';

describe('Navigation Component', () => {
  const mockOnSectionChange = () => {};
  const mockOnShowSidebar = () => {};

  it('should render navbar brand with correct text', () => {
    render(
      <Navigation 
        onSectionChange={mockOnSectionChange}
        onShowSidebar={mockOnShowSidebar}
        currentSection="home"
      />
    );
    const brand = screen.getByText('Taller Mecánico AutoMax');
    expect(brand).toBeTruthy();
  });

  it('should render all navigation links', () => {
    render(
      <Navigation 
        onSectionChange={mockOnSectionChange}
        onShowSidebar={mockOnShowSidebar}
        currentSection="home"
      />
    );
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Servicios')).toBeTruthy();
    expect(screen.getByText('Inventario')).toBeTruthy();
    expect(screen.getByText('Citas')).toBeTruthy();
    expect(screen.getByText('Contacto')).toBeTruthy();
    expect(screen.getByText('Registro')).toBeTruthy();
  });

  it('should render sidebar toggle button', () => {
    const { container } = render(
      <Navigation 
        onSectionChange={mockOnSectionChange}
        onShowSidebar={mockOnShowSidebar}
        currentSection="home"
      />
    );
    const toggleButton = container.querySelector('.sidebar-toggle-btn');
    expect(toggleButton).toBeTruthy();
  });

  it('should highlight active section', () => {
    const { container } = render(
      <Navigation 
        onSectionChange={mockOnSectionChange}
        onShowSidebar={mockOnShowSidebar}
        currentSection="services"
      />
    );
    const activeLinks = container.querySelectorAll('.active');
    expect(activeLinks.length).toBeGreaterThan(0);
  });

  it('should render with correct structure', () => {
    const { container } = render(
      <Navigation 
        onSectionChange={mockOnSectionChange}
        onShowSidebar={mockOnShowSidebar}
        currentSection="home"
      />
    );
    const navLinks = container.querySelectorAll('a');
    expect(navLinks.length).toBeGreaterThan(0);
  });
});
