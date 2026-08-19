import React, { useState } from 'react';
import type { AssessmentAnswers } from '../../types/assessment';
import { ASSESSMENT_SECTIONS } from '../../lib/assessment-config';
import { isPageComplete, validatePageQuestions } from '../../lib/validation';
import { ProgressHeader } from '../ui/ProgressHeader';
import { QuestionCard } from './QuestionCard';
import { NavigationBar } from './NavigationBar';
import { Disclaimer } from '../ui/Disclaimer';

interface AssessmentPageProps {
  answers: AssessmentAnswers;
  onUpdateAnswers: (updated: AssessmentAnswers) => void;
  onSubmit: (finalAnswers: AssessmentAnswers) => Promise<void>;
  isSubmitting: boolean;
  submitError?: string | null;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  answers,
  onUpdateAnswers,
  onSubmit,
  isSubmitting,
  submitError,
}) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageErrors, setPageErrors] = useState<Record<string, string>>({});

  const currentSection = ASSESSMENT_SECTIONS[sectionIndex];
  const currentQuestions = currentSection.pages[pageIndex];

  // Calculate total questions & answered count
  const allQuestions = ASSESSMENT_SECTIONS.flatMap((s) => s.pages.flatMap((p) => p));
  const totalQuestions = allQuestions.length;
  const totalAnswered = allQuestions.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] !== null && (answers[q.id] as any) !== ''
  ).length;

  const isCurrentPageComplete = isPageComplete(currentQuestions, answers);
  const isFirstPage = sectionIndex === 0 && pageIndex === 0;
  const isLastPage =
    sectionIndex === ASSESSMENT_SECTIONS.length - 1 &&
    pageIndex === currentSection.pages.length - 1;

  const handleAnswerChange = (questionId: string, value: any) => {
    const nextAnswers = { ...answers, [questionId]: value };
    onUpdateAnswers(nextAnswers);

    // Clear error for this question if resolved
    if (pageErrors[questionId]) {
      const nextErrors = { ...pageErrors };
      delete nextErrors[questionId];
      setPageErrors(nextErrors);
    }
  };

  const handleNext = async () => {
    // Validate current page
    const errors = validatePageQuestions(currentQuestions, answers);
    if (Object.keys(errors).length > 0) {
      setPageErrors(errors);
      return;
    }

    setPageErrors({});

    if (isLastPage) {
      await onSubmit(answers);
    } else {
      if (pageIndex < currentSection.pages.length - 1) {
        setPageIndex(pageIndex + 1);
      } else if (sectionIndex < ASSESSMENT_SECTIONS.length - 1) {
        setSectionIndex(sectionIndex + 1);
        setPageIndex(0);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    } else if (sectionIndex > 0) {
      const prevSecIndex = sectionIndex - 1;
      setSectionIndex(prevSecIndex);
      setPageIndex(ASSESSMENT_SECTIONS[prevSecIndex].pages.length - 1);
    }
    setPageErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <div>
        {/* Progress Header */}
        <ProgressHeader
          sections={ASSESSMENT_SECTIONS}
          currentSectionIndex={sectionIndex}
          currentPageIndex={pageIndex}
          totalAnswered={totalAnswered}
          totalQuestions={totalQuestions}
        />

        {/* Question Cards Container */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
          {submitError && (
            <div className="p-4 border border-[var(--risk-high-border)] bg-[var(--risk-high-bg)] text-[var(--risk-high)] rounded-sm text-sm font-sans font-medium">
              {submitError}
            </div>
          )}

          <div className="space-y-6">
            {currentQuestions.map((q, idx) => (
              <QuestionCard
                key={q.id}
                question={q}
                value={answers[q.id]}
                onChange={(val) => handleAnswerChange(q.id, val)}
                error={pageErrors[q.id]}
                questionIndexOnPage={idx}
              />
            ))}
          </div>

          <div className="pt-4">
            <Disclaimer compact />
          </div>
        </main>
      </div>

      {/* Sticky Action Controls */}
      <NavigationBar
        canGoBack={!isFirstPage}
        canContinue={isCurrentPageComplete}
        isLastPage={isLastPage}
        isSubmitting={isSubmitting}
        onBack={handleBack}
        onContinue={handleNext}
      />
    </div>
  );
};
