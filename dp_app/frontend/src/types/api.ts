export type BinaryChoice = 'yes' | 'no';
export type SexChoice = 'male' | 'female';

export type AgeGroupChoice =
  | '18_24'
  | '25_29'
  | '30_34'
  | '35_39'
  | '40_44'
  | '45_49'
  | '50_54'
  | '55_59'
  | '60_64'
  | '65_69'
  | '70_74'
  | '75_79'
  | '80_plus';

export type GenHlthChoice =
  | 'excellent'
  | 'very_good'
  | 'good'
  | 'fair'
  | 'poor';

export type CheckupChoice =
  | 'within_past_year'
  | 'within_past_2_years'
  | 'within_past_5_years'
  | '5_plus_years_ago'
  | 'never';

export type SmokerChoice =
  | 'current_every_day'
  | 'current_some_days'
  | 'former_smoker'
  | 'never_smoked';

export type HeavyDrinkerChoice = 'not_heavy_drinker' | 'heavy_drinker';

export type IncomeChoice =
  | 'under_15k'
  | '15k_to_25k'
  | '25k_to_35k'
  | '35k_to_50k'
  | '50k_to_100k'
  | '100k_to_200k'
  | '200k_plus';

export type EducationChoice =
  | 'did_not_graduate_hs'
  | 'graduated_hs'
  | 'some_college_or_technical'
  | 'graduated_college';

export interface PatientInputPayload {
  _BMI5: number;
  _AGEG5YR: AgeGroupChoice;
  SEXVAR: SexChoice;
  GENHLTH: GenHlthChoice;
  CVDINFR4: BinaryChoice;
  CVDCRHD4: BinaryChoice;
  CVDSTRK3: BinaryChoice;
  PHYSHLTH: number;
  MENTHLTH: number;
  DIFFWALK: BinaryChoice;
  DECIDE: BinaryChoice;
  _TOTINDA: BinaryChoice;
  _SMOKER3: SmokerChoice;
  _RFDRHV9: HeavyDrinkerChoice;
  EXERANY2: BinaryChoice;
  _INCOMG1: IncomeChoice;
  _EDUCAG: EducationChoice;
  MEDCOST1: BinaryChoice;
  CHECKUP1: CheckupChoice;
  CHCKDNY2: BinaryChoice;
  ADDEPEV3: BinaryChoice;
  HAVARTH4: BinaryChoice;
  CHCCOPD3: BinaryChoice;
}

export interface PredictionResponse {
  risk_probability: number;
  flagged: boolean;
  threshold_used: number;
  base_value: number;
  top_contributions: Record<string, number>;
}
