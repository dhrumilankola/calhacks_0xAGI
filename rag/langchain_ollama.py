from langchain_community.llms import Ollama
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import faiss
import os
from dotenv import load_dotenv

load_dotenv()

# Load the document
loader = PyPDFLoader('chemistry.pdf')
docs = loader.load()

# Split the document into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
documents = text_splitter.split_documents(docs)

# Create embeddings for the document chunks using SentenceTransformers
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
document_texts = [doc.page_content for doc in documents]
document_embeddings = model.encode(document_texts)

# Create a FAISS index and add document embeddings
dimension = document_embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(document_embeddings)

# Initialize the Ollama model
llm = Ollama(model="phi3:3.8b", callback_manager=CallbackManager([StreamingStdOutCallbackHandler()]))

# Function to perform a RAG query
def rag_query(query):
    # Generate embedding for the query
    query_embedding = model.encode([query])
    
    # Perform similarity search in the FAISS index
    _, retrieved_indices = index.search(query_embedding, k=1)
    
    if len(retrieved_indices[0]) > 0:
        context = documents[retrieved_indices[0][0]].page_content
        # Generate a response using the context
        prompt = f"Based on the following context, answer the question:\n\nContext: {context}\n\nQuestion: {query}\n\nAnswer:"
        response = llm.invoke(prompt)
        return response
    else:
        return "No relevant documents found."

# Example query
query = "List down the names of chapter in this book"
response = rag_query(query)
print(response)
