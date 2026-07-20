import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getCompanyById } from '../data/mockCompanies';
import { formatCurrency, formatPercent } from '../services/financialEngine';
import { X, ExternalLink, Globe, Building2, User, Calendar, Users, Award, ShieldCheck, Newspaper, Milestone, CheckCircle2 } from 'lucide-react';

export const CompanyProfileModal: React.FC = () => {
  const { profileModalCompanyId, closeProfileModal, addCompanyToCompare, setSelectedCompanyIds, setActiveTab, currency } = useApp();
  const [activeTab, setActiveTabLocal] = useState<'overview' | 'financials' | 'timeline' | 'news'>('overview');

  if (!profileModalCompanyId) return null;

  const company = getCompanyById(profileModalCompanyId);
  if (!company) return null;

  const handleCompareThisCompany = () => {
    addCompanyToCompare(company.id);
    closeProfileModal();
    setActiveTab('compare');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel bg-[#0d121d]/95 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto space-y-6">
        
        {/* Close Button */}
        <button
          onClick={closeProfileModal}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Company Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-md" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white">{company.name}</h2>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-slate-800 text-slate-200 rounded-lg border border-slate-700">
                  {company.ticker}
                </span>
                <span className="text-sm">{company.country === 'United States' ? '🇺🇸' : company.country === 'Vietnam' ? '🇻🇳' : company.country === 'South Korea' ? '🇰🇷' : company.country === 'Japan' ? '🇯🇵' : '🌐'}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>{company.industry}</span>
                <span>•</span>
                <span>{company.exchange}</span>
                <span>•</span>
                <a href={company.website} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-0.5">
                  <span>Website</span> <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>

          <button
            onClick={handleCompareThisCompany}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>Compare {company.ticker}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTabLocal('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview & Strategy
          </button>
          <button
            onClick={() => setActiveTabLocal('financials')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'financials' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            5-Year Financials
          </button>
          <button
            onClick={() => setActiveTabLocal('timeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'timeline' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Milestones Timeline
          </button>
          <button
            onClick={() => setActiveTabLocal('news')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'news' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            News & Earnings
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Leadership & Meta Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 text-[10px]">CHIEF EXECUTIVE (CEO)</span>
                <p className="font-bold text-white mt-0.5 truncate">{company.ceo}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 text-[10px]">FOUNDED YEAR</span>
                <p className="font-bold text-white mt-0.5">{company.foundedYear}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 text-[10px]">HEADQUARTERS</span>
                <p className="font-bold text-white mt-0.5 truncate">{company.headquarters}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 text-[10px]">WORKFORCE</span>
                <p className="font-bold text-white mt-0.5">{company.employees.toLocaleString()} Employees</p>
              </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 text-[10px]">MARKET CAP</span>
                <p className="text-base font-extrabold text-cyan-400 mt-0.5">{formatCurrency(company.marketCap, currency, true)}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 text-[10px]">REVENUE (TTM)</span>
                <p className="text-base font-extrabold text-white mt-0.5">{formatCurrency(company.revenue, currency, true)}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 text-[10px]">RETURN ON EQUITY</span>
                <p className="text-base font-extrabold text-emerald-400 mt-0.5">{formatPercent(company.roe)}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-500 text-[10px]">NET PROFIT MARGIN</span>
                <p className="text-base font-extrabold text-purple-400 mt-0.5">{company.netMargin}%</p>
              </div>
            </div>

            {/* Description & Business Model */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                <h4 className="font-bold text-white text-sm">Business Description</h4>
                <p className="leading-relaxed">{company.businessDescription}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">Business Model</h4>
                  <p className="leading-relaxed">{company.businessModel}</p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">Mission & Vision</h4>
                  <p className="leading-relaxed">{company.mission}</p>
                </div>
              </div>

              {/* Competitive Moats */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">Economic Moats & Competitive Advantages</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {company.competitiveAdvantages.map((adv, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Historical Financials */}
        {activeTab === 'financials' && (
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4 text-right">Revenue ($B)</th>
                    <th className="py-3 px-4 text-right">Net Income ($B)</th>
                    <th className="py-3 px-4 text-right">ROE (%)</th>
                    <th className="py-3 px-4 text-right">ROA (%)</th>
                    <th className="py-3 px-4 text-right">EPS ($)</th>
                    <th className="py-3 px-4 text-right">Free Cash Flow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {company.historical.map(h => (
                    <tr key={h.year} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-white">{h.year}</td>
                      <td className="py-3 px-4 text-right text-cyan-400">{formatCurrency(h.revenue, currency, true)}</td>
                      <td className="py-3 px-4 text-right text-slate-200">{formatCurrency(h.netIncome, currency, true)}</td>
                      <td className="py-3 px-4 text-right text-emerald-400 font-bold">{formatPercent(h.roe)}</td>
                      <td className="py-3 px-4 text-right text-slate-300">{formatPercent(h.roa)}</td>
                      <td className="py-3 px-4 text-right text-slate-200">${h.eps}</td>
                      <td className="py-3 px-4 text-right text-purple-400">{formatCurrency(h.fcf, currency, true)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Milestones */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            {company.milestones.map((m, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="px-3 py-1 bg-cyan-950 text-cyan-400 font-mono font-bold text-sm rounded-lg border border-cyan-500/30 h-fit">
                  {m.year}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{m.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: News */}
        {activeTab === 'news' && (
          <div className="space-y-3">
            {company.news.map((n) => (
              <div key={n.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{n.source} • {n.date}</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${n.sentiment === 'positive' ? 'text-emerald-400 bg-emerald-950' : 'text-slate-400 bg-slate-800'}`}>
                    {n.sentiment.toUpperCase()}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">{n.title}</h4>
                <p className="text-xs text-slate-300">{n.summary}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
