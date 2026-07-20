import React from 'react';
import { CompanySearch } from './CompanySearch';
import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck, Cpu, TrendingUp, Globe2, BarChart2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, setSelectedCompanyIds } = useApp();

  const handleIndustrySelect = (companies: string[]) => {
    setSelectedCompanyIds(companies);
    setActiveTab('compare');
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0d14] via-[#0f1422] to-[#0a0d14]">
      
      {/* Background Neon Glow Accent Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wide shadow-lg shadow-cyan-500/10 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>NEXT-GEN AI FINANCIAL COMPARISON ENGINE</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans max-w-4xl mx-auto leading-tight">
            Compare Any Companies <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Around The World
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Analyze financial performance, growth, profitability, risks, and competitive advantages in seconds with Bloomberg & TradingView grade charts and AI intelligence.
          </p>
        </div>

        {/* Global Search Component */}
        <div className="pt-2">
          <CompanySearch />
        </div>

        {/* Key Feature Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto">
          <div className="glass-card p-4 rounded-2xl text-left border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Globe2 className="w-5 h-5" />
              <span className="text-2xl font-bold font-mono text-white">500+</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Global Companies</div>
            <div className="text-[10px] text-slate-500 mt-0.5">US, VN, JP, KR, EU, CN</div>
          </div>

          <div className="glass-card p-4 rounded-2xl text-left border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Cpu className="w-5 h-5" />
              <span className="text-2xl font-bold font-mono text-white">38+</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Supported Industries</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Tech, EV, Bank, F&B</div>
          </div>

          <div className="glass-card p-4 rounded-2xl text-left border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <TrendingUp className="w-5 h-5" />
              <span className="text-2xl font-bold font-mono text-white">25+</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Financial Ratios</div>
            <div className="text-[10px] text-slate-500 mt-0.5">ROE, ROA, Margins, P/E</div>
          </div>

          <div className="glass-card p-4 rounded-2xl text-left border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-2xl font-bold font-mono text-white">100%</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Automated AI Analysis</div>
            <div className="text-[10px] text-slate-500 mt-0.5">SWOT & AI Score Gauges</div>
          </div>
        </div>

        {/* Quick Sector Launch Cards */}
        <div className="pt-8 text-left max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>Explore Top Industry Showdowns</span>
            </h3>
            <button
              onClick={() => setActiveTab('screener')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View All Screener</span> &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div
              onClick={() => handleIndustrySelect(['apple', 'microsoft', 'nvidia'])}
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 cursor-pointer transition-all group"
            >
              <div className="text-xs font-bold text-cyan-400 group-hover:underline mb-1">Tech & AI Titans</div>
              <div className="text-[11px] text-slate-400">Apple vs Microsoft vs NVIDIA</div>
            </div>

            <div
              onClick={() => handleIndustrySelect(['tesla', 'byd', 'toyota-motor-corporation'])}
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 cursor-pointer transition-all group"
            >
              <div className="text-xs font-bold text-purple-400 group-hover:underline mb-1">Automotive & EV</div>
              <div className="text-[11px] text-slate-400">Tesla vs BYD vs Toyota</div>
            </div>

            <div
              onClick={() => handleIndustrySelect(['vinamilk', 'coca-cola', 'pepsico'])}
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 cursor-pointer transition-all group"
            >
              <div className="text-xs font-bold text-emerald-400 group-hover:underline mb-1">Food & Beverage</div>
              <div className="text-[11px] text-slate-400">Vinamilk vs Coca-Cola vs PepsiCo</div>
            </div>

            <div
              onClick={() => handleIndustrySelect(['vietcombank', 'techcombank-tcb-', 'mbbank-mbb-'])}
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 cursor-pointer transition-all group"
            >
              <div className="text-xs font-bold text-amber-400 group-hover:underline mb-1">Vietnam Banking</div>
              <div className="text-[11px] text-slate-400">Vietcombank vs TCB vs MBBank</div>
            </div>

            <div
              onClick={() => handleIndustrySelect(['fpt', 'oracle-corporation', 'sap-se'])}
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 cursor-pointer transition-all group"
            >
              <div className="text-xs font-bold text-blue-400 group-hover:underline mb-1">Software & IT</div>
              <div className="text-[11px] text-slate-400">FPT vs Oracle vs SAP</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
