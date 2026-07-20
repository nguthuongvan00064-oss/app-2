import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getCompanyById, ALL_COMPANIES } from '../data/mockCompanies';
import { ComparisonTable } from './ComparisonTable';
import { ChartsSuite } from './ChartsSuite';
import { SwotAnalysis } from './SwotAnalysis';
import { AiReportView } from './AiReportView';
import { formatCurrency, formatPercent } from '../services/financialEngine';
import { Plus, X, Swords, FileText, Download, BarChart2, Sparkles, Layers, Check } from 'lucide-react';

export const CompanyCompare: React.FC = () => {
  const {
    selectedCompanyIds,
    addCompanyToCompare,
    removeCompanyFromCompare,
    clearCompare,
    setBattleModeOpen,
    setExportModalOpen,
    currency,
    openProfileModal
  } = useApp();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [modalQuery, setModalQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'charts' | 'swot' | 'aiReport'>('matrix');

  const selectedCompanies = selectedCompanyIds
    .map(id => getCompanyById(id))
    .filter((c): c is any => c !== undefined);

  const searchSuggestions = ALL_COMPANIES.filter(
    c =>
      !selectedCompanyIds.includes(c.id) &&
      (c.name.toLowerCase().includes(modalQuery.toLowerCase()) ||
        c.ticker.toLowerCase().includes(modalQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(modalQuery.toLowerCase()))
  ).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Selected Companies Selector */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 rounded-full uppercase">
                MULTI-COMPANY ANALYTICS DASHBOARD
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Comparing {selectedCompanies.length} Companies
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setBattleModeOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Swords className="w-4 h-4" />
              <span>Battle Mode</span>
            </button>

            <button
              onClick={() => setExportModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-cyan-400 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>

            {selectedCompanies.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs font-semibold transition-all"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Selected Company Chips Row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
          {selectedCompanies.map((c) => (
            <div
              key={c.id}
              className="glass-panel px-3.5 py-2 rounded-2xl border border-slate-700/80 flex items-center gap-2.5 shrink-0 hover:border-cyan-500 transition-all shadow-md group"
            >
              <img
                src={c.logo}
                alt={c.name}
                className="w-7 h-7 rounded-lg object-cover border border-slate-700 cursor-pointer"
                onClick={() => openProfileModal(c.id)}
              />
              <div>
                <span
                  onClick={() => openProfileModal(c.id)}
                  className="font-bold text-xs text-white hover:text-cyan-400 cursor-pointer"
                >
                  {c.ticker}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">Cap: {formatCurrency(c.marketCap, currency, true)}</span>
              </div>
              <button
                onClick={() => removeCompanyFromCompare(c.id)}
                className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Remove company"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Add Company Trigger Button */}
          {selectedCompanies.length < 6 && (
            <button
              onClick={() => setSearchModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-dashed border-cyan-500/40 text-cyan-400 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Company ({selectedCompanies.length}/6)</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Dashboard Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('matrix')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'matrix' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Comparison Matrix Table</span>
        </button>

        <button
          onClick={() => setActiveSubTab('charts')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'charts' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>TradingView Charts</span>
        </button>

        <button
          onClick={() => setActiveSubTab('swot')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'swot' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>SWOT Matrix</span>
        </button>

        <button
          onClick={() => setActiveSubTab('aiReport')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'aiReport' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>AI Complete Report</span>
        </button>
      </div>

      {/* Main SubTab Content View */}
      {activeSubTab === 'matrix' && <ComparisonTable companies={selectedCompanies} />}
      {activeSubTab === 'charts' && <ChartsSuite companies={selectedCompanies} />}
      {activeSubTab === 'swot' && <SwotAnalysis companies={selectedCompanies} />}
      {activeSubTab === 'aiReport' && <AiReportView companies={selectedCompanies} />}

      {/* Modal for Adding Companies */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-lg glass-panel bg-[#0d121d]/95 border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add Company to Comparison</h3>
              <button onClick={() => setSearchModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              value={modalQuery}
              onChange={(e) => setModalQuery(e.target.value)}
              placeholder="Type company name or ticker (e.g. Apple, Vinamilk, NVDA)..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {searchSuggestions.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    addCompanyToCompare(c.id);
                    setSearchModalOpen(false);
                    setModalQuery('');
                  }}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={c.logo} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <div className="font-bold text-sm text-white">{c.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{c.ticker} • {c.country}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
