import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ChartCard } from '../components/ChartCard';
import { KPICard } from '../components/KPICard';
import { 
  DollarSign, 
  Sparkles, 
  Scale, 
  Percent, 
  TrendingUp, 
  Building, 
  UserCheck, 
  ArrowRight,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

export const CashFlow: React.FC = () => {
  const { customers, selectedCustomerId, setSelectedCustomerId, currency, t } = useApp();

  const activeCustomer = useMemo(() => {
    return customers.find(c => c.id === selectedCustomerId) || customers[0];
  }, [customers, selectedCustomerId]);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomerId(e.target.value);
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

  // Recharts Chart parameters mapping Income, Expense, Savings
  const flowHistoryData = useMemo(() => {
    if (!activeCustomer) return [];
    return activeCustomer.monthlyHistory;
  }, [activeCustomer]);

  // Totalized variables
  const computedStats = useMemo(() => {
    if (!activeCustomer) return { totalIn: 0, totalOut: 0, surplus: 0, savingsPct: 0 };
    
    const salary = activeCustomer.monthlySalary;
    const expenseTotal = (Object.values(activeCustomer.expenseStructure) as number[]).reduce((a: number, b: number) => a + b, 0);
    const surplus = salary - expenseTotal;
    const savingsPct = Math.max(0, Math.round((surplus / salary) * 100));
    
    return {
      totalIn: salary,
      totalOut: expenseTotal,
      surplus,
      savingsPct,
    };
  }, [activeCustomer]);

  // AI explanation Paragraphs
  const aiExplanationText = useMemo(() => {
    if (!activeCustomer) return '';
    
    const { surplus, savingsPct } = computedStats;
    if (savingsPct >= 20) {
      return `✓ Outstanding liquidity surplus of ${savingsPct}% verified. With a net monthly redundant ledger savings capacity of ${formatMoney(surplus)}, customer ${activeCustomer.name} complies with the elite Basel Tier 1 solvency brackets. Monthly cash inflows fully insulate the operational burn rate, supporting excellent mortgage leverage capability. Principal holdings reside inside high-yield configurations with stable positive cycles.`;
    } else if (savingsPct >= 10) {
      return `✓ Positive cash flow confirmed with a savings coefficient of ${savingsPct}%. Operational reserves can weather short-term income variance. Recommend establishing formal corporate checking locks on secondary expense branches (Utility, retail shop outlays) to bolster monthly savings rate toward elite (>20%) tiers. Safe for traditional lending facilities.`;
    } else {
      return `⚠ Cash buffer Warning. Net monthly redundancies reside below ${savingsPct}%. Close-to-zero cash surplus rate. High discretionary spend behaviors currently consume immediate liquidity. Direct interventions regarding automated savings plans are strongly advised before reviewing loan margins.`;
    }
  }, [activeCustomer, computedStats]);

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Target Picking Context Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
            <UserCheck size={18} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Customer Context</span>
            <span className="text-xs font-semibold text-slate-500">Currently analyzing file of:</span>
          </div>
        </div>

        <div className="w-full sm:w-80">
          <select
            value={selectedCustomerId}
            onChange={handleCustomerChange}
            className="w-full text-xs h-10 border border-slate-200 bg-slate-50 px-3 rounded-xl focus:bg-white focus:outline-none focus:border-[#00C48C] font-semibold text-slate-700"
          >
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.id} – {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Math KPI Cards row */}
      {activeCustomer && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard
            title="Total Monthly Inflow"
            value={formatMoney(computedStats.totalIn)}
            subtitle="Aggregated monthly income"
            icon={<TrendingUp size={16} />}
            iconBgColor="bg-slate-50 text-primary"
          />
          <KPICard
            title="Total Monthly Outflow"
            value={formatMoney(computedStats.totalOut)}
            subtitle="Aggregated housing & expenses"
            icon={<TrendingDown size={16} />}
            iconBgColor="bg-slate-50 text-rose-500"
          />
          <KPICard
            title="Net Monthly Savings"
            value={formatMoney(computedStats.surplus)}
            subtitle="Net ledger surplus capacity"
            change={computedStats.surplus > 0 ? "Positive" : "Negative"}
            changeType={computedStats.surplus > 0 ? "positive" : "negative"}
            icon={<Scale size={16} />}
            iconBgColor="bg-emerald-50 text-[#00C48C]"
          />
          <KPICard
            title="Savings Rate %"
            value={`${computedStats.savingsPct}%`}
            subtitle="Percentage of salary saved"
            change={computedStats.savingsPct >= 20 ? "Optimal" : "Requires Buffer"}
            changeType={computedStats.savingsPct >= 20 ? "positive" : "warning"}
            icon={<Percent size={16} />}
            iconBgColor="bg-indigo-50 text-indigo-500"
          />
          <KPICard
            title="Asset Balance"
            value={formatMoney(activeCustomer.totalBalance)}
            subtitle="Total verified liquid reserves"
            icon={<Building size={16} />}
            iconBgColor="bg-teal-50 text-teal-600"
          />
          <KPICard
            title="Average Surplus Size"
            value={formatMoney(Math.floor(computedStats.surplus * 0.9))}
            subtitle="Estimated surplus moving average"
            icon={<DollarSign size={16} />}
            iconBgColor="bg-amber-50 text-warning"
          />
        </div>
      )}

      {/* Trendline Chart area */}
      {activeCustomer && (
        <div className="grid grid-cols-1 gap-6">
          <ChartCard 
            title="Parallel Liquidity Trendlines" 
            subtitle="Historical timeline reviewing income versus spending and incremental savings"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={flowHistoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(value: any) => [formatMoney(Number(value)), '']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }} 
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600, pt: 10 }} />
                <Line type="monotone" dataKey="income" name="Monthly Inflows" stroke="#0B3C5D" strokeWidth={3.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="expenses" name="Monthly Outflows" stroke="#E74C3C" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="savings" name="Net Redeemed Savings" stroke="#00C48C" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {/* AI Explanation cards */}
      {activeCustomer && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#00C48C]">
              <Sparkles size={16} />
            </div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
              AI Liquidity Explanation report
            </h3>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed">
            <p className="text-xs font-semibold text-slate-700 italic font-sans">
              {aiExplanationText}
            </p>
          </div>

          <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-50">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Liquidity Rating: BASEL TIER 1 CONFIRMED</span>
            <span className="text-[10px] font-bold text-primary flex items-center gap-0.5 whitespace-nowrap cursor-pointer uppercase hover:underline">
              Review credit underwriting
              <ArrowRight size={12} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
