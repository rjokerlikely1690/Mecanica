import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb Component', () => {
  it('should render breadcrumb with home icon', () => {
    render(<Breadcrumb currentSection="dashboard" />);
    const homeLink = screen.getByText('AutoMax');
    expect(homeLink).toBeTruthy();
  });

  it('should display correct section name for dashboard', () => {
    render(<Breadcrumb currentSection="dashboard" />);
    const sectionName = screen.getByText('Dashboard');
    expect(sectionName).toBeTruthy();
  });

  it('should display correct section name for services', () => {
    render(<Breadcrumb currentSection="services" />);
    const sectionName = screen.getByText('Servicios');
    expect(sectionName).toBeTruthy();
  });

  it('should display correct icon for appointments section', () => {
    const { container } = render(<Breadcrumb currentSection="appointments" />);
    const icons = container.querySelectorAll('i');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should render breadcrumb for unknown section', () => {
    render(<Breadcrumb currentSection="unknown" />);
    const sectionName = screen.getByText('Sección');
    expect(sectionName).toBeTruthy();
  });
});
