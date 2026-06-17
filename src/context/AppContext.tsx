import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, Transaction, AuditLog, Language, PageId } from '../types';
import { generateMockBankData, generateAuditLogs } from '../data/mockData';
import { translations } from '../data/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  
  // Data lists
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  auditLogs: AuditLog[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;
  
  // Selection
  selectedCustomerId: string;
  setSelectedCustomerId: (id: string) => void;
  activeCustomer: Customer | undefined;
  
  // Global search & filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Upload statement page flow
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
  uploadingFile: File | null;
  setUploadingFile: (file: File | null) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  triggerUploadAnalysis: (file: File) => void;

  // Settings
  theme: 'light' | 'dark-blue';
  setTheme: (t: 'light' | 'dark-blue') => void;
  currency: 'USD' | 'LAK' | 'VND';
  setCurrency: (c: 'USD' | 'LAK' | 'VND') => void;
  aiProvider: string;
  setAiProvider: (val: string) => void;
  allowNotifications: boolean;
  setAllowNotifications: (val: boolean) => void;
  
  // Auth
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  
  // Alert logs / toasts
  toasts: { id: string; message: string; type: 'success' | 'warning' | 'danger' }[];
  addToast: (msg: string, type: 'success' | 'warning' | 'danger') => void;
  removeToast: (id: string) => void;
  
  // Translation accessor
  t: (key: keyof import('../types').TranslationDictionary) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence support for properties
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bnk_language');
    return (saved as Language) || 'en';
  });
  
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  
  // Generate our rich deterministic database of 100 fake customers & 5,000 transactions
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('BNK-1001');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Upload flows states
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // General settings
  const [theme, setTheme] = useState<'light' | 'dark-blue'>('light');
  const [currency, setCurrency] = useState<'USD' | 'LAK' | 'VND'>('USD');
  const [aiProvider, setAiProvider] = useState<string>('Gemini 2.5 Flash Enterprise (Standard)');
  const [allowNotifications, setAllowNotifications] = useState<boolean>(true);
  
  // Auth state
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(() => {
    return sessionStorage.getItem('bnk_logged_in') === 'true';
  });

  const setIsLoggedIn = (val: boolean) => {
    setIsLoggedInState(val);
    if (val) {
      sessionStorage.setItem('bnk_logged_in', 'true');
    } else {
      sessionStorage.removeItem('bnk_logged_in');
    }
  };
  
  // Toasts
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'warning' | 'danger' }[]>([]);

  // Initialize data on mount
  useEffect(() => {
    const data = generateMockBankData();
    setCustomers(data.customers);
    setTransactions(data.transactions);
    setAuditLogs(generateAuditLogs());
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bnk_language', lang);
    addToast(
      lang === 'en' 
        ? 'Switched locale to English.' 
        : lang === 'lo' 
          ? 'ປ່ຽນລະບົບເປັນ ພາສາລາວ.' 
          : 'Đã chuyển ngôn ngữ sang Tiếng Việt.',
      'success'
    );
  };

  const addToast = (message: string, type: 'success' | 'warning' | 'danger') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Find active customer profile
  const activeCustomer = customers.find(c => c.id === selectedCustomerId);

  // Trigger file simulation and auto-navigation to Transaction Analysis
  const triggerUploadAnalysis = (file: File) => {
    setUploadingFile(file);
    setIsProcessing(true);
    setUploadProgress(1);
    
    let currentProgress = 1;

    // Create animated progress indicator
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 20 + 10);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        
        // Complete processing
        setTimeout(() => {
          setIsProcessing(false);
          setUploadingFile(null);
          setUploadProgress(0);
          
          // Safely create a fake new customer out of PDF statement
          setCustomers(prevCustomers => {
            const newId = `BNK-${1000 + (prevCustomers.length + 1)}`;
            const nameFromDoc = file.name.split('.')[0].replace(/[-_]+/g, ' ') || 'Ingested Statement Profile';
            
            // Capitalize
            const words = nameFromDoc.split(' ');
            const formattedName = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            
            const newCustomer: Customer = {
              id: newId,
              name: formattedName.length > 5 ? formattedName : 'Corporate Statement Ingest',
              accountNumber: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
              phone: '+856 20 54128941',
              email: 'verified_corporate@bank-ingestion.com',
              status: 'Active',
              riskLevel: Math.random() > 0.45 ? 'LOW' : 'MEDIUM',
              financialScore: 680 + Math.floor(Math.random() * 150),
              monthlySalary: 3200 + Math.floor(Math.random() * 5000),
              savings: 1200 + Math.floor(Math.random() * 2000),
              totalBalance: 45000 + Math.floor(Math.random() * 120000),
              company: 'Ingested LLC',
              employmentType: 'Full-Time Executive',
              address: 'Mekong Promenade View, Sector B, Vientiane',
              avatar: 'SA',
              avatarColor: 'bg-emerald-600 text-white',
              riskBreakdown: {
                incomeStability: 85,
                savings: 70,
                debtRatio: 90,
                balance: 75,
                spendingPattern: 80,
                transactionFrequency: 95,
              },
              expenseStructure: {
                housing: 1500,
                food: 650,
                shopping: 450,
                transport: 280,
                utilities: 300,
                healthcare: 150,
                entertainment: 500,
                education: 200,
              },
              monthlyHistory: [
                { month: 'Jan', income: 7800, expenses: 3800, savings: 4000 },
                { month: 'Feb', income: 8100, expenses: 4100, savings: 4000 },
                { month: 'Mar', income: 8000, expenses: 3950, savings: 4050 },
                { month: 'Apr', income: 8400, expenses: 4300, savings: 4100 },
                { month: 'May', income: 8200, expenses: 4000, savings: 4200 },
                { month: 'Jun', income: 8500, expenses: 4030, savings: 4470 },
              ]
            };

            setTransactions(prevTransactions => {
              // Add fake transactions for the parsed OCR customer
              const newTxs: Transaction[] = [];
              const cats: Transaction['category'][] = ['Housing', 'Food', 'Shopping', 'Transport', 'Utilities', 'Healthcare', 'Entertainment', 'Education'];
              
              // Generate a randomized namespace prefix to completely avoid any risk of collison
              const namespace = Math.floor(100000 + Math.random() * 900000);
              
              for (let k = 1; k <= 50; k++) {
                const debitAmount = Math.floor(10 + Math.random() * 800);
                const curCat = cats[Math.floor(Math.random() * cats.length)];
                newTxs.push({
                  id: `TX-${namespace}${k}`,
                  customerId: newId,
                  customerName: newCustomer.name,
                  date: `2026-06-${k < 10 ? '0' + k : k} 14:24`,
                  description: `Ingested ${curCat} AutoPay Entry`,
                  debit: curCat === 'Salary' ? 0 : debitAmount,
                  credit: curCat === 'Salary' ? newCustomer.monthlySalary : 0,
                  balance: newCustomer.totalBalance - (k * debitAmount),
                  category: curCat,
                  confidenceScore: 92 + Math.floor(Math.random() * 8),
                  aiNotes: 'Auto-mapped using BNK Neural OCR standard.',
                });
              }
              return [...newTxs, ...prevTransactions];
            });

            setSelectedCustomerId(newId);
            addToast(`Successfully parsed statement! New profile created for "${newCustomer.name}".`, 'success');
            setCurrentPage('transaction-analysis');

            return [newCustomer, ...prevCustomers];
          });
          
          // Log this timeline event to audit trail
          setAuditLogs(prev => [
            {
              id: `LOG-${Math.floor(9000 + Math.random() * 1000)}`,
              date: '2026-06-17 11:18',
              action: 'Statement OCR Ingest',
              user: 'abdullahiabubakar9991@gmail.com',
              description: `Successfully ingested financial statement file ${file.name}. Calculated ID: BNK-${1000 + (customers.length + 1)}.`,
              status: 'SUCCESS'
            },
            ...prev
          ]);
        }, 800);
      } else {
        setUploadProgress(currentProgress);
      }
    }, 150);
  };

  // Helper function to translate keys using fallback dictionary
  const t = (key: keyof import('../types').TranslationDictionary): string => {
    return translations[language][key] || translations['en'][key] || String(key);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currentPage,
        setCurrentPage,
        customers,
        setCustomers,
        transactions,
        setTransactions,
        auditLogs,
        setAuditLogs,
        selectedCustomerId,
        setSelectedCustomerId,
        activeCustomer,
        searchQuery,
        setSearchQuery,
        uploadProgress,
        setUploadProgress,
        uploadingFile,
        setUploadingFile,
        isProcessing,
        setIsProcessing,
        triggerUploadAnalysis,
        theme,
        setTheme,
        currency,
        setCurrency,
        aiProvider,
        setAiProvider,
        allowNotifications,
        setAllowNotifications,
        isLoggedIn,
        setIsLoggedIn,
        toasts,
        addToast,
        removeToast,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
