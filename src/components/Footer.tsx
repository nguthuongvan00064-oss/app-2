import React from 'react';
import { BarChart3, Globe, Shield, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="w-full bg-[#07090e] border-t border-slate-800/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Brand */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('hero')}>
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-black font-extrabold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white font-sans">
              COMPANY<span className="text-cyan-400">COMPARE</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Bloomberg & TradingView grade multi-company financial comparison, AI analytics, SWOT matrix, and interactive charts platform for 500+ global enterprises.
          </p>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-2 font-mono">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">PLATFORM NAV</h4>
          <ul className="space-y-1.5">
            <li><button onClick={() => setActiveTab('hero')} className="hover:text-cyan-400 transition-colors">Search & Home</button></li>
            <li><button onClick={() => setActiveTab('compare')} className="hover:text-cyan-400 transition-colors">Compare Dashboard</button></li>
            <li><button onClick={() => setActiveTab('screener')} className="hover:text-cyan-400 transition-colors">Company Screener</button></li>
            <li><button onClick={() => setActiveTab('rankings')} className="hover:text-cyan-400 transition-colors">Industry Rankings</button></li>
            <li><button onClick={() => setActiveTab('map')} className="hover:text-cyan-400 transition-colors">World Map</button></li>
            <li><button onClick={() => setActiveTab('portfolio')} className="hover:text-cyan-400 transition-colors">Portfolio Allocator</button></li>
          </ul>
        </div>

        {/* Col 3: Supported Data APIs */}
        <div className="space-y-2 font-mono">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">SUPPORTED DATA APIS</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>• Yahoo Finance API</li>
            <li>• Alpha Vantage API</li>
            <li>• Financial Modeling Prep (FMP)</li>
            <li>• Polygon.io Market Data</li>
            <li>• SEC EDGAR Financial Filings</li>
          </ul>
        </div>

        {/* Col 4: Disclaimer */}
        <div className="space-y-2">
          <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>FINANCIAL DISCLAIMER</span>
          </h4>
          <p className="leading-relaxed text-slate-500 text-[11px]">
            Company Compare AI provides financial statistics and automated insights for educational and analytical purposes only. Data is not financial advice.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
        <div>© 2026 Company Compare AI Inc. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer">API Documentation</span>
        </div>
      </div>
    </footer>
  );
};
