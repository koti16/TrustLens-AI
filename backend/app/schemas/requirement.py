from pydantic import BaseModel


class RequirementCreate(BaseModel):
    title: str
    category: str
