from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
from sentence_transformers import SentenceTransformer
import uuid

class VectorService:

    def __init__(self):
        self.client = QdrantClient("localhost", port=6333)
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.collection_name = "product_knowledge"

        self._ensure_collection()

    def _ensure_collection(self):
        collections = self.client.get_collections().collections
        names = [c.name for c in collections]

        if self.collection_name not in names:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=384,
                    distance=Distance.COSINE,
                ),
            )

    def add_document(self, text: str):
        vector = self.model.encode(text).tolist()

        self.client.upsert(
            collection_name=self.collection_name,
            points=[
                PointStruct(
                    id=str(uuid.uuid4()),
                    vector=vector,
                    payload={"text": text},
                )
            ],
        )

    def search(self, query: str):

        query_vector = self.model.encode(query).tolist()

        search_result = self.client.query_points(
            collection_name=self.collection_name,
            query=query_vector,
            limit=3
        )

        return [
        point.payload["text"]
        for point in search_result.points
    ]

