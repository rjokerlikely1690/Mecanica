import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home Component', () => {
  const mockOnSectionChange = () => {};
  const mockOnAddToCart = () => {};

  it('should render home component title', () => {
    render(
      <Home 
        onSectionChange={mockOnSectionChange}
        onAddToCart={mockOnAddToCart}
      />
    );
    const title = screen.getByText(/Taller Mecánico AutoMax/i);
    expect(title).toBeTruthy();
  });

  it('should render service features', () => {
    render(
      <Home 
        onSectionChange={mockOnSectionChange}
        onAddToCart={mockOnAddToCart}
      />
    );
    const features = screen.getAllByText(/Servicio Profesional|Diagnóstico|Garantía|Precios/i);
    expect(features.length).toBeGreaterThan(0);
  });

  it('should render statistics section', () => {
    render(
      <Home 
        onSectionChange={mockOnSectionChange}
        onAddToCart={mockOnAddToCart}
      />
    );
    const stats = screen.getAllByText(/Clientes|Experiencia|Emergencia|Garantía/i);
    expect(stats.length).toBeGreaterThan(0);
  });

  it('should render action buttons', () => {
    render(
      <Home 
        onSectionChange={mockOnSectionChange}
        onAddToCart={mockOnAddToCart}
      />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should have proper structure', () => {
    const { container } = render(
      <Home 
        onSectionChange={mockOnSectionChange}
        onAddToCart={mockOnAddToCart}
      />
    );
    const cards = container.querySelectorAll('.card');
    expect(cards.length).toBeGreaterThan(0);
  });
});
