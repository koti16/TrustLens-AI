from agents.auditor_agent import AuditorAgent
from agents.compliance_agent import ComplianceAgent
from agents.risk_agent import RiskAgent
from agents.remediation_agent import RemediationAgent


class Orchestrator:
    def __init__(self):
        self.auditor = AuditorAgent()
        self.compliance = ComplianceAgent()
        self.risk = RiskAgent()
        self.remediation = RemediationAgent()

    def run(self, document, requirements, evidence):
        audit = self.auditor.analyze(document)
        compliance = self.compliance.evaluate(requirements)
        risk = self.risk.assess(evidence)
        remediation = self.remediation.recommend([risk["risk_level"]])
        return {"audit": audit, "compliance": compliance, "risk": risk, "remediation": remediation}
