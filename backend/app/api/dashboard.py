from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_dashboard():
    return {"summary": "Multiple controls require attention", "open_items": 5}
