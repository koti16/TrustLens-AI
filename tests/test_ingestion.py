from ai.rag.ingestion import create_embeddings_for_chunks


def test_ingestion():

    chunks = [
        "Access control must follow the principle of least privilege.",
        "Passwords must contain at least 12 characters.",
        "Sensitive data must be encrypted.",
    ]

    results = create_embeddings_for_chunks(
        chunks=chunks,
        document_id="ISP-001",
        source="sample_policy.pdf",
    )

    assert len(results) == 3

    for result in results:
        assert "text" in result
        assert "embedding" in result
        assert "metadata" in result

        assert len(result["embedding"]) == 384

    assert results[0]["metadata"].document_id == "ISP-001"
    assert results[0]["metadata"].chunk_id == 1
    assert results[2]["metadata"].chunk_id == 3

    print("Chunks:", len(results))
    print("Embedding dimensions:", len(results[0]["embedding"]))
    print("Document:", results[0]["metadata"].document_id)
    print("Source:", results[0]["metadata"].source)

    print("\nIngestion test passed.")


if __name__ == "__main__":
    test_ingestion()