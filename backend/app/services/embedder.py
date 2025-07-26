from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS

def embed_documents(splits, persist_path="vector_store/faiss_index"):
    embeddings = OpenAIEmbeddings()
    db = FAISS.from_documents(splits, embeddings)
    db.save_local(persist_path)
    return db
