import pdfplumber

def extract_text_from_pdf(pdf_file):
    """
    Extract text from a PDF file using pdfplumber.
    pdf_file: The uploaded PDF file object.
    Returns:
        str: The extracted text.
    """
    try:
        with pdfplumber.open(pdf_file) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text
    except Exception as e:
        raise Exception(f"Failed to extract text from PDF: {str(e)}")