from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_requirements():
    return [{"id": 1, "title": "Access Control", "category": "IAM"}]
