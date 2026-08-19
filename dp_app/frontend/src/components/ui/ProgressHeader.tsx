import React from 'react';
import { AssessmentSection } from '../../types/assessment';

interface ProgressHeaderProps {
  sections: AssessmentSection[];
  currentSectionIndex: number;
  currentPageIndex: number;
  totalAnswered: number;
  totalQuestions: number;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  sections,
  currentSectionIndex,
  currentPageIndex,
  totalAnswered,
  totalQuestions,
}) => {
  const currentSection = sections[currentSectionIndex];
  const totalPagesInSection = currentSection.pages.length;
  const currentQuestionsOnPage = currentSection.pages[currentPageIndex]?.length || 0;

  // Calculate overall percentage
  const progressPercent = Math.min(100, Math.round((totalAnswered / totalQuestions) * 100));

  return (
    <div className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-color)] py-5 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Section title and step counter */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 font-mono text-xs font-bold text-white bg-[var(--accent)] rounded-xs">
              SECTION {currentSection.number}
            </span>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)]">
              {currentSection.title}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
            <span>
              Page <strong className="text-[var(--text-primary)]">{currentPageIndex + 1}</strong> of{' '}
              {totalPagesInSection}
            </span>
            <span className="text-[var(--border-strong)]">•</span>
            <span>
              <strong className="text-[var(--text-primary)]">{currentQuestionsOnPage}</strong>{' '}
              {currentQuestionsOnPage === 1 ? 'question' : 'questions'}
            </span>
          </div>
        </div>

        {/* Integrated Section Stepper & Progress Line */}
        <div className="space-y-2">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {sections.map((sec, idx) => {
              const isCompleted = idx < currentSectionIndex;
              const isCurrent = idx === currentSectionIndex;

              return (
                <div key={sec.id} className="space-y-1">
                  <div
                    className={`h-1.5 w-full rounded-xs transition-all ${
                      isCompleted
                        ? 'bg-[var(--accent)]'
                        : isCurrent
                        ? 'bg-[var(--accent)] opacity-90'
                        : 'bg-[var(--border-color)]'
                    }`}
                  />
                  <div
                    className={`text-[10px] font-mono tracking-wider truncate hidden md:block ${
                      isCurrent
                        ? 'text-[var(--text-primary)] font-bold'
                        : isCompleted
                        ? 'text-[var(--text-secondary)]'
                        : 'text-[var(--text-tertiary)]'
                    }`}
                  >
                    {sec.number} {sec.title.split('&')[0].trim()}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-[var(--text-tertiary)] pt-1">
            <span>Overall Progress</span>
            <span>
              {totalAnswered} / {totalQuestions} answered ({progressPercent}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
