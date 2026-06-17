import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Bell, Search, LogOut, Settings, CreditCard, Shield, Server, Check, AlertTriangle, AlertCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    searchQuery, 
    setSearchQuery, 
    t, 
    language,
    toasts,
    removeToast 
  } = useApp();
  
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications matching audit logs or system alerts
  const mockNotifications = [
    { id: '1', title: 'New Statement Digested', desc: 'Financial record BNK-1004 parsed.', type: 'info', time: '12m ago' },
    { id: '2', title: 'High Risk Spend Flagged', desc: 'Abnormal clothing burn rate on BNK-1025.', type: 'warning', time: '45m ago' },
    { id: '3', title: 'Security Database Confirmed', desc: 'SSL Indochina core logs rotated.', type: 'success', time: '2h ago' }
  ];

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return t('menuDashboard');
      case 'upload-statement':
        return t('menuUploadStatement');
      case 'transaction-analysis':
        return t('menuTransactionAnalysis');
      case 'income-analysis':
        return t('menuIncomeAnalysis');
      case 'expense-analysis':
        return t('menuExpenseAnalysis');
      case 'cash-flow-analysis':
        return t('menuCashFlowAnalysis');
      case 'risk-assessment':
        return t('menuRiskAssessment');
      case 'ai-report':
        return t('menuAiReport');
      case 'customer-management':
        return t('menuCustomerManagement');
      case 'customer-profile':
        return t('customerProfileTitle');
      case 'audit-logs':
        return t('menuAuditLogs');
      case 'settings':
        return t('menuSettings');
      default:
        return 'BNK Insurance';
    }
  };

  return (
    <header className="sticky top-0 z-40 h-[72px] bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      {/* Dynamic Nav Title */}
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></div>
        <h1 className="text-sm md:text-base font-bold text-slate-800 tracking-tight font-sans">
          {getPageTitle()}
        </h1>
      </div>

      {/* Global Bank Search bar */}
      <div className="flex-1 max-w-sm xl:max-w-md mx-6 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-accent text-xs font-medium focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all duration-200"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-slate-200/50 hover:bg-slate-200 px-1.5 py-0.5 rounded cursor-pointer"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Right Core Actions */}
      <div className="flex items-center gap-4">
        {/* Localization Toggler */}
        <LanguageSwitcher />

        {/* Audit/Alert Notifications Center */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-lg border border-slate-100 transition-all relative cursor-pointer"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger ring-2 ring-white"></span>
          </button>
          
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              ></div>
              <div className="absolute right-0 mt-3.5 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 bg-slate-50/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 tracking-tight font-sans">
                    System Intelligence alerts
                  </span>
                  <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    3 Inbound
                  </span>
                </div>
                
                <div className="divide-y divide-slate-50 max-h-60 overflow-y-auto">
                  {mockNotifications.map(item => (
                    <div key={item.id} className="p-3.5 hover:bg-slate-50/80 cursor-pointer transition-colors flex items-start gap-2.5">
                      {item.type === 'warning' ? (
                        <AlertTriangle size={15} className="mt-0.5 text-warning shrink-0" />
                      ) : item.type === 'success' ? (
                        <Check size={15} className="mt-0.5 text-accent shrink-0" />
                      ) : (
                        <AlertCircle size={15} className="mt-0.5 text-primary shrink-0" />
                      )}
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-slate-700">{item.title}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-2">{item.desc}</p>
                        <p className="text-[9px] font-bold text-slate-400 pt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    setCurrentPage('audit-logs');
                    setShowNotifications(false);
                  }}
                  className="w-full text-center py-2.5 text-[11px] font-bold text-primary hover:bg-slate-50 transition-colors uppercase tracking-wider block"
                >
                  View Audit Trails
                </button>
              </div>
            </>
          )}
        </div>

        {/* Standalone User Profile Avatar Icon */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-150">
          <button
            type="button"
            onClick={() => setCurrentPage('settings')}
            className="w-10 h-10 rounded-xl bg-primary text-[#00C48C] flex items-center justify-center font-bold text-sm tracking-wide shadow-xs border border-primary/20 hover:scale-105 transition-all duration-200 cursor-pointer"
            title="Administrator Settings"
          >
            AA
          </button>
        </div>
      </div>
      
      {/* Toast Overlay Renderer */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
          {toasts.map(toast => (
            <div
              key={toast.id}
              className={`p-4 rounded-xl shadow-lg border flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 bg-white ${
                toast.type === 'success'
                  ? 'border-emerald-100 text-slate-800 border-l-4 border-l-emerald-500'
                  : toast.type === 'danger'
                    ? 'border-rose-100 text-slate-800 border-l-4 border-l-rose-500'
                    : 'border-amber-100 text-slate-800 border-l-4 border-l-amber-500'
              }`}
            >
              <div className="text-xs font-medium">{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded cursor-pointer"
              >
                DISMISS
              </button>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
