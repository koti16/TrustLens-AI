class Embedder:
    def __init__(self, model_name: str = "sentence-transformers/default"):
        self.model_name = model_name

    def embed(self, text: str) -> list[float]:
        return [float(len(text))]
