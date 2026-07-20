import React from 'react';
import { useApp } from '../context/AppContext';
import { CurrencyCode, LanguageCode } from '../types/company';
import {
  BarChart3,
  Globe,
  Award,
  PieChart,
  Swords,
  Bookmark,
  Sun,
  Moon,
  Bot,
  Layers,
  Search
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currency,
    setCurrency,
    language,
    setLanguage,
    theme,
    toggleTheme,
    watchlistIds,
    setBattleModeOpen,
    setAiChatOpen,
    setExportModalOpen,
    selectedCompanyIds
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-[#0a0d14]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('hero')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0a0d14] rounded-[10px] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent font-sans">
                COMPANY<span className="text-cyan-400">COMPARE</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-wide text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 rounded-full">
                AI 2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">BLOOMBERG & TRADINGVIEW GRADE</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'hero'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search & Home</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Compare ({selectedCompanyIds.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('screener')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'screener'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Screener</span>
          </button>

          <button
            onClick={() => setActiveTab('rankings')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'rankings'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Rankings</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>World Map</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'portfolio'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </button>
        </nav>

        {/* Action Controls & Preferences */}
        <div className="flex items-center gap-2">
          {/* Battle Mode Button */}
          <button
            onClick={() => setBattleModeOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
            title="Launch Battle Ring Mode"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Battle Mode</span>
          </button>

          {/* AI Assistant Chat Button */}
          <button
            onClick={() => setAiChatOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 transition-all"
            title="Open Financial AI Assistant"
          >
            <Bot className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
            <span className="hidden sm:inline">AI Chat</span>
          </button>

          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="bg-slate-900 text-xs text-slate-200 font-mono font-bold px-2 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="USD">USD ($)</option>
            <option value="VND">VND (₫)</option>
            <option value="EUR">EUR (€)</option>
            <option value="JPY">JPY (¥)</option>
          </select>

          {/* Language Switcher */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            className="bg-slate-900 text-xs text-slate-200 font-mono font-bold px-2 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer hidden md:block"
          >
            <option value="EN">EN 🇺🇸</option>
            <option value="VI">VI 🇻🇳</option>
          </select>

          {/* Watchlist Counter */}
          <button
            onClick={() => setActiveTab('portfolio')}
            className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-all"
            title="Saved Watchlist"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            {watchlistIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-[9px] font-bold text-black flex items-center justify-center">
                {watchlistIds.length}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-all"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>

      </div>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden flex items-center justify-around bg-slate-950/90 border-t border-slate-800/80 px-2 py-2 text-[11px] font-medium text-slate-400">
        <button onClick={() => setActiveTab('hero')} className={activeTab === 'hero' ? 'text-cyan-400 font-bold' : ''}>Home</button>
        <button onClick={() => setActiveTab('compare')} className={activeTab === 'compare' ? 'text-cyan-400 font-bold' : ''}>Compare ({selectedCompanyIds.length})</button>
        <button onClick={() => setActiveTab('screener')} className={activeTab === 'screener' ? 'text-cyan-400 font-bold' : ''}>Screener</button>
        <button onClick={() => setActiveTab('rankings')} className={activeTab === 'rankings' ? 'text-cyan-400 font-bold' : ''}>Rankings</button>
        <button onClick={() => setActiveTab('map')} className={activeTab === 'map' ? 'text-cyan-400 font-bold' : ''}>World Map</button>
      </div>
    </header>
  );
};
