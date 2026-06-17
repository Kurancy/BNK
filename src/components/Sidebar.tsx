import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import { 
  LayoutDashboard, 
  UploadCloud, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ShieldAlert, 
  BrainCircuit, 
  Users, 
  History, 
  Settings, 
  LogOut,
  AlertCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, t, addToast, theme, setIsLoggedIn } = useApp();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems: { id: PageId; labelKey: keyof import('../types').TranslationDictionary; icon: React.ReactNode }[] = [
    { id: 'dashboard', labelKey: 'menuDashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'upload-statement', labelKey: 'menuUploadStatement', icon: <UploadCloud size={18} /> },
    { id: 'transaction-analysis', labelKey: 'menuTransactionAnalysis', icon: <ArrowUpDown size={18} /> },
    { id: 'income-analysis', labelKey: 'menuIncomeAnalysis', icon: <TrendingUp size={18} /> },
    { id: 'expense-analysis', labelKey: 'menuExpenseAnalysis', icon: <TrendingDown size={18} /> },
    { id: 'cash-flow-analysis', labelKey: 'menuCashFlowAnalysis', icon: <Activity size={18} /> },
    { id: 'risk-assessment', labelKey: 'menuRiskAssessment', icon: <ShieldAlert size={18} /> },
    { id: 'ai-report', labelKey: 'menuAiReport', icon: <BrainCircuit size={18} /> },
    { id: 'customer-management', labelKey: 'menuCustomerManagement', icon: <Users size={18} /> },
    { id: 'audit-logs', labelKey: 'menuAuditLogs', icon: <History size={18} /> },
    { id: 'settings', labelKey: 'menuSettings', icon: <Settings size={18} /> },
  ];

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    addToast('Cryptographic session ended. Secure workspace reset complete.', 'success');
    setShowLogoutConfirm(false);
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  return (
    <>
      {/* Spacer to prevent fixed sidebar from overlapping main content */}
      <div className="w-[280px] shrink-0" />

      <aside className="w-[280px] h-[100vh] fixed top-0 left-0 flex flex-col shrink-0 select-none z-30 shadow-md overflow-hidden transition-colors duration-300 bg-[var(--bg-sidebar)] text-[var(--text-sidebar)] border-r border-[var(--border-sidebar)]">
        {/* Logo Brand Sector aligned to top navbar line (72px height) - Static */}
        <div className="h-[72px] px-6 flex items-center gap-3 border-b shrink-0 transition-colors duration-300 border-[var(--border-sidebar)]">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter border shadow-xs transition-colors duration-300 bg-[var(--logo-bg)] border-[var(--logo-border)] text-[var(--logo-text)]">
            B
          </div>
          <div className="leading-tight">
            <h1 className="font-sans font-black text-base tracking-tight leading-none transition-colors duration-300 text-[var(--text-sidebar-hover)]">
              BNK INSURANCE
            </h1>
            <span className="text-[9px] font-mono font-bold tracking-widest transition-colors duration-300 text-[var(--logo-text)]">
              UNDERWRITING LABS
            </span>
          </div>
        </div>

        {/* Scrollable Nav Items Container - Scrollable if window height is very small */}
        <div className="flex-1 min-h-0 overflow-y-auto py-3">
          <nav className="px-3 space-y-0.5 flex flex-col">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id || (item.id === 'customer-management' && currentPage === 'customer-profile');
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative flex items-center gap-2.5 w-full px-3.5 h-[34px] text-xs font-semibold rounded-xl cursor-pointer transition-all duration-300 group shrink-0 ${
                    isActive
                      ? 'bg-[var(--bg-sidebar-active)] text-[var(--text-sidebar-active)] border-l-4 border-[var(--border-sidebar-active-bar)] shadow-xs'
                      : 'text-[var(--text-sidebar)] hover:text-[var(--text-sidebar-hover)] hover:bg-[var(--bg-sidebar-active)]'
                  }`}
                >
                  {/* Icon */}
                  <span className={`transition-transform duration-300 ${
                    isActive
                      ? 'scale-110 text-[var(--border-sidebar-active-bar)]'
                      : 'text-[var(--text-sidebar)] opacity-60 group-hover:scale-110 group-hover:opacity-100 group-hover:text-[var(--text-sidebar-hover)]'
                  }`}>
                    {item.icon}
                  </span>
                  
                  {/* Text Label */}
                  <span className="truncate tracking-wide text-[11px]">{t(item.labelKey)}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer logout triggers - Pinned statically to the bottom */}
        <div className="mt-auto p-4 border-t shrink-0 transition-colors duration-300 border-[var(--border-sidebar)] bg-[var(--bg-sidebar)]">
          <button
            onClick={handleLogoutClick}
            className={`flex items-center gap-3 w-full px-4 h-10.5 text-xs font-semibold rounded-xl cursor-pointer transition-all duration-300 group ${
              theme === 'light'
                ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                : 'text-rose-300 hover:text-rose-200 hover:bg-rose-50/10'
            }`}
          >
            <span className={`group-hover:translate-x-1 transition-transform ${
              theme === 'light' ? 'text-rose-500' : 'text-rose-300'
            }`}>
              <LogOut size={18} />
            </span>
            <span className="tracking-wide">{t('menuLogout')}</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Dialogue modal overlay */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                <AlertCircle size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 tracking-tight">Confirm Secure Logout</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3">Are you sure you want to end your executive session with BNK Insurance? Any non-written changes will be saved to your workspace cache.</p>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end mt-5">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
