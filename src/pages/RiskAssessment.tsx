import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { RiskGauge } from '../components/RiskGauge';
import { ShieldCheck, ShieldAlert, UserCheck, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

export const RiskAssessment: React.FC = () => {
  const { customers, selectedCustomerId, setSelectedCustomerId, t } = useApp();

  const activeCustomer = useMemo(() => {
    return customers.find(c => c.id === selectedCustomerId) || customers[0];
  }, [customers, selectedCustomerId]);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomerId(e.target.value);
  };

  const getRiskExplanation = useMemo(() => {
    if (!activeCustomer) return '';
    const score = activeCustomer.financialScore;
    
    if (score >= 750) {
      return `Outstanding Rating (${score}/900). Prime assets bracket confirmed. Excellent income stability ratio, minimum debt balance profile, and extensive liquid reserves. Immediate automated approval indicated for premium lending card facilities under Basel risk models. Verified low-probability default rate (PD < 0.15%).`;
    } else if (score >= 600) {
      return `Moderate Rating (${score}/900). Average credit safety indicators. Income stability matches traditional limits, but discretionary spent velocity demonstrates slightly elevated volatility. Safe for baseline debt financing but requires standard senior analyst verification or collateral assurance checkouts. Default probability estimated at 1.4%.`;
    } else {
      return `High Risk Warning (${score}/900). Leveraged bracket detected. High Entertainment or Shopper outflows paired with insufficient cash surplus margins. Credit scores below critical threshold. Secondary checks and full income reassessment are mandatory for underwrite considerations. Default probability elevated (PD > 5.8%).`;
    }
  }, [activeCustomer]);

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Selector context picker */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-[#00C48C]">
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

      {/* Main Circular Risk Gauge display */}
      {activeCustomer && (
        <RiskGauge
          score={Math.floor((activeCustomer.financialScore / 900) * 100)} // scale to 100 for circular track
          riskLevel={activeCustomer.riskLevel}
          breakdown={activeCustomer.riskBreakdown}
        />
      )}

      {/* Advisory risk explain notes */}
      {activeCustomer && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-sans border-b border-slate-50 pb-3 flex items-center gap-2">
            {activeCustomer.riskLevel === 'LOW' ? (
              <ShieldCheck className="text-accent" size={16} />
            ) : (
              <ShieldAlert className="text-warning" size={16} />
            )}
            Credit Risk Committee Evaluation summary
          </h3>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed">
            <p className="text-xs font-bold text-slate-800 tracking-tight">Executive Scorecard Diagnosis</p>
            <p className="text-xs text-slate-500 mt-1 italic font-sans">{getRiskExplanation}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-500 pt-2 font-medium">
            <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <span className="p-1.5 rounded-md bg-white text-secondary font-bold text-[9px] border">P1</span>
              <div>
                <h4 className="font-bold text-slate-700">Debt-to-Income (DTI) Limit</h4>
                <p className="text-[10px] leading-relaxed text-slate-400">Maintained below 36% for standard compliance criteria across Indochina branches.</p>
              </div>
            </div>

            <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <span className="p-1.5 rounded-md bg-white text-secondary font-bold text-[9px] border">P2</span>
              <div>
                <h4 className="font-bold text-slate-700">Residual Liquid Threshold</h4>
                <p className="text-[10px] leading-relaxed text-slate-400">At least 3 months of housing rental equivalent must remain after gross outlays.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
