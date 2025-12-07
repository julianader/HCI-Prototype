import React from 'react';
import type { Demographics } from '../types';

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

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: parseInt(value)
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
        <div className="range-group">
          <label>Computer Confidence (1 = Low, 7 = High)</label>
          <div className="range-container">
            <span>1</span>
            <input
              type="range"
              name="computerConfidence"
              min="1"
              max="7"
              value={data.computerConfidence}
              onChange={handleRangeChange}
            />
            <span>7</span>
          </div>
          <div className="range-labels">
              <span>Current: {data.computerConfidence}</span>
          </div>
        </div>
      </div>

      <div className="demographics-card">
        <h2>Part 2</h2>
        <div className="range-group">
          <label>Current Mood (1 = Negative, 7 = Positive)</label>
          <div className="range-container">
            <span>1</span>
            <input
              type="range"
              name="currentMood"
              min="1"
              max="7"
              value={data.currentMood}
              onChange={handleRangeChange}
            />
            <span>7</span>
          </div>
          <div className="range-labels">
              <span>Current: {data.currentMood}</span>
          </div>
        </div>
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
