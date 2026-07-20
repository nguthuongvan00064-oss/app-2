import React from 'react';
import { Company } from '../types/company';
import { useApp } from '../context/AppContext';
import {
  COMPARISON_METRICS,
  getMetricWinners,
  formatCurrency,
  formatPercent,
  formatNumber,
  calculateCompanyScores
} from '../services/financialEngine';
import { Trophy, HelpCircle, Swords, CheckCircle2, MinusCircle, XCircle } from 'lucide-react';

interface ComparisonTableProps {
  companies: Company[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ companies }) => {
  const { currency, setBattleModeOpen, openProfileModal } = useApp();

  if (companies.length === 0) {
    return (
      <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800">
        <p className="text-slate-400">No companies selected for comparison. Use search above to add companies.</p>
      </div>
    );
  }

  // Calculate battle scores & overall winner
  const scores = calculateCompanyScores(companies);
  let topWinnerId = companies[0].id;
  let topScore = -1;

  companies.forEach(c => {
    if (scores[c.id]?.totalScore > topScore) {
      topScore = scores[c.id].totalScore;
      topWinnerId = c.id;
    }
  });

  const overallWinnerCompany = companies.find(c => c.id === topWinnerId);

  // Group metrics by category
  const categories = ['Overview', 'Valuation', 'Profitability', 'Growth', 'Balance Sheet', 'Per Share'] as const;

  return (
    <div className="space-y-6">
      
      {/* Overall Winner Declaration Banner */}
      {overallWinnerCompany && (
        <div className="glass-card p-6 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-r from-amber-950/40 via-purple-950/20 to-slate-900 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-600 p-0.5 shadow-lg shadow-amber-500/30 shrink-0">
              <div className="w-full h-full bg-[#0a0d14] rounded-[14px] flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-400 animate-bounce" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-extrabold text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-full uppercase tracking-wider">
                  OVERALL METRIC CHAMPION
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {scores[overallWinnerCompany.id]?.wins} Metric Wins
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                {overallWinnerCompany.name} ({overallWinnerCompany.ticker})
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Outperforms overall across profitability margins, capital return efficiency, and balance sheet strength.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBattleModeOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Swords className="w-4 h-4" />
              <span>Launch 1v1 Battle Ring</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Matrix Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Header: Company Columns */}
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800">
                <th className="py-4 px-6 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider min-w-[200px]">
                  Financial Metric
                </th>
                {companies.map((c) => {
                  const isTopWinner = c.id === topWinnerId;
                  return (
                    <th key={c.id} className="py-4 px-6 min-w-[220px]">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.logo}
                          alt={c.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700 cursor-pointer"
                          onClick={() => openProfileModal(c.id)}
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              onClick={() => openProfileModal(c.id)}
                              className="font-extrabold text-sm text-white hover:text-cyan-400 cursor-pointer transition-colors"
                            >
                              {c.name}
                            </span>
                            {isTopWinner && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            {c.ticker} • {c.country}
                          </div>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Body: Grouped by Category */}
            <tbody className="divide-y divide-slate-800/60 text-xs font-sans">
              {categories.map((cat) => {
                const metricsInCat = COMPARISON_METRICS.filter(m => m.category === cat);
                if (metricsInCat.length === 0) return null;

                return (
                  <React.Fragment key={cat}>
                    {/* Category Divider Header */}
                    <tr className="bg-slate-950/80 border-y border-slate-800/80">
                      <td
                        colSpan={companies.length + 1}
                        className="py-2.5 px-6 font-mono font-extrabold text-[11px] text-cyan-400 uppercase tracking-wider"
                      >
                        ▸ {cat} Metrics
                      </td>
                    </tr>

                    {/* Category Metric Rows */}
                    {metricsInCat.map((m) => {
                      const winners = getMetricWinners(companies, m.key as keyof Company, m.higherIsBetter);

                      return (
                        <tr key={m.key} className="hover:bg-slate-800/40 transition-colors">
                          
                          {/* Metric Title Label */}
                          <td className="py-3 px-6 font-medium text-slate-300 flex items-center justify-between">
                            <span>{m.label}</span>
                            <span title={`Higher is ${m.higherIsBetter ? 'better' : 'lower better'}`}>
                              <HelpCircle className="w-3.5 h-3.5 text-slate-600 hover:text-cyan-400 cursor-pointer" />
                            </span>
                          </td>

                          {/* Company Values & Winner Indicators */}
                          {companies.map((c) => {
                            const rawVal = c[m.key as keyof Company];
                            const winnerStatus = winners[c.id];

                            let formattedVal = 'N/A';
                            if (typeof rawVal === 'number') {
                              if (m.format === 'currency') formattedVal = formatCurrency(rawVal, currency, true);
                              else if (m.format === 'percent') formattedVal = formatPercent(rawVal);
                              else if (m.format === 'ratio') formattedVal = `${rawVal}${m.key.includes('pe') || m.key.includes('pb') ? 'x' : ''}`;
                              else formattedVal = formatNumber(rawVal, 0);
                            } else if (typeof rawVal === 'string') {
                              formattedVal = rawVal;
                            }

                            return (
                              <td
                                key={c.id}
                                className={`py-3 px-6 font-mono text-sm ${
                                  winnerStatus === 'better'
                                    ? 'bg-emerald-950/30 text-emerald-300 font-bold'
                                    : winnerStatus === 'similar'
                                    ? 'text-slate-200 font-medium'
                                    : 'text-slate-400'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{formattedVal}</span>
                                  
                                  {/* Winner Status Icon */}
                                  {winnerStatus === 'better' && (
                                    <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-300 bg-emerald-900/60 border border-emerald-500/40 rounded-full flex items-center gap-1 shadow-sm">
                                      <CheckCircle2 className="w-3 h-3" /> Winner
                                    </span>
                                  )}
                                  {winnerStatus === 'similar' && (
                                    <span className="px-1.5 py-0.5 text-[9px] text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded flex items-center gap-0.5">
                                      <MinusCircle className="w-2.5 h-2.5" /> Similar
                                    </span>
                                  )}
                                </div>
                              </td>
                            );
                          })}

                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
