from sqlalchemy import Column, Integer, String
from backend.app.database.database import Base


class Risk(Base):
    __tablename__ = "risks"

    id = Column(Integer, primary_key=True, index=True)
    severity = Column(String, nullable=False)
    description = Column(String, nullable=False)
