import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ show, message, variant, onClose }) => {
  if (!show) return null;

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <Alert 
        variant={variant} 
        dismissible 
        onClose={onClose}
        className="shadow"
      >
        {message}
      </Alert>
    </div>
  );
};

export default Notification;
