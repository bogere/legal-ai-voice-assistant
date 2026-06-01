# 🧠 LexAI 

An AI-powered voice assistant specialized in the legal industry.  
It uses **AssemblyAI** for transcription, **RAG (Retrieval-Augmented Generation)** for grounded responses, and tracks conversation quality through logs, ratings, and corrections.


### Problem statement
Uganda's legal ecosystem remains difficult to navigate for many citizens, businesses, and institutions. Legal information is spread across constitutions, acts, regulations, policies, and court decisions, making it time-consuming to access, interpret, and apply. For SMEs and startups in particular, legal support is often too expensive or unavailable until a problem has already occurred. Many businesses operate with poorly understood contracts, limited compliance awareness, and inadequate legal protection.
While artificial intelligence tools have become more common, they are not designed around Ugandan law and often present challenges such as inaccurate legal information, hallucinations, confidentiality concerns, and shallow analysis of legal documents. This limits their usefulness in professional legal environments and reduces trust among users.
As Uganda continues its digital transformation journey, there is a growing need for a trusted, locally grounded legal intelligence platform that can help individuals, businesses, legal practitioners, and government institutions access, understand, analyze, and work with legal information more effectively. Addressing this gap has the potential to improve legal accessibility, strengthen compliance, support business formalization, and contribute to a more efficient and digitally enabled legal ecosystem.

### Solution
LexAI is a Ugandan legal intelligence platform designed to make legal information more accessible, understandable, and actionable for citizens, businesses, legal practitioners, and government institutions. Built on verified Ugandan legal data, including laws, regulations, policies, and judicial decisions, the platform combines artificial intelligence with trusted legal sources to help users navigate legal and compliance challenges with greater confidence.
The solution enables users to upload and analyze legal documents, identify risks and obligations, receive simplified explanations of complex legal language, and access legal information grounded in Ugandan law. Unlike generic AI tools, LexAI is being designed with a strong focus on trust, confidentiality, source verification, and legal accuracy to address the concerns that currently limit the adoption of AI in legal practice.

By reducing the time, cost, and complexity associated with legal processes, LexAI aims to support SME growth, strengthen compliance, improve access to legal knowledge, and contribute to Uganda's digital transformation agenda. The platform serves as both a professional legal productivity tool and a public legal access resource, helping bridge the gap between legal systems and the people they are meant to serve.



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


## Team 
Mukitale Frank - Business Operation
Bogere Goldsoft - Technical 

## 📝 License

MIT License — © 2025 Bogere Goldsoft - Kazilab AI
