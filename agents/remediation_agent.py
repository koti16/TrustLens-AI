class RemediationAgent:
    def recommend(self, risks):
        return [{"action": f"Mitigate {risk}", "priority": "high"} for risk in risks]
