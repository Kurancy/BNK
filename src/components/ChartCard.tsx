import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  headerAction,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="flex items-center justify-between gap-4 border-b border-slate-50 pb-4 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 tracking-tight font-sans">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-slate-400 font-medium">
              {subtitle}
            </p>
          )}
        </div>
        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>
      
      <div className="flex-1 min-h-[260px] relative w-full">
        {children}
      </div>
    </div>
  );
};
