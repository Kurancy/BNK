import React from 'react';
import { UploadZone } from '../components/UploadZone';
import { useApp } from '../context/AppContext';
import { FileText, Database, ShieldAlert, Sparkles, Server, HelpCircle } from 'lucide-react';

export const UploadStatement: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      {/* Informative top advice cards */}
      <div className="bg-gradient-to-r from-[#0B3C5D] to-slate-800 text-white rounded-2xl p-6 shadow-sm border border-[#0B3C5D]/20">
        <h2 className="text-base font-bold tracking-tight font-sans flex items-center gap-2">
          <Sparkles size={18} className="text-accent animate-pulse" />
          OCR Statement Ingestion Framework
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          BNK Finance deploys advanced Optical Character Recognition (OCR) heuristics to ingest, clean, structure, and categorize transaction registries in seconds. Upload customer statements to instantly bootstrap an executive profile with comprehensive cash flow matrices and credit risk ratings.
        </p>

        {/* Bullet statistics alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/10 text-xs">
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-lg bg-white/10 text-accent font-bold">1</span>
            <div>
              <p className="font-bold text-white">Full Schema Parsing</p>
              <p className="text-[10px] text-slate-400">Maps credit/debit logs, balances, and recurring descriptions.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-lg bg-white/10 text-accent font-bold">2</span>
            <div>
              <p className="font-bold text-white">Auto Classification</p>
              <p className="text-[10px] text-slate-400">Categorizes expenses into 8 critical branches dynamically.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-lg bg-white/10 text-accent font-bold">3</span>
            <div>
              <p className="font-bold text-white">Direct Risk Scorecard</p>
              <p className="text-[10px] text-slate-400">Calculates liquidity thresholds and assigns rating scores.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Upload Zone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <UploadZone />
        </div>

        {/* Side advisory criteria panels */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-sans border-b border-slate-100 pb-3">
            <Database size={15} className="text-primary" />
            Ingestion Criteria
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                <FileText size={11} className="text-slate-500" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold text-slate-700">Supported Formats</h4>
                <p className="text-[10px] text-slate-400 font-medium">Standard structural PDF summaries, CSV exports, Excel (.xlsx, .xls) worksheets from major international banking networks.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                <Server size={11} className="text-slate-500" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold text-slate-700">Audit Compliant logs</h4>
                <p className="text-[10px] text-slate-400 font-medium">Every ingested file creates an unmodifiable, searchable entry in the system audit trail to comply with Basel III and local framework directives.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                <ShieldAlert size={11} className="text-slate-500" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold text-slate-700">GDPR & Bank Secrecy Guarded</h4>
                <p className="text-[10px] text-slate-400 font-medium">Data resides secure inside sandboxed memory context. Absolutely zero persistent public storage leaks or external model breaches.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[10px] font-medium text-slate-500 leading-relaxed flex gap-2">
              <HelpCircle size={14} className="text-[#0B3C5D] shrink-0" />
              <span>Need statement templates? Contact support or download the BNK standard CSV layout from your Settings interface.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
