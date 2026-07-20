import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getCompanyById } from '../data/mockCompanies';
import { formatCurrency, formatPercent } from '../services/financialEngine';
import confetti from 'canvas-confetti';
import { Swords, Trophy, X, Zap, ShieldAlert, Award } from 'lucide-react';

export const BattleModeModal: React.FC = () => {
  const { battleModeOpen, setBattleModeOpen, selectedCompanyIds, currency } = useApp();

  const companyA = getCompanyById(selectedCompanyIds[0] || 'apple');
  const companyB = getCompanyById(selectedCompanyIds[1] || 'samsung');

  const [round, setRound] = useState(1);
  const [fighting, setFighting] = useState(false);
  const [victor, setVictor] = useState<'A' | 'B' | 'TIE' | null>(null);

  // Trigger confetti when victor is calculated
  useEffect(() => {
    if (victor && victor !== 'TIE') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [victor]);

  if (!battleModeOpen || !companyA || !companyB) return null;

  // Calculate battle scores
  let scoreA = 0;
  let scoreB = 0;

  // Round 1: Margins
  if (companyA.netMargin > companyB.netMargin) scoreA += 25;
  else if (companyB.netMargin > companyA.netMargin) scoreB += 25;
  else { scoreA += 12; scoreB += 12; }

  // Round 2: ROE
  if (companyA.roe > companyB.roe) scoreA += 25;
  else if (companyB.roe > companyA.roe) scoreB += 25;

  // Round 3: Growth
  if (companyA.revenueGrowth > companyB.revenueGrowth) scoreA += 25;
  else if (companyB.revenueGrowth > companyA.revenueGrowth) scoreB += 25;

  // Round 4: Cash vs Debt Ratio
  const ratioA = companyA.cash / (companyA.debt || 1);
  const ratioB = companyB.cash / (companyB.debt || 1);
  if (ratioA > ratioB) scoreA += 25;
  else if (ratioB > ratioA) scoreB += 25;

  const startBattle = () => {
    setFighting(true);
    setVictor(null);
    setTimeout(() => {
      setFighting(false);
      if (scoreA > scoreB) setVictor('A');
      else if (scoreB > scoreA) setVictor('B');
      else setVictor('TIE');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl glass-panel bg-[#0c0f17]/95 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setBattleModeOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
            <Swords className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>1V1 FINANCIAL BATTLE ARENA</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            {companyA.ticker} <span className="text-amber-400 font-mono">VS</span> {companyB.ticker}
          </h2>
          <p className="text-xs text-slate-400">Head-to-head financial battle comparing profitability, capital return, growth & balance sheet resilience.</p>
        </div>

        {/* 1v1 Arena Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
          
          {/* VS Badge in Middle */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 border-4 border-[#0c0f17] items-center justify-center font-mono font-black text-white text-lg shadow-2xl z-10 animate-bounce">
            VS
          </div>

          {/* Fighter A */}
          <div className={`p-6 rounded-2xl glass-card border transition-all ${victor === 'A' ? 'border-amber-400 bg-amber-950/20 shadow-2xl shadow-amber-500/20 scale-105' : 'border-slate-800'}`}>
            <div className="flex items-center gap-4 mb-4">
              <img src={companyA.logo} alt={companyA.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md" />
              <div>
                <h3 className="font-extrabold text-xl text-white">{companyA.name}</h3>
                <p className="text-xs font-mono text-cyan-400">{companyA.ticker} • {companyA.country}</p>
              </div>
            </div>

            {/* Health / Battle Bar A */}
            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-slate-400">BATTLE SCORE</span>
                <span className="text-amber-400">{scoreA} HP</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-1000"
                  style={{ width: `${scoreA}%` }}
                />
              </div>
            </div>

            {/* Key Battle Metrics */}
            <div className="space-y-2 text-xs font-mono pt-3 border-t border-slate-800/80">
              <div className="flex justify-between">
                <span className="text-slate-500">Net Profit Margin:</span>
                <span className="font-bold text-white">{companyA.netMargin}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ROE (Return on Equity):</span>
                <span className="font-bold text-emerald-400">{formatPercent(companyA.roe)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Revenue Growth:</span>
                <span className="font-bold text-cyan-400">+{companyA.revenueGrowth}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Cash Buffer:</span>
                <span className="font-bold text-slate-200">{formatCurrency(companyA.cash, currency, true)}</span>
              </div>
            </div>
          </div>

          {/* Fighter B */}
          <div className={`p-6 rounded-2xl glass-card border transition-all ${victor === 'B' ? 'border-amber-400 bg-amber-950/20 shadow-2xl shadow-amber-500/20 scale-105' : 'border-slate-800'}`}>
            <div className="flex items-center gap-4 mb-4">
              <img src={companyB.logo} alt={companyB.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md" />
              <div>
                <h3 className="font-extrabold text-xl text-white">{companyB.name}</h3>
                <p className="text-xs font-mono text-cyan-400">{companyB.ticker} • {companyB.country}</p>
              </div>
            </div>

            {/* Health / Battle Bar B */}
            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-slate-400">BATTLE SCORE</span>
                <span className="text-amber-400">{scoreB} HP</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-purple-500 transition-all duration-1000"
                  style={{ width: `${scoreB}%` }}
                />
              </div>
            </div>

            {/* Key Battle Metrics */}
            <div className="space-y-2 text-xs font-mono pt-3 border-t border-slate-800/80">
              <div className="flex justify-between">
                <span className="text-slate-500">Net Profit Margin:</span>
                <span className="font-bold text-white">{companyB.netMargin}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ROE (Return on Equity):</span>
                <span className="font-bold text-emerald-400">{formatPercent(companyB.roe)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Revenue Growth:</span>
                <span className="font-bold text-cyan-400">+{companyB.revenueGrowth}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Cash Buffer:</span>
                <span className="font-bold text-slate-200">{formatCurrency(companyB.cash, currency, true)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Victor Declaration Box */}
        {victor && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-center animate-fade-in">
            <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-1 animate-bounce" />
            <h4 className="text-xl font-extrabold text-amber-300">
              {victor === 'A' ? `${companyA.name} VICTORY!` : victor === 'B' ? `${companyB.name} VICTORY!` : 'FINANCIAL DRAW TIE!'}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              {victor === 'A' ? companyA.name : victor === 'B' ? companyB.name : 'Both companies'} dominated key financial metrics face-off.
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={startBattle}
            disabled={fighting}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-red-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-amber-500/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Zap className={`w-5 h-5 ${fighting ? 'animate-spin' : ''}`} />
            <span>{fighting ? 'Simulating Financial Battle...' : victor ? 'Re-Fight Battle' : 'Fight Battle Ring'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
