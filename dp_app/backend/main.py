from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Literal
import joblib
import pandas as pd
from enum import Enum

app = FastAPI(title="Diabetes Risk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://diabetes-risk-predictor-seven.vercel.app"],  # lock this down to your frontend's domain once deployed
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model/diabetes_risk_model.pkl")
explainer = joblib.load("model/diabetes_shap_explainer.pkl")

FEATURE_ORDER = [
    "_BMI5",
    "_AGEG5YR",
    "SEXVAR",
    "GENHLTH",
    "CVDINFR4",
    "CVDCRHD4",
    "CVDSTRK3",
    "PHYSHLTH",
    "MENTHLTH",
    "DIFFWALK",
    "DECIDE",
    "_TOTINDA",
    "_SMOKER3",
    "_RFDRHV9",
    "EXERANY2",
    "_INCOMG1",
    "_EDUCAG",
    "MEDCOST1",
    "CHECKUP1",
    "CHCKDNY2",
    "ADDEPEV3",
    "HAVARTH4",
    "CHCCOPD3",
]


class LabelCodeEnum(str, Enum):
    """Enum base where the value is the label string and each member exposes a `.code` float."""

    def __new__(cls, label: str, code: float):
        obj = str.__new__(cls, label)
        obj._value_ = label
        obj.code = code # type: ignore
        return obj


class BinaryField(LabelCodeEnum):
    yes = ("yes", 1.0)
    no = ("no", 2.0)


class SexVar(LabelCodeEnum):
    male = ("male", 1.0)
    female = ("female", 2.0)


class GenHlth(LabelCodeEnum):
    excellent = ("excellent", 1.0)
    very_good = ("very_good", 2.0)
    good = ("good", 3.0)
    fair = ("fair", 4.0)
    poor = ("poor", 5.0)


class Checkup(LabelCodeEnum):
    within_past_year = ("within_past_year", 1.0)
    within_past_2_years = ("within_past_2_years", 2.0)
    within_past_5_years = ("within_past_5_years", 3.0)
    _5_plus_years_ago = ("5_plus_years_ago", 4.0)
    never = ("never", 8.0)


class Smoker(LabelCodeEnum):
    current_every_day = ("current_every_day", 1.0)
    current_some_days = ("current_some_days", 2.0)
    former_smoker = ("former_smoker", 3.0)
    never_smoked = ("never_smoked", 4.0)


class Rfdrhv9(LabelCodeEnum):
    not_heavy_drinker = ("not_heavy_drinker", 1.0)
    heavy_drinker = ("heavy_drinker", 2.0)


class Incomg1(LabelCodeEnum):
    under_15k = ("under_15k", 1.0)
    _15k_to_25k = ("15k_to_25k", 2.0)
    _25k_to_35k = ("25k_to_35k", 3.0)
    _35k_to_50k = ("35k_to_50k", 4.0)
    _50k_to_100k = ("50k_to_100k", 5.0)
    _100k_to_200k = ("100k_to_200k", 6.0)
    _200k_plus = ("200k_plus", 7.0)


class Educag(LabelCodeEnum):
    did_not_graduate_hs = ("did_not_graduate_hs", 1.0)
    graduated_hs = ("graduated_hs", 2.0)
    some_college_or_technical = ("some_college_or_technical", 3.0)
    graduated_college = ("graduated_college", 4.0)


class Ageg5yr(LabelCodeEnum):
    _18_24 = ("18_24", 1.0)
    _25_29 = ("25_29", 2.0)
    _30_34 = ("30_34", 3.0)
    _35_39 = ("35_39", 4.0)
    _40_44 = ("40_44", 5.0)
    _45_49 = ("45_49", 6.0)
    _50_54 = ("50_54", 7.0)
    _55_59 = ("55_59", 8.0)
    _60_64 = ("60_64", 9.0)
    _65_69 = ("65_69", 10.0)
    _70_74 = ("70_74", 11.0)
    _75_79 = ("75_79", 12.0)
    _80_plus = ("80_plus", 13.0)


class PatientInput(BaseModel):
    BMI5: float = Field(
        title="Body Mass Index", description="BMI of the patient", alias="_BMI5"
    )
    AGEG5YR: Ageg5yr = Field(
        title="Age Group", description="Age group of the patient", alias="_AGEG5YR"
    )
    SEXVAR: SexVar = Field(title="Sex", description="Sex of the patient")
    GENHLTH: GenHlth = Field(
        title="General Health", description="General health status of the patient"
    )
    CVDINFR4: BinaryField = Field(
        title="History of Heart Disease", description="History of heart disease"
    )
    CVDCRHD4: BinaryField = Field(
        title="Coronary Heart Disease", description="Coronary heart disease status"
    )
    CVDSTRK3: BinaryField = Field(
        title="Stroke History", description="History of stroke"
    )
    PHYSHLTH: float = Field(
        title="Physical Health", description="Physical health status"
    )
    MENTHLTH: float = Field(title="Mental Health", description="Mental health status")
    DIFFWALK: BinaryField = Field(
        title="Difficulty Walking", description="Difficulty walking status"
    )
    DECIDE: BinaryField = Field(
        title="Decision Making", description="Decision making ability"
    )
    TOTINDA: BinaryField = Field(
        title="Total Activity", description="Total physical activity", alias="_TOTINDA"
    )
    SMOKER3: Smoker = Field(
        title="Smoking Status", description="Smoking status", alias="_SMOKER3"
    )
    RFDRHV9: Rfdrhv9 = Field(
        title="Drinking Status", description="Drinking status", alias="_RFDRHV9"
    )
    EXERANY2: BinaryField = Field(
        title="Exercise Status", description="Exercise status"
    )
    INCOMG1: Incomg1 = Field(
        title="Income Group",
        description="Income group of the patient",
        alias="_INCOMG1",
    )
    EDUCAG: Educag = Field(
        title="Education Level",
        description="Education level of the patient",
        alias="_EDUCAG",
    )
    MEDCOST1: BinaryField = Field(
        title="Medical Cost", description="Medical cost status"
    )
    CHECKUP1: Checkup = Field(title="Checkup Status", description="Checkup status")
    CHCKDNY2: BinaryField = Field(
        title="Chronic Disease Status", description="Chronic disease status"
    )
    ADDEPEV3: BinaryField = Field(
        title="Dependence Status", description="Dependence status"
    )
    HAVARTH4: BinaryField = Field(
        title="Arthritis Status", description="Arthritis status"
    )
    CHCCOPD3: BinaryField = Field(title="COPD Status", description="COPD status")

    # Pydantic v2 config to allow population by field name when aliases are used
    model_config = {"populate_by_name": True}


THRESHOLD = 0.40


@app.post("/predict")
async def predict(patient: PatientInput):
    # produce a dict keyed by BRFSS feature names (aliases) and convert enum members to numeric codes
    raw = patient.model_dump(by_alias=True)
    mapped = {}
    for f in FEATURE_ORDER:
        val = raw.get(f)
        if val is None:
            mapped[f] = None
        elif isinstance(val, LabelCodeEnum):
            mapped[f] = float(val.code) # type: ignore
        elif isinstance(val, Enum) and hasattr(val, "code"):
            mapped[f] = float(getattr(val, "code"))
        elif isinstance(val, (int, float)):
            mapped[f] = float(val)
        else:
            mapped[f] = val

    row = pd.DataFrame([mapped])[FEATURE_ORDER]

    proba = float(model.predict_proba(row)[0][1])
    flagged = proba >= THRESHOLD

    shap_vals = explainer.shap_values(row)
    contributions = dict(zip(FEATURE_ORDER, shap_vals[0].tolist()))
    sorted_contributions = dict(
        sorted(contributions.items(), key=lambda x: abs(x[1]), reverse=True)
    )

    return {
        "risk_probability": proba,
        "flagged": flagged,
        "threshold_used": THRESHOLD,
        "base_value": float(explainer.expected_value),
        "top_contributions": dict(list(sorted_contributions.items())[:8]),
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
