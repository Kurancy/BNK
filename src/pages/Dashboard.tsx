import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { AIInsightCard } from '../components/AIInsightCard';
import { 
  Users, 
  FileText, 
  Award, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  ArrowRight,
  TrendingDown,
  CalendarDays
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
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { customers, transactions, t, setCurrentPage, setSelectedCustomerId, currency } = useApp();

  // Financial math for KPIs
  const totalCustomers = customers.length;
  const totalStatements = 340; // Historical simulated
  const avgFinancialScore = Math.floor(
    customers.reduce((acc, c) => acc + c.financialScore, 0) / Math.max(1, customers.length)
  );
  const highRiskCount = customers.filter(c => c.riskLevel === 'HIGH').length;
  const lowRiskCount = customers.filter(c => c.riskLevel === 'LOW').length;
  
  const totalS_Rate = customers.reduce((acc, c) => acc + (c.savings / Math.max(1, c.monthlySalary)), 0);
  const avgSavingsRate = Math.floor((totalS_Rate / Math.max(1, customers.length)) * 100);

  // Recharts Chart 1: Income vs Expense Trend
  // We'll aggregate historical monthly stats dynamically across our pre-generated database
  const trendData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(m => {
      let incomeSum = 0;
      let expenseSum = 0;
      customers.forEach(cust => {
        const h = cust.monthlyHistory.find(hist => hist.month === m);
        if (h) {
          incomeSum += h.income;
          expenseSum += h.expenses;
        }
      });
      return {
        name: m,
        Income: Math.floor(incomeSum / customers.length),
        Expenses: Math.floor(expenseSum / customers.length),
      };
    });
  }, [customers]);

  // Recharts Chart 2: Credit Risk Distribution
  const riskDistributionData = useMemo(() => {
    const counts = { LOW: 0, MEDIUM: 0, HIGH: 0 };
    customers.forEach(c => counts[c.riskLevel]++);
    return [
      { name: 'Low Risk', value: counts.LOW, color: '#00C48C' },
      { name: 'Medium Risk', value: counts.MEDIUM, color: '#F39C12' },
      { name: 'High Risk', value: counts.HIGH, color: '#E74C3C' },
    ];
  }, [customers]);

  // Recharts Chart 3: Monthly Activity of transactions
  const activityData = [
    { name: 'Jan', count: 850 },
    { name: 'Feb', count: 910 },
    { name: 'Mar', count: 1040 },
    { name: 'Apr', count: 980 },
    { name: 'May', count: 1120 },
    { name: 'Jun', count: 500 }, // Current partial month
  ];

  // Currency converters
  const getCurrencySymbol = () => {
    if (currency === 'LAK') return '₭';
    if (currency === 'VND') return '₫';
    return '$';
  };

  const formatValue = (amt: number) => {
    let scalar = 1;
    if (currency === 'LAK') scalar = 21000;
    if (currency === 'VND') scalar = 25000;
    
    return `${getCurrencySymbol()}${(amt * scalar).toLocaleString()}`;
  };

  const handleInspectRow = (id: string) => {
    setSelectedCustomerId(id);
    setCurrentPage('customer-profile');
  };

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Top Six KPI grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <KPICard
          title={t('totalCustomers')}
          value={totalCustomers}
          subtitle="Registered accounts"
          change="+4.5%"
          changeType="positive"
          icon={<Users size={20} />}
          iconBgColor="bg-slate-50 text-[#0B3C5D]"
        />
        <KPICard
          title={t('totalStatements')}
          value={totalStatements}
          subtitle="Processed Statements"
          change="+12.8%"
          changeType="positive"
          icon={<FileText size={20} />}
          iconBgColor="bg-slate-50 text-[#0B3C5D]"
        />
        <KPICard
          title={t('avgFinancialScore')}
          value={`${avgFinancialScore} / 900`}
          subtitle="Average credit margin"
          change="+12 pts"
          changeType="positive"
          icon={<Award size={20} />}
          iconBgColor="bg-emerald-50 text-[#00C48C]"
        />
        <KPICard
          title={t('highRiskAccounts')}
          value={highRiskCount}
          subtitle="Requires attention"
          change="-2%"
          changeType="positive"
          icon={<ShieldAlert size={20} />}
          iconBgColor="bg-rose-50 text-[#E74C3C]"
        />
        <KPICard
          title={t('lowRiskAccounts')}
          value={lowRiskCount}
          subtitle="Prime assets classification"
          change="+6%"
          changeType="positive"
          icon={<ShieldCheck size={20} />}
          iconBgColor="bg-emerald-50 text-[#00C48C]"
        />
        <KPICard
          title={t('avgSavingsRate')}
          value={`${avgSavingsRate}%`}
          subtitle="Household balance margin"
          change="Optimal"
          changeType="neutral"
          icon={<TrendingUp size={20} />}
          iconBgColor="bg-indigo-50 text-indigo-500"
        />
      </div>

      {/* Structured charts sector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sticky top-[88px] z-10">
        {/* Income vs Expenses trendline */}
        <div className="lg:col-span-2">
          <ChartCard 
            title={t('incomeVsExpenseChart')} 
            subtitle="Calculated average cash volumes across the general customer portfolio"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C48C" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00C48C" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E74C3C" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#E74C3C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  formatter={(value: any) => [formatValue(Number(value)), '']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600, pt: 10 }} />
                <Area type="monotone" dataKey="Income" stroke="#00C48C" strokeWidth={3} fillOpacity={1} fill="url(#colorInc)" />
                <Area type="monotone" dataKey="Expenses" stroke="#E74C3C" strokeWidth={2.5} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Credit Risk Distribution piechart */}
        <div>
          <ChartCard 
            title={t('riskDistributionChart')}
            subtitle="Breakdown of customer tiers grouped by neural scoring thresholds"
          >
            <div className="flex flex-col items-center justify-center h-full pb-6">
              <div className="w-full h-44 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center score watermarks */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold text-slate-800">100%</span>
                  <span className="text-[9px] font-bold text-slate-400">RATED Portfolio</span>
                </div>
              </div>
              
              {/* Detailed custom legend indicators */}
              <div className="grid grid-cols-3 gap-4 w-full px-2 mt-4 text-center">
                {riskDistributionData.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-[10px] font-extrabold text-slate-700 uppercase flex items-center justify-center gap-1.5 leading-none">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                      {item.name}
                    </span>
                    <p className="text-sm font-bold text-slate-800 font-mono">{item.value} <span className="text-xs font-semibold text-slate-400">/{totalCustomers}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Row 3 grid containing Recent table activity and AI Insights checklists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table of active analyses */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800 tracking-tight font-sans">
                  {t('recentAnalyses')}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">Real-time analytical queue from continuous statements OCR ingests</p>
              </div>
              <button
                onClick={() => setCurrentPage('customer-management')}
                className="text-[10px] font-bold text-primary hover:text-[#00C48C] flex items-center gap-1 cursor-pointer hover:underline transition-all uppercase tracking-wider"
              >
                Inspect Registry
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="p-3">Customer ID</th>
                    <th className="p-3">Full Name</th>
                    <th className="p-3 text-right">Primary Salary</th>
                    <th className="p-3">Risk Bracket</th>
                    <th className="p-3 text-center">Neural Score</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customers.slice(0, 5).map(cust => (
                    <tr key={cust.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-mono text-[10px] font-bold text-slate-500">{cust.id}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-md font-bold text-[10px] flex items-center justify-center ${cust.avatarColor}`}>
                            {cust.avatar}
                          </span>
                          <span className="font-semibold text-slate-700">{cust.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-right font-bold font-mono text-slate-800">{formatValue(cust.monthlySalary)}</td>
                      <td className="p-3">
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                          cust.riskLevel === 'HIGH' 
                            ? 'bg-rose-50 text-danger border-rose-100'
                            : cust.riskLevel === 'MEDIUM'
                              ? 'bg-amber-50 text-warning border-amber-100'
                              : 'bg-emerald-50 text-accent border-emerald-100'
                        }`}>
                          {cust.riskLevel}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="font-bold text-slate-800 font-mono flex items-center justify-center gap-0.5">
                          <Sparkles size={10} className="text-purple-500" />
                          {cust.financialScore}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleInspectRow(cust.id)}
                          className="px-2.5 py-1 text-[10px] font-extrabold text-primary border border-slate-200 bg-white hover:border-primary rounded-lg cursor-pointer transition-colors"
                        >
                          OPEN CAB
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* AI Insight checklists panel */}
        <div>
          <AIInsightCard />
        </div>
      </div>
    </div>
  );
};
