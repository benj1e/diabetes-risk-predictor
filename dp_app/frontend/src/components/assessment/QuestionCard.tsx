import React from 'react';
import { QuestionDefinition } from '../../types/assessment';
import { ChoiceOption } from './ChoiceOption';
import { AlertCircle } from 'lucide-react';

interface QuestionCardProps {
  question: QuestionDefinition;
  value: any;
  onChange: (val: any) => void;
  error?: string;
  questionIndexOnPage: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  onChange,
  error,
  questionIndexOnPage,
}) => {
  return (
    <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 rounded-sm space-y-6">
      {/* Official BRFSS Question Heading */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-wider uppercase">
            Q{questionIndexOnPage + 1} • {question.shortLabel}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)] leading-snug">
          "{question.officialQuestion}"
        </h3>

        {question.description && (
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans pt-1">
            {question.description}
          </p>
        )}
      </div>

      {/* Inputs */}
      {question.type === 'choice' && question.options && (
        <div className="space-y-2.5">
          {question.options.map((opt) => (
            <ChoiceOption
              key={opt.value}
              label={opt.label}
              value={opt.value}
              description={opt.description}
              isSelected={value === opt.value}
              onSelect={(val) => onChange(val)}
            />
          ))}
        </div>
      )}

      {question.type === 'number' && (
        <div className="space-y-3 max-w-sm">
          <div className="relative">
            <input
              type="number"
              min={question.min}
              max={question.max}
              step={question.step || 1}
              value={value !== undefined && value !== null ? value : ''}
              onChange={(e) => {
                const val = e.target.value;
                onChange(val === '' ? '' : Number(val));
              }}
              placeholder={question.placeholder || 'Enter value'}
              className="w-full px-4 py-3 border border-[var(--border-strong)] bg-[var(--bg-main)] text-[var(--text-primary)] font-mono text-base rounded-sm focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            />
            {question.unit && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--text-tertiary)] pointer-events-none">
                {question.unit}
              </span>
            )}
          </div>

          <div className="text-[11px] font-mono text-[var(--text-tertiary)] flex justify-between">
            <span>Minimum: {question.min}</span>
            <span>Maximum: {question.max}</span>
          </div>
        </div>
      )}

      {/* Validation Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-xs text-[var(--risk-high)] bg-[var(--risk-high-bg)] border border-[var(--risk-high-border)] p-3 rounded-sm font-sans font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
