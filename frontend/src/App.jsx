import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, FileText, Sparkles, ArrowRight, Download, Loader2, ShieldCheck, FileType, AlertTriangle, X } from 'lucide-react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showWarning, setShowWarning] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/v1/draft-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to draft document');
      }

      const data = await response.json();
      setResult(data);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = (base64Data, filename, type) => {
    const link = document.createElement('a');
    link.href = `data:${type};base64,${base64Data}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const samplePrompts = [
    {
      title: "Loan Agreement",
      text: "Draft a Loan Agreement for ₹5,00,000 between Lender 'Rohit Gupta' and Borrower 'Akash Mehta'. The loan tenure is 12 months with an interest rate of 10%. Include clauses for repayment and default."
    },
    {
      title: "Rental Agreement",
      text: "Draft a House Rental Agreement for a 2BHK apartment located at '123 Park Avenue, Mumbai' between Landlord 'Empire Estates' and Tenant 'John Doe'. The monthly rent is ₹45,000 and the Security Deposit is ₹1,00,000. The lease duration is 11 months."
    },
    {
      title: "NDA",
      text: "Draft a Non-Disclosure Agreement (NDA) between 'InnovateAI Solutions' (Disclosing Party) and 'Sarah Connor' (Receiving Party). The purpose is for evaluating a potential merger. The confidentiality term should be 3 years."
    },
    {
      title: "Employment Contract",
      text: "Draft an Employment Contract for a 'Senior Python Developer' role at 'TechCorp Inc.' for candidate 'Alice Smith'. The annual salary is $120,000. Start date is 1st May 2024."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-legal-bg text-legal-text selection:bg-legal-accent/20 relative overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-subtle-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-legal-accent/5 via-transparent to-legal-accent/5 pointer-events-none animate-gradient" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-legal-accent/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />
      
      {/* Cold Start Warning */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="relative z-50 bg-orange-900/40 border-b border-orange-500/30 backdrop-blur-md"
          >
            <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-orange-200/90 text-xs md:text-sm font-mono">
                <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
                <p>
                  <span className="font-bold text-orange-400">Server Status:</span> Backend hosted on Render Free Tier. 
                  First request may take <span className="text-white">~50 seconds</span> to wake up (Cold Start).
                </p>
              </div>
              <button 
                onClick={() => setShowWarning(false)}
                className="p-1 hover:bg-orange-500/20 rounded-lg transition-colors text-orange-400 hover:text-orange-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 container mx-auto px-6 py-12 flex-grow flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-legal-surface border border-legal-border">
              <Scale className="w-6 h-6 text-legal-accent" />
            </div>
            <span className="font-mono text-sm tracking-[0.2em] text-legal-accent uppercase">Virtuon Legal AI</span>
          </div>
          
          <h1 className="font-serif text-6xl md:text-8xl font-medium tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 text-glow">
            Precision Legal <br /> Drafting
          </h1>
        </motion.div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Input */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full"
          >
            <div className="glass-panel rounded-2xl p-1.5 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-legal-accent/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
              
              <form onSubmit={handleSubmit} className="relative bg-legal-surface rounded-xl overflow-hidden border border-legal-border input-glow transition-all duration-300">
                <div className="p-6">
                  <label htmlFor="prompt" className="block font-mono text-xs text-legal-muted mb-2 uppercase tracking-wider">
                    Drafting Instructions
                  </label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the agreement, parties, and key terms..."
                    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none outline-none text-lg font-sans placeholder:text-legal-muted/50 min-h-[200px] resize-none"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="bg-black/20 px-6 py-4 flex justify-between items-center border-t border-legal-border">
                  <div className="flex gap-4 text-xs font-mono text-legal-muted">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3" />
                      ENCRYPTED
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3 h-3" />
                      DOCX & PDF
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className={`
                      flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300
                      ${isLoading 
                        ? 'bg-legal-border text-legal-muted cursor-not-allowed' 
                        : 'bg-gradient-to-r from-legal-accent to-[#D4B875] text-black hover:shadow-[0_0_30px_-5px_rgba(197,160,89,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                      }
                    `}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Drafting...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Draft</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 rounded-lg bg-red-900/20 border border-red-900/50 text-red-200 text-sm font-mono"
                >
                  Error: {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sample Prompts */}
            <div className="mt-10">
              <p className="text-xs font-mono text-legal-muted uppercase tracking-wider mb-4 pl-1">Try a Sample Prompt:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {samplePrompts.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(sample.text)}
                    className="text-left p-4 rounded-xl bg-legal-surface/50 border border-legal-border hover:border-legal-accent/50 hover:bg-legal-surface hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-legal-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-legal-text group-hover:text-legal-accent transition-colors font-serif tracking-wide">
                          {sample.title}
                        </span>
                        <ArrowRight className="w-3 h-3 text-legal-muted group-hover:text-legal-accent opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-xs text-legal-muted line-clamp-2 leading-relaxed group-hover:text-legal-muted/80">
                        {sample.text}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full h-full min-h-[600px]"
          >
            {result ? (
              <div className="h-full flex flex-col gap-4">
                <div className="flex justify-between items-center p-2 rounded-lg bg-legal-surface/50 border border-legal-border backdrop-blur-sm">
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="font-serif text-lg text-legal-text">Document Preview</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadFile(result.docx_base64, `${result.filename}.docx`, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-legal-bg border border-legal-border hover:border-blue-500/50 hover:text-blue-400 transition-all text-xs font-mono uppercase tracking-wider group"
                    >
                      <FileType className="w-4 h-4 text-legal-muted group-hover:text-blue-400 transition-colors" />
                      DOCX
                    </button>
                    <button
                      onClick={() => downloadFile(result.pdf_base64, `${result.filename}.pdf`, 'application/pdf')}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-legal-bg border border-legal-border hover:border-red-500/50 hover:text-red-400 transition-all text-xs font-mono uppercase tracking-wider group"
                    >
                      <FileType className="w-4 h-4 text-legal-muted group-hover:text-red-400 transition-colors" />
                      PDF
                    </button>
                  </div>
                </div>
                
                <div className="flex-grow rounded-xl overflow-hidden border border-legal-border bg-[#1a1a1a] relative shadow-2xl">
                  <iframe 
                    src={`data:application/pdf;base64,${result.pdf_base64}`}
                    className="w-full h-full min-h-[600px]"
                    title="PDF Preview"
                  />
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[600px] rounded-2xl border border-legal-border border-dashed flex flex-col items-center justify-center text-legal-muted bg-legal-surface/30 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-legal-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="p-6 rounded-full bg-legal-surface border border-legal-border mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <FileText className="w-12 h-12 text-legal-muted group-hover:text-legal-accent transition-colors duration-300" />
                </div>
                <p className="font-mono text-sm tracking-widest uppercase opacity-60">Document preview will appear here</p>
              </div>
            )}
          </motion.div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full text-center py-6">
        <p className="font-mono text-[10px] text-legal-muted uppercase tracking-widest opacity-50">
          Virtuon Technologies © 2025
        </p>
      </footer>
    </div>
  );
}

export default App;
