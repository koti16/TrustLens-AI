from ai.nlp.document_parser import parse_document
from ai.nlp.text_cleaner import clean_text
from ai.nlp.requirement_extractor import extract_requirements


def test_parse_document(tmp_path):
    sample = tmp_path / 'sample.txt'
    sample.write_text('This policy covers access control and logging.', encoding='utf-8')
    result = parse_document(str(sample))
    assert result['text_length'] > 0


def test_clean_text():
    assert clean_text('  This   is   clean  ') == 'This is clean'


def test_extract_requirements():
    requirements = extract_requirements('First rule. Second rule. Third rule.')
    assert len(requirements) == 3
