import React, { useState } from 'react';
import { ALL_COMPANIES } from '../data/mockCompanies';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatPercent } from '../services/financialEngine';
import { Award, Trophy, TrendingUp, DollarSign, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const IndustryRankings: React.FC = () => {
  const { currency, openProfileModal, addCompanyToCompare, setActiveTab } = useApp();
  const [rankingCategory, setRankingCategory] = useState<'marketCap' | 'revenue' | 'netIncome' | 'roe' | 'netMargin' | 'revenueGrowth' | 'esgScore'>('marketCap');

  const sortedCompanies = [...ALL_COMPANIES].sort((a, b) => {
    const valA = (a[rankingCategory] as number) || 0;
    const valB = (b[rankingCategory] as number) || 0;
    return valB - valA;
  }).slice(0, 20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <span>Global Industry Leaderboards & Rankings</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Discover global market leaders ranked by Market Cap, Revenue, Net Income, ROE, Net Margins, and ESG sustainability.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setRankingCategory('marketCap')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              rankingCategory === 'marketCap' ? 'bg-amber-500 text-black shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Market Cap Titans
          </button>
          <button
            onClick={() => setRankingCategory('revenue')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              rankingCategory === 'revenue' ? 'bg-amber-500 text-black shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Top Revenue
          </button>
          <button
            onClick={() => setRankingCategory('netIncome')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              rankingCategory === 'netIncome' ? 'bg-amber-500 text-black shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Highest Net Profit
          </button>
          <button
            onClick={() => setRankingCategory('roe')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              rankingCategory === 'roe' ? 'bg-amber-500 text-black shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Highest ROE (%)
          </button>
          <button
            onClick={() => setRankingCategory('revenueGrowth')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              rankingCategory === 'revenueGrowth' ? 'bg-amber-500 text-black shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Fastest Growth
          </button>
          <button
            onClick={() => setRankingCategory('esgScore')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              rankingCategory === 'esgScore' ? 'bg-amber-500 text-black shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Best ESG Score
          </button>
        </div>
      </div>

      {/* Leaderboard Ranking Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-slate-900/90 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <th className="py-3.5 px-4 w-12 text-center">Rank</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Industry</th>
                <th className="py-3.5 px-4 text-right">Market Cap</th>
                <th className="py-3.5 px-4 text-right">Revenue</th>
                <th className="py-3.5 px-4 text-right">Net Profit</th>
                <th className="py-3.5 px-4 text-right">ROE (%)</th>
                <th className="py-3.5 px-4 text-right">Target Score</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sortedCompanies.map((c, idx) => {
                const rank = idx + 1;
                const isTop3 = rank <= 3;

                let targetValueDisplay = '';
                if (rankingCategory === 'marketCap') targetValueDisplay = formatCurrency(c.marketCap, currency, true);
                else if (rankingCategory === 'revenue') targetValueDisplay = formatCurrency(c.revenue, currency, true);
                else if (rankingCategory === 'netIncome') targetValueDisplay = formatCurrency(c.netIncome, currency, true);
                else if (rankingCategory === 'roe') targetValueDisplay = formatPercent(c.roe);
                else if (rankingCategory === 'revenueGrowth') targetValueDisplay = `+${c.revenueGrowth}%`;
                else if (rankingCategory === 'esgScore') targetValueDisplay = `${c.esgScore} pts`;
                else targetValueDisplay = `${c.netMargin}%`;

                return (
                  <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                    
                    {/* Rank Badge */}
                    <td className="py-3 px-4 text-center font-mono font-bold">
                      {rank === 1 ? (
                        <span className="w-7 h-7 rounded-full bg-amber-500 text-black flex items-center justify-center mx-auto text-xs font-black shadow-md shadow-amber-500/30">1</span>
                      ) : rank === 2 ? (
                        <span className="w-7 h-7 rounded-full bg-slate-300 text-black flex items-center justify-center mx-auto text-xs font-black">2</span>
                      ) : rank === 3 ? (
                        <span className="w-7 h-7 rounded-full bg-amber-700 text-white flex items-center justify-center mx-auto text-xs font-black">3</span>
                      ) : (
                        <span className="text-slate-500 text-xs">#{rank}</span>
                      )}
                    </td>

                    {/* Company info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={c.logo} alt={c.name} className="w-8 h-8 rounded-lg object-cover border border-slate-700 cursor-pointer" onClick={() => openProfileModal(c.id)} />
                        <div>
                          <div className="font-bold text-slate-100 hover:text-cyan-400 cursor-pointer" onClick={() => openProfileModal(c.id)}>{c.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{c.ticker} • {c.country}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-400 text-[11px]">{c.industry}</td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-white">{formatCurrency(c.marketCap, currency, true)}</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-300">{formatCurrency(c.revenue, currency, true)}</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-300">{formatCurrency(c.netIncome, currency, true)}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">{formatPercent(c.roe)}</td>

                    {/* Highlighted Metric Value */}
                    <td className="py-3 px-4 text-right font-mono font-extrabold text-amber-400 text-sm">{targetValueDisplay}</td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          addCompanyToCompare(c.id);
                          setActiveTab('compare');
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 hover:bg-cyan-500 hover:text-black border border-cyan-500/30 rounded-lg transition-all"
                      >
                        Compare
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
