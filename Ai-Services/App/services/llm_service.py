import os
from urllib import response
from groq import Groq
import requests

class LLMService:

    def __init__(self):
        self.api_url = os.getenv("GROQ_API_URL")
        self.api_key = os.getenv("GROQ_API_KEY")
        self.timeout = 10  # seconds

    def generate(self, prompt: str):

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.5
        }

        try:
            response = requests.post(
                self.api_url,
                json=payload,
                headers=headers,
                timeout=self.timeout  # 🔥 Timeout protection
            )

            print("Status Code:", response.status_code)
            print("Groq Response:", response.text)

            if response.status_code != 200:
                print("Groq Error Body:", response.text)
                return f"Groq Error: {response.text}"
            
            return response.json()["choices"][0]["message"]["content"]

        except requests.exceptions.Timeout:
            return "⚠️ AI service timed out. Please try again."

        except requests.exceptions.RequestException as e:
            return f"⚠️ AI service error: {str(e)}"