from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_evidence():
    return [{"id": 1, "source": "training_records.csv", "confidence": 0.92}]
