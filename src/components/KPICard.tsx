import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'warning';
  icon: React.ReactNode;
  iconBgColor?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral',
  icon,
  iconBgColor = 'bg-slate-100 text-slate-700',
}) => {
  const getChangeStyles = () => {
    switch (changeType) {
      case 'positive':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'negative':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-300 flex flex-col justify-between group h-full">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
          <h3 className="text-2xl md:text-3xl font-bold font-sans text-slate-800 tracking-tight group-hover:text-primary transition-colors duration-200">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl transition-all duration-300 ${iconBgColor} group-hover:scale-110 shadow-xs`}>
          {icon}
        </div>
      </div>
      
      {(change || subtitle) && (
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-50 pt-3">
          <span className="text-xs text-slate-500 font-medium truncate">{subtitle}</span>
          {change && (
            <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full border ${getChangeStyles()}`}>
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
