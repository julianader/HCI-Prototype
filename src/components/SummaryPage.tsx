import React, { useState } from 'react';
import type { SessionData, PostSurvey, ErrorEvent } from '../types';
import { LikertScale } from './LikertScale';
import { AlertCircle, AlertTriangle, XCircle, Wifi } from 'lucide-react';

interface Props {
  sessionData: SessionData;
  onPostSurveyChange: (data: PostSurvey) => void;
  onSubmit: () => void;
}

export const SummaryPage: React.FC<Props> = ({ sessionData, onPostSurveyChange, onSubmit }) => {
  const { startTime, endTime, postSurvey, errorEvents } = sessionData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const duration = (startTime && endTime) ? (endTime - startTime) / 1000 : 0;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  const handleLikertChange = (name: string, value: number) => {
    onPostSurveyChange({
      ...postSurvey,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'alert': return <AlertCircle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'error': return <XCircle size={16} />;
      case 'wifi': return <Wifi size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const groupErrorsByType = (events: ErrorEvent[]) => {
    const grouped: { [key: string]: ErrorEvent[] } = {
      'neutral': [],
      'non-apologetic': [],
      'apologetic': []
    };

    events.forEach(event => {
      if (grouped[event.type]) {
        grouped[event.type].push(event);
      }
    });

    return grouped;
  };

  const getIconColor = (errorType: string) => {
    switch (errorType) {
      case 'apologetic': return '#34d399'; // green
      case 'neutral': return '#64748b'; // gray
      case 'non-apologetic': return '#f87171'; // red
      default: return '#ef4444'; // fallback red
    }
  };

  const getBorderColor = (errorType: string) => {
    switch (errorType) {
      case 'apologetic': return '#10b981'; // green border
      case 'neutral': return '#475569'; // gray border
      case 'non-apologetic': return '#ef4444'; // red border
      default: return '#ef4444'; // fallback red
    }
  };

  const renderErrorMessages = (errors: ErrorEvent[]) => {
    if (errors.length === 0) {
      return <p style={{ fontStyle: 'italic', color: '#666' }}>No errors of this type were shown during registration.</p>;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {errors.map((error, index) => (
          <div key={`${error.errorId}-${index}`} style={{
            border: `1px solid ${getBorderColor(error.type)}`,
            borderRadius: '12px',
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            fontSize: '0.9rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{
                padding: '0.5rem',
                borderRadius: '8px',
                backgroundColor: '#3a3a3a',
                color: getIconColor(error.type),
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                {getIcon(error.icon)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '700',
                  fontSize: '1rem',
                  marginBottom: '0.5rem',
                  color: '#ffffff'
                }}>
                  {error.title}
                </div>
                <div style={{
                  color: '#ffffff',
                  opacity: 0.9,
                  lineHeight: '1.5',
                  fontSize: '0.95rem'
                }}>
                  {error.message}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const errorGroups = groupErrorsByType(errorEvents);

  return (
    <div className="demographics-container">
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Congratulations</h1>

      <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem', color: 'white' }}>
        It took you {minutes} minutes {seconds} seconds to complete the task.
      </div>

      <h1>POST-SURVEY QUESTIONNAIRE</h1>

      <div className="demographics-card">
        <h2>Part 1</h2>
        <LikertScale
          label="How would you rate your mood now after completing the task?"
          name="moodAfterTask"
          value={postSurvey.moodAfterTask}
          onChange={handleLikertChange}
          useEmojis={true}
        />
      </div>

      <div className="demographics-card">
        <h2>Part 2.1</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            ERROR MESSAGES THAT SHOWED DURING REGISTRATION
          </p>
          {renderErrorMessages(errorGroups.neutral)}
        </div>
        <p style={{ marginBottom: '1rem' }}>
          Please rate how much you agree with the following statements about the error messages above.<br />
          <span style={{ fontSize: '0.95em', color: '#666' }}>
            1 - Strongly disagree, 5 - Strongly agree.
          </span>
        </p>
        <LikertScale
          label="The message looks aesthetically appealing."
          name="part21_aestheticallyAppealing"
          value={postSurvey.part21_aestheticallyAppealing}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="I felt irritated when this message appeared."
          name="part21_feltIrritated"
          value={postSurvey.part21_feltIrritated}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="The appearance of this message is pleasing."
          name="part21_pleasingAppearance"
          value={postSurvey.part21_pleasingAppearance}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="This message helped me understand what to do next."
          name="part21_helpedUnderstand"
          value={postSurvey.part21_helpedUnderstand}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="This message increased my stress level."
          name="part21_increasedStress"
          value={postSurvey.part21_increasedStress}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="The message was clear and understandable."
          name="part21_clearUnderstandable"
          value={postSurvey.part21_clearUnderstandable}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
      </div>

      <div className="demographics-card">
        <h2>Part 2.2</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            ERROR MESSAGES THAT SHOWED DURING REGISTRATION
          </p>
          {renderErrorMessages(errorGroups['non-apologetic'])}
        </div>
        <p style={{ marginBottom: '1rem' }}>
          Please rate how much you agree with the following statements about the error messages above.<br />
          <span style={{ fontSize: '0.95em', color: '#666' }}>
            1 - Strongly disagree, 5 - Strongly agree.
          </span>
        </p>
        <LikertScale
          label="This message increased my stress level."
          name="part22_increasedStress"
          value={postSurvey.part22_increasedStress}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="The appearance of this message is pleasing."
          name="part22_pleasingAppearance"
          value={postSurvey.part22_pleasingAppearance}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="This message helped me understand what to do next."
          name="part22_helpedUnderstand"
          value={postSurvey.part22_helpedUnderstand}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="The message gives a positive visual impression."
          name="part22_positiveVisualImpression"
          value={postSurvey.part22_positiveVisualImpression}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="The message made me feel frustrated."
          name="part22_feltFrustrated"
          value={postSurvey.part22_feltFrustrated}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="The message guided me effectively."
          name="part22_guidedEffectively"
          value={postSurvey.part22_guidedEffectively}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
      </div>

      <div className="demographics-card">
        <h2>Part 2.3</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            ERROR MESSAGES THAT SHOWED DURING REGISTRATION
          </p>
          {renderErrorMessages(errorGroups.apologetic)}
        </div>
        <p style={{ marginBottom: '1rem' }}>
          Please rate how much you agree with the following statements about the error messages above.<br />
          <span style={{ fontSize: '0.95em', color: '#666' }}>
            1 - Strongly disagree, 5 - Strongly agree.
          </span>
        </p>
        <LikertScale
          label="The message guided me effectively."
          name="part23_guidedEffectively"
          value={postSurvey.part23_guidedEffectively}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="The message looks aesthetically appealing."
          name="part23_aestheticallyAppealing"
          value={postSurvey.part23_aestheticallyAppealing}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="The message made me feel frustrated."
          name="part23_feltFrustrated"
          value={postSurvey.part23_feltFrustrated}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="The message gives a positive visual impression."
          name="part23_positiveVisualImpression"
          value={postSurvey.part23_positiveVisualImpression}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="The message was clear and understandable."
          name="part23_clearUnderstandable"
          value={postSurvey.part23_clearUnderstandable}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="I felt irritated when this message appeared."
          name="part23_feltIrritated"
          value={postSurvey.part23_feltIrritated}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            opacity: isSubmitting ? 0.6 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Survey'}
        </button>
      </div>

      {isSubmitting && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid #333',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #333',
              borderTop: '3px solid #54f55a',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem auto'
            }}></div>
            <h3 style={{
              color: '#fff',
              margin: '0 0 0.5rem 0',
              fontSize: '1.2rem'
            }}>
              Submitting Survey...
            </h3>
            <p style={{
              color: '#ccc',
              margin: 0,
              fontSize: '0.9rem'
            }}>
              Please wait while we save your data
            </p>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
};
