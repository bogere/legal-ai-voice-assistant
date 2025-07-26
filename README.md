# 🧠 Legal Voice Agent

An AI-powered voice assistant specialized in the legal industry.  
It uses **AssemblyAI** for transcription, **RAG (Retrieval-Augmented Generation)** for grounded responses, and tracks conversation quality through logs, ratings, and corrections.

## 🚀 Features

- 🎙️ Voice input transcription using [AssemblyAI](https://www.assemblyai.com/)
- 🔍 Legal domain expertise with RAG-powered responses
- 📚 Conversation history with rating and correction support
- 🧠 Learns from corrections and feedback
- 🔐 JWT-based authentication
- 🗃️ PostgreSQL + SQLAlchemy + Alembic-ready structure

---

## 🏗️ Project Structure

```
voice-legal-agent/
│
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI endpoints
│   │   ├── auth.py             # Login/token logic
│   │   ├── database.py         # DB session manager
│   │   └── models/
│   │       └── log_entry.py    # SQLAlchemy model for logs
│   └── alembic/                # Alembic migrations (optional)
│
├── frontend/                   # (Optional) React UI
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/your-org/legal-voice-agent.git
cd voice-legal-agent/backend

# Create virtualenv
python3 -m venv venv && source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt
```

### 2. Configure Database

Edit `app/database.py` and update:

```python
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/legaldb"
```

Create tables:

```bash
alembic upgrade head
```

Or directly with SQLAlchemy:

```python
from app.models.log_entry import Base
from app.database import engine
Base.metadata.create_all(bind=engine)
```

---

## 🛡️ Authentication

Use `/token` endpoint to get a JWT access token:

```http
POST /token
Content-Type: application/x-www-form-urlencoded

username=admin&password=admin123
```

Then use this token in `Authorization` header:

```
Authorization: Bearer <token>
```

---

## 📡 API Endpoints

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | `/token`       | Login and get token     |
| GET    | `/logs`        | View all conversations  |
| POST   | `/logs/update` | Correct assistant reply |
| POST   | `/logs/rate`   | Rate assistant response |

---

## 📦 Deployment

You can run the app locally:

```bash
uvicorn app.main:app --reload
```

Or package with Docker (coming soon).

---

## 🧠 Powered By

- [FastAPI](https://fastapi.tiangolo.com/)
- [AssemblyAI](https://www.assemblyai.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Alembic](https://alembic.sqlalchemy.org/)
- [RAG architecture](https://www.pinecone.io/learn/retrieval-augmented-generation/)

---

## 📝 License

MIT License — © 2025 Bogere Goldsoft - Kazilab AI
