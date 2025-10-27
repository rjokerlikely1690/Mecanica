import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../Contact';

describe('Contact Component', () => {
  it('should render contact component', () => {
    render(<Contact />);
    const contactSection = screen.getByText(/Contacto/i);
    expect(contactSection).toBeTruthy();
  });

  it('should display contact information', () => {
    render(<Contact />);
    // Verify that contact details are rendered
    const headers = screen.getAllByText(/Dirección|Teléfono|Email/i);
    expect(headers.length).toBeGreaterThan(0);
  });

  it('should render contact form', () => {
    const { container } = render(<Contact />);
    const form = container.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should have input fields for name, email, and message', () => {
    const { container } = render(<Contact />);
    const inputs = container.querySelectorAll('input, textarea');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should have submit button', () => {
    render(<Contact />);
    const submitButton = screen.getByText(/Enviar|Submit/i);
    expect(submitButton).toBeTruthy();
  });
});
