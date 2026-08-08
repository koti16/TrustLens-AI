from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_risks():
    return [{"id": 1, "severity": "high", "description": "Excessive privileged access"}]
