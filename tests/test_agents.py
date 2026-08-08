from agents.orchestrator import Orchestrator


def test_orchestrator_run():
    orchestrator = Orchestrator()
    result = orchestrator.run('policy.pdf', ['access control'], ['evidence'])
    assert result['audit']['status'] == 'ok'
    assert result['compliance']['compliant'] is True
