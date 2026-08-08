from ai.rag.embedding import EmbeddingModel
from ai.rag.metadata import create_chunk_metadata


def create_embeddings_for_chunks(
    chunks: list[str],
    document_id: str,
    source: str,
) -> list[dict]:

    if not chunks:
        return []

    embedding_model = EmbeddingModel()

    embeddings = embedding_model.embed_chunks(chunks)

    total_chunks = len(chunks)

    results = []

    for index, (chunk, embedding) in enumerate(
        zip(chunks, embeddings),
        start=1,
    ):
        metadata = create_chunk_metadata(
            document_id=document_id,
            source=source,
            chunk_id=index,
            total_chunks=total_chunks,
        )

        results.append(
            {
                "text": chunk,
                "embedding": embedding,
                "metadata": metadata,
            }
        )

    return results
