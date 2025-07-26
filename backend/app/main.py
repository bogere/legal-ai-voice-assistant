from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from app.data.loader import load_documents, split_documents
from app.services.embedder import embed_documents
from app.services.stt import transcribe_audio_url
from app.services.tts import synthesize_speech
from app.memory.memory import get_conversation_chain
from app.services.logger import log_conversation

app = FastAPI()
chain = get_conversation_chain()

@app.get("/ingest")
def ingest_docs():
    docs = load_documents("legal_docs/")
    splits = split_documents(docs)
    embed_documents(splits)
    return {"status": "success", "documents_loaded": len(docs), "chunks": len(splits)}

@app.post("/transcribe")
def transcribe_audio(file: UploadFile = File(...)):
    temp_path = f"/mnt/data/{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(file.file.read())
    return {"note": "Use WebSocket or upload to URL for live STT."}

@app.post("/speak")
def speak_text(text: str):
    mp3_path = synthesize_speech(text)
    if mp3_path:
        return {"status": "ok", "audio_path": mp3_path}
    else:
        return {"status": "error", "message": "TTS failed"}

class ChatRequest(BaseModel):
    input: str

@app.post("/chat")
def chat(req: ChatRequest):
    response = chain.run(req.input)
    log_conversation(req.input, response)
    return {"response": response}
