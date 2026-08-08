def detect_anomalies(values: list[float]) -> list[float]:
    return [value for value in values if value > 0.8]
