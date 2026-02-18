import React from 'react';
import { DailyLog } from '../types';

interface HistoryViewProps {
  logs: DailyLog[];
}

export const HistoryView: React.FC<HistoryViewProps> = ({ logs }) => {
  // Sort logs by date descending
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const completedCount = logs.filter(l => l.completed).length;
  const averageHappiness = logs.length > 0
    ? (logs.reduce((acc, curr) => acc + (curr.happinessRating || 0), 0) / logs.length).toFixed(1)
    : '0.0';

  return (
    <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto no-scrollbar pb-24">
      <h2 className="text-3xl font-bold text-gray-900">Your Journey</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Total Sessions</p>
          <p className="text-3xl font-bold text-primary-600">{completedCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Avg. Energy</p>
          <p className="text-3xl font-bold text-accent-500">{averageHappiness}<span className="text-lg text-gray-300">/5</span></p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">History</h3>
        {sortedLogs.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No exercises recorded yet. Start today!
          </div>
        ) : (
          sortedLogs.map((log) => (
            <div key={log.date} className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm">
              <div>
                <p className="font-semibold text-gray-800">{new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${log.completed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {log.completed ? 'Completed' : 'Missed'}
                </span>
              </div>
              <div className="text-2xl">
                 {log.happinessRating === 5 && '🤩'}
                 {log.happinessRating === 4 && '🙂'}
                 {log.happinessRating === 3 && '😐'}
                 {log.happinessRating === 2 && '😕'}
                 {log.happinessRating === 1 && '😫'}
                 {!log.happinessRating && '-'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};