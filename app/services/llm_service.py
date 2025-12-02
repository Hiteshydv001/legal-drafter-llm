import json
import os
from typing import Dict
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from app.core.config import settings
from app.core.logger import get_logger
from app.core.exceptions import LLMGenerationError
from app.schemas.models import LegalDocument
from app.templates.prompts import SYSTEM_PROMPT

logger = get_logger("LLM_Service")

class LegalLLMService:
    def __init__(self):
        try:
            self.llm = ChatGoogleGenerativeAI(
                model="gemini-2.0-flash",
                temperature=0.1, 
                google_api_key=settings.GOOGLE_API_KEY
            )
            self.knowledge_base = self._load_knowledge_base()
        except Exception as e:
            logger.critical(f"Failed to initialize LLM Service: {e}")
            raise

    def _load_knowledge_base(self) -> Dict[str, str]:
        """Loads RAG data from JSON file."""
        path = os.path.join("data", "legal_knowledge.json")
        try:
            with open(path, "r") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Could not load knowledge base: {e}")
            return {}

    def _retrieve_context(self, prompt: str) -> str:
        """Simple keyword-based RAG retrieval."""
        prompt_lower = prompt.lower()
        context_parts = []
        
        # Check keys in knowledge base against prompt keywords
        for key, value in self.knowledge_base.items():
            if key in prompt_lower:
                context_parts.append(value)
        
        if not context_parts:
            return "Standard Contract Law applies."
            
        return "\n".join(context_parts)

    def generate_draft(self, user_prompt: str) -> LegalDocument:
        logger.info(f"Generating draft for prompt: {user_prompt[:30]}...")
        
        try:
            context = self._retrieve_context(user_prompt)
            
            prompt_template = ChatPromptTemplate.from_messages([
                ("system", SYSTEM_PROMPT),
                ("human", "{input}")
            ])

            # Force Structured Output
            structured_llm = self.llm.with_structured_output(LegalDocument)
            chain = prompt_template | structured_llm
            
            result = chain.invoke({"context": context, "input": user_prompt})
            return result
            
        except Exception as e:
            logger.error(f"LLM Generation failed: {str(e)}")
            raise LLMGenerationError(f"AI processing failed: {str(e)}")