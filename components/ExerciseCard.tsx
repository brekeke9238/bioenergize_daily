import React from 'react';
import { BioExercise } from '../types';

interface ExerciseCardProps {
  exercise: BioExercise;
  isCompleted: boolean;
  onComplete: () => void;
  isLoading?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isCompleted, onComplete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-96 bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center animate-pulse space-y-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <p className="text-sm text-gray-400 mt-4">Consulting the bioenergetic field...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
      {/* Image Area */}
      <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
        {exercise.imageBase64 ? (
          <img
            src={`data:image/png;base64,${exercise.imageBase64}`}
            alt={exercise.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
             <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             <span>Visualizing...</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-700 shadow-sm">
          Daily Ritual
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{exercise.title}</h2>
        <p className="text-gray-600 mb-6 italic">{exercise.description}</p>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-primary-600 uppercase tracking-wide mb-3">How to do it</h3>
          <ol className="space-y-3">
            {exercise.instructions.map((step, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mb-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Why it helps</h3>
          <p className="text-sm text-blue-800">{exercise.benefits}</p>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <button
            onClick={onComplete}
            disabled={isCompleted}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
              isCompleted
                ? 'bg-green-100 text-green-700 cursor-default shadow-none'
                : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-primary-500/30'
            }`}
          >
            {isCompleted ? (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Completed
              </>
            ) : (
              'Mark as Done'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};