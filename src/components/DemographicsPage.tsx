import React from 'react';
import type { Demographics } from '../types';
import { LikertScale } from './LikertScale';

interface Props {
  data: Demographics;
  onChange: (data: Demographics) => void;
  onNext: () => void;
}

export const DemographicsPage: React.FC<Props> = ({ data, onChange, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  const handleLikertChange = (name: string, value: number) => {
    onChange({
      ...data,
      [name]: value
    });
  };

  const isFormValid = () => {
    return data.fullName && data.age && data.gender;
  };

  return (
    <div className="demographics-container">
      <h1>PRE-SURVEY QUESTIONNAIRE</h1>

      <div className="demographics-card">
        <h2>General Info</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={data.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={data.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="demographics-card">
        <h2>Part 1</h2>
        <LikertScale
          label="How would you rate your current mood?"
          name="currentMood"
          value={data.currentMood}
          onChange={handleLikertChange}
          useEmojis={true}
        />
      </div>

      <div className="demographics-card">
        <h2>Part 2</h2>
        <p style={{ marginBottom: '1rem' }}>
          Please rate how much you agree with the following statements.<br />
          <span style={{ fontSize: '0.95em', color: '#666' }}>
            1 - Strongly disagree, 5 - Strongly agree.
          </span>
        </p>
        <LikertScale
          label="I feel confident using computers."
          name="part2_confidentUsingComputers"
          value={data.part2_confidentUsingComputers}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="I can usually figure out solutions when I have problems using websites or software."
          name="part2_solveWebsiteProblems"
          value={data.part2_solveWebsiteProblems}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="I feel comfortable exploring new online interfaces without help."
          name="part2_exploreInterfaces"
          value={data.part2_exploreInterfaces}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
        <LikertScale
          label="Technical errors or unexpected messages do not significantly reduce my confidence."
          name="part2_errorsConfidence"
          value={data.part2_errorsConfidence}
          onChange={handleLikertChange}
          minLabel="Strongly disagree"
          maxLabel="Strongly agree"
        />
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!isFormValid()}
          style={{ opacity: isFormValid() ? 1 : 0.6, cursor: isFormValid() ? 'pointer' : 'not-allowed' }}
        >
          Next step
        </button>
      </div>
    </div>
  );
};
