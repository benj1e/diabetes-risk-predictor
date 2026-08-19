export interface FeatureDisplayInfo {
  title: string;
  category: string;
  description: string;
  getInfluenceText: (val: number) => string;
}

export const FEATURE_LABELS: Record<string, FeatureDisplayInfo> = {
  _BMI5: {
    title: 'Body Mass Index (BMI)',
    category: 'Biometrics',
    description: 'Body mass index derived from weight and height.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Higher BMI contributed to an increase in the model’s risk estimate.'
        : 'Lower BMI contributed to a decrease in the model’s risk estimate.',
  },
  _AGEG5YR: {
    title: 'Age Bracket',
    category: 'Demographics',
    description: 'Demographic age range category.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Age profile contributed positively to the model’s risk score.'
        : 'Age profile contributed lower weight to the model’s risk score.',
  },
  SEXVAR: {
    title: 'Biological Sex',
    category: 'Demographics',
    description: 'Sex reported at birth.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Demographic sex factor slightly increased the estimated risk.'
        : 'Demographic sex factor slightly reduced the estimated risk.',
  },
  GENHLTH: {
    title: 'General Self-Reported Health',
    category: 'General Health',
    description: 'Subjective appraisal of current physical health.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Reported health status elevated the model’s risk calculation.'
        : 'Reported health status lowered the model’s risk calculation.',
  },
  CVDINFR4: {
    title: 'History of Heart Attack',
    category: 'Cardiovascular History',
    description: 'Prior myocardial infarction diagnosis.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'History of heart disease increased estimated risk.'
        : 'Absence of heart attack history reduced estimated risk.',
  },
  CVDCRHD4: {
    title: 'Coronary Heart Disease',
    category: 'Cardiovascular History',
    description: 'Prior angina or coronary artery disease diagnosis.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Coronary health history contributed to higher estimated risk.'
        : 'Absence of coronary disease reduced estimated risk.',
  },
  CVDSTRK3: {
    title: 'Stroke History',
    category: 'Cardiovascular History',
    description: 'Prior diagnosis of stroke.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Stroke history contributed positively to estimated risk.'
        : 'Absence of stroke history lowered estimated risk.',
  },
  PHYSHLTH: {
    title: 'Unfavorable Physical Days (Past 30 Days)',
    category: 'General Health',
    description: 'Self-reported days of poor physical health.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Higher reported physical illness days increased estimated risk.'
        : 'Lower reported physical illness days decreased estimated risk.',
  },
  MENTHLTH: {
    title: 'Unfavorable Mental Health Days',
    category: 'General Health',
    description: 'Self-reported days of emotional distress or mental fatigue.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Mental distress day frequency contributed upward to estimated risk.'
        : 'Fewer mental distress days lowered estimated risk.',
  },
  DIFFWALK: {
    title: 'Difficulty Walking or Climbing Stairs',
    category: 'Functional Mobility',
    description: 'Mobility limitations impacting physical activity.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Mobility limitation contributed to an increase in risk estimation.'
        : 'Unimpaired mobility contributed to a lower risk estimation.',
  },
  DECIDE: {
    title: 'Cognitive & Decision Concentration',
    category: 'Functional Well-being',
    description: 'Difficulty concentrating or making decisions.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Cognitive difficulty indicator increased model estimate.'
        : 'Absence of cognitive difficulty lowered model estimate.',
  },
  _TOTINDA: {
    title: 'Overall Physical Activity',
    category: 'Lifestyle',
    description: 'Participation in physical exercise outside regular work.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Lack of regular physical activity increased estimated risk.'
        : 'Active lifestyle participation decreased estimated risk.',
  },
  _SMOKER3: {
    title: 'Tobacco Smoking Habits',
    category: 'Lifestyle',
    description: 'Lifetime and current smoking status.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Smoking history increased the model’s risk contribution.'
        : 'Non-smoking status decreased the model’s risk contribution.',
  },
  _RFDRHV9: {
    title: 'Alcohol Consumption Level',
    category: 'Lifestyle',
    description: 'Weekly alcohol consumption threshold status.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Alcohol intake pattern contributed upward to risk estimate.'
        : 'Moderate/non-heavy alcohol status lowered risk estimate.',
  },
  EXERANY2: {
    title: 'Exercise in Past Month',
    category: 'Lifestyle',
    description: 'Recent exercise involvement (running, walking, sports).',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Lack of recent exercise contributed to higher risk calculation.'
        : 'Recent exercise participation contributed to lower risk calculation.',
  },
  _INCOMG1: {
    title: 'Household Income Bracket',
    category: 'Socioeconomic Factors',
    description: 'Annual household income group.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Income level profile influenced model estimate upward.'
        : 'Income level profile influenced model estimate downward.',
  },
  _EDUCAG: {
    title: 'Educational Attainment',
    category: 'Socioeconomic Factors',
    description: 'Highest level of formal education achieved.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Educational background factor contributed positively to risk score.'
        : 'Higher educational level contributed to a lower risk score.',
  },
  MEDCOST1: {
    title: 'Healthcare Cost Barriers',
    category: 'Healthcare Access',
    description: 'Inability to visit doctor in past year due to cost.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Financial barriers to care increased the model’s risk estimate.'
        : 'Unrestricted care access lowered the model’s risk estimate.',
  },
  CHECKUP1: {
    title: 'Routine Checkup Frequency',
    category: 'Healthcare Access',
    description: 'Time elapsed since last routine preventive doctor visit.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Longer interval since preventive checkup raised risk estimate.'
        : 'Regular preventive doctor visits lowered risk estimate.',
  },
  CHCKDNY2: {
    title: 'Kidney Disease Diagnosis',
    category: 'Comorbidities',
    description: 'Diagnosed kidney disease history.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Kidney disease history strongly increased estimated risk.'
        : 'Absence of kidney disease history lowered estimated risk.',
  },
  ADDEPEV3: {
    title: 'Depressive Disorder',
    category: 'Comorbidities',
    description: 'Diagnosed depression or mood disorder.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Depressive disorder history contributed upward to estimated risk.'
        : 'Absence of depressive disorder lowered estimated risk.',
  },
  HAVARTH4: {
    title: 'Arthritis Diagnosis',
    category: 'Comorbidities',
    description: 'Diagnosed arthritis, gout, or fibromyalgia condition.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'Arthritis diagnosis elevated the model risk score.'
        : 'Absence of arthritis diagnosis reduced the model risk score.',
  },
  CHCCOPD3: {
    title: 'COPD / Chronic Bronchitis',
    category: 'Comorbidities',
    description: 'Diagnosed chronic respiratory obstruction.',
    getInfluenceText: (val: number) =>
      val > 0
        ? 'COPD history increased the model’s risk score.'
        : 'Absence of COPD history reduced the model’s risk score.',
  },
};

export function getFeatureDisplayInfo(key: string): FeatureDisplayInfo {
  return (
    FEATURE_LABELS[key] || {
      title: key,
      category: 'Health Metric',
      description: 'Model risk predictor feature.',
      getInfluenceText: (val: number) =>
        val > 0
          ? 'Contributed positively to estimated risk.'
          : 'Contributed negatively to estimated risk.',
    }
  );
}
