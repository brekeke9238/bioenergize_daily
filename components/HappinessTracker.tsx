import React, { useState } from 'react';

interface HappinessTrackerProps {
  currentRating?: number;
  onRate: (rating: number) => void;
}

export const HappinessTracker: React.FC<HappinessTrackerProps> = ({ currentRating, onRate }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const emojis = ['😫', '😕', '😐', '🙂', '🤩'];
  const labels = ['Drained', 'Meh', 'Okay', 'Good', 'Energized!'];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full animate-fade-in-up">
      <h3 className="text-center text-gray-800 font-semibold mb-6">How do you feel after the exercise?</h3>
      <div className="flex justify-between items-center px-2">
        {emojis.map((emoji, index) => {
          const ratingValue = index + 1;
          const isSelected = currentRating === ratingValue;
          const isHovered = hovered === ratingValue;

          return (
            <button
              key={index}
              onClick={() => onRate(ratingValue)}
              onMouseEnter={() => setHovered(ratingValue)}
              onMouseLeave={() => setHovered(null)}
              className={`flex flex-col items-center transition-all duration-200 transform ${
                isSelected ? 'scale-125' : 'scale-100 opacity-60 hover:opacity-100 hover:scale-110'
              }`}
            >
              <span className="text-4xl mb-2 filter drop-shadow-sm">{emoji}</span>
              <span className={`text-[10px] font-medium tracking-wide ${isSelected ? 'text-primary-600' : 'text-gray-400'}`}>
                {labels[index]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};