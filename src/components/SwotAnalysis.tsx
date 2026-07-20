import React, { useState } from 'react';
import { Company } from '../types/company';
import { ShieldCheck, AlertTriangle, Lightbulb, ShieldAlert, Sparkles } from 'lucide-react';

interface SwotAnalysisProps {
  companies: Company[];
}

export const SwotAnalysis: React.FC<SwotAnalysisProps> = ({ companies }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(companies[0]?.id || 'apple');

  if (companies.length === 0) return null;

  const currentCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 shadow-2xl">
      
      {/* Top Header & Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Automated AI SWOT Matrix</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Automated strategic analysis evaluating internal strengths, weaknesses, external opportunities, and market threats.</p>
        </div>

        {/* Company Selector Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {companies.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCompanyId(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                selectedCompanyId === c.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <img src={c.logo} alt={c.name} className="w-4 h-4 rounded-full" />
              <span>{c.ticker}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SWOT Quadrant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Strengths */}
        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>STRENGTHS (Internal Advantages)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-200 list-disc list-inside">
            {currentCompany.swot.strengths.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="text-slate-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="glass-card p-5 rounded-2xl border border-rose-500/30 bg-rose-950/20 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>WEAKNESSES (Internal Vulnerabilities)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-200 list-disc list-inside">
            {currentCompany.swot.weaknesses.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="text-slate-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
            <Lightbulb className="w-5 h-5" />
            <span>OPPORTUNITIES (External Vectors)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-200 list-disc list-inside">
            {currentCompany.swot.opportunities.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="text-slate-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats */}
        <div className="glass-card p-5 rounded-2xl border border-amber-500/30 bg-amber-950/20 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm">
            <ShieldAlert className="w-5 h-5" />
            <span>THREATS (External Risks)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-200 list-disc list-inside">
            {currentCompany.swot.threats.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="text-slate-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
