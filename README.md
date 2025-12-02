# Legal Drafter LLM (Virtuon Legal AI)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11-blue.svg)
![React](https://img.shields.io/badge/react-18.2-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green.svg)
![Gemini](https://img.shields.io/badge/AI-Gemini%202.0%20Flash-orange.svg)

A production-grade legal document generation engine powered by **Google Gemini 2.0 Flash**. This application leverages **RAG (Retrieval Augmented Generation)** to draft precise, context-aware legal documents such as contracts, agreements, and NDAs. It features a visually stunning "Cyber-Legal" frontend interface with real-time PDF previews.

## 🚀 Features

- **🤖 Advanced AI Drafting**: Utilizes Google's Gemini 2.0 Flash model for high-quality, legally sound text generation.
- **📚 RAG Architecture**: Enhances accuracy by retrieving domain-specific context from a local knowledge base (`data/legal_knowledge.json`).
- **📄 Dual Format Output**: Instantly generates both editable **DOCX** and professional **PDF** formats.
- **👁️ Real-time Preview**: Integrated PDF viewer allows users to review documents immediately within the UI.
- **✨ Modern UI/UX**: A high-end React interface featuring:
  - Glassmorphism & Neomorphism design elements.
  - Smooth Framer Motion animations.
  - "Cyber-Legal" dark mode aesthetic.
  - Interactive sample prompts.
- **🔒 Secure & Structured**: Uses Pydantic models to ensure consistent document structure (Title, Clauses, Signatories).

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11
- **AI/LLM**: LangChain, Google Generative AI (Gemini 2.0 Flash)
- **Document Processing**: ReportLab (PDF), Python-Docx (Word)
- **Validation**: Pydantic

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### DevOps
- **Containerization**: Docker
- **Deployment**: Render (Backend), Vercel (Frontend)

## 📂 Project Structure

```
legal-drafter-llm/
├── app/                    # Backend Application
│   ├── api/                # API Routes
│   ├── core/               # Config & Logging
│   ├── services/           # Business Logic (LLM, Doc Gen)
│   ├── schemas/            # Pydantic Models
│   ├── templates/          # Prompt Templates
│   └── main.py             # Entry Point
├── data/                   # RAG Knowledge Base
│   └── legal_knowledge.json
├── frontend/               # React Frontend
│   ├── src/                # Components & Pages
│   ├── public/             # Static Assets
│   └── vite.config.js      # Vite Configuration
├── output/                 # Generated Documents (Temp)
├── Dockerfile              # Backend Docker Config
├── requirements.txt        # Python Dependencies
└── README.md               # Project Documentation
```

## ⚡ Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Google AI Studio API Key (Gemini)

### 1. Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/legal-drafter-llm.git
    cd legal-drafter-llm
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    GOOGLE_API_KEY=your_gemini_api_key_here
    ENVIRONMENT=development
    HOST=0.0.0.0
    PORT=8000
    ```

5.  **Run the Backend:**
    ```bash
    python main.py
    ```
    The API will be available at `http://localhost:8000`.

### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The UI will be available at `http://localhost:5173`.

## 🐳 Docker Setup

You can containerize the backend for easy deployment.

1.  **Build the Docker Image:**
    ```bash
    docker build -t legal-drafter-backend .
    ```

2.  **Run the Container:**
    ```bash
    docker run -p 8000:8000 --env-file .env legal-drafter-backend
    ```

## 🌍 Deployment

### Backend (Render)
1.  Push code to GitHub.
2.  Create a new **Web Service** on Render.
3.  Select **Docker** as the runtime.
4.  Add `GOOGLE_API_KEY` to Environment Variables.

### Frontend (Vercel)
1.  Push code to GitHub.
2.  Import project to Vercel.
3.  Set Root Directory to `frontend`.
4.  Add Environment Variable: `VITE_API_URL=https://your-backend-url.onrender.com` (no trailing slash).

## 📝 Usage

1.  Open the frontend application.
2.  Enter a prompt in the text area (e.g., *"Draft a Non-Disclosure Agreement between Company A and Employee B"*).
3.  Click **Generate Draft**.
4.  Wait for the AI to process and generate the document.
5.  Preview the PDF directly in the browser.
6.  Download the **DOCX** or **PDF** file.

## 📄 License

This project is licensed under the MIT License.
