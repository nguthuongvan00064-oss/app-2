import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getCompanyById } from '../data/mockCompanies';
import { Bot, Send, X, Sparkles, User, MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const PRESET_QUESTIONS = [
  "Why is Apple's ROE higher than Samsung?",
  "Compare Tesla and BYD growth.",
  "Explain ROA vs ROE.",
  "Summarize Vinamilk financial health.",
  "Which company has better net margins?"
];

export const AiChatWidget: React.FC = () => {
  const { aiChatOpen, setAiChatOpen, selectedCompanyIds } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am your AI Financial Analyst. Ask me anything about financial ratios, valuation, growth, margins, or company comparisons.'
    }
  ]);

  if (!aiChatOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent AI response
    setTimeout(() => {
      let aiText = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('roe')) {
        aiText = "Return on Equity (ROE) measures how efficiently a management team uses shareholder capital to generate profits. Apple's ROE (147.2%) is exceptionally high due to aggressive share buyback programs reducing total equity baseline, alongside asset-light services revenue.";
      } else if (qLower.includes('tesla') || qLower.includes('byd')) {
        aiText = "Tesla vs BYD Comparison: BYD leads global New Energy Vehicle volume (+34.2% YoY growth) driven by in-house Blade Battery manufacturing. Tesla maintains higher gross automotive margins, real-world FSD autonomous data advantage, and zero net debt balance sheet resilience.";
      } else if (qLower.includes('vinamilk')) {
        aiText = "Vinamilk (VNM) is Vietnam's premier dairy leader with 55%+ domestic market share. It boasts a pristine balance sheet ($980M cash), low debt, 24.8% ROE, and a high 5.4% dividend payout yield.";
      } else if (qLower.includes('roa')) {
        aiText = "ROA (Return on Assets) measures net profit relative to total company assets (including debt-financed assets), whereas ROE measures profit relative solely to shareholder equity. High leverage inflates ROE but leaves ROA lower.";
      } else {
        aiText = `Based on current financial statements, comparing ${selectedCompanyIds.join(', ').toUpperCase()} reveals significant margin differences. High ROE combined with robust free cash flow generation signals durable economic moats.`;
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiText }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md glass-panel bg-[#0d121d]/95 border-2 border-cyan-500/40 rounded-3xl p-5 shadow-2xl space-y-4 animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Bot className="w-4 h-4 text-cyan-400 animate-bounce" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white">Company Compare AI Assistant</h4>
            <p className="text-[10px] font-mono text-cyan-400">FINANCIAL INTELLIGENCE AGENT</p>
          </div>
        </div>

        <button
          onClick={() => setAiChatOpen(false)}
          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Preset Quick Questions */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {PRESET_QUESTIONS.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 shrink-0 transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Window */}
      <div className="h-64 overflow-y-auto space-y-3 pr-1 text-xs">
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex items-start gap-2 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${m.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-cyan-500 text-black'}`}>
              {m.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
            </div>
            <div
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-purple-900/60 text-white border border-purple-500/30'
                  : 'bg-slate-900 text-slate-200 border border-slate-800'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI about financial performance, ROE, margins..."
          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          onClick={() => handleSend()}
          className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold transition-all hover:scale-105"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
