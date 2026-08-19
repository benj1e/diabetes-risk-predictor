import React from 'react';
import { PredictionResponse } from '../../types/api';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface RiskHeroProps {
  prediction: PredictionResponse;
}

export const RiskHero: React.FC<RiskHeroProps> = ({ prediction }) => {
  const probaPercent = Math.round(prediction.risk_probability * 100);
  const thresholdPercent = Math.round(prediction.threshold_used * 100);
  const isFlagged = prediction.flagged;

  return (
    <div className="border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 sm:p-10 rounded-sm space-y-8 shadow-xs">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent)]">
            Your Result
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-1">
            Estimated Diabetes Risk
          </h1>
        </div>

        {/* Flagged Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs border text-xs font-mono font-bold uppercase tracking-wider ${
            isFlagged
              ? 'border-[var(--risk-high-border)] bg-[var(--risk-high-bg)] text-[var(--risk-high)]'
              : 'border-[var(--risk-low-border)] bg-[var(--risk-low-bg)] text-[var(--risk-low)]'
          }`}
        >
          {isFlagged ? (
            <>
              <AlertTriangle className="w-4 h-4" />
              <span>Elevated Risk Flagged</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Low / Standard Risk</span>
            </>
          )}
        </div>
      </div>

      {/* Primary Metric & Scale Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Large Typographic Percentage */}
        <div className="md:col-span-5 space-y-2 border-b md:border-b-0 md:border-r border-[var(--border-color)] pb-6 md:pb-0 md:pr-8">
          <div className="text-6xl sm:text-7xl font-bold font-mono tracking-tighter text-[var(--text-primary)]">
            {probaPercent}
            <span className="text-3xl font-normal text-[var(--text-secondary)]">%</span>
          </div>
          <div className="text-xs font-mono text-[var(--text-secondary)]">
            Estimated risk probability
          </div>
        </div>

        {/* Horizontal Risk Scale Visualizer */}
        <div className="md:col-span-7 space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <span>Low (&lt;25%)</span>
              <span>Moderate (25–39%)</span>
              <span>Elevated (≥40%)</span>
            </div>

            {/* Scale Bar */}
            <div className="relative h-4 w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xs overflow-hidden">
              {/* Threshold indicator line at 40% */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[var(--text-primary)] z-10"
                style={{ left: `${thresholdPercent}%` }}
                title={`Model Threshold: ${thresholdPercent}%`}
              />

              {/* Score Fill Bar */}
              <div
                className={`h-full transition-all duration-700 ${
                  isFlagged ? 'bg-[var(--risk-high)]' : 'bg-[var(--risk-low)]'
                }`}
                style={{ width: `${probaPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] font-mono text-[var(--text-tertiary)] pt-1">
              <span>0%</span>
              <span className="font-semibold text-[var(--text-primary)]">
                ▲ Threshold cutoff: {thresholdPercent}%
              </span>
              <span>100%</span>
            </div>
          </div>

          {/* Plain Language Interpretation */}
          <div className="p-4 border border-[var(--border-color)] bg-[var(--bg-main)] text-xs text-[var(--text-secondary)] leading-relaxed space-y-2 font-sans rounded-xs">
            <div className="flex items-center gap-2 font-mono font-bold text-[var(--text-primary)]">
              <Info className="w-4 h-4 text-[var(--accent)]" />
              What this means
            </div>
            <p>
              Based on your answers, the model estimated a{' '}
              <strong className="text-[var(--text-primary)]">{probaPercent}% probability</strong> of diabetes risk.
              {isFlagged ? (
                <span>
                  {' '}
                  This is above the assessment's {thresholdPercent}% decision threshold, which means the result is flagged as elevated risk.
                </span>
              ) : (
                <span>
                  {' '}
                  This is below the assessment's {thresholdPercent}% decision threshold, placing your profile in the standard range.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
