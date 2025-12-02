import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.core.config import settings

def create_app() -> FastAPI:
    app = FastAPI(
        title="Legal Drafting Engine",
        description="Production-grade LLM API for legal document generation.",
        version="1.0.0"
    )

    # CORS settings (Allow all for internal dev/intern tasks)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register Routes
    app.include_router(router, prefix="/api/v1", tags=["Drafting"])

    @app.get("/health", tags=["Health"])
    def health_check():
        return {
            "status": "operational", 
            "env": settings.ENVIRONMENT,
            "version": "1.0.0"
        }

    return app

app = create_app()

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host=settings.HOST, 
        port=settings.PORT, 
        reload=(settings.ENVIRONMENT == "development")
    )