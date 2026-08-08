from backend.app.models.document import Document


def create_document(name: str, status: str = "pending") -> Document:
    return Document(name=name, status=status)
