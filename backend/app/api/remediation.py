from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_remediations():
    return [{"id": 1, "action": "Revoke unused admin privileges", "priority": "high"}]
