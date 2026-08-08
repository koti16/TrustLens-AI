from pydantic import BaseModel


class RemediationCreate(BaseModel):
    action: str
    priority: str
