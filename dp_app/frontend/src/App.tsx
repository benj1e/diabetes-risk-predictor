import React, { useState, useEffect } from 'react';
import { Header } from './components/ui/Header';
import { LandingPage } from './components/landing/LandingPage';
import { AssessmentPage } from './components/assessment/AssessmentPage';
import { ResultsPage } from './components/results/ResultsPage';
import { AssessmentAnswers } from './types/assessment';
import { PatientInputPayload, PredictionResponse } from './types/api';
import { fetchDiabetesPrediction } from './lib/api';
import { validateAllAnswers } from './lib/validation';

type ViewMode = 'landing' | 'assessment' | 'results';

const STORAGE_KEY_ANSWERS = 'diabetes_risk_answers_v1';
const STORAGE_KEY_PREDICTION = 'diabetes_risk_prediction_v1';

export const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('landing');
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Restore stored session state on initial load
  useEffect(() => {
    try {
      const savedAnswers = sessionStorage.getItem(STORAGE_KEY_ANSWERS);
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      const savedPred = sessionStorage.getItem(STORAGE_KEY_PREDICTION);
      if (savedPred) {
        setPrediction(JSON.parse(savedPred));
      }
    } catch {
      // ignore storage parsing errors
    }
  }, []);

  // Sync answers state to sessionStorage
  const handleUpdateAnswers = (newAnswers: AssessmentAnswers) => {
    setAnswers(newAnswers);
    try {
      sessionStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(newAnswers));
    } catch {
      // ignore storage errors
    }
  };

  const handleStartAssessment = () => {
    setView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (targetView: 'landing' | 'assessment') => {
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (finalAnswers: AssessmentAnswers) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const validation = validateAllAnswers(finalAnswers);
    if (!validation.valid || !validation.payload) {
      setIsSubmitting(false);
      setSubmitError('Please answer all required questions before submitting.');
      return;
    }

    try {
      const result = await fetchDiabetesPrediction(validation.payload as PatientInputPayload);
      setPrediction(result);
      try {
        sessionStorage.setItem(STORAGE_KEY_PREDICTION, JSON.stringify(result));
      } catch {
        // ignore storage errors
      }
      setView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit prediction request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setPrediction(null);
    setSubmitError(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY_ANSWERS);
      sessionStorage.removeItem(STORAGE_KEY_PREDICTION);
    } catch {
      // ignore
    }
    setView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] antialiased selection:bg-[var(--accent-light)] selection:text-[var(--accent)]">
      <Header currentView={view} onNavigate={handleNavigate} />

      <main className="pb-16">
        {view === 'landing' && <LandingPage onStart={handleStartAssessment} />}

        {view === 'assessment' && (
          <AssessmentPage
            answers={answers}
            onUpdateAnswers={handleUpdateAnswers}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {view === 'results' && prediction && (
          <ResultsPage
            prediction={prediction}
            answers={answers}
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-6 text-xs text-[var(--text-tertiary)] font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            Diabetes Risk Predictor — For educational purposes only
          </div>
          <div>
            Not a substitute for medical advice
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
