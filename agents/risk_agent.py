class RiskAgent:
    def assess(self, evidence):
        return {"risk_level": "medium", "evidence_count": len(evidence)}
