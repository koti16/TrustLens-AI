from ai.rag.pdf_loader import extract_text_from_pdf, save_extracted_text


PDF_PATH = "data/policies/sample_policy.pdf"
OUTPUT_PATH = "data/processed/sample_policy.txt"


text = extract_text_from_pdf(PDF_PATH)

print("Characters extracted:", len(text))
print()
print(text[:1000])

save_extracted_text(text, OUTPUT_PATH)

print()
print(f"Saved extracted text to: {OUTPUT_PATH}")