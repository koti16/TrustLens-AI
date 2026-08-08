from dataclasses import dataclass


@dataclass
class ChunkMetadata:
    document_id: str
    source: str
    chunk_id: int
    total_chunks: int


def create_chunk_metadata(
    document_id: str,
    source: str,
    chunk_id: int,
    total_chunks: int,
) -> ChunkMetadata:
    return ChunkMetadata(
        document_id=document_id,
        source=source,
        chunk_id=chunk_id,
        total_chunks=total_chunks,
    )