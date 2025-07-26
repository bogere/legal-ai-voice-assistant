import json
from datetime import datetime

LOG_PATH = "/mnt/data/conversation_log.json"

def log_conversation(user_input, assistant_reply, metadata=None):
    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "user_input": user_input,
        "assistant_reply": assistant_reply,
        "metadata": metadata or {}
    }
    try:
        with open(LOG_PATH, "r") as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []

    data.append(entry)

    with open(LOG_PATH, "w") as f:
        json.dump(data, f, indent=2)
