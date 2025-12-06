import React, { useState, useEffect, useRef } from 'react';
import { getRandomErrorExcluding } from '../data/errors';
import type { ErrorMessage, ErrorType } from '../data/errors';
import { ErrorPopup } from './ErrorPopup';
import type { ErrorEvent } from '../types';

interface Props {
  onComplete: (errorEvents: ErrorEvent[]) => void;
}

export const RegistrationPage: React.FC<Props> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    projectTitle: '',
    description: '',
    programmingLanguages: '',
    email: '',
    githubUrl: '',
    phone: '',
    participants: '1'
  });
  
  const [currentError, setCurrentError] = useState<ErrorMessage | null>(null);
  const [errorEvents, setErrorEvents] = useState<ErrorEvent[]>([]);
  const [shownErrorIds, setShownErrorIds] = useState<string[]>([]);
  const [shownTypes, setShownTypes] = useState<Set<ErrorType>>(new Set());
  
  const errorStartTimeRef = useRef<number | null>(null);
  const interactionCountRef = useRef(0);

  // Requirement: Guaranteed to show at least 3 errors with 3 different types
  // Strategy: Pre-calculate the guaranteed errors and mix them with random triggers
  
  useEffect(() => {
    // We can decide on a strategy:
    // Every N keystrokes or field blurs, trigger an error if we haven't met the quota or just randomly.
    // To ensure 3 types, we can force the first 3 errors to be unique types.
  }, []);

  const triggerError = (forcedType?: ErrorType) => {
    if (currentError) return; // Already showing an error

    let error: ErrorMessage;
    
    // Check what types we still need to show
    const allTypes: ErrorType[] = ['apologetic', 'neutral', 'non-apologetic'];
    const missingTypes = allTypes.filter(t => !shownTypes.has(t));
    
    // Determine context (active element)
    const activeElement = document.activeElement;
    let fieldName: string | undefined;
    if (activeElement && activeElement.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA') {
        fieldName = (activeElement as HTMLInputElement).name;
    }

    if (forcedType) {
        error = getRandomErrorExcluding(shownErrorIds, forcedType, fieldName);
    } else if (missingTypes.length > 0) {
      // Prioritize missing types
      const nextType = missingTypes[Math.floor(Math.random() * missingTypes.length)];
      error = getRandomErrorExcluding(shownErrorIds, nextType, fieldName);
    } else {
      // All types shown, just random
      error = getRandomErrorExcluding(shownErrorIds, undefined, fieldName);
    }

    setCurrentError(error);
    setShownErrorIds(prev => [...prev, error.id]);
    setShownTypes(prev => new Set(prev).add(error.type));
    errorStartTimeRef.current = Date.now();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    interactionCountRef.current += 1;
    
    // Random error trigger logic
    // Trigger roughly every 10-20 interactions, or randomly
    if (interactionCountRef.current > 5 && Math.random() < 0.15 && !currentError) {
        triggerError();
        interactionCountRef.current = 0; // Reset counter
    }
  };

  const handleBlur = () => {
     // Also trigger on blur sometimes
     if (Math.random() < 0.2 && !currentError) {
        triggerError();
     }
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
    
    // Ensure we have shown at least 3 errors of different types before allowing submission
    // Or just fake a submission error if we haven't.
    const allTypes: ErrorType[] = ['apologetic', 'neutral', 'non-apologetic'];
    const missingTypes = allTypes.filter(t => !shownTypes.has(t));

    if (missingTypes.length > 0) {
        // Force the next missing type
        triggerError(missingTypes[0]);
        return;
    }

    // If we have met the requirement (or maybe we force one more just in case user got lucky and didn't trigger enough)
    // The requirement says "100% guaranteed to show at least 3 errors with 3 different types"
    // So we block submission until that condition is met.
    
    onComplete(errorEvents);
  };

  return (
    <div className="card">
      {currentError && (
        <ErrorPopup error={currentError} onClose={handleCloseError} />
      )}
      
      <h1>Hackathon Registration</h1>
      <p className="subtitle">Join the biggest coding event of the year!</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teamName">Team Name</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.teamName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            placeholder="Cool Team Name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="projectTitle">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            placeholder="Awesome Project"
          />
        </div>
        
        <div className="form-group">
            <label htmlFor="description">Project Description</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                onBlur={handleBlur}
                rows={3}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontFamily: 'inherit' }}
                placeholder="Briefly describe your idea..."
            />
        </div>

        <div className="form-group">
          <label htmlFor="programmingLanguages">Programming Languages</label>
          <input
            type="text"
            id="programmingLanguages"
            name="programmingLanguages"
            value={formData.programmingLanguages}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="JS, Python, Rust..."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Contact Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="+1 234 567 890"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="githubUrl">GitHub Profile URL</label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="https://github.com/username"
          />
        </div>
        
        <div className="form-group">
            <label htmlFor="participants">Number of Team Members</label>
            <select
                id="participants"
                name="participants"
                value={formData.participants}
                onChange={handleInputChange}
                onBlur={handleBlur}
            >
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit Registration
        </button>
      </form>
    </div>
  );
};
