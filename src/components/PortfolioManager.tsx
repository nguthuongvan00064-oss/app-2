import React from 'react';
import { useApp } from '../context/AppContext';
import { getCompanyById } from '../data/mockCompanies';
import { formatCurrency, formatPercent } from '../services/financialEngine';
import { PieChart, Plus, Trash2, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';

export const PortfolioManager: React.FC = () => {
  const { portfolio, removeFromPortfolio, updatePortfolioWeight, currency, openProfileModal, setActiveTab } = useApp();

  const portfolioCompanies = portfolio.map(item => ({
    ...item,
    company: getCompanyById(item.companyId)
  })).filter(item => item.company !== undefined);

  const totalWeight = portfolioCompanies.reduce((acc, item) => acc + item.weight, 0) || 1;

  // Calculate weighted metrics
  const weightedRoe = portfolioCompanies.reduce((acc, item) => {
    return acc + (item.company?.roe || 0) * (item.weight / totalWeight);
  }, 0);

  const weightedDividend = portfolioCompanies.reduce((acc, item) => {
    return acc + (item.company?.dividendYield || 0) * (item.weight / totalWeight);
  }, 0);

  const weightedMargin = portfolioCompanies.reduce((acc, item) => {
    return acc + (item.company?.netMargin || 0) * (item.weight / totalWeight);
  }, 0);

  const combinedCap = portfolioCompanies.reduce((acc, item) => acc + (item.company?.marketCap || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <PieChart className="w-6 h-6 text-cyan-400" />
            <span>Custom Portfolio Performance Allocator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Construct a multi-asset corporate portfolio, customize capital weighting, and evaluate combined financial health.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('screener')}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-cyan-400 font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Add More Companies
        </button>
      </div>

      {/* Portfolio Aggregated Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-500">AGGREGATED PORTFOLIO CAP</span>
          <p className="text-2xl font-extrabold text-white mt-1">{formatCurrency(combinedCap, currency, true)}</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-500">WEIGHTED ROE (%)</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">{formatPercent(weightedRoe)}</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-500">AVG DIVIDEND YIELD</span>
          <p className="text-2xl font-extrabold text-cyan-400 mt-1">{weightedDividend.toFixed(2)}%</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-500">WEIGHTED NET MARGIN</span>
          <p className="text-2xl font-extrabold text-purple-400 mt-1">{weightedMargin.toFixed(1)}%</p>
        </div>
      </div>

      {/* Portfolio Holdings List */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider">
          Portfolio Asset Allocations ({portfolioCompanies.length})
        </h3>

        <div className="space-y-3">
          {portfolioCompanies.map(item => {
            const c = item.company!;
            const normalizedWeight = ((item.weight / totalWeight) * 100).toFixed(1);

            return (
              <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={c.logo} alt={c.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700 cursor-pointer" onClick={() => openProfileModal(c.id)} />
                  <div>
                    <h4 className="font-bold text-sm text-white hover:text-cyan-400 cursor-pointer" onClick={() => openProfileModal(c.id)}>{c.name}</h4>
                    <p className="text-[10px] font-mono text-slate-400">{c.ticker} • ROE: {formatPercent(c.roe)} • Margin: {c.netMargin}%</p>
                  </div>
                </div>

                {/* Allocation Weight Slider */}
                <div className="flex items-center gap-4 sm:w-1/3">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>ALLOCATION WEIGHT</span>
                      <span className="text-cyan-400 font-bold">{normalizedWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={item.weight}
                      onChange={(e) => updatePortfolioWeight(c.id, Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={() => removeFromPortfolio(c.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
