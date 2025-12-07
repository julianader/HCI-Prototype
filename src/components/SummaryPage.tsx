import React from 'react';
import type { SessionData } from '../types';

interface Props {
  sessionData: SessionData;
}

export const SummaryPage: React.FC<Props> = ({ sessionData }) => {
  return (
    <div className="registration-container">
      <h1 className="main-title">THANK YOU!</h1>
      <div className="section">
        <h2 className="section-title">REGISTRATION COMPLETE</h2>
        <p className="section-paragraph">
          You have successfully registered for Hackathon 2026.
          We will be in touch with more details soon.
        </p>
      </div>
    </div>
  );
};
