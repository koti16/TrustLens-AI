from ai.ml.feature_engineering import build_features
from ai.ml.risk_model import train_risk_model
from ai.ml.anomaly_detector import detect_anomalies


def test_feature_engineering():
    features = build_features([{'a': 1}, {'b': 2}])
    assert features.shape[0] == 1


def test_train_risk_model():
    model = train_risk_model([[0], [1]], [0, 1])
    assert model is not None


def test_detect_anomalies():
    anomalies = detect_anomalies([0.1, 0.9, 0.2])
    assert anomalies == [0.9]
