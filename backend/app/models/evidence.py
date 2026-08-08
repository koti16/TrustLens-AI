from sqlalchemy import Column, Integer, String, Float
from backend.app.database.database import Base


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False)
    confidence = Column(Float, default=0.0)
