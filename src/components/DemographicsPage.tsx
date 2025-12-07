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
    <div className="registration-container">
      <h1 className="main-title">HACKATHON 2026</h1>
      <div className="section">
        <h2 className="section-title">00 // ABOUT YOU</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
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
          />
        </div>

        <div className="form-grop">
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

        <div className="form-group">
          <label>Computer Confidence: {data.computerConfidence}</label>
          <input
            type="range"
            name="computerConfidence"
            min="1"
            max="7"
            value={data.computerConfidence}
            onChange={handleRangeChange}
          />
        </div>

        <div className="form-group">
          <label>Current Mood: {data.currentMood}</label>
          <input
            type="range"
            name="currentMood"
            min="1"
            max="7"
            value={data.currentMood}
            onChange={handleRangeChange}
          />
        </div>

        <button
          className="submit-btn"
          onClick={onNext}
          disabled={!isFormValid()}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};
