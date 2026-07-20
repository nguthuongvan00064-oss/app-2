import React, { useState, useRef, useEffect } from 'react';
import { ALL_COMPANIES, getCompanyById } from '../data/mockCompanies';
import { useApp } from '../context/AppContext';
import { Company } from '../types/company';
import { formatCurrency } from '../services/financialEngine';
import { Search, Plus, Check, ArrowRight, Zap } from 'lucide-react';

interface PresetPair {
  label: string;
  ids: string[];
}

const POPULAR_PRESETS: PresetPair[] = [
  { label: 'Apple vs Samsung', ids: ['apple', 'samsung'] },
  { label: 'Meta vs Google', ids: ['meta-platforms--inc-', 'google--alphabet-inc--'] },
  { label: 'Tesla vs BYD', ids: ['tesla', 'byd'] },
  { label: 'Nike vs Adidas', ids: ['nike--inc-', 'adidas-ag'] },
  { label: 'Intel vs AMD', ids: ['intel-corporation', 'advanced-micro-devices'] },
  { label: 'Microsoft vs Amazon', ids: ['microsoft', 'amazon-com--inc-'] },
  { label: 'Coca-Cola vs PepsiCo', ids: ['coca-cola', 'pepsico'] },
  { label: 'Vinamilk vs TH True Milk', ids: ['vinamilk', 'th-true-milk--th-group-'] },
  { label: 'Toyota vs Honda', ids: ['toyota-motor-corporation', 'honda-motor-co---ltd-'] },
  { label: 'FPT vs Vietcombank', ids: ['fpt', 'vietcombank'] },
];

export const CompanySearch: React.FC = () => {
  const { selectedCompanyIds, addCompanyToCompare, setSelectedCompanyIds, setActiveTab, currency, openProfileModal } = useApp();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter companies matching query
  const suggestions = query.trim() === ''
    ? ALL_COMPANIES.slice(0, 8)
    : ALL_COMPANIES.filter(
        c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.ticker.toLowerCase().includes(query.toLowerCase()) ||
          c.industry.toLowerCase().includes(query.toLowerCase()) ||
          c.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPreset = (pair: PresetPair) => {
    setSelectedCompanyIds(pair.ids);
    setActiveTab('compare');
  };

  const handleSelectCompany = (c: Company) => {
    addCompanyToCompare(c.id);
    setQuery('');
    setIsOpen(false);
    setActiveTab('compare');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Search Input Box */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative flex items-center">
          <Search className="absolute left-5 w-6 h-6 text-cyan-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Search any company, ticker, industry, country (e.g. Apple, Vinamilk, Tesla, NVDA)..."
            className="w-full pl-14 pr-36 py-4 rounded-2xl bg-slate-900/90 border-2 border-slate-800 focus:border-cyan-500 text-slate-100 placeholder:text-slate-500 font-sans text-base shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all"
          />
          <button
            onClick={() => setActiveTab('compare')}
            className="absolute right-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 transition-all"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Autocomplete Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl glass-panel bg-[#0d121d]/95 border border-slate-700/80 shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/60 max-h-96 overflow-y-auto">
            <div className="px-4 py-2 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex justify-between">
              <span>Matching Companies ({suggestions.length})</span>
              <span>Select to Add</span>
            </div>
            {suggestions.map((c) => {
              const isSelected = selectedCompanyIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCompany(c)}
                  className="px-4 py-3 hover:bg-slate-800/80 flex items-center justify-between cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700 group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                          {c.name}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-800 text-slate-300 rounded border border-slate-700">
                          {c.ticker}
                        </span>
                        <span className="text-xs">{c.country === 'United States' ? '🇺🇸' : c.country === 'Vietnam' ? '🇻🇳' : c.country === 'South Korea' ? '🇰🇷' : c.country === 'Japan' ? '🇯🇵' : c.country === 'China' ? '🇨🇳' : '🌐'}</span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span>{c.industry}</span>
                        <span>•</span>
                        <span>Cap: {formatCurrency(c.marketCap, currency, true)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProfileModal(c.id);
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
                    >
                      Profile
                    </button>
                    {isSelected ? (
                      <span className="px-3 py-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-lg flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Added
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 rounded-lg flex items-center gap-1 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                        <Plus className="w-3.5 h-3.5" /> Add
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Popular Presets */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Popular Battle Comparison Presets
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_PRESETS.map((pair) => (
            <button
              key={pair.label}
              onClick={() => handleSelectPreset(pair)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>{pair.label}</span>
              <span className="text-[10px] text-cyan-400 font-mono">VS</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
