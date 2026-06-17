import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, History, ShieldCheck, Database, Calendar, Eye, Download } from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const { auditLogs, searchQuery, addToast } = useApp();
  const [localSearch, setLocalSearch] = useState('');

  const filteredLogs = useMemo(() => {
    const q = (localSearch || searchQuery).toLowerCase();
    if (!q) return auditLogs;
    return auditLogs.filter(
      log =>
        log.action.toLowerCase().includes(q) ||
        log.user.toLowerCase().includes(q) ||
        log.description.toLowerCase().includes(q) ||
        log.id.toLowerCase().includes(q)
    );
  }, [auditLogs, searchQuery, localSearch]);

  const handleExportCSV = () => {
    addToast('Structuring operational logs catalog...', 'success');
    
    setTimeout(() => {
      addToast('Download triggered: Audit_Ledger_Log.csv prepared.', 'success');
      const csvContent = "Id,Date,Action,Operator,Description,Status\n" + 
        filteredLogs.map(l => `"${l.id}","${l.date}","${l.action}","${l.user}","${l.description}","${l.status}"`).join("\n");
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `BNK_Audit_Ledger_Log.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'FAILED':
        return 'bg-rose-50 text-danger border-rose-100';
      case 'WARNING':
        return 'bg-amber-50 text-warning border-amber-100';
      default:
        return 'bg-emerald-50 text-accent border-emerald-100';
    }
  };

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Search and control filter header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 border border-slate-200 rounded-2xl shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search action logs, operators, ids..."
            className="w-full text-xs h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-accent focus:bg-white"
          />
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 h-10 border border-slate-200 hover:bg-slate-50 bg-white hover:border-slate-300 rounded-xl text-xs font-bold text-slate-600 transition-all cursor-pointer shadow-xs whitespace-nowrap"
        >
          <Download size={14} />
          <span>Export Logs Ledger</span>
        </button>
      </div>

      {/* Main Timeline Card View */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#0B3C5D] flex items-center justify-center">
              <History size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 tracking-tight font-sans">
                Basel III Systemic Audit Trails
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">Unmodifiable, chronological logging tracking OCR parses, risk updates, and operator credentials</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 opacity-60">
            <ShieldCheck size={13} className="text-[#00C48C]" />
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest text-right">SECURE LEDGER INTEGRATED</span>
          </div>
        </div>

        {/* Detailed Timeline list elements */}
        {filteredLogs.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium italic text-center p-12 bg-slate-50 border rounded-xl">
            No active audit trails match search criteria. Change query or reload session.
          </p>
        ) : (
          <div className="space-y-5 relative pl-4 border-l border-slate-100 py-2">
            {filteredLogs.map((log) => (
              <div key={log.id} className="relative space-y-1">
                {/* Ring bullet indicators */}
                <span className={`absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ring-2 ${
                  log.status === 'FAILED' 
                    ? 'bg-rose-500 ring-rose-50' 
                    : log.status === 'WARNING'
                      ? 'bg-amber-500 ring-amber-50'
                      : 'bg-[#00C48C] ring-emerald-50'
                }`}></span>
                
                <div className="bg-slate-50/50 p-4 border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-white border px-2 py-0.5 rounded-md">
                        {log.id}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {log.action}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 border rounded-full uppercase tracking-wider ${getStatusStyles(log.status)}`}>
                        {log.status}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1">
                        <Calendar size={11} />
                        {log.date}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-slate-600 leading-relaxed font-sans mt-1">
                    {log.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-3 mt-1 opacity-90 border-t border-dashed border-slate-200/60 font-medium">
                    <span>Active Operator: <span className="font-bold text-slate-500">{log.user}</span></span>
                    <span className="italic">Basel III Certified Action</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
