import React from 'react';
import type { ErrorMessage } from '../data/errors';
import { AlertCircle, AlertTriangle, XCircle, Wifi, X } from 'lucide-react';

interface Props {
  error: ErrorMessage;
  onClose: () => void;
}

export const ErrorPopup: React.FC<Props> = ({ error, onClose }) => {
  const getIcon = () => {
    switch (error.icon) {
      case 'alert': return <AlertCircle size={24} />;
      case 'warning': return <AlertTriangle size={24} />;
      case 'error': return <XCircle size={24} />;
      case 'wifi': return <Wifi size={24} />;
      default: return <AlertCircle size={24} />;
    }
  };

  return (
    <div className="popup-overlay">
      <div className={`error-popup ${error.bgColor} ${error.borderColor}`}>
        <div className="popup-header">
          <div className={`icon-wrapper ${error.icon}`}>
            {getIcon()}
          </div>
          <div className="content">
            <h3 className={error.textColor}>{error.title}</h3>
            <p className={error.textColor}>{error.message}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
