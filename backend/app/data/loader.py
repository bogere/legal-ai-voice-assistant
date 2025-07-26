import os
from typing import List
from langchain.document_loaders import TextLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

def load_documents(folder_path: str) -> List[str]:
    docs = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".txt"):
            loader = TextLoader(os.path.join(folder_path, filename))
        elif filename.endswith(".pdf"):
            loader = PyPDFLoader(os.path.join(folder_path, filename))
        else:
            continue
        documents = loader.load()
        docs.extend(documents)
    return docs

def split_documents(documents):
    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
    return splitter.split_documents(documents)
