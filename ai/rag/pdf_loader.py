from pathlib import Path
import fitz


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from every page of a PDF.
    """

    path = Path(pdf_path)

    if not path.exists():
        raise FileNotFoundError(f"PDF not found: {path}")

    if path.suffix.lower() != ".pdf":
        raise ValueError("Input file must be a PDF.")

    document = fitz.open(path)

    pages = []

    for page_number, page in enumerate(document, start=1):
        text = page.get_text("text").strip()

        if text:
            pages.append(
                f"[PAGE {page_number}]\n{text}"
            )

    document.close()

    return "\n\n".join(pages)


def save_extracted_text(text: str, output_path: str) -> None:
    """
    Save extracted text to a UTF-8 text file.
    """

    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)

    output.write_text(text, encoding="utf-8")