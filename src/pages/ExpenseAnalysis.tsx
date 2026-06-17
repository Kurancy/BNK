import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ChartCard } from '../components/ChartCard';
import { KPICard } from '../components/KPICard';
import { 
  Home, 
  Utensils, 
  ShoppingBag, 
  Car, 
  Zap, 
  HeartPulse, 
  Tv, 
  GraduationCap, 
  Sparkles, 
  AlertTriangle, 
  UserCheck, 
  RefreshCw 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

export const ExpenseAnalysis: React.FC = () => {
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

  // Build Recharts compatible data arrays
  const expenseData = useMemo(() => {
    if (!activeCustomer) return [];
    
    const struct = activeCustomer.expenseStructure;
    return [
      { name: 'Housing', value: struct.housing, fill: '#0B3C5D' },
      { name: 'Food', value: struct.food, fill: '#00C48C' },
      { name: 'Shopping', value: struct.shopping, fill: '#E74C3C' },
      { name: 'Transport', value: struct.transport, fill: '#F39C12' },
      { name: 'Utilities', value: struct.utilities, fill: '#3B82F6' },
      { name: 'Healthcare', value: struct.healthcare, fill: '#8B5CF6' },
      { name: 'Leisure', value: struct.entertainment, fill: '#EC4899' },
      { name: 'Education', value: struct.education, fill: '#14B8A6' },
    ];
  }, [activeCustomer]);

  // Simulated abnormal spending alerts
  const spendingAlerts = useMemo(() => {
    if (!activeCustomer) return [];
    
    const alerts = [];
    const struct = activeCustomer.expenseStructure;
    
    if (struct.entertainment > activeCustomer.monthlySalary * 0.18) {
      alerts.push({
        id: '1',
        title: 'Velocity Leisure Alert',
        category: 'Entertainment',
        desc: `Discretionary entertainment spends ($${struct.entertainment.toLocaleString()}) are high relative to net salary ($${activeCustomer.monthlySalary.toLocaleString()}). Potential subscription leak or leisure burn.`,
        severity: 'HIGH'
      });
    } else {
      alerts.push({
        id: '2',
        title: 'Moderate Expense Ratio',
        category: 'General',
        desc: 'All discretionary budget logs reside securely below typical limits. Matches optimal baseline criteria with low volatility.',
        severity: 'LOW'
      });
    }

    if (struct.shopping > activeCustomer.monthlySalary * 0.15) {
      alerts.push({
        id: '3',
        title: 'Retail Outflow Flag',
        category: 'Shopping',
        desc: `High shopping index frequency ($${struct.shopping.toLocaleString()}) detected this period. Recommend budgeting restraints.`,
        severity: 'MED'
      });
    }

    return alerts;
  }, [activeCustomer]);

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Active Context Customer Picker */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-50 text-danger">
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
            className="w-full text-xs h-10 border border-slate-200 bg-slate-50 px-3 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 font-semibold text-slate-700"
          >
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.id} – {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of the 8 custom layout cards with category matching */}
      {activeCustomer && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <KPICard
            title="Housing Spends"
            value={formatMoney(activeCustomer.expenseStructure.housing)}
            subtitle="Rent, mortgage & basic upkeep"
            icon={<Home size={18} />}
            iconBgColor="bg-slate-50 text-primary"
          />
          <KPICard
            title="Food & Dining"
            value={formatMoney(activeCustomer.expenseStructure.food)}
            subtitle="Regular groceries & restaurants"
            icon={<Utensils size={18} />}
            iconBgColor="bg-slate-50 text-[#00C48C]"
          />
          <KPICard
            title="Retail & Shopping"
            value={formatMoney(activeCustomer.expenseStructure.shopping)}
            subtitle="Discretionary retail outlays"
            icon={<ShoppingBag size={18} />}
            iconBgColor="bg-slate-50 text-rose-500"
          />
          <KPICard
            title="Transport & Travel"
            value={formatMoney(activeCustomer.expenseStructure.transport)}
            subtitle="Gas, bus, rails & plane tickets"
            icon={<Car size={18} />}
            iconBgColor="bg-slate-50 text-amber-500"
          />
          <KPICard
            title="Utilities & Bills"
            value={formatMoney(activeCustomer.expenseStructure.utilities)}
            subtitle="Electricity, water & internet"
            icon={<Zap size={18} />}
            iconBgColor="bg-indigo-50 text-indigo-500"
          />
          <KPICard
            title="Healthcare & Medical"
            value={formatMoney(activeCustomer.expenseStructure.healthcare)}
            subtitle="Clinical bills, dental & pharmacies"
            icon={<HeartPulse size={18} />}
            iconBgColor="bg-emerald-50 text-emerald-600"
          />
          <KPICard
            title="Entertainment & leisure"
            value={formatMoney(activeCustomer.expenseStructure.entertainment)}
            subtitle="Hobbies, music & cinema outlays"
            icon={<Tv size={18} />}
            iconBgColor="bg-purple-50 text-purple-500"
          />
          <KPICard
            title="Education & Fees"
            value={formatMoney(activeCustomer.expenseStructure.education)}
            subtitle="Schools, courses & tech materials"
            icon={<GraduationCap size={18} />}
            iconBgColor="bg-teal-50 text-teal-600"
          />
        </div>
      )}

      {/* Main Charts area */}
      {activeCustomer && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard 
              title="Expense Allocation Chart" 
              subtitle="Comparison of absolute budgets across the classified categories"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    formatter={(value: any) => [formatMoney(Number(value)), '']}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }} 
                  />
                  <Bar dataKey="value" strokeWidth={0} radius={[8, 8, 0, 0]}>
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div>
            <ChartCard 
              title="Percentage Distribution" 
              subtitle="Relative share of personal monthly salary"
            >
              <div className="flex flex-col items-center justify-center h-full pb-6">
                <div className="w-full h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full mt-4 text-[11px] font-semibold">
                  {expenseData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-0.5">
                      <span className="flex items-center gap-1 text-slate-500 font-medium truncate">
                        <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: item.fill }} />
                        {item.name}
                      </span>
                      <span className="text-slate-800 font-mono font-bold shrink-0">{formatMoney(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>
          </div>
        </div>
      )}

      {/* Abnormal Spends Alerts segment */}
      {activeCustomer && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
              <AlertTriangle size={16} />
            </div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
              System Abnormal Transaction Warnings
            </h3>
          </div>

          <div className="space-y-3">
            {spendingAlerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  alert.severity === 'HIGH' 
                    ? 'bg-rose-50 border-rose-100 text-danger' 
                    : alert.severity === 'MED'
                      ? 'bg-amber-50 border-amber-100 text-warning'
                      : 'bg-emerald-50 border-emerald-100/60 text-slate-800'
                }`}
              >
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold">{alert.title} — Category: {alert.category}</p>
                  <p className="text-[11px] opacity-80 leading-relaxed">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
