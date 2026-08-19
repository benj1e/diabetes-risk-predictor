import { PatientInputPayload } from './api';

export type FeatureKey = keyof PatientInputPayload;

export type QuestionType = 'choice' | 'number';

export interface ChoiceOptionItem {
  label: string;
  value: string;
  description?: string;
}

export interface QuestionDefinition {
  id: FeatureKey;
  officialQuestion: string;
  shortLabel: string;
  description?: string;
  type: QuestionType;
  options?: ChoiceOptionItem[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
}

export interface AssessmentSection {
  id: string;
  number: string; // e.g. "01"
  title: string;
  description: string;
  pages: QuestionDefinition[][]; // array of pages, each page is array of questions
}

export type AssessmentAnswers = Partial<PatientInputPayload>;
