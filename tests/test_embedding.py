

from ai.rag.embedding import EmbeddingModel


def test_embedding():

    model = EmbeddingModel()

    text = "Access control must follow the principle of least privilege."

    vector = model.embed_text(text)

    print("Embedding dimensions:", len(vector))

    assert len(vector) == 384
    assert isinstance(vector, list)

    print("Embedding test passed.")


if __name__ == "__main__":
    test_embedding()