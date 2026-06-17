import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AIInsightCard: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <Sparkles size={16} />
          </div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
            {t('recentAiInsights')}
          </h3>
        </div>

        {/* Dynamic List Items */}
        <div className="space-y-3.5">
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-50 transition-colors duration-200">
            <CheckCircle2 size={16} className="text-[#00C48C] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-800 tracking-tight">Stable Earnings Footprint</p>
              <p className="text-[10px] text-slate-500 font-medium">{t('aiInsightStableSalary')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 hover:bg-blue-50 transition-colors duration-200">
            <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-800 tracking-tight">Optimal Leverage Brackets</p>
              <p className="text-[10px] text-slate-500 font-medium">{t('aiInsightLowRisk')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-100/80 hover:bg-amber-50 transition-colors duration-200">
            <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-800 tracking-tight">Velocity Spend Warning</p>
              <p className="text-[10px] text-slate-500 font-medium">{t('aiInsightHighSpend')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-teal-50/50 border border-teal-100 hover:bg-teal-50 transition-colors duration-200">
            <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-800 tracking-tight">Active Monthly Surplus</p>
              <p className="text-[10px] text-slate-500 font-medium">{t('aiInsightPositiveCash')}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
        <span className="text-[10px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer hover:translate-x-0.5 transition-transform duration-200 uppercase tracking-widest">
          Deploy AI Agent
          <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
};
