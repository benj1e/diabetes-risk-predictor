import React from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface NavigationBarProps {
  canGoBack: boolean;
  canContinue: boolean;
  isLastPage: boolean;
  isSubmitting?: boolean;
  onBack: () => void;
  onContinue: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  canGoBack,
  canContinue,
  isLastPage,
  isSubmitting = false,
  onBack,
  onContinue,
}) => {
  return (
    <div className="sticky bottom-0 z-30 w-full border-t border-[var(--border-color)] bg-[var(--bg-main)]/95 backdrop-blur-sm py-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack || isSubmitting}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono tracking-wider uppercase border rounded-sm transition-colors cursor-pointer ${
            canGoBack && !isSubmitting
              ? 'border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)]'
              : 'border-transparent text-[var(--text-tertiary)] opacity-40 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        {/* Continue / Evaluate Button */}
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue || isSubmitting}
          className={`inline-flex items-center gap-2.5 px-6 py-2.5 text-xs font-mono font-semibold tracking-wider uppercase text-white rounded-sm transition-all shadow-xs cursor-pointer ${
            canContinue && !isSubmitting
              ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)]'
              : 'bg-[var(--border-strong)] text-[var(--text-tertiary)] opacity-60 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Calculating Model Risk...</span>
            </>
          ) : isLastPage ? (
            <>
              <span>Evaluate Risk Profile</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
