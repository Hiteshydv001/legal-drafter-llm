class LegalDrafterException(Exception):
    """Base exception for the application."""
    pass

class LLMGenerationError(LegalDrafterException):
    """Raised when OpenAI/LangChain fails to generate content."""
    pass

class DocumentCreationError(LegalDrafterException):
    """Raised when python-docx fails to build the file."""
    pass