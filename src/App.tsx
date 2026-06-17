import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';

// Page imports
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { UploadStatement } from './pages/UploadStatement';
import { TransactionAnalysis } from './pages/TransactionAnalysis';
import { IncomeAnalysis } from './pages/IncomeAnalysis';
import { ExpenseAnalysis } from './pages/ExpenseAnalysis';
import { CashFlow } from './pages/CashFlow';
import { RiskAssessment } from './pages/RiskAssessment';
import { AIReport } from './pages/AIReport';
import { CustomerManagement } from './pages/CustomerManagement';
import { CustomerProfile } from './pages/CustomerProfile';
import { AuditLogs } from './pages/AuditLogs';
import { Settings } from './pages/Settings';

const AppContent: React.FC = () => {
  const { currentPage, theme, isLoggedIn } = useApp();

  // If user is not authenticated, render the premium Login system
  if (!isLoggedIn) {
    return <Login />;
  }

  // Route page components matching current context page index
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload-statement':
        return <UploadStatement />;
      case 'transaction-analysis':
        return <TransactionAnalysis />;
      case 'income-analysis':
        return <IncomeAnalysis />;
      case 'expense-analysis':
        return <ExpenseAnalysis />;
      case 'cash-flow-analysis':
        return <CashFlow />;
      case 'risk-assessment':
        return <RiskAssessment />;
      case 'ai-report':
        return <AIReport />;
      case 'customer-management':
        return <CustomerManagement />;
      case 'customer-profile':
        return <CustomerProfile />;
      case 'audit-logs':
        return <AuditLogs />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`h-screen overflow-hidden flex bg-background-brand text-slate-700 theme-${theme}`}>
      {/* 280px LEFT SIDEBAR (Full height) */}
      <Sidebar />

      {/* RIGHT SIDE MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* 72px TOP NAVIGATION BAR */}
        <Navbar />

        {/* MAIN CONSOLE CONTAINER (scrollable stage) */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 w-full">
          <div className="max-w-7xl mx-auto w-full">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
