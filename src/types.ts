export type Language = 'en' | 'lo' | 'vi';

export type PageId =
  | 'dashboard'
  | 'upload-statement'
  | 'transaction-analysis'
  | 'income-analysis'
  | 'expense-analysis'
  | 'cash-flow-analysis'
  | 'risk-assessment'
  | 'ai-report'
  | 'customer-management'
  | 'customer-profile'
  | 'audit-logs'
  | 'settings';

export interface Customer {
  id: string;
  name: string;
  accountNumber: string;
  phone: string;
  email: string;
  status: 'Active' | 'Suspended' | 'In Progress';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  financialScore: number;
  monthlySalary: number;
  savings: number;
  totalBalance: number;
  company: string;
  employmentType: string;
  address: string;
  avatar: string;
  avatarColor: string;
  riskBreakdown: {
    incomeStability: number;
    savings: number;
    debtRatio: number;
    balance: number;
    spendingPattern: number;
    transactionFrequency: number;
  };
  expenseStructure: {
    housing: number;
    food: number;
    shopping: number;
    transport: number;
    utilities: number;
    healthcare: number;
    entertainment: number;
    education: number;
  };
  monthlyHistory: {
    month: string;
    income: number;
    expenses: number;
    savings: number;
  }[];
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  category:
    | 'Housing'
    | 'Food'
    | 'Shopping'
    | 'Transport'
    | 'Utilities'
    | 'Healthcare'
    | 'Entertainment'
    | 'Education'
    | 'Salary'
    | 'Other';
  confidenceScore: number; // 0-100
  aiNotes: string;
}

export interface AuditLog {
  id: string;
  date: string;
  action: string;
  user: string;
  description: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

export interface TranslationDictionary {
  appName: string;
  searchPlaceholder: string;
  langEn: string;
  langLo: string;
  langVi: string;
  notifications: string;
  userProfile: string;
  
  // Sidebar items
  menuDashboard: string;
  menuUploadStatement: string;
  menuTransactionAnalysis: string;
  menuIncomeAnalysis: string;
  menuExpenseAnalysis: string;
  menuCashFlowAnalysis: string;
  menuRiskAssessment: string;
  menuAiReport: string;
  menuCustomerManagement: string;
  menuAuditLogs: string;
  menuSettings: string;
  menuLogout: string;
  
  // Dashboard
  summaryTitle: string;
  totalCustomers: string;
  totalStatements: string;
  avgFinancialScore: string;
  highRiskAccounts: string;
  lowRiskAccounts: string;
  avgSavingsRate: string;
  incomeVsExpenseChart: string;
  riskDistributionChart: string;
  monthlyActivity: string;
  recentAnalyses: string;
  recentAiInsights: string;
  aiInsightStableSalary: string;
  aiInsightLowRisk: string;
  aiInsightHighSpend: string;
  aiInsightPositiveCash: string;
  
  // Upload
  dragAndDropTitle: string;
  dragAndDropSubtitle: string;
  uploadButton: string;
  unsupportedFile: string;
  analyzingFile: string;
  extractingTransactions: string;
  readyToRedirect: string;
  
  // Customer Management
  customerId: string;
  fullName: string;
  accountNumber: string;
  phone: string;
  status: string;
  riskLevel: string;
  financialScore: string;
  actions: string;
  viewProfile: string;
  searchCustomers: string;
  allStatus: string;
  allRisk: string;
  statusActive: string;
  statusSuspended: string;
  statusInProgress: string;
  levelLow: string;
  levelMedium: string;
  levelHigh: string;
  showingRecords: string;
  previous: string;
  next: string;
  
  // Profile
  customerProfileTitle: string;
  tabOverview: string;
  tabTransactions: string;
  tabIncome: string;
  tabExpenses: string;
  tabCashFlow: string;
  tabAiReport: string;
  tabRiskAssessment: string;
  tabTimeline: string;
  
  // Expenses and Inc List
  housing: string;
  food: string;
  shopping: string;
  transport: string;
  utilities: string;
  healthcare: string;
  entertainment: string;
  education: string;
  salary: string;
  other: string;
}
