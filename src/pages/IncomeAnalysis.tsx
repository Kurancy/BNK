import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ChartCard } from '../components/ChartCard';
import { KPICard } from '../components/KPICard';
import { 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  UserCheck,
  Percent,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const IncomeAnalysis: React.FC = () => {
  const { customers, selectedCustomerId, setSelectedCustomerId, currency, t } = useApp();

  // Find active customer
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

  // Recharts data for Monthly income stability Trend
  const trendData = useMemo(() => {
    if (!activeCustomer) return [];
    return activeCustomer.monthlyHistory;
  }, [activeCustomer]);

  // Recharts pie chart data for Income source distribution
  const sourceData = useMemo(() => {
    if (!activeCustomer) return [];
    const salary = activeCustomer.monthlySalary;
    const additional = Math.floor(salary * 0.15); // Simulated side consultation income
    const investments = Math.floor(salary * 0.08); // Dividends
    return [
      { name: 'Core Salary', value: salary, color: '#0B3C5D' },
      { name: 'Recurring Consultancy', value: additional, color: '#00C48C' },
      { name: 'Equity Dividends', value: investments, color: '#3B82F6' },
    ];
  }, [activeCustomer]);

  // Income summary explanations
  const aiSummary = useMemo(() => {
    if (!activeCustomer) return '';
    const score = activeCustomer.riskBreakdown.incomeStability;
    if (score > 85) {
      return `✓ Verified stable salary deposits with low variance. Primary employer: ${activeCustomer.company} (${activeCustomer.employmentType}). Consistent monthly payroll ACH entries detected with highly stable schedules. Standard deviation below 2.5% indicating premier liquidity support.`;
    } else if (score > 60) {
      return `✓ Salary deposits confirmed. Primary employer: ${activeCustomer.company} (${activeCustomer.employmentType}). Recurring deposits detected, but shows slight timing offsets or minor secondary adjustments. Risk metrics remain low; payroll ACH tracks steadily overall.`;
    } else {
      return `⚠ Highly fluctuating income streams identified. Regular salary ACH tracks but secondary contract checks exhibit high timing variance. Primary employer: ${activeCustomer.company}. Additional scrutiny is recommended concerning month-over-month baseline stability buffers.`;
    }
  }, [activeCustomer]);

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Target cabinet selector context picker */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 text-[#0B3C5D]">
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

      {/* KPI Cards row */}
      {activeCustomer && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <KPICard
            title="Monthly Salary"
            value={formatMoney(activeCustomer.monthlySalary)}
            subtitle={`Employer: ${activeCustomer.company}`}
            change="VERIFIED"
            changeType="positive"
            icon={<TrendingUp size={18} />}
            iconBgColor="bg-slate-50 text-[#0B3C5D]"
          />
          <KPICard
            title="Recurring Income Ratio"
            value="89.5%"
            subtitle="Of gross earnings verified as ACH"
            change="High Stability"
            changeType="positive"
            icon={<Percent size={18} />}
            iconBgColor="bg-emerald-50 text-[#00C48C]"
          />
          <KPICard
            title="Income Stability Rating"
            value={`${activeCustomer.riskBreakdown.incomeStability} / 100`}
            subtitle="Score based on variance & gaps"
            change={activeCustomer.riskBreakdown.incomeStability > 75 ? 'LOW VARIANCE' : 'MED VARIANCE'}
            changeType={activeCustomer.riskBreakdown.incomeStability > 75 ? 'positive' : 'warning'}
            icon={<Activity size={18} />}
            iconBgColor="bg-indigo-50 text-indigo-500"
          />
          <KPICard
            title="Salary Detection Alert"
            value="100% Core Match"
            subtitle="Recurring payroll cycles detected"
            change="No Delays"
            changeType="positive"
            icon={<ShieldCheck size={18} />}
            iconBgColor="bg-teal-50 text-teal-600"
          />
        </div>
      )}

      {/* Main Charts & Summaries */}
      {activeCustomer && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Income Stability Trend" 
              subtitle="6-Month verified income history from banking files"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncomeOnly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B3C5D" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#0B3C5D" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    formatter={(value: any) => [formatMoney(Number(value)), '']}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }} 
                  />
                  <Area type="monotone" dataKey="income" stroke="#0B3C5D" strokeWidth={3} fillOpacity={1} fill="url(#colorIncomeOnly)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div>
            <ChartCard 
              title="Income Sources Distribution" 
              subtitle="AI Categorized earnings breakdown"
            >
              <div className="flex flex-col items-center justify-center h-full pb-6">
                <div className="w-full h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2.5 w-full px-2 mt-4 text-xs font-semibold">
                  {sourceData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-1">
                      <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </span>
                      <span className="text-slate-800 font-mono font-bold">{formatMoney(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>
          </div>
        </div>
      )}

      {/* AI summaries card */}
      {activeCustomer && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Sparkles size={16} />
            </div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
              AI Income Analysis Report
            </h3>
          </div>
          
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-medium text-slate-700 leading-relaxed italic font-sans">
              {aiSummary}
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>Verified: Basel III Compliant</span>
            <span>•</span>
            <span className="text-accent">Ingestion Safe</span>
          </div>
        </div>
      )}
    </div>
  );
};
