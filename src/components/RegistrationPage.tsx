import React, { useState, useRef, useEffect } from 'react';
import type { ErrorMessage } from '../data/errors';
import { ErrorPopup } from './ErrorPopup';
import type { ErrorEvent } from '../types';
import { FieldErrorManager } from '../components/FieldErrorManager';

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
        participants: 1,
    });

    const [currentError, setCurrentError] = useState<ErrorMessage | null>(null);
    const [errorEvents, setErrorEvents] = useState<ErrorEvent[]>([]);

    // FieldErrorManager nur einmal pro Component-Instanz erzeugen
    const errorManagerRef = useRef<FieldErrorManager | null>(null);
    useEffect(() => {
        if (!errorManagerRef.current) {
            errorManagerRef.current = new FieldErrorManager();
        }
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === 'participants' ? Number(value) : value,
        }));
    };

    const handleBlur = (
        e: React.FocusEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        const mgr = errorManagerRef.current;
        if (!mgr) return;

        const error = mgr.handleFieldBlur(name, value);
        if (error) {
            setCurrentError(error);
        }
    };

    const handleCloseError = () => {
        const mgr = errorManagerRef.current;
        if (currentError && mgr) {
            mgr.handleClose(currentError);
            setErrorEvents(mgr.getEvents());
        }
        setCurrentError(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onComplete(errorEvents);
    };

    return (
        <div className="registration-page">
            {currentError && (
                <ErrorPopup error={currentError} onClose={handleCloseError} />
            )}

            <form onSubmit={handleSubmit}>
                <h1>Hackathon Registration</h1>

                <div className="form-group">
                    <label htmlFor="teamName">Team Name</label>
                    <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Awesome Hackers"
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
                        placeholder="My Next Big Thing"
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
                        placeholder="Describe your idea..."
                        rows={4}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="programmingLanguage">Programming Languages</label>
                    <input
                        type="text"
                        id="programmingLanguage"
                        name="programmingLanguage"
                        value={formData.programmingLanguages}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="prefered programming language"
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
                        placeholder="you@example.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="participants">Number of Participants</label>
                    <select
                        id="participants"
                        name="participants"
                        value={formData.participants}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                    >
                        {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit Registration
                </button>
            </form>
        </div>
    );
};
