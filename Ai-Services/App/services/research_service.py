from App.services.llm_service import LLMService
from App.services.vector_service import VectorService

class ResearchService:

    def __init__(self, llm: LLMService, vector: VectorService):
        self.llm = llm
        self.vector = vector

    def run(self, query: str, mode: str = "thorough"):

        # 1️⃣ Retrieve relevant docs
        context_docs = self.vector.search(query)
        context = "\n\n".join(context_docs)

        # 2️⃣ Mode-based instruction
        if mode == "fast":
            instruction = "Provide a short and direct answer."
        else:
            instruction = "Provide a detailed and strategic analysis."

        # 3️⃣ Build RAG prompt
        prompt = f"""
        You are an Amazon growth expert.

        Use the following context to answer:

        {context}

        Question:
        {query}

        {instruction}
        """

        # 4️⃣ Generate answer
        return self.llm.generate(prompt)
