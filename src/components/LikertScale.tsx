import React from 'react';
import { Emoji } from 'emoji-picker-react';

interface LikertScaleProps {
  label: string;
  value: number;
  name: string;
  onChange: (name: string, value: number) => void;
}

const confidenceEmojis = ["1f61f", "1f641", "1f610", "1f642", "1f60a", "1f601", "1f60e"];
const moodEmojis = ["1f621", "2639-fe0f", "1f610", "1f642", "1f60a", "1f601", "1f929"];

export const LikertScale: React.FC<LikertScaleProps> = ({ label, value, name, onChange }) => {
  const emojis = name === 'computerConfidence' ? confidenceEmojis : moodEmojis;

  return (
    <div className="likert-scale-container">
      <label>{label}</label>
      <div className="likert-scale">
        {emojis.map((emoji, index) => {
          const pointValue = index + 1;
          return (
            <button
              key={pointValue}
              type="button"
              className={`likert-point ${value === pointValue ? 'selected' : ''}`}
              onClick={() => onChange(name, pointValue)}
              aria-label={`Value ${pointValue}`}
            >
              <span className="emoji">
                <Emoji unified={emoji} size={32} />
              </span>
              <span className="number">{pointValue}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
