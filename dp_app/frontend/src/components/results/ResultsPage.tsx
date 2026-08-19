import React from 'react';
import { PredictionResponse } from '../../types/api';
import { AssessmentAnswers } from '../../types/assessment';
import { RiskHero } from './RiskHero';
import { ShapFactorList } from './ShapFactorList';
import { ResponseRecap } from './ResponseRecap';
import { Disclaimer } from '../ui/Disclaimer';
import { ArrowLeft } from 'lucide-react';

interface ResultsPageProps {
  prediction: PredictionResponse;
  answers: AssessmentAnswers;
  onRestart: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  prediction,
  answers,
  onRestart,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
      {/* Navigation link back to survey edit */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Start New Assessment</span>
        </button>

        <span className="font-mono text-xs text-[var(--text-tertiary)] uppercase">
          Evaluation Report
        </span>
      </div>

      {/* Risk Probability Hero Card */}
      <RiskHero prediction={prediction} />

      {/* SHAP Feature Contribution List */}
      <ShapFactorList contributions={prediction.top_contributions} />

      {/* Medical Disclaimer Banner */}
      <Disclaimer />

      {/* Response Recap & Retake Action */}
      <ResponseRecap answers={answers} onRestart={onRestart} />
    </div>
  );
};
