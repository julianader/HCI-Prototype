import React from 'react';
import type { SessionData, PostSurvey } from '../types';
import { LikertScale } from './LikertScale';

interface Props {
  sessionData: SessionData;
  onPostSurveyChange: (data: PostSurvey) => void;
  onSubmit: () => void;
}

export const SummaryPage: React.FC<Props> = ({ sessionData, onPostSurveyChange, onSubmit }) => {
  const { startTime, endTime, postSurvey } = sessionData;

  const duration = (startTime && endTime) ? (endTime - startTime) / 1000 : 0;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  const handleLikertChange = (name: string, value: number) => {
    onPostSurveyChange({
      ...postSurvey,
      [name]: value
    });
  };

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
        <p style={{ marginBottom: '1rem' }}>
          Please rate how much you agree with the following statements about the error above.<br />
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
        <p style={{ marginBottom: '1rem' }}>
          Please rate how much you agree with the following statements about the error above.<br />
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
        <p style={{ marginBottom: '1rem' }}>
          Please rate how much you agree with the following statements about the error above.<br />
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
          onClick={onSubmit}
          style={{ opacity: 1, cursor: 'pointer' }}
        >
          Submit Survey
        </button>
      </div>
    </div>
  );
};
