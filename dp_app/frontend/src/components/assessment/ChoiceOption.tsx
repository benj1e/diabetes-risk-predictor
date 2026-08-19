import React from 'react';
import { Check } from 'lucide-react';

interface ChoiceOptionProps {
  label: string;
  value: string;
  description?: string;
  isSelected: boolean;
  onSelect: (val: string) => void;
}

export const ChoiceOption: React.FC<ChoiceOptionProps> = ({
  label,
  value,
  description,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`w-full text-left p-4 rounded-sm border transition-all cursor-pointer flex items-start gap-4 ${
        isSelected
          ? 'border-[var(--accent)] bg-[var(--accent-light)] shadow-xs'
          : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)]'
      }`}
    >
      {/* Radio indicator */}
      <div
        className={`w-5 h-5 rounded-xs border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
          isSelected
            ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
            : 'border-[var(--border-strong)] bg-[var(--bg-main)]'
        }`}
      >
        {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
      </div>

      {/* Label and description */}
      <div className="space-y-0.5 flex-1">
        <div
          className={`text-sm sm:text-base font-semibold leading-snug ${
            isSelected ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-primary)]'
          }`}
        >
          {label}
        </div>
        {description && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </button>
  );
};
