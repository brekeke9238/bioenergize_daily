import React, { useState, useEffect, useCallback } from 'react';
import { generateBioExercise } from './services/geminiService';
import { BioExercise, DailyLog, AppView } from './types';
import { ExerciseCard } from './components/ExerciseCard';
import { HappinessTracker } from './components/HappinessTracker';
import { HistoryView } from './components/HistoryView';
import { Navigation } from './components/Navigation';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DAILY);
  const [todayExercise, setTodayExercise] = useState<BioExercise | null>(null);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  // Helper to get today's date string
  const getTodayDateString = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format

  const loadData = useCallback(() => {
    // Load logs
    const savedLogs = localStorage.getItem('bio_logs');
    if (savedLogs) setLogs(JSON.parse(savedLogs));

    // Check for today's exercise
    const todayStr = getTodayDateString();
    const savedExercise = localStorage.getItem(`bio_exercise_${todayStr}`);

    if (savedExercise) {
      setTodayExercise(JSON.parse(savedExercise));
    } else {
      fetchNewExercise(todayStr);
    }
  }, []);

  const fetchNewExercise = async (dateKey: string) => {
    setLoading(true);
    try {
      const exercise = await generateBioExercise();
      setTodayExercise(exercise);
      localStorage.setItem(`bio_exercise_${dateKey}`, JSON.stringify(exercise));
      sendNotification("Ready to energize?", `Your daily exercise "${exercise.title}" is ready.`);
    } catch (error) {
      console.error("Error fetching exercise", error);
    } finally {
      setLoading(false);
    }
  };

  const sendNotification = (title: string, body: string) => {
    if (notificationPermission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  };

  const requestNotification = async () => {
    const perm = await Notification.requestPermission();
    setNotificationPermission(perm);
  };

  useEffect(() => {
    loadData();
    // Prompt for notification on first load if default
    if (Notification.permission === 'default') {
      // Don't block UI, just request
      requestNotification();
    }
  }, [loadData]);

  const handleComplete = () => {
    if (!todayExercise) return;
    const todayStr = getTodayDateString();

    const newLog: DailyLog = {
      date: todayStr,
      exerciseId: todayExercise.id,
      completed: true,
      timestamp: Date.now()
    };

    const updatedLogs = [...logs.filter(l => l.date !== todayStr), newLog];
    setLogs(updatedLogs);
    localStorage.setItem('bio_logs', JSON.stringify(updatedLogs));
  };

  const handleRate = (rating: number) => {
     if (!todayExercise) return;
     const todayStr = getTodayDateString();
     // Must be completed to rate, but we can auto-complete if they rate
     const existingLog = logs.find(l => l.date === todayStr);

     const newLog: DailyLog = {
       date: todayStr,
       exerciseId: todayExercise.id,
       completed: true,
       happinessRating: rating,
       timestamp: Date.now()
     };

     const updatedLogs = [...logs.filter(l => l.date !== todayStr), newLog];
     setLogs(updatedLogs);
     localStorage.setItem('bio_logs', JSON.stringify(updatedLogs));
  };

  const todayLog = logs.find(l => l.date === getTodayDateString());

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-primary-100 pb-20">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-40">
           <div className="flex justify-between items-end">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric'})}</p>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bio<span className="text-primary-600">Energize</span></h1>
              </div>
              <div className="h-10 w-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                {/* User avatar placeholder */}
                <span className="font-bold">ME</span>
              </div>
           </div>
        </header>

        {/* Content View */}
        <main className="relative z-0">
          {currentView === AppView.DAILY && (
            <div className="p-6 space-y-6 pb-24">
              {todayExercise ? (
                <>
                  <ExerciseCard
                    exercise={todayExercise}
                    isCompleted={!!todayLog?.completed}
                    onComplete={handleComplete}
                  />
                  {(!!todayLog?.completed) && (
                    <HappinessTracker
                      currentRating={todayLog?.happinessRating}
                      onRate={handleRate}
                    />
                  )}
                </>
              ) : (
                <ExerciseCard
                  exercise={{} as BioExercise}
                  isCompleted={false}
                  onComplete={() => {}}
                  isLoading={true}
                />
              )}
            </div>
          )}

          {currentView === AppView.HISTORY && (
            <HistoryView logs={logs} />
          )}
        </main>

        <Navigation currentView={currentView} onChangeView={setCurrentView} />

      </div>
    </div>
  );
};

export default App;