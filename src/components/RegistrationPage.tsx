import React, { useState, useEffect, useRef } from 'react';
import type { ErrorMessage, ErrorType } from '../data/errors';
import { ErrorPopup } from './ErrorPopup';
import type { ErrorEvent } from '../types';

interface Props {
  onComplete: (errorEvents: ErrorEvent[]) => void;
}

export const RegistrationPage: React.FC<Props> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    experienceLevel: '',
    team: '',
    links: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [currentError, setCurrentError] = useState<ErrorMessage | null>(null);
  const [errorEvents, setErrorEvents] = useState<ErrorEvent[]>([]);
  
  const errorStartTimeRef = useRef<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseError = () => {
    if (currentError && errorStartTimeRef.current) {
      const endTime = Date.now();
      const newEvent: ErrorEvent = {
        errorId: currentError.id,
        type: currentError.type,
        shownAt: errorStartTimeRef.current,
        resolvedAt: endTime
      };
      setErrorEvents(prev => [...prev, newEvent]);
      setCurrentError(null);
      errorStartTimeRef.current = null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(errorEvents);
  };

  return (
    <div className="registration-container">
      {currentError && (
        <ErrorPopup error={currentError} onClose={handleCloseError} />
      )}

      <h1 className="main-title">HACKATHON 2026</h1>
      
      <div className="section">
        <h2 className="section-title">01 // ABOUT EVENT</h2>
        <p className="section-paragraph">
          Join the 48-hour coding marathon where ideas become reality.
          Top developers, designers, and innovators compete to solve real-world challenges
          using cutting-edge technology. Network with industry leaders, access exclusive tools,
          and compete for prizes and career opportunities.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="section">
          <h2 className="section-title">02 // REGISTRATION</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input type="text" id="role" name="role" value={formData.role} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="experienceLevel">Experience Level</label>
            <input type="text" id="experienceLevel" name="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="team">Team</label>
            <input type="text" id="team" name="team" value={formData.team} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="links">Links</label>
            <input type="text" id="links" name="links" value={formData.links} onChange={handleInputChange} />
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">03 // CREATE ACCOUNT</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
          </div>
        </div>
        
        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </form>
    </div>
  );
};
