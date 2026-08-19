import { AssessmentAnswers } from '../types/assessment';
import { PatientInputPayload } from '../types/api';
import { ASSESSMENT_SECTIONS } from './assessment-config';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateQuestionAnswer(field: keyof PatientInputPayload, value: any): string | null {
  if (value === undefined || value === null || value === '') {
    return 'This question requires an answer before continuing.';
  }

  if (field === '_BMI5') {
    const num = Number(value);
    if (isNaN(num)) return 'Please enter a valid numeric BMI.';
    if (num < 10.0 || num > 85.0) return 'BMI must be between 10.0 and 85.0 kg/m².';
  }

  if (field === 'PHYSHLTH' || field === 'MENTHLTH') {
    const num = Number(value);
    if (isNaN(num)) return 'Please enter a valid number of days.';
    if (num < 0 || num > 30) return 'Days must be an integer between 0 and 30.';
  }

  return null;
}

export function validatePageQuestions(
  questions: { id: keyof PatientInputPayload }[],
  answers: AssessmentAnswers
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const q of questions) {
    const err = validateQuestionAnswer(q.id, answers[q.id]);
    if (err) {
      errors[q.id] = err;
    }
  }
  return errors;
}

export function isPageComplete(
  questions: { id: keyof PatientInputPayload }[],
  answers: AssessmentAnswers
): boolean {
  return questions.every((q) => validateQuestionAnswer(q.id, answers[q.id]) === null);
}

export function validateAllAnswers(answers: AssessmentAnswers): {
  valid: boolean;
  errors: Record<string, string>;
  payload?: PatientInputPayload;
} {
  const errors: Record<string, string> = {};

  for (const section of ASSESSMENT_SECTIONS) {
    for (const page of section.pages) {
      for (const q of page) {
        const err = validateQuestionAnswer(q.id, answers[q.id]);
        if (err) {
          errors[q.id] = err;
        }
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  // Cast payload cleanly
  return {
    valid: true,
    errors: {},
    payload: answers as PatientInputPayload,
  };
}
