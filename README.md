# Diabetes Risk Predictor

a full-stack screening style ml app that estimates diabetes risk from self-reported health and lifestyle data (no lab bio-markers), and explains *why* it made that prediction.

**Live app:** [Diabetes Risk Predictor](https://diabetes-risk-predictor-seven.vercel.app/)

## What it does

- fill out a form with basic health info (BMI, age, general health, etc.)
- model returns a risk probability plus a breakdown of which factors pushed that number up or down.

## Why I built it

lovely afternoon taking a walk downtown, conversing with my dad he asked me if there was a way for computers to predict a person had diabetes before the fact, and it got me thinking maybe there is a way without the stress of going into labs, combined with my summer research which got me interested in ml models, larger datasets and the rest I got to working and I created my first iteration of the model, wrapped it in an API and organized a lil frontend for it. The model's still pretty juvenile, but its a start.

## Data

CDC BRFSS 2024 (Behavioral Risk Factor Surveillance System), a national health survey with 90K+ respondents. 20 features covering demographics, comorbidities, lifestyle, and functional health.

## How the model was built

- split train/test before any imputation, to avoid leaking test data into fill values
- compared SMOTE vs class weighting for the imbalance problem. SMOTE interpolates between data points, which doesn't make sense for categorical survey responses, so weighting (`scale_pos_weight`) won out
- XGBoost, tuned with RandomizedSearchCV (50 iterations, 5-fold CV, scored on PR-AUC since ROC-AUC is misleading on imbalanced data)
- classification threshold set to 0.40 instead of the default 0.50, prioritizing recall (~86%) since missing an at-risk person is worse than a false positive in a screening context
- SHAP (TreeExplainer) for per-prediction explainability

**Results:** ROC-AUC 0.81, PR-AUC 0.45. Ceiling on separability is expected here since this is self-reported survey data, not clinical/lab data.

## Architecture

```
├── backend/     FastAPI, serves the model + SHAP explanations via /predict
├── frontend/    React (Vite), form + results UI
```

- **Backend:** FastAPI, loads the trained XGBoost model and SHAP explainer, validates input with typed enums instead of raw numbers, returns risk probability + top feature contributions. Deployed on Render.
- **Frontend:** React, form for the input features, calls the API, renders the risk score and a breakdown of what drove it. Deployed on Vercel.

## Tech stack

Python, XGBoost, SHAP, scikit-learn, pandas, FastAPI, React, Vite, deployed on Render + Vercel.

## Notebook

The full modeling process, including EDA, preprocessing, model comparisons, and tuning, is in [`diabetic-prediction-model.ipynb`](https://github.com/benj1e/diabetes-risk-predictor/blob/3eeabb984a4cdc44413f22aa549d8d9470234fbc/diabetic_prediction_model.ipynb).

## What I'd do next

- explainability on the frontend beyond raw SHAP values, a cleaner visual for feature contributions
- multi-year BRFSS data for a larger training set and even more datasets than that like NHANES, CCHS
- model versioning so the API can swap models without frontend changes
- consider swapping model architecture for better performance too
