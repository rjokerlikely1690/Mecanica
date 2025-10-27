import React from 'react';
import { render, screen } from '@testing-library/react';
import Notification from '../Notification';

describe('Notification Component', () => {
  it('should not render when show is false', () => {
    const { container } = render(
      <Notification show={false} message="Test message" variant="success" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render notification when show is true', () => {
    render(<Notification show={true} message="Test message" variant="success" />);
    const message = screen.getByText('Test message');
    expect(message).toBeTruthy();
  });

  it('should render with success variant', () => {
    const { container } = render(
      <Notification show={true} message="Success message" variant="success" />
    );
    const alert = container.querySelector('.alert-success');
    expect(alert).toBeTruthy();
  });

  it('should render with danger variant', () => {
    const { container } = render(
      <Notification show={true} message="Error message" variant="danger" />
    );
    const alert = container.querySelector('.alert-danger');
    expect(alert).toBeTruthy();
  });

  it('should display correct message text', () => {
    const testMessage = 'Test notification message';
    render(<Notification show={true} message={testMessage} variant="info" />);
    const message = screen.getByText(testMessage);
    expect(message.textContent).toBe(testMessage);
  });
});
