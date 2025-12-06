import React from 'react';
import type { SessionData } from '../types';
import { Clock, AlertCircle, BarChart2, Timer } from 'lucide-react';

interface Props {
  sessionData: SessionData;
}

export const SummaryPage: React.FC<Props> = ({ sessionData }) => {
  const { startTime, endTime, errorEvents } = sessionData;
  
  const duration = (startTime && endTime) ? (endTime - startTime) / 1000 : 0;
  const totalErrors = errorEvents.length;
  
  const totalRecoveryTime = errorEvents.reduce((acc, curr) => acc + (curr.resolvedAt - curr.shownAt), 0);
  const avgRecovery = totalErrors > 0 ? (totalRecoveryTime / totalErrors) / 1000 : 0;

  const breakdown = {
    apologetic: errorEvents.filter(e => e.type === 'apologetic').length,
    neutral: errorEvents.filter(e => e.type === 'neutral').length,
    nonApologetic: errorEvents.filter(e => e.type === 'non-apologetic').length,
  };

  return (
    <div className="container">
      <div className="card text-center" style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Registration Complete!</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Thank you for participating in our study. Here's a summary of your session.
        </p>
      </div>
      
      <div className="summary-grid">
        <div className="summary-card blue">
          <h3>
            <Clock size={20} />
            Task Duration
          </h3>
          <div className="value">{duration.toFixed(1)}s</div>
        </div>
        
        <div className="summary-card purple">
          <h3>
            <AlertCircle size={20} />
            Total Errors
          </h3>
          <div className="value">{totalErrors}</div>
        </div>
        
        <div className="summary-card green">
          <h3>
            <BarChart2 size={20} />
            Error Breakdown
          </h3>
          <ul className="breakdown-list">
            <li className="apologetic">Apologetic: {breakdown.apologetic}</li>
            <li className="neutral">Neutral: {breakdown.neutral}</li>
            <li className="non-apologetic">Non-Apologetic: {breakdown.nonApologetic}</li>
          </ul>
        </div>
        
        <div className="summary-card orange">
          <h3>
            <Timer size={20} />
            Avg Recovery
          </h3>
          <div className="value">{avgRecovery.toFixed(1)}s</div>
        </div>
      </div>
    </div>
  );
};
