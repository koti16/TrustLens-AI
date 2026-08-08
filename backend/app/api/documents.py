from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_documents():
    return [{"id": 1, "name": "sample_security_policy.pdf", "status": "processed"}]
