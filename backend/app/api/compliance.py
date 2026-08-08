from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_compliance_summary():
    return {"score": 87, "status": "compliant"}
