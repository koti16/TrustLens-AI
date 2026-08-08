from pydantic import BaseModel


class EvidenceCreate(BaseModel):
    source: str
    confidence: float = 0.0
