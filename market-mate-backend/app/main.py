from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from utils import extract_text_from_pdf
from rag import RAGPipeline

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Initialize RAG pipeline
rag_pipeline = RAGPipeline()

@app.route('/analyse', methods=['POST'])
def analyse():
    try:
        # Check if a file is provided
        if 'file' not in request.files:
            logging.error("No file provided in request")
            return jsonify({"error": "No file provided"}), 400

        pdf_file = request.files['file']
        if not pdf_file.filename.endswith('.pdf'):
            logging.error("Uploaded file is not a PDF")
            return jsonify({"error": "File must be a PDF"}), 400

        # Extract text from PDF
        logging.info(f"Processing PDF: {pdf_file.filename}")
        text = extract_text_from_pdf(pdf_file)

        if not text.strip():
            logging.error("No text extracted from PDF")
            return jsonify({"error": "No text could be extracted from the PDF"}), 400

        # Get the question from the request (default if not provided)
        # question = request.form.get('prompt', 'What is the main topic of the document?')
        # logging.info(f"Received question: {question}")

        # Process the text and get the answer using RAG
        rag_pipeline.process_document(text)

        logging.info("Analysis completed successfully")
        return  jsonify({"done":"analysis done"})

    except Exception as e:
        logging.error(f"Error during analysis: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500





@app.route('/prompt', methods=['POST'])
def prompt():
    try:
        question = request.form.get('prompt', 'What is the main topic of the document?')
        logging.info(f"Received question: {question}")

        # Process the text and get the answer using RAG
        answer,context=rag_pipeline.process_prompt(question)

        logging.info("Analysis completed successfully")
        logging.info(answer)

        return jsonify({
            "question": question,
            "answer": answer,
            "context": context
        })

    except Exception as e:
        logging.error(f"Error during analysis: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == "__main__":
    logging.info("Starting Flask application")
    app.run(host='0.0.0.0', port=8000, debug=True)