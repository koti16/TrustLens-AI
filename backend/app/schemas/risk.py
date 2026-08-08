from pydantic import BaseModel


class RiskCreate(BaseModel):
    severity: str
    description: str
