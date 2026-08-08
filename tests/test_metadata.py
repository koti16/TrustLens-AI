from ai.rag.metadata import create_chunk_metadata


def test_chunk_metadata():
    metadata = create_chunk_metadata(
        document_id="ISP-001",
        source="sample_policy.pdf",
        chunk_id=1,
        total_chunks=7,
    )

    assert metadata.document_id == "ISP-001"
    assert metadata.source == "sample_policy.pdf"
    assert metadata.chunk_id == 1
    assert metadata.total_chunks == 7

    print("Document ID:", metadata.document_id)
    print("Source:", metadata.source)
    print("Chunk:", metadata.chunk_id)
    print("Total chunks:", metadata.total_chunks)


if __name__ == "__main__":
    test_chunk_metadata()
    print("\nMetadata test passed.")