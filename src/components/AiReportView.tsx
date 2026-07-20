import React from 'react';
import { Company } from '../types/company';
import { useApp } from '../context/AppContext';
import { generateAutomatedInsights, formatCurrency } from '../services/financialEngine';
import { Bot, Sparkles, TrendingUp, ShieldCheck, Zap, Award, Target, HelpCircle } from 'lucide-react';

interface AiReportViewProps {
  companies: Company[];
}

export const AiReportView: React.FC<AiReportViewProps> = ({ companies }) => {
  const { currency } = useApp();

  if (companies.length === 0) return null;

  const mainCompany = companies[0];
  const insights = generateAutomatedInsights(companies);

  return (
    <div className="space-y-6">
      
      {/* AI Score Breakdown Grid */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-extrabold text-white">AI Rating Scorecard & Meter</h3>
          </div>
          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 rounded-full">
            NEURAL SCORING ENGINE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {companies.map(c => (
            <div key={c.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <img src={c.logo} alt={c.name} className="w-5 h-5 rounded" />
                <span className="font-bold text-xs text-white truncate">{c.ticker}</span>
              </div>

              <div className="text-center py-2 bg-[#07090e] rounded-xl border border-slate-800">
                <span className="text-3xl font-extrabold font-mono text-cyan-400">{c.aiScores.overall}</span>
                <span className="text-[10px] text-slate-500 block font-mono">OVERALL AI SCORE</span>
              </div>

              <div className="space-y-1 text-[11px] font-mono pt-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Health:</span>
                  <span className="font-bold text-emerald-400">{c.aiScores.financialHealth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Growth:</span>
                  <span className="font-bold text-cyan-400">{c.aiScores.growth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Innovation:</span>
                  <span className="font-bold text-purple-400">{c.aiScores.innovation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Valuation:</span>
                  <span className="font-bold text-amber-400">{c.aiScores.valuation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automated Dynamic Insights Cards */}
      {insights.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Automated AI Strategic Insights</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {insights.map((ins, idx) => (
              <div key={idx} className="p-4 rounded-xl glass-card border border-slate-800 text-xs text-slate-200 leading-relaxed flex items-start gap-2">
                <span>{ins}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full AI Executive Synthesis Report */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 shadow-2xl">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>COMPREHENSIVE AI REPORT</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            Financial & Strategic Analysis: {mainCompany.name}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
          {/* Executive Summary */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
              <Target className="w-4 h-4" /> Executive Summary
            </h4>
            <p>
              {mainCompany.name} ({mainCompany.ticker}) operates with exceptional market efficiency in the {mainCompany.industry} sector. With a current market capitalization of {formatCurrency(mainCompany.marketCap, currency, true)} and trailing annual revenues of {formatCurrency(mainCompany.revenue, currency, true)}, the company maintains a dominant competitive moat anchored by proprietary technology and strong global distribution channels.
            </p>
          </div>

          {/* Profitability Analysis */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Profitability & Margin Discipline
            </h4>
            <p>
              Delivering a Return on Equity (ROE) of {mainCompany.roe}% and a net profit margin of {mainCompany.netMargin}%, {mainCompany.name} outperforms standard industry peer averages. Operating income of {formatCurrency(mainCompany.operatingIncome, currency, true)} underscores high cost discipline and pricing power against inflationary headwinds.
            </p>
          </div>

          {/* Growth & Liquidity */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-purple-400 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Liquidity & Balance Sheet Strength
            </h4>
            <p>
              The balance sheet exhibits robust liquidity, carrying {formatCurrency(mainCompany.cash, currency, true)} in total cash reserves against total debt of {formatCurrency(mainCompany.debt, currency, true)}. Free cash flow generation of {formatCurrency(mainCompany.freeCashFlow, currency, true)} provides ample capacity for ongoing R&D reinvestment, strategic M&A, and shareholder dividend payouts.
            </p>
          </div>

          {/* Investment Outlook & Forecast */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
              <Award className="w-4 h-4" /> AI 3-Year Forward Forecast (2026-2028)
            </h4>
            <p className="mb-2">
              Predictive neural modeling forecasts steady top-line growth of +{mainCompany.aiForecast.year2026.growth}% into 2026, projecting annual revenues to reach {formatCurrency(mainCompany.aiForecast.year2026.revenue, currency, true)} and net income of {formatCurrency(mainCompany.aiForecast.year2026.profit, currency, true)}.
            </p>
            <div className="flex gap-2 font-mono text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              <div className="flex-1 bg-slate-950 p-2 rounded text-center">
                <div className="text-white font-bold">{formatCurrency(mainCompany.aiForecast.year2026.revenue, currency, true)}</div>
                <div>2026 Est. Rev</div>
              </div>
              <div className="flex-1 bg-slate-950 p-2 rounded text-center">
                <div className="text-white font-bold">{formatCurrency(mainCompany.aiForecast.year2027.revenue, currency, true)}</div>
                <div>2027 Est. Rev</div>
              </div>
              <div className="flex-1 bg-slate-950 p-2 rounded text-center">
                <div className="text-white font-bold">{formatCurrency(mainCompany.aiForecast.year2028.revenue, currency, true)}</div>
                <div>2028 Est. Rev</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
