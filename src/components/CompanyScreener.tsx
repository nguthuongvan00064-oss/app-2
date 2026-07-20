import React, { useState, useMemo } from 'react';
import { ALL_COMPANIES, SUPPORTED_INDUSTRIES, SUPPORTED_COUNTRIES } from '../data/mockCompanies';
import { useApp } from '../context/AppContext';
import { Company, SortField } from '../types/company';
import { formatCurrency, formatPercent } from '../services/financialEngine';
import { Search, Filter, ArrowUpDown, LayoutGrid, Table, Activity, Plus, Check, ExternalLink } from 'lucide-react';

export const CompanyScreener: React.FC = () => {
  const { selectedCompanyIds, addCompanyToCompare, removeCompanyFromCompare, currency, openProfileModal, setActiveTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');
  const [minMarketCap, setMinMarketCap] = useState<number>(0);
  const [minRoe, setMinRoe] = useState<number>(0);
  const [maxPe, setMaxPe] = useState<number>(150);
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'heatmap'>('table');

  // Filter & Sort Logic
  const filteredCompanies = useMemo(() => {
    return ALL_COMPANIES.filter(c => {
      // Text query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          c.name.toLowerCase().includes(q) ||
          c.ticker.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Country filter
      if (selectedCountry !== 'ALL' && c.country !== selectedCountry) return false;

      // Industry filter
      if (selectedIndustry !== 'ALL' && c.industry !== selectedIndustry) return false;

      // Min Market Cap filter
      if (c.marketCap < minMarketCap) return false;

      // Min ROE filter
      if (c.roe < minRoe) return false;

      // Max P/E filter
      if (c.peRatio > maxPe) return false;

      return true;
    }).sort((a, b) => {
      const valA = (a[sortField] as number) || 0;
      const valB = (b[sortField] as number) || 0;
      if (sortOrder === 'asc') return valA - valB;
      return valB - valA;
    });
  }, [searchQuery, selectedCountry, selectedIndustry, minMarketCap, minRoe, maxPe, sortField, sortOrder]);

  const toggleSelect = (id: string) => {
    if (selectedCompanyIds.includes(id)) {
      removeCompanyFromCompare(id);
    } else {
      addCompanyToCompare(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header & View Toggles */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Filter className="w-6 h-6 text-cyan-400" />
            <span>Global Company Screener</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Filter 500+ global enterprises across countries, valuation, margins, ROE, and growth metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Comparison Bar */}
          <button
            onClick={() => setActiveTab('compare')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <span>Compare Selected ({selectedCompanyIds.length})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                viewMode === 'table' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <Table className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                viewMode === 'grid' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid Cards"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                viewMode === 'heatmap' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Heatmap View"
            >
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Heatmap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Controls Panel */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search Text */}
          <div className="relative">
            <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">SEARCH COMPANY / TICKER</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, Ticker..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Country Selector */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">COUNTRY / REGION</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Countries & Regions</option>
              {SUPPORTED_COUNTRIES.map(c => (
                <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>

          {/* Industry Selector */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">INDUSTRY</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Supported Industries</option>
              {SUPPORTED_INDUSTRIES.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Sort By Field */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">SORT BY METRIC</label>
            <div className="flex items-center gap-1">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="marketCap">Market Cap</option>
                <option value="revenue">Revenue</option>
                <option value="netIncome">Net Income</option>
                <option value="roe">Return on Equity (ROE)</option>
                <option value="peRatio">P/E Ratio</option>
                <option value="netMargin">Net Profit Margin</option>
                <option value="revenueGrowth">Revenue Growth</option>
                <option value="esgScore">ESG Rating Score</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                title="Toggle Order Asc/Desc"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Range Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-slate-800/60">
          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>MIN MARKET CAP</span>
              <span className="text-cyan-400 font-bold">${minMarketCap}B+</span>
            </div>
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={minMarketCap}
              onChange={(e) => setMinMarketCap(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>MIN ROE (%)</span>
              <span className="text-cyan-400 font-bold">{minRoe}%+</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={minRoe}
              onChange={(e) => setMinRoe(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>MAX P/E RATIO</span>
              <span className="text-cyan-400 font-bold">&lt; {maxPe}</span>
            </div>
            <input
              type="range"
              min={5}
              max={150}
              step={5}
              value={maxPe}
              onChange={(e) => setMaxPe(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
        <span>Showing <strong className="text-white">{filteredCompanies.length}</strong> matching companies</span>
        <span>Click checkbox to include in compare view</span>
      </div>

      {/* Table View Mode */}
      {viewMode === 'table' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/90 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3 px-4 w-10">Select</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">Industry</th>
                  <th className="py-3 px-4 text-right">Market Cap</th>
                  <th className="py-3 px-4 text-right">Revenue</th>
                  <th className="py-3 px-4 text-right">Net Profit</th>
                  <th className="py-3 px-4 text-right">ROE (%)</th>
                  <th className="py-3 px-4 text-right">P/E</th>
                  <th className="py-3 px-4 text-right">Net Margin</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs font-sans">
                {filteredCompanies.slice(0, 50).map((c) => {
                  const isSelected = selectedCompanyIds.includes(c.id);
                  return (
                    <tr
                      key={c.id}
                      className={`hover:bg-slate-800/50 transition-colors ${
                        isSelected ? 'bg-cyan-950/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(c.id)}
                          className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                        />
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.logo}
                            alt={c.name}
                            className="w-8 h-8 rounded-lg object-cover border border-slate-700 cursor-pointer"
                            onClick={() => openProfileModal(c.id)}
                          />
                          <div>
                            <div
                              onClick={() => openProfileModal(c.id)}
                              className="font-bold text-slate-100 hover:text-cyan-400 cursor-pointer transition-colors"
                            >
                              {c.name}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              {c.ticker} • {c.exchange}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-300">
                        {c.country}
                      </td>

                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        {c.industry}
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-bold text-white">
                        {formatCurrency(c.marketCap, currency, true)}
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-slate-300">
                        {formatCurrency(c.revenue, currency, true)}
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-slate-300">
                        {formatCurrency(c.netIncome, currency, true)}
                      </td>

                      <td className={`py-3 px-4 text-right font-mono font-bold ${c.roe > 20 ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {formatPercent(c.roe)}
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-slate-300">
                        {c.peRatio}x
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-slate-300">
                        {c.netMargin}%
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => openProfileModal(c.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.slice(0, 30).map((c) => {
            const isSelected = selectedCompanyIds.includes(c.id);
            return (
              <div
                key={c.id}
                className={`glass-panel p-5 rounded-2xl border transition-all hover:border-cyan-500/50 ${
                  isSelected ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={c.logo} alt={c.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-sm text-white hover:text-cyan-400 cursor-pointer" onClick={() => openProfileModal(c.id)}>{c.name}</h4>
                      <p className="text-[10px] font-mono text-slate-400">{c.ticker} • {c.country}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSelect(c.id)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      isSelected ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-slate-800/80 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500">MARKET CAP</span>
                    <p className="font-bold text-white">{formatCurrency(c.marketCap, currency, true)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">REVENUE</span>
                    <p className="font-bold text-white">{formatCurrency(c.revenue, currency, true)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">ROE (%)</span>
                    <p className="font-bold text-emerald-400">{formatPercent(c.roe)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">P/E RATIO</span>
                    <p className="font-bold text-cyan-400">{c.peRatio}x</p>
                  </div>
                </div>

                <button
                  onClick={() => openProfileModal(c.id)}
                  className="w-full py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                >
                  View Full Financial Profile
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Heatmap View Mode */}
      {viewMode === 'heatmap' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredCompanies.slice(0, 48).map((c) => {
            const roeColor = c.roe > 30 ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' : c.roe > 15 ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-300';
            return (
              <div
                key={c.id}
                onClick={() => openProfileModal(c.id)}
                className={`p-3 rounded-xl border ${roeColor} hover:scale-105 transition-all cursor-pointer shadow-lg`}
              >
                <div className="text-xs font-bold truncate">{c.ticker}</div>
                <div className="text-[10px] text-slate-400 truncate">{c.name}</div>
                <div className="mt-2 text-sm font-mono font-bold">{formatPercent(c.roe)} ROE</div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
