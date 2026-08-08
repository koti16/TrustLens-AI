from backend.app.services.compliance_service import get_compliance_score


def test_compliance_service():
    assert get_compliance_score() == 87
