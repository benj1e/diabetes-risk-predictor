import React, { useState } from 'react';
import { AssessmentAnswers } from '../../types/assessment';
import { ASSESSMENT_SECTIONS } from '../../lib/assessment-config';
import { RotateCcw, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface ResponseRecapProps {
  answers: AssessmentAnswers;
  onRestart: () => void;
}

export const ResponseRecap: React.FC<ResponseRecapProps> = ({ answers, onRestart }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 rounded-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            <FileText className="w-4 h-4 text-[var(--accent)]" />
            Your Responses
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Review what you answered
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-3.5 py-2 text-xs font-mono tracking-wider uppercase border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] hover:border-[var(--border-strong)] rounded-sm cursor-pointer inline-flex items-center gap-2"
          >
            <span>{isOpen ? 'Hide Responses' : 'View All Responses'}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="px-4 py-2 text-xs font-mono font-semibold tracking-wider uppercase text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-sm cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Survey</span>
          </button>
        </div>
      </div>

      {/* Expanded response list */}
      {isOpen && (
        <div className="space-y-6 pt-2">
          {ASSESSMENT_SECTIONS.map((sec) => (
            <div key={sec.id} className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border-color)] pb-1">
                {sec.number} — {sec.title}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sec.pages.flatMap((page) =>
                  page.map((q) => {
                    const rawVal = answers[q.id];
                    let displayVal = String(rawVal ?? 'Not answered');

                    if (q.type === 'choice' && q.options) {
                      const matched = q.options.find((o) => o.value === rawVal);
                      if (matched) displayVal = matched.label;
                    } else if (q.unit && rawVal !== undefined) {
                      displayVal = `${rawVal} ${q.unit}`;
                    }

                    return (
                      <div
                        key={q.id}
                        className="p-3 border border-[var(--border-color)] bg-[var(--bg-main)] rounded-xs space-y-1 text-xs"
                      >
                        <div className="text-[var(--text-secondary)] font-mono text-[11px]">
                          {q.shortLabel}
                        </div>
                        <div className="font-bold text-[var(--text-primary)] font-sans">
                          {displayVal}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
