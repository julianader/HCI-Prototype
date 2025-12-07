import React from 'react';
import { Emoji } from 'emoji-picker-react';

interface LikertScaleProps {
  label: string;
  value: number;
  name: string;
  onChange: (name: string, value: number) => void;
  minLabel?: string;
  maxLabel?: string;
  useEmojis?: boolean;
}

export const LikertScale: React.FC<LikertScaleProps> = ({ label, value, name, onChange, minLabel, maxLabel, useEmojis }) => {
  // Use 5-point scale for Part 2, fallback to 7-point for others
  const isPart2 = name.startsWith('part2_');
  const points = isPart2 ? 5 : 7;
  // Gradient colors from red to green
  const gradientColors = [
    '#F87171', // red
    '#FBBF24', // orange
    '#FDE68A', // yellow
    '#A7F3D0', // light green
    '#34D399', // green
    '#10B981', // teal (for 6)
    '#059669', // dark green (for 7)
  ];
  const confidenceEmojis = ["1f61f", "1f641", "1f610", "1f642", "1f60a", "1f601", "1f60e"];
  const moodEmojis = ["1f621", "2639-fe0f", "1f610", "1f642", "1f60a", "1f601", "1f929"];

  return (
    <div className="likert-scale-container" style={{ marginBottom: '2rem' }}>
      <label style={{ fontWeight: 500, marginBottom: 8, display: 'block' }}>{label}</label>
      <div className="likert-scale" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
        {Array.from({ length: points }).map((_, index) => {
          const pointValue = index + 1;
          if (useEmojis) {
            // Use emojis for Part 1
            const emojiList = name === 'computerConfidence' ? confidenceEmojis : moodEmojis;
            return (
              <button
                key={pointValue}
                type="button"
                className={`likert-point${value === pointValue ? ' selected' : ''}`}
                onClick={() => onChange(name, pointValue)}
                aria-label={`Value ${pointValue}`}
                style={{
                  background: 'transparent',
                  border: value === pointValue ? '2px solid #222' : '1px solid #ccc',
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  margin: '0 12px',
                  transition: 'border 0.2s',
                  boxShadow: value === pointValue ? '0 0 0 2px #34D399' : 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                <span className="emoji" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  margin: 0,
                  lineHeight: '40px',
                  fontSize: '32px',
                }}>
                  <Emoji unified={emojiList[index]} size={32} />
                </span>
              </button>
            );
          } else {
            // Use color scale for Part 2
            return (
              <button
                key={pointValue}
                type="button"
                className={`likert-point${value === pointValue ? ' selected' : ''}`}
                onClick={() => onChange(name, pointValue)}
                aria-label={`Value ${pointValue}`}
                style={{
                  background: gradientColors[index],
                  border: value === pointValue ? '2px solid #222' : '1px solid #ccc',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  margin: '0 12px',
                  transition: 'border 0.2s',
                  boxShadow: value === pointValue ? '0 0 0 2px #34D399' : 'none',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontWeight: 500 }}>{pointValue}</span>
              </button>
            );
          }
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: '0.95em', color: '#666' }}>
        <span>{minLabel || (useEmojis ? '' : 'Low')}</span>
        <span>{maxLabel || (useEmojis ? '' : 'High')}</span>
      </div>
    </div>
  );
};
