import numpy as np


def build_features(records: list[dict]) -> np.ndarray:
    return np.array([[len(record) for record in records]], dtype=float)
