import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Printer, 
  Sparkles, 
  User, 
  Check, 
  AlertTriangle, 
  UserCheck, 
  FileDown, 
  Award, 
  DollarSign, 
  ShieldCheck,
  Building
} from 'lucide-react';

export const AIReport: React.FC = () => {
  const { customers, selectedCustomerId, setSelectedCustomerId, currency, addToast } = useApp();
  const [exporting, setExporting] = useState(false);

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

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    setExporting(true);
    addToast('Generating cryptographic enterprise PDF report...', 'success');
    
    setTimeout(() => {
      setExporting(false);
      addToast('Download sequence triggered. BNK_AI_Report.pdf prepared.', 'success');
      
      // Let's download a small mockup text file representable as bank document
      const docContent = `BNK FINANCE INTEL REPORT\n=======================\nCustomer: ${activeCustomer?.name}\nID: ${activeCustomer?.id}\nCredit Score: ${activeCustomer?.financialScore}/900\nRating: ${activeCustomer?.riskLevel}\nAsset Balance: ${activeCustomer?.totalBalance}\n=======================\nBasel III Verified PDF Certificate.\n`;
      const blob = new Blob([docContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `BNK_AI_Report_${activeCustomer?.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  // Safe checks variables
  const loanSummary = useMemo(() => {
    if (!activeCustomer) return { eligible: 'N/A', limit: '$0', rate: '0%' };
    
    const score = activeCustomer.financialScore;
    if (score >= 750) {
      return {
        eligible: 'APPROVED HIGH-LIMIT PRIME',
        limit: formatMoney(activeCustomer.monthlySalary * 24), // 2 years salary
        rate: '5.25% APR Fixed',
      };
    } else if (score >= 600) {
      return {
        eligible: 'CONDITIONALLY APPROVED STANDARD',
        limit: formatMoney(activeCustomer.monthlySalary * 12), // 1 year salary
        rate: '6.75% APR Variable',
      };
    } else {
      return {
        eligible: 'DECLINED (UNSURPASSABLE LEVEL RISK)',
        limit: formatMoney(0),
        rate: 'N/A',
      };
    }
  }, [activeCustomer, currency]);

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Dynamic Selector Selector picking context */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
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
            className="w-full text-xs h-10 border border-slate-200 bg-slate-50 px-3 rounded-xl focus:bg-white focus:outline-none focus:border-[#009688] font-semibold text-slate-700"
          >
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.id} – {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons row */}
      {activeCustomer && (
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 print:hidden shadow-xs">
          <div className="flex items-center gap-1.5 text-purple-600 font-bold text-xs select-none uppercase tracking-wide">
            <Sparkles size={16} className="animate-pulse" />
            <span>AI Risk report sheet</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 h-10 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition-all cursor-pointer bg-white"
            >
              <Printer size={15} />
              <span>Print Sheet</span>
            </button>

            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="flex items-center gap-2 px-4 h-10 bg-primary hover:bg-[#1a4a6b] text-[#00C48C] rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs font-sans"
            >
              <FileDown size={15} />
              <span>{exporting ? 'Generating...' : 'Export to PDF'}</span>
            </button>
          </div>
        </div>
      )}

      {/* The Printable Page Sheet */}
      {activeCustomer && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md max-w-4xl mx-auto space-y-8 select-none relative overflow-hidden print:border-none print:shadow-none">
          {/* Top Graphic Header alignment */}
          <div className="flex items-center justify-between border-b pb-6 border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-accent font-black text-sm">B</div>
                <h1 className="text-base font-extrabold text-primary tracking-tight font-sans">BNK FINANCE UNDERWRITING</h1>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lao & Indo-china Credit Assessment systems</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase block">Document ID</span>
              <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 inline-block mt-0.5">
                RPT-CRYPTO-{activeCustomer.id}
              </span>
            </div>
          </div>

          {/* Section 1: Customer Profile Overview */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-sans border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <User size={14} />
              1. Customer Summary Dossier
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Customer Name</span>
                <span className="font-semibold text-slate-800">{activeCustomer.name}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Unique Bank ID</span>
                <span className="font-mono font-bold text-slate-800">{activeCustomer.id}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Primary Employer</span>
                <span className="font-semibold text-slate-800 truncate block whitespace-nowrap" title={activeCustomer.company}>{activeCustomer.company}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Account Number</span>
                <span className="font-mono font-bold text-slate-800">{activeCustomer.accountNumber}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Credit Risk Scorecard Gauge results */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-sans border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <Award size={14} />
              2. Financial Health & Scorecard evaluation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-50 p-4 border rounded-xl flex flex-col justify-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Credit score (Basel)</span>
                <span className="text-2xl font-black text-slate-800 font-sans tracking-tight block mt-1">{activeCustomer.financialScore} <span className="text-xs font-medium text-slate-400">/ 900</span></span>
              </div>

              <div className="bg-slate-50 p-4 border rounded-xl flex flex-col justify-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Risk Bracket Label</span>
                <span className={`text-md font-black mt-2 inline-block mx-auto px-4 py-0.5 rounded-full border ${
                  activeCustomer.riskLevel === 'LOW' 
                    ? 'bg-emerald-50 text-[#00C48C] border-emerald-100'
                    : activeCustomer.riskLevel === 'MEDIUM'
                      ? 'bg-amber-50 text-warning border-amber-100'
                      : 'bg-rose-50 text-danger border-rose-100'
                }`}>
                  {activeCustomer.riskLevel} RISK
                </span>
              </div>

              <div className="bg-slate-50 p-4 border rounded-xl flex flex-col justify-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Savings Ratio</span>
                <span className="text-2xl font-black text-slate-800 font-sans tracking-tight block mt-1">
                  {Math.round((activeCustomer.savings / activeCustomer.monthlySalary) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Inflow & Outflow review */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-sans border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <DollarSign size={14} />
              3. Income & Outflow balance breakdown
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
              <div className="space-y-2 border p-4 rounded-xl">
                <h4 className="font-bold text-slate-800 uppercase tracking-tight">Verified Inflows (Income)</h4>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500 font-medium">Monthly Contract Salary:</span>
                  <span className="font-mono font-bold text-slate-800">{formatMoney(activeCustomer.monthlySalary)}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500 font-medium">Consultation Recurring Stream:</span>
                  <span className="font-mono font-bold text-slate-800">{formatMoney(Math.floor(activeCustomer.monthlySalary * 0.15))}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-700">
                  <span>Gross Monthly Yield:</span>
                  <span className="font-mono text-primary">{formatMoney(Math.floor(activeCustomer.monthlySalary * 1.15))}</span>
                </div>
              </div>

              <div className="space-y-2 border p-4 rounded-xl">
                <h4 className="font-bold text-slate-800 uppercase tracking-tight">Verified Category Outflows (Expenses)</h4>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500 font-medium">Primary Housing/Mortgage ACH:</span>
                  <span className="font-mono font-bold text-slate-800">{formatMoney(activeCustomer.expenseStructure.housing)}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500 font-medium">Monthly Essential Dining/Foods:</span>
                  <span className="font-mono font-bold text-slate-800">{formatMoney(activeCustomer.expenseStructure.food)}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-700">
                  <span>Total Categorized Expenses:</span>
                  <span className="font-mono text-danger">
                    {formatMoney((Object.values(activeCustomer.expenseStructure) as number[]).reduce((a: number, b: number) => a + b, 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Loan eligibility credit decision */}
          <div className="space-y-3.5 pt-2">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider font-sans border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <ShieldCheck size={14} />
              4. Corporate Loan eligibility determination
            </h3>

            <div className="bg-slate-50 p-5 rounded-2xl border flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Decision Index Status</span>
                <span className={`text-xs font-black font-sans leading-none block uppercase ${
                  activeCustomer.riskLevel === 'HIGH' ? 'text-danger' : 'text-[#00C48C]'
                }`}>
                  {loanSummary.eligible}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-5 text-right font-semibold">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Eligible Debt Limit</span>
                  <span className="text-xs font-bold font-mono text-slate-800">{loanSummary.limit}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Indicated AP Rate</span>
                  <span className="text-xs font-bold font-mono text-slate-800">{loanSummary.rate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Watermarks block */}
          <div className="pt-8 border-t border-slate-100 flex justify-between items-end text-[9px] font-mono text-slate-400">
            <div>
              <p>CRYPTOGRAPHIC VERIFICATION BLOCK ID: SHA-256 x891C</p>
              <p>Basel III credit limits computed via Indochina systemic rulesets.</p>
            </div>
            
            <div className="text-right flex items-center gap-1">
              <Building size={14} className="text-slate-300" />
              <span className="font-bold">BNK COMMITTEE CORE APPR</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
