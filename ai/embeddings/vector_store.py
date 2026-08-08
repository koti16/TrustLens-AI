class VectorStore:
    def __init__(self):
        self.items = []

    def add(self, text: str, vector: list[float]):
        self.items.append({"text": text, "vector": vector})

    def search(self, query_vector: list[float], top_k: int = 3):
        return self.items[:top_k]
