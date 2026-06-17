import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionTable } from '../components/TransactionTable';
import { 
  ArrowUpDown, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  PieChart as PieIcon, 
  DollarSign 
} from 'lucide-react';
import { KPICard } from '../components/KPICard';

export const TransactionAnalysis: React.FC = () => {
  const { transactions, currency } = useApp();

  // Aggregate stats dynamically across 5,000 transactions
  const totalCount = transactions.length;
  
  const avgSize = useMemo(() => {
    const expenses = transactions.filter(t => t.debit > 0);
    if (expenses.length === 0) return 0;
    const totalExp = expenses.reduce((sum, t) => sum + t.debit, 0);
    return Math.floor(totalExp / expenses.length);
  }, [transactions]);

  const mappedCategoryRate = useMemo(() => {
    // Percentage of categorized transactions not categorized as 'Other'
    const categorized = transactions.filter(t => t.category !== 'Other');
    return Math.floor((categorized.length / Math.max(1, transactions.length)) * 100);
  }, [transactions]);

  const getCurrencySymbol = () => {
    if (currency === 'LAK') return '₭';
    if (currency === 'VND') return '₫';
    return '$';
  };

  const formatAmount = (val: number) => {
    let scalar = 1;
    if (currency === 'LAK') scalar = 21000;
    if (currency === 'VND') scalar = 25000;
    
    return `${getCurrencySymbol()}${(val * scalar).toLocaleString()}`;
  };

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Dynamic Metric overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <KPICard
          title="Analyzed Transactions"
          value={totalCount.toLocaleString()}
          subtitle="Processed entries across ledger"
          change="100% Core Map"
          changeType="positive"
          icon={<ArrowUpDown size={20} />}
          iconBgColor="bg-slate-50 text-[#0B3C5D]"
        />
        <KPICard
          title="Average Debit Value"
          value={formatAmount(avgSize)}
          subtitle="Estimated size per expense log"
          change="Stabilized"
          changeType="neutral"
          icon={<DollarSign size={20} />}
          iconBgColor="bg-indigo-50 text-indigo-500"
        />
        <KPICard
          title="Neural Classification rate"
          value={`${mappedCategoryRate}%`}
          subtitle="OCR mapped categories"
          change="High Confidence"
          changeType="positive"
          icon={<PieIcon size={20} />}
          iconBgColor="bg-emerald-50 text-[#00C48C]"
        />
      </div>

      {/* Main Analysis table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 sticky top-[88px] z-10">
        <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight font-sans">
              Master Ledger Analysis
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Inspect, sort, filter, and track neural confidence metrics across exactly 5,000 real-time transaction indices
            </p>
          </div>
          
          <div className="hidden lg:flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl border border-purple-100/60 text-[10px] font-bold">
            <Sparkles size={12} />
            <span>AI Mapping Active</span>
          </div>
        </div>

        {/* Big data table */}
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};
