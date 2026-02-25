from App.services.llm_service import LLMService
from App.services.vector_service import VectorService

class ResearchService:

    def __init__(self, llm: LLMService, vector: VectorService):
        self.llm = llm
        self.vector = vector

    def run(self, query: str, mode: str = "thorough", context: str = ""):

        # 1️⃣ Retrieve relevant docs from vector database
        context_docs = self.vector.search(query)
        context_from_db = "\n\n".join(context_docs)

        # 2️⃣ Mode-based instruction
        if mode == "fast":
            instruction = "Provide a short and direct answer."
        else:
            instruction = "Provide a detailed and strategic analysis."

        # 3️⃣ Build RAG prompt with conversation history
        # ✅ CHANGED: Now a generic E-commerce Agent, not Amazon-specific
        prompt = f"""
You are an experienced E-commerce Agent and business consultant. You help with all aspects of e-commerce including:
- Product research and optimization across all platforms (Amazon, Flipkart, Shopify, eBay, Etsy, WooCommerce, etc.)
- Pricing strategy and competitor analysis
- Marketing and advertising (SEO, PPC, social media, email marketing)
- Inventory management and supply chain
- Customer service and retention
- Analytics and KPI tracking (GMV, CAC, LTV, conversion rates, etc.)
- Multi-channel selling and marketplace management
- Brand building and content creation
- Logistics and fulfillment options

Previous conversation history (if any):
{context}

Knowledge base context:
{context_from_db}

User's current question:
{query}

{instruction}

Remember to acknowledge previous messages if relevant to the current question.
Be helpful, professional, and provide actionable insights.
"""

        # 4️⃣ Generate answer
        return self.llm.generate(prompt)