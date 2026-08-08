from pathlib import Path


def parse_document(path: str) -> dict:
    text = Path(path).read_text(encoding="utf-8", errors="ignore") if Path(path).exists() else ""
    return {"path": path, "text_length": len(text)}
