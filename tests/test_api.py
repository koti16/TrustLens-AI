from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get('/')
    assert response.status_code == 200
    assert 'TrustLens AI backend is running' in response.json()['message']
