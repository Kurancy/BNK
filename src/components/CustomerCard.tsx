import React from 'react';
import { Customer } from '../types';
import { useApp } from '../context/AppContext';
import { ChevronRight, ShieldCheck, ShieldAlert, CreditCard, Sparkles } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  const { setSelectedCustomerId, setCurrentPage, currency } = useApp();

  const getRiskStyles = (level: Customer['riskLevel']) => {
    switch (level) {
      case 'HIGH':
        return 'bg-rose-50 border-rose-100 text-danger';
      case 'MEDIUM':
        return 'bg-amber-50 border-amber-100 text-warning';
      default:
        return 'bg-emerald-50 border-emerald-100 text-accent';
    }
  };

  const getCurrencySymbol = () => {
    if (currency === 'LAK') return '₭';
    if (currency === 'VND') return '₫';
    return '$';
  };

  const formatMoney = (val: number) => {
    let scalar = 1;
    if (currency === 'LAK') scalar = 21000;
    if (currency === 'VND') scalar = 25000;
    
    return `${getCurrencySymbol()}${(val * scalar).toLocaleString()}`;
  };

  const handleInspect = () => {
    setSelectedCustomerId(customer.id);
    setCurrentPage('customer-profile');
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group h-full">
      <div className="space-y-3.5">
        {/* Top Header Row with avatar initials and scores */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center text-xs tracking-wider shadow-sm ${customer.avatarColor}`}>
              {customer.avatar}
            </div>
            <div className="truncate">
              <h4 className="text-xs font-bold text-slate-800 tracking-tight group-hover:text-primary transition-colors truncate">
                {customer.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-medium truncate">{customer.company}</p>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-[10px] font-mono font-bold text-slate-400 block tracking-tight uppercase">Score</span>
            <div className="flex items-center gap-0.5 justify-end">
              <Sparkles size={10} className="text-purple-500" />
              <span className="text-xs font-black text-slate-800">{customer.financialScore}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-slate-100"></div>

        {/* Quick details grid */}
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Balance</span>
            <span className="text-[11px] font-bold text-slate-700 font-mono">{formatMoney(customer.totalBalance)}</span>
          </div>

          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Status</span>
            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border inline-block ${getRiskStyles(customer.riskLevel)}`}>
              {customer.riskLevel} RISK
            </span>
          </div>
        </div>

        {/* More details */}
        <div className="text-[10px] text-slate-400 flex items-center gap-1">
          <CreditCard size={11} className="text-slate-400 shrink-0" />
          <span className="truncate">Acc #<span className="font-mono">{customer.accountNumber}</span></span>
        </div>
      </div>

      {/* Access inspect detail */}
      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
        <button
          onClick={handleInspect}
          className="text-[10px] font-bold text-primary group-hover:text-accent hover:underline flex items-center gap-0.5 uppercase cursor-pointer tracking-wider"
        >
          Inspect Cabinet
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
