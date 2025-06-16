from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate

class RAGPipeline:
    def __init__(self):
        # Initialize DeepSeek R1 models for embeddings and LLM
        self.embeddings = OllamaEmbeddings(model="deepseek-r1:1.5b")
        self.llm = OllamaLLM(model="deepseek-r1:1.5b")

        # Prompt template for RAG
        self.template = """Answer the following question using the provided context. If the answer is not in the context, say "I don't know."
Question: {question}
Context: {context}
Answer: """
        self.prompt = ChatPromptTemplate.from_template(self.template)

    def process_document(self, text):
        """
        Process a document and answer a question using RAG.
        
        Args:
            text (str): The extracted text from the PDF.
            question (str): The question to answer.
        
        Returns:
            tuple: (answer, context) - The generated answer and the retrieved context.
        """
        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100,
            add_start_index=True
        )
        chunks = text_splitter.split_text(text)

        # Create FAISS vector store
        self.vector_store = FAISS.from_texts(chunks, self.embeddings)
        
        # # Retrieve relevant documents
    def process_prompt(self,question):

        docs = self.vector_store.similarity_search(question, k=3)
        context = "\n\n".join([doc.page_content for doc in docs])

        # Generate answer using DeepSeek R1
        chain = self.prompt | self.llm
        answer = chain.invoke({"question": question, "context": context})

        return answer, context