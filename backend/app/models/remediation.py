from sqlalchemy import Column, Integer, String
from backend.app.database.database import Base


class Remediation(Base):
    __tablename__ = "remediations"

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String, nullable=False)
    priority = Column(String, nullable=False)
