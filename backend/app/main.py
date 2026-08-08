from fastapi import FastAPI
from backend.app.api import documents, requirements, evidence, compliance, risks, remediation, dashboard

app = FastAPI(title="TrustLens AI API", version="0.1.0")

app.include_router(documents.router, prefix="/documents", tags=["documents"])
app.include_router(requirements.router, prefix="/requirements", tags=["requirements"])
app.include_router(evidence.router, prefix="/evidence", tags=["evidence"])
app.include_router(compliance.router, prefix="/compliance", tags=["compliance"])
app.include_router(risks.router, prefix="/risks", tags=["risks"])
app.include_router(remediation.router, prefix="/remediation", tags=["remediation"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])

@app.get("/")
def read_root():
    return {"message": "TrustLens AI backend is running"}
