def extract_requirements(text: str) -> list[str]:
    sentences = [sentence.strip() for sentence in text.split('.') if sentence.strip()]
    return sentences[:5]
