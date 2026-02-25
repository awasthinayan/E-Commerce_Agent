# ============================================
# FILE: main.py (Updated)
# ============================================

import os
from urllib import response
from groq import Groq
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

from App.services.llm_service import LLMService
from App.services.research_service import ResearchService
from App.services.vector_service import VectorService
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

llm_service = LLMService()
vector_service = VectorService()
research_service = ResearchService(llm_service, vector_service)


# ✅ UPDATED: Accept context parameter
class ResearchRequest(BaseModel):
    query: str
    mode: Optional[str] = "thorough"
    context: Optional[str] = ""  # ✅ NEW: Conversation history


@app.post("/research")
async def research(req: ResearchRequest):

    # ✅ Pass context to research service
    result = research_service.run(req.query, req.mode, req.context)

    # If result is full LLM JSON
    if isinstance(result, dict) and "choices" in result:
        content = result["choices"][0]["message"]["content"]
        tokens = result.get("usage", {}).get("total_tokens", 0)

    # If result is already extracted text
    else:
        content = result
        tokens = 0

    return {
        "response": content,
        "tokens": tokens,
        "cost": 0,
        "confidence": 0.95
    }


@app.post("/seed")
def seed_data():

    try:
        vector_service.client.delete_collection("product_knowledge")
    except:
        pass

    # 🔥 Recreate collection
    vector_service._ensure_collection()

    vector_service.add_document(
        "Amazon ranking drops due to poor CTR and low conversion rate."
    )
    vector_service.add_document(
        "Competitor pricing significantly affects Buy Box eligibility."
    )
    vector_service.add_document(
        "Amazon SEO requires optimized keywords in title and bullet points."
    )

    return {"message": "Seed data inserted successfully"}
