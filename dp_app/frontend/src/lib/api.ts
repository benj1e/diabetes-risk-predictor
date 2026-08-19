import { PatientInputPayload, PredictionResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchDiabetesPrediction(
  payload: PatientInputPayload
): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let msg = 'The risk evaluation service returned an error. Please try again.';
      try {
        const parsed = JSON.parse(errorText);
        if (parsed.detail) {
          msg = typeof parsed.detail === 'string' ? parsed.detail : 'Invalid input format.';
        }
      } catch {
        // use generic error message
      }
      throw new Error(msg);
    }

    const data: PredictionResponse = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Unable to connect to the prediction server. Please verify the backend API is running.'
      );
    }
    throw error;
  }
}
