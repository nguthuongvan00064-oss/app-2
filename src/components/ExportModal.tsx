import React from 'react';
import { useApp } from '../context/AppContext';
import { getCompanyById } from '../data/mockCompanies';
import { exportComparisonToCSV } from '../services/financialEngine';
import { FileText, Download, Printer, X, Check } from 'lucide-react';

export const ExportModal: React.FC = () => {
  const { exportModalOpen, setExportModalOpen, selectedCompanyIds } = useApp();

  if (!exportModalOpen) return null;

  const companies = selectedCompanyIds.map(id => getCompanyById(id)).filter((c): c is any => c !== undefined);

  const handleCSVExport = () => {
    exportComparisonToCSV(companies);
    setExportModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
    setExportModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md glass-panel bg-[#0d121d]/95 border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Close */}
        <button
          onClick={() => setExportModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <FileText className="w-8 h-8 text-cyan-400 mx-auto" />
          <h3 className="text-xl font-extrabold text-white">Export Financial Report</h3>
          <p className="text-xs text-slate-400">Export financial metrics and analysis for {companies.length} compared companies.</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCSVExport}
            className="w-full p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-left flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-bold text-sm text-white">Export to CSV / Excel</div>
                <div className="text-[11px] text-slate-400">Comma-separated matrix data file</div>
              </div>
            </div>
            <Check className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
          </button>

          <button
            onClick={handlePrint}
            className="w-full p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-left flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <Printer className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-bold text-sm text-white">Print / PDF Format</div>
                <div className="text-[11px] text-slate-400">Printable Bloomberg-grade report preview</div>
              </div>
            </div>
            <Check className="w-4 h-4 text-slate-600 group-hover:text-purple-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
