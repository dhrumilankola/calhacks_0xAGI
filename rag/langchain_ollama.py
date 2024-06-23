from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain.prompts import ChatPromptTemplate
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

# Load the document
loader = PyPDFLoader('chemistry.pdf')
data = loader.load()

# Split the document into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
all_splits = text_splitter.split_documents(data)

# Create embeddings for the document chunks using SentenceTransformers
embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

# Add to ChromaDB vector store
vectorstore = Chroma.from_documents(
    documents=all_splits,
    collection_name="rag-chroma",
    embedding=embeddings,
)
retriever = vectorstore.as_retriever()

# Define the question relevant to the chemistry book
question = "You are a Q&A assistant. Your goal is to answer questions as accurately as possible based on the instructions and context provided."

# Perform similarity search in the vector store
docs = retriever.similarity_search(question)
len(docs)

# Prompt template
template = """Answer the question based only on the following context:
{context}

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

# Initialize the Ollama model
ollama_llm = "phi3:3.8b"
model_local = ChatOllama(model=ollama_llm, callback_manager=CallbackManager([StreamingStdOutCallbackHandler()]))

# Define the processing chain
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | model_local
    | StrOutputParser()
)

# Invoke the chain with a chemistry-related question
response = chain.invoke("Explain the concept of chemical bonding.")
print(response)
