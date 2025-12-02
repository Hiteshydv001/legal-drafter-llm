from pydantic import BaseModel, Field
from typing import List

# --- Input Model ---
class DraftRequest(BaseModel):
    prompt: str = Field(
        ..., 
        min_length=10,
        description="User's description of the legal document requirements.",
        example="Draft a Loan Agreement for 50,000 USD between John Doe and Jane Smith."
    )

# --- Output Models (LLM Structure) ---
class LegalClause(BaseModel):
    heading: str = Field(..., description="The short heading of the clause (e.g., 'Governing Law')")
    content: str = Field(..., description="The full legal text body of the clause")

class LegalDocument(BaseModel):
    title: str = Field(..., description="The main title of the document in Uppercase")
    introductory_clause: str = Field(..., description="The opening paragraph identifying parties and date")
    clauses: List[LegalClause] = Field(..., description="List of all legal clauses")
    signature_blocks: List[str] = Field(..., description="List of titles for signatories (e.g., 'Lender', 'Borrower')")