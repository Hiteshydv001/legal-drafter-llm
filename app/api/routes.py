import os
import base64
from fastapi import APIRouter, HTTPException, BackgroundTasks, status
from fastapi.responses import JSONResponse
from app.schemas.models import DraftRequest
from app.services.llm_service import LegalLLMService
from app.services.doc_service import DocumentService
from app.core.exceptions import LLMGenerationError, DocumentCreationError
from app.core.logger import get_logger

router = APIRouter()
logger = get_logger("API_Routes")

# Initialize services
llm_service = LegalLLMService()
doc_service = DocumentService()

def cleanup_files(paths: list):
    """Background task to remove temporary files after download."""
    for path in paths:
        try:
            if os.path.exists(path):
                os.remove(path)
                logger.info(f"Cleaned up file: {path}")
        except Exception as e:
            logger.error(f"Error cleaning up file {path}: {e}")

@router.post("/draft-document", status_code=status.HTTP_200_OK)
async def draft_document(request: DraftRequest, background_tasks: BackgroundTasks):
    """
    Endpoint to draft a legal document.
    1. Processes prompt via LLM + RAG.
    2. Generates .docx and .pdf files.
    3. Returns base64 encoded content for both.
    """
    try:
        # Step 1: AI Generation
        legal_data = llm_service.generate_draft(request.prompt)
        
        # Step 2: Document Construction
        docx_path = doc_service.create_docx(legal_data)
        pdf_path = doc_service.create_pdf(legal_data)
        
        # Step 3: Read files to base64
        with open(docx_path, "rb") as f:
            docx_b64 = base64.b64encode(f.read()).decode('utf-8')
            
        with open(pdf_path, "rb") as f:
            pdf_b64 = base64.b64encode(f.read()).decode('utf-8')

        # Step 4: Schedule Cleanup
        background_tasks.add_task(cleanup_files, [docx_path, pdf_path])
        
        # Step 5: Response
        return JSONResponse(content={
            "docx_base64": docx_b64,
            "pdf_base64": pdf_b64,
            "filename": f"Legal_Draft_{os.path.basename(docx_path).split('_')[2]}"
        })

    except LLMGenerationError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except DocumentCreationError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected API error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")