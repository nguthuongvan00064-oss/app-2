import React, { useState } from 'react';
import { Company } from '../types/company';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatPercent } from '../services/financialEngine';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { BarChart3, LineChart as LineIcon, PieChart as PieIcon, Activity, Gauge, ShieldAlert } from 'lucide-react';

interface ChartsSuiteProps {
  companies: Company[];
}

const COLOR_PALETTE = ['#00f0ff', '#7000ff', '#00e676', '#ff1744', '#ffb300', '#38c5ff'];

export const ChartsSuite: React.FC<ChartsSuiteProps> = ({ companies }) => {
  const { currency } = useApp();
  const [activeChartTab, setActiveChartTab] = useState<'line' | 'bar' | 'radar' | 'pie' | 'scatter' | 'gauge'>('line');

  if (companies.length === 0) return null;

  // Prepare Line Chart Data (Historical trends across companies)
  const historicalYears = ['2020', '2021', '2022', '2023', '2024'];
  const revenueLineData = historicalYears.map(year => {
    const row: Record<string, any> = { year };
    companies.forEach(c => {
      const h = c.historical.find(item => item.year === year);
      row[c.ticker] = h ? h.revenue : c.revenue;
    });
    return row;
  });

  const netIncomeLineData = historicalYears.map(year => {
    const row: Record<string, any> = { year };
    companies.forEach(c => {
      const h = c.historical.find(item => item.year === year);
      row[c.ticker] = h ? h.netIncome : c.netIncome;
    });
    return row;
  });

  const roeLineData = historicalYears.map(year => {
    const row: Record<string, any> = { year };
    companies.forEach(c => {
      const h = c.historical.find(item => item.year === year);
      row[c.ticker] = h ? h.roe : c.roe;
    });
    return row;
  });

  // Prepare Bar Chart Data (Assets vs Debt vs Cash)
  const balanceSheetBarData = companies.map(c => ({
    name: c.ticker,
    Assets: c.assets,
    Debt: c.debt,
    Cash: c.cash,
    Equity: c.equity
  }));

  // Prepare Radar Chart Data
  const radarDimensions = [
    { subject: 'Financial Strength', key: 'financialStrength' },
    { subject: 'Innovation', key: 'innovation' },
    { subject: 'Market Share', key: 'marketShare' },
    { subject: 'Brand Power', key: 'brandPower' },
    { subject: 'Risk Rating', key: 'risk' },
    { subject: 'Growth Momentum', key: 'growth' }
  ];

  const radarData = radarDimensions.map(dim => {
    const row: Record<string, any> = { subject: dim.subject };
    companies.forEach(c => {
      row[c.ticker] = c.radarMetrics[dim.key as keyof typeof c.radarMetrics] || 80;
    });
    return row;
  });

  // Prepare Pie Data for Segment Breakdown of first company
  const firstCompany = companies[0];
  const pieData = firstCompany.segments.map(s => ({
    name: s.name,
    value: s.percentage
  }));

  // Scatter plot data: ROE vs ROA
  const scatterData = companies.map(c => ({
    x: c.roa,
    y: c.roe,
    z: c.marketCap,
    name: c.name,
    ticker: c.ticker
  }));

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 shadow-2xl">
      
      {/* Top Header & Chart Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>TradingView Grade Interactive Financial Visuals</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Line, Bar, Radar, Pie, Scatter matrix & animated gauge health meters.</p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 flex-wrap">
          <button
            onClick={() => setActiveChartTab('line')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeChartTab === 'line' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LineIcon className="w-3.5 h-3.5" />
            <span>Line Trends</span>
          </button>

          <button
            onClick={() => setActiveChartTab('bar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeChartTab === 'bar' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Bar Breakdown</span>
          </button>

          <button
            onClick={() => setActiveChartTab('radar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeChartTab === 'radar' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Radar Matrix</span>
          </button>

          <button
            onClick={() => setActiveChartTab('pie')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeChartTab === 'pie' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Segments</span>
          </button>

          <button
            onClick={() => setActiveChartTab('scatter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeChartTab === 'scatter' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>ROE vs ROA Matrix</span>
          </button>

          <button
            onClick={() => setActiveChartTab('gauge')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeChartTab === 'gauge' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Health Speedometer</span>
          </button>
        </div>
      </div>

      {/* Line Chart View */}
      {activeChartTab === 'line' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Line */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-mono font-bold text-slate-300 mb-4">5-Year Revenue Growth Trajectory ($B)</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueLineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2638" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#121722', borderColor: '#1e2638', borderRadius: '12px' }} />
                  <Legend />
                  {companies.map((c, i) => (
                    <Line
                      key={c.id}
                      type="monotone"
                      dataKey={c.ticker}
                      stroke={COLOR_PALETTE[i % COLOR_PALETTE.length]}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ROE Trend Line */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-mono font-bold text-slate-300 mb-4">5-Year Return on Equity Trend (ROE %)</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={roeLineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2638" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#121722', borderColor: '#1e2638', borderRadius: '12px' }} />
                  <Legend />
                  {companies.map((c, i) => (
                    <Line
                      key={c.id}
                      type="monotone"
                      dataKey={c.ticker}
                      stroke={COLOR_PALETTE[i % COLOR_PALETTE.length]}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Bar Chart View */}
      {activeChartTab === 'bar' && (
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-mono font-bold text-slate-300 mb-4">Balance Sheet Structure Comparison (Assets vs Debt vs Cash vs Equity)</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={balanceSheetBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2638" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#121722', borderColor: '#1e2638', borderRadius: '12px' }} />
                <Legend />
                <Bar dataKey="Assets" fill="#00f0ff" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Debt" fill="#ff1744" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Cash" fill="#00e676" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Equity" fill="#7000ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Radar Chart View */}
      {activeChartTab === 'radar' && (
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-mono font-bold text-slate-300 mb-4">Multi-Dimensional Competitive Radar Matrix</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e2638" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Tooltip contentStyle={{ backgroundColor: '#121722', borderColor: '#1e2638', borderRadius: '12px' }} />
                <Legend />
                {companies.map((c, i) => (
                  <Radar
                    key={c.id}
                    name={c.ticker}
                    dataKey={c.ticker}
                    stroke={COLOR_PALETTE[i % COLOR_PALETTE.length]}
                    fill={COLOR_PALETTE[i % COLOR_PALETTE.length]}
                    fillOpacity={0.3}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Pie & Donut Chart View */}
      {activeChartTab === 'pie' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-mono font-bold text-slate-300 mb-2">{firstCompany.name} Business Segments Mix</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#121722', borderColor: '#1e2638', borderRadius: '12px' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-mono font-bold text-slate-300 mb-2">{firstCompany.name} Regional Revenue Split</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={firstCompany.regionalRevenue.map(r => ({ name: r.region, value: r.percentage }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {firstCompany.regionalRevenue.map((entry, index) => (
                      <Cell key={`cell-reg-${index}`} fill={COLOR_PALETTE[(index + 2) % COLOR_PALETTE.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#121722', borderColor: '#1e2638', borderRadius: '12px' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Scatter View */}
      {activeChartTab === 'scatter' && (
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-mono font-bold text-slate-300 mb-4">Capital Return Efficiency Scatter (ROA vs ROE)</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2638" />
                <XAxis type="number" dataKey="x" name="ROA (%)" stroke="#64748b" />
                <YAxis type="number" dataKey="y" name="ROE (%)" stroke="#64748b" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#121722', borderColor: '#1e2638', borderRadius: '12px' }} />
                <Scatter name="Companies" data={scatterData} fill="#00f0ff" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Health Speedometer Gauge View */}
      {activeChartTab === 'gauge' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map(c => {
            const score = c.aiScores.overall;
            const needleAngle = (score / 100) * 180 - 90;

            return (
              <div key={c.id} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img src={c.logo} alt={c.name} className="w-6 h-6 rounded-lg" />
                  <span className="font-bold text-sm text-white">{c.name}</span>
                </div>

                {/* SVG Speedometer Gauge */}
                <div className="relative w-44 h-24 mx-auto my-2">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    {/* Semi-circle track */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="#1e2638"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Active Speedometer Arc */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="10"
                      strokeDasharray={`${(score / 100) * 126} 126`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff1744" />
                        <stop offset="50%" stopColor="#ffb300" />
                        <stop offset="100%" stopColor="#00e676" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <span className="text-2xl font-extrabold font-mono text-white">{score}</span>
                    <span className="text-[10px] text-slate-400 font-mono">FINANCIAL HEALTH</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-mono mt-2">
                  <span className="text-slate-400">Risk Level:</span>
                  <span className={`font-bold ${c.riskRating === 'Low' ? 'text-emerald-400' : c.riskRating === 'Medium' ? 'text-amber-400' : 'text-rose-400'}`}>
                    {c.riskRating} Risk
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
