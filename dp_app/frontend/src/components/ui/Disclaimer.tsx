import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface DisclaimerProps {
  compact?: boolean;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ compact = false }) => {
  return (
    <div
      className={`border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] rounded-sm font-sans ${
        compact ? 'p-3 text-xs' : 'p-4 sm:p-5 text-xs sm:text-sm'
      }`}
    >
      <div className="flex gap-3 items-start">
        <ShieldAlert className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[var(--text-primary)] block">
            Medical Disclaimer & Limitations
          </span>
          <p className="leading-relaxed">
            This assessment is for informational and educational purposes only. It is not a medical diagnosis and does not replace professional medical advice. Always consult a qualified healthcare professional about any health concerns or before making decisions related to your health.
          </p>
        </div>
      </div>
    </div>
  );
};
