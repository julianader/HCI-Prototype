import React, { useState, useRef, useEffect } from 'react';
import type { ErrorMessage } from '../data/errors';
import { ErrorPopup } from './ErrorPopup';
import type { ErrorEvent } from '../types';
import { FieldErrorManager } from '../components/FieldErrorManager';
import Header from './Header';
import Footer from './Footer';

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

        // Don't trigger new errors if an error is already showing
        if (currentError) return;

        const error = mgr.handleFieldBlur(name, value);
        setCurrentError(error);
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
            <Header />
            {currentError && (
                <ErrorPopup error={currentError} onClose={handleCloseError} />
            )}
            <main className="registration-content">
                <h1 className="main-title">HACKATHON 2025</h1>

                <section className="event-about">
                    <h2>01 // ABOUT EVENT</h2>
                    <p>
                        Join the 48-hour coding marathon where ideas become reality.
                        Top developers, designers, and innovators compete to solve real-world challenges
                        using cutting-edge technology. Network with industry leaders, access exclusive tools,
                        and compete for prizes and career opportunities.
                    </p>
                </section>

                <form onSubmit={handleSubmit}>
                    <section className="form-section">
                        <h2>02 // REGISTRATION</h2>
                        <div className="form-group">
                            <label htmlFor="teamName">Team Name</label>
                            <input type="text" id="teamName" name="teamName" value={formData.teamName} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="projectTitle">Project Title</label>
                            <input type="text" id="projectTitle" name="projectTitle" value={formData.projectTitle} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Project Description</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} onBlur={handleBlur} rows={4} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="programmingLanguages">Programming Languages</label>
                            <input type="text" id="programmingLanguages" name="programmingLanguages" value={formData.programmingLanguages} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="githubUrl">Github URL</label>
                            <input type="text" id="githubUrl" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                    </section>

                    <section className="form-section">
                        <h2>03 // CREATE ACCOUNT</h2>
                        <div className="form-group">
                            <label htmlFor="participants">Number of Participants</label>
                            <select id="participants" name="participants" value={formData.participants} onChange={handleInputChange} onBlur={handleBlur}>
                                {[1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </section>

                    <button type="submit" className="btn-submit">
                        SUBMIT
                    </button>
                </form>
            </main>
            <Footer />
        </div>
    );
};
