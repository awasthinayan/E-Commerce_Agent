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


class ResearchRequest(BaseModel):
    query: str
    mode: Optional[str] = "thorough"  # "fast" or "thorough"


@app.post("/research")
async def research(req: ResearchRequest):
    result = research_service.run(req.query, req.mode)

    content = result["choices"][0]["message"]["content"]

    return {
        "response": content,
        "tokens": result["usage"]["total_tokens"],
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
