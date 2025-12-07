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
        name: '',
        email: '',
        role: '',
        experienceLevel: '',
        team: '',
        links: '',
        username: '',
        password: '',
        confirmPassword: '',
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
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <input type="text" id="role" name="role" value={formData.role} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="experienceLevel">Experience Level</label>
                            <input type="text" id="experienceLevel" name="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="team">Team</label>
                            <input type="text" id="team" name="team" value={formData.team} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="links">Links</label>
                            <input type="text" id="links" name="links" value={formData.links} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                    </section>

                    <section className="form-section">
                        <h2>03 // CREATE ACCOUNT</h2>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} onBlur={handleBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} onBlur={handleBlur} />
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
