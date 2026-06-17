import React from 'react';
import { ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';

interface RiskGaugeProps {
  score: number; // 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  breakdown: {
    incomeStability: number;
    savings: number;
    debtRatio: number;
    balance: number;
    spendingPattern: number;
    transactionFrequency: number;
  };
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  riskLevel,
  breakdown,
}) => {
  // Color configuration
  const getRiskStyles = () => {
    switch (riskLevel) {
      case 'HIGH':
        return {
          textColor: 'text-danger',
          bgColor: 'bg-rose-50 text-rose-700',
          borderColor: 'border-rose-200',
          gaugeColor: '#E74C3C',
          icon: <ShieldAlert className="text-danger" size={24} />,
        };
      case 'MEDIUM':
        return {
          textColor: 'text-warning',
          bgColor: 'bg-amber-50 text-amber-700',
          borderColor: 'border-amber-200',
          gaugeColor: '#F39C12',
          icon: <ShieldAlert className="text-warning" size={24} />,
        };
      default:
        return {
          textColor: 'text-accent',
          bgColor: 'bg-emerald-50 text-emerald-700',
          borderColor: 'border-emerald-200',
          gaugeColor: '#00C48C',
          icon: <ShieldCheck className="text-[#00C48C]" size={24} />,
        };
    }
  };

  const riskStyles = getRiskStyles();
  
  // Circle parameters
  const radius = 70;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-8 h-full">
      {/* Gauge Circular Graphic */}
      <div className="relative flex flex-col items-center shrink-0">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 select-none drop-shadow-sm"
        >
          {/* Base track */}
          <circle
            stroke="#f1f5f9"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Animated fill track */}
          <circle
            stroke={riskStyles.gaugeColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transiton: 'stroke-dashoffset 0.5s ease-in-out' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        
        {/* Absolute Centered Score Labels */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5 pointer-events-none">
          <span className="text-3xl font-black font-sans text-slate-800 leading-none">{score}</span>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">/ 100</span>
          
          <div className="mt-1">
            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${riskStyles.bgColor} border ${riskStyles.borderColor}`}>
              {riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Structured breakdowns with progress bars */}
      <div className="flex-1 w-full space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-sans">
            <Sparkles size={13} className="text-purple-500" />
            Risk Breakdown Factors
          </h4>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Weightage Safe</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
          {/* Income Stability */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Income Stability</span>
              <span className="font-mono font-bold">{breakdown.incomeStability}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${breakdown.incomeStability}%` }} />
            </div>
          </div>

          {/* Savings Ratio */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Savings Rate Quality</span>
              <span className="font-mono font-bold">{breakdown.savings}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${breakdown.savings}%` }} />
            </div>
          </div>

          {/* Debt-To-Income Safety */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Debt Load Safety</span>
              <span className="font-mono font-bold">{breakdown.debtRatio}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#00C48C] rounded-full" style={{ width: `${breakdown.debtRatio}%` }} />
            </div>
          </div>

          {/* Balance Consistency */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Balance Consistency</span>
              <span className="font-mono font-bold">{breakdown.balance}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${breakdown.balance}%` }} />
            </div>
          </div>

          {/* Spending Pattern Severity */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Discretionary Burn Safety</span>
              <span className="font-mono font-bold">{breakdown.spendingPattern}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${breakdown.spendingPattern}%` }} />
            </div>
          </div>

          {/* Trans frequency */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Maturity Footprint</span>
              <span className="font-mono font-bold">{breakdown.transactionFrequency}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${breakdown.transactionFrequency}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
