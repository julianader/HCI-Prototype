import React from 'react';
import type { ErrorMessage } from '../data/errors';

interface Props {
  error: ErrorMessage;
  onClose: () => void;
}

const getPopupStyle = (type: ErrorMessage['type']) => {
  switch (type) {
    case 'apologetic':
      return {
        wrapper: 'bg-emerald-50',
        iconWrapper: 'alert',
        title: 'text-emerald-800'
      };
    case 'neutral':
      return {
        wrapper: 'bg-slate-50',
        iconWrapper: 'warning',
        title: 'text-slate-800'
      };
    case 'non-apologetic':
      return {
        wrapper: 'bg-red-50',
        iconWrapper: 'error',
        title: 'text-red-800'
      };
  }
};

export const ErrorPopup: React.FC<Props> = ({ error, onClose }) => {
  const { wrapper, iconWrapper, title } = getPopupStyle(error.type);

  return (
    <div className="popup-overlay">
      <div className={`error-popup ${wrapper}`}>
        <div className="popup-header">
          <div className={`icon-wrapper ${iconWrapper}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-siren"><path d="M5.5 13.5A2.5 2.5 0 0 1 8 11h8a2.5 2.5 0 0 1 2.5 2.5v0A2.5 2.5 0 0 1 16 16H8a2.5 2.5 0 0 1-2.5-2.5v0Z"/><path d="M12 16v-4"/><path d="M12 8V4"/><path d="M8.5 4h7"/><path d="M15 4c1 .5 2 2 2 4v2"/><path d="M9 4c-1 .5-2 2-2 4v2"/></svg>
          </div>
          <div className="content">
            <h3 className={`error-title ${title}`}>{error.title}</h3>
            <p className="text-slate-600">{error.message}</p>
          </div>
          <button onClick={onClose} className="close-btn" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
