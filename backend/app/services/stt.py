import requests

ASSEMBLYAI_API_KEY = "your_assemblyai_api_key"
headers = {"authorization": ASSEMBLYAI_API_KEY}

def transcribe_audio_url(audio_url: str):
    endpoint = "https://api.assemblyai.com/v2/transcript"
    model = "universal"
    response = requests.post(endpoint, json={"audio_url": audio_url, "speech_model": model}, headers=headers)
    return response.json()
