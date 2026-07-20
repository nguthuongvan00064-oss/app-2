import React from 'react';
import { FEATURED_COMPANIES } from '../data/mockCompanies';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../services/financialEngine';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const MarketTicker: React.FC = () => {
  const { currency, openProfileModal } = useApp();

  return (
    <div className="w-full bg-[#07090e] border-b border-slate-800/60 overflow-hidden py-1.5 font-mono text-xs select-none">
      <div className="animate-ticker flex items-center gap-6">
        {[...FEATURED_COMPANIES, ...FEATURED_COMPANIES].map((company, idx) => {
          const isUp = company.revenueGrowth >= 0;
          return (
            <div
              key={`${company.id}-${idx}`}
              onClick={() => openProfileModal(company.id)}
              className="flex items-center gap-2 cursor-pointer hover:bg-slate-800/40 px-2 py-0.5 rounded transition-all shrink-0"
            >
              <span className="font-bold text-slate-200">{company.ticker}</span>
              <span className="text-slate-400 font-sans text-[11px] max-w-[90px] truncate">{company.name}</span>
              <span className="text-slate-300">{formatCurrency(company.marketCap, currency, true)}</span>
              <span className={`flex items-center text-[11px] font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isUp ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {isUp ? '+' : ''}{company.revenueGrowth}%
              </span>
              <span className="text-slate-700">|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
