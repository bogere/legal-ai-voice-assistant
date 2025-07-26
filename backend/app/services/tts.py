import requests

ELEVENLABS_API_KEY = "your_elevenlabs_api_key"
voice_id = "21m00Tcm4TlvDq8ikWAM"  # Rachel

def synthesize_speech(text: str):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "text": text,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.5}
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        with open("/mnt/data/output.mp3", "wb") as f:
            f.write(response.content)
        return "/mnt/data/output.mp3"
    else:
        return None
