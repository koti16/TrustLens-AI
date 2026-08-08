from sklearn.linear_model import LogisticRegression


def train_risk_model(X, y):
    model = LogisticRegression(max_iter=1000)
    model.fit(X, y)
    return model
