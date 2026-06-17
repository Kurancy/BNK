import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionTable } from '../components/TransactionTable';
import { RiskGauge } from '../components/RiskGauge';
import { KPICard } from '../components/KPICard';
import { AIReport } from './AIReport';
import { IncomeAnalysis } from './IncomeAnalysis';
import { ExpenseAnalysis } from './ExpenseAnalysis';
import { CashFlow } from './CashFlow';
import { RiskAssessment } from './RiskAssessment';
import { 
  User, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BrainCircuit, 
  ShieldAlert, 
  History, 
  ArrowLeft,
  Briefcase,
  Smartphone,
  Mail,
  MapPin,
  Sparkles,
  Award,
  CircleDollarSign
} from 'lucide-react';

type TabId = 'overview' | 'transactions' | 'income' | 'expenses' | 'cashflow' | 'aireport' | 'risk' | 'timeline';

export const CustomerProfile: React.FC = () => {
  const { 
    customers, 
    transactions, 
    selectedCustomerId, 
    setCurrentPage, 
    auditLogs, 
    currency 
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const customer = useMemo(() => {
    return customers.find(c => c.id === selectedCustomerId) || customers[0];
  }, [customers, selectedCustomerId]);

  const customerTxs = useMemo(() => {
    if (!customer) return [];
    return transactions.filter(t => t.customerId === customer.id);
  }, [transactions, customer]);

  const customerLogs = useMemo(() => {
    if (!customer) return [];
    // Filter audit trail matching current customer
    return auditLogs.filter(log => log.description.toLowerCase().includes(customer.name.toLowerCase()) || log.description.toLowerCase().includes(customer.id.toLowerCase()));
  }, [auditLogs, customer]);

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

  if (!customer) {
    return (
      <div className="p-12 text-center text-slate-400">
        No active profile loaded.
      </div>
    );
  }

  // Tabs structure definition
  const tabConfig: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <User size={14} /> },
    { id: 'transactions', label: 'Transactions', icon: <ArrowUpDown size={14} /> },
    { id: 'income', label: 'Income Stability', icon: <TrendingUp size={14} /> },
    { id: 'expenses', label: 'Expense Distribution', icon: <TrendingDown size={14} /> },
    { id: 'cashflow', label: 'Cash Flow Analytics', icon: <Activity size={14} /> },
    { id: 'risk', label: 'Risk Assessment', icon: <ShieldAlert size={14} /> },
    { id: 'aireport', label: 'AI Credit Report', icon: <BrainCircuit size={14} /> },
    { id: 'timeline', label: 'Timeline log', icon: <History size={14} /> },
  ];

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-5 py-4 border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('customer-management')}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition-all cursor-pointer"
            title="Back to Customer Registry"
          >
            <ArrowLeft size={16} />
          </button>
          
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block">Customer Cabinet dossier</span>
              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border ${
                customer.status === 'Active' ? 'bg-emerald-50 text-[#00C48C] border-emerald-100' : 'bg-rose-50 text-danger border-rose-100'
              }`}>
                {customer.status}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight font-sans mt-0.5">{customer.name} ({customer.id})</h2>
          </div>
        </div>

        {/* Top right quick metric assets summaries */}
        <div className="grid grid-cols-2 gap-4 text-right">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Credit Score</span>
            <span className="text-sm font-black text-slate-800 font-mono flex items-center justify-end gap-1">
              <Sparkles size={11} className="text-purple-500" />
              {customer.financialScore}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Balance</span>
            <span className="text-sm font-black text-slate-800 font-mono">{formatMoney(customer.totalBalance)}</span>
          </div>
        </div>
      </div>

      {/* Interactive Tabs bar header */}
      <div className="overflow-x-auto bg-white border border-slate-200/80 rounded-2.5xl p-1.5 flex gap-1 scrollbar-none z-10 sticky top-[72px]">
        {tabConfig.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-primary text-[#00C48C] font-bold glow-active shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Renderers */}
      <div className="animate-in fade-in duration-200">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Contact card dossier details */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
              <div className="text-center relative pb-4 border-b border-slate-100">
                <div className={`w-16 h-16 rounded-2xl font-bold flex items-center justify-center text-lg shadow-sm mx-auto ${customer.avatarColor}`}>
                  {customer.avatar}
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-3">{customer.name}</h3>
                <p className="text-[10px] font-mono font-bold text-slate-400 mt-0.5">{customer.id}</p>
              </div>

              <div className="space-y-3 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-3">
                  <Briefcase size={14} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Employment</p>
                    <p className="text-slate-700">{customer.employmentType} @ {customer.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Smartphone size={14} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Phone Contact</p>
                    <p className="text-slate-700 font-mono">{customer.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Email Registry</p>
                    <p className="text-slate-700 font-mono">{customer.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Billing Address</p>
                    <p className="text-slate-700 truncate block w-56" title={customer.address}>{customer.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 & 3: Mini-aggregated statistics & risk breakdown dials */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <KPICard
                  title="Monthly income"
                  value={formatMoney(customer.monthlySalary)}
                  icon={<CircleDollarSign size={16} />}
                  iconBgColor="bg-slate-50 text-indigo-500"
                />
                <KPICard
                  title="Savings Capacity"
                  value={formatMoney(customer.savings)}
                  icon={<TrendingUp size={16} />}
                  iconBgColor="bg-slate-50 text-[#00C48C]"
                />
                <KPICard
                  title="Rating Bracket"
                  value={`${customer.riskLevel} RISK`}
                  icon={<Award size={16} />}
                  iconBgColor="bg-slate-50 text-rose-500"
                />
              </div>

              {/* Specific risk breakdown factors gauge */}
              <RiskGauge
                score={Math.floor((customer.financialScore / 900) * 100)}
                riskLevel={customer.riskLevel}
                breakdown={customer.riskBreakdown}
              />
            </div>
          </div>
        )}

        {/* Transactions ledger tab filtered strictly to current customer */}
        {activeTab === 'transactions' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-sans border-b border-slate-50 pb-3.5 mb-4">
              Individual Transaction Ledger ({customerTxs.length} Logs mapped)
            </h3>
            <TransactionTable transactions={customerTxs} compact />
          </div>
        )}

        {/* Income consistency analyzer */}
        {activeTab === 'income' && <IncomeAnalysis />}

        {/* Expense categories distribution */}
        {activeTab === 'expenses' && <ExpenseAnalysis />}

        {/* Cash flow parallel lines trend graphs */}
        {activeTab === 'cashflow' && <CashFlow />}

        {/* Risk Assessment dials and progress charts */}
        {activeTab === 'risk' && <RiskAssessment />}

        {/* AI Printable Credit Report */}
        {activeTab === 'aireport' && <AIReport />}

        {/* Customer Specific timeline events */}
        {activeTab === 'timeline' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-sans border-b border-slate-50 pb-3 mb-5">
              Profile Specific Timeline log
            </h3>

            {customerLogs.length === 0 ? (
              <p className="text-xs text-slate-400 font-medium italic p-8 text-center bg-slate-50 border rounded-xl">
                No local timeline logs captured for this profile on this node session. Ingest statement files to add audit entries.
              </p>
            ) : (
              <div className="space-y-4 relative pl-4 border-l border-slate-100 py-2">
                {customerLogs.map((log) => (
                  <div key={log.id} className="relative space-y-1">
                    {/* Ring indicator bullet */}
                    <span className="absolute -left-[20px] top-1 w-2.5 h-2.5 rounded-full bg-accent border-2 border-white ring-2 ring-emerald-50"></span>
                    <div className="bg-slate-50/50 p-3.5 border rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="flex sm:items-center justify-between gap-2 text-[10px] font-bold">
                        <span className="text-slate-800 uppercase tracking-wide bg-white px-2 py-0.5 border rounded">{log.action}</span>
                        <span className="text-slate-400 font-mono">{log.date}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-2">{log.description}</p>
                      <div className="text-[10px] font-mono text-slate-400 pt-1">User operator: {log.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
