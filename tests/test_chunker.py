from pathlib import Path

from ai.rag.chunker import chunk_text


INPUT_PATH = Path("data/processed/sample_policy.txt")


def test_real_document_chunking():
    text = INPUT_PATH.read_text(encoding="utf-8")

    chunks = chunk_text(
        text,
        chunk_size=500,
        overlap=50
    )

    assert text.strip()
    assert len(chunks) > 1
    assert all(chunk.strip() for chunk in chunks)
    assert all(len(chunk) <= 500 for chunk in chunks)

    print(f"Original characters: {len(text)}")
    print(f"Number of chunks: {len(chunks)}")

    for index, chunk in enumerate(chunks, start=1):
        print(f"\n--- Chunk {index} ---")
        print(chunk[:200])


if __name__ == "__main__":
    test_real_document_chunking()
    print("\nChunking test passed.")