import { Customer, Transaction, AuditLog } from '../types';

// Deterministic random generator to ensure stability between updates
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Lists for realistic multi-lingual customer names
const firstNamesEN = ['John', 'Sarah', 'William', 'Emily', 'Michael', 'Jessica', 'David', 'Sophia', 'Thomas', 'Olivia', 'James', 'Daniel', 'Evelyn', 'Andrew', 'Charlotte'];
const lastNamesEN = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Martin', 'Jackson', 'Clark'];

const firstNamesLO = ['Somphone', 'Bounmy', 'Somsack', 'Keo', 'Phout', 'Anousone', 'Soukdavone', 'Vannasinh', 'Sengaloun', 'Ketsana', 'Viengkhone', 'Chansamone', 'Somphet', 'Boualoy'];
const lastNamesLO = ['Phasouk', 'Vongsa', 'Phimmasone', 'Syharath', 'Inthavong', 'Sysanh', 'Khamvongsa', 'Sithideth', 'Phengsavat', 'Douangmala', 'Ounniyom', 'Xayyavong'];

const firstNamesVN = ['Minh', 'Linh', 'Lan', 'Nam', 'An', 'Bình', 'Huy', 'Trang', 'Dũng', 'Hồng', 'Sơn', 'Tú', 'Khánh', 'Cường', 'Phương', 'Hoàng', 'Thảo', 'Yến'];
const lastNamesVN = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];

const companies = ['TechVibe Global', 'Siam Telecom', 'Lao State Brewery', 'Vientiane AgriCorp', 'Mekong Ventures', 'Binh Minh Logistics', 'Saigon Retail Corp', 'Apex Financials', 'Indochina Minerals', 'Green Horizon Labs', 'Apex Core Services', 'Delta Tech Partners'];
const employmentTypes = ['Full-Time Employee', 'Contractor', 'Business Owner', 'Freelancer', 'Government Representative', 'Executive VP'];

const avatarColors = [
  'bg-blue-600 text-white',
  'bg-emerald-600 text-white',
  'bg-teal-600 text-white',
  'bg-indigo-600 text-white',
  'bg-rose-600 text-white',
  'bg-amber-600 text-white',
  'bg-cyan-600 text-white',
  'bg-purple-600 text-white',
];

export function generateMockBankData(): {
  customers: Customer[];
  transactions: Transaction[];
  globalStats: {
    totalCustomers: number;
    totalStatements: number;
    avgFinancialScore: number;
    highRiskCount: number;
    lowRiskCount: number;
    mediumRiskCount: number;
    avgSavingsRate: number;
  };
} {
  const customers: Customer[] = [];
  const transactions: Transaction[] = [];
  
  // Generate 100 Customers
  for (let i = 1; i <= 100; i++) {
    const seed = i * 1537;
    const langPicker = seededRandom(seed);
    
    let name = '';
    if (langPicker < 0.35) {
      // English
      const fn = firstNamesEN[Math.floor(seededRandom(seed + 1) * firstNamesEN.length)];
      const ln = lastNamesEN[Math.floor(seededRandom(seed + 2) * lastNamesEN.length)];
      name = `${fn} ${ln}`;
    } else if (langPicker < 0.7) {
      // Lao
      const fn = firstNamesLO[Math.floor(seededRandom(seed + 1) * firstNamesLO.length)];
      const ln = lastNamesLO[Math.floor(seededRandom(seed + 2) * lastNamesLO.length)];
      name = `${fn} ${ln}`;
    } else {
      // Vietnamese
      const ln = lastNamesVN[Math.floor(seededRandom(seed + 1) * lastNamesVN.length)];
      const fn = firstNamesVN[Math.floor(seededRandom(seed + 2) * firstNamesVN.length)];
      name = `${ln} ${fn}`;
    }
    
    const id = `BNK-${1000 + i}`;
    const accountNumber = `${Math.floor(1000000000 + seededRandom(seed + 3) * 9000000000)}`;
    const phone = i % 2 === 0 
      ? `+856 20 5${Math.floor(1000000 + seededRandom(seed + 4) * 8999999)}`
      : `+84 9${Math.floor(10000000 + seededRandom(seed + 4) * 89999999)}`;
    const email = `${name.toLowerCase().replace(/\s+/g, '.')}@bnkfinance.com`;
    
    // Status distribution
    const statusRand = seededRandom(seed + 5);
    const status = statusRand < 0.85 ? 'Active' : statusRand < 0.95 ? 'In Progress' : 'Suspended';
    
    // Risk score math
    const scoreBase = 450 + Math.floor(seededRandom(seed + 6) * 450); // 450 to 900
    const financialScore = scoreBase;
    
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    if (financialScore < 600) {
      riskLevel = 'HIGH';
    } else if (financialScore < 750) {
      riskLevel = 'MEDIUM';
    }
    
    const monthlySalary = 1200 + Math.floor(seededRandom(seed + 7) * 8800); // $1200 - $10000
    const company = companies[Math.floor(seededRandom(seed + 8) * companies.length)];
    const employmentType = employmentTypes[Math.floor(seededRandom(seed + 9) * employmentTypes.length)];
    const address = langPicker < 0.35 
      ? `${Math.floor(100 + seededRandom(seed)*800)} Wall Street, NY, USA`
      : langPicker < 0.7 
        ? `Lao-Thai Road, Unit ${Math.floor(10 + seededRandom(seed)*90)}, Vientiane, Laos`
        : `Nguyen Hue Street, District 1, Ho Chi Minh City, Vietnam`;
        
    const avatarColor = avatarColors[Math.floor(seededRandom(seed + 10) * avatarColors.length)];
    const avatar = name.split(' ').map(n => n[0]).join('');
    
    // Risk breakdown metrics (0-100)
    const incomeStability = 40 + Math.floor(seededRandom(seed + 11) * 60);
    const savingsRatioScore = 30 + Math.floor(seededRandom(seed + 12) * 70);
    const debtRatio = Math.floor(seededRandom(seed + 13) * 90); // under 90, lower is better but score represents safety (100 - debtRatio)
    const balanceConsistency = 50 + Math.floor(seededRandom(seed + 14) * 50);
    const spendingPattern = 40 + Math.floor(seededRandom(seed + 15) * 60);
    const transactionFrequency = 60 + Math.floor(seededRandom(seed + 16) * 40);
    
    const riskBreakdown = {
      incomeStability: riskLevel === 'HIGH' ? incomeStability - 30 : riskLevel === 'MEDIUM' ? incomeStability - 10 : incomeStability,
      savings: riskLevel === 'HIGH' ? savingsRatioScore - 25 : riskLevel === 'MEDIUM' ? savingsRatioScore - 5 : savingsRatioScore,
      debtRatio: Math.max(0, Math.min(100, 100 - debtRatio)),
      balance: riskLevel === 'HIGH' ? balanceConsistency - 30 : balanceConsistency,
      spendingPattern: riskLevel === 'HIGH' ? spendingPattern - 20 : spendingPattern,
      transactionFrequency: transactionFrequency,
    };
    
    // Expense structures in percent of salary
    const hPct = 0.25 + seededRandom(seed + 17) * 0.10; // Housing: 25-35%
    const fPct = 0.10 + seededRandom(seed + 18) * 0.10; // Food: 10-20%
    const sPct = 0.05 + seededRandom(seed + 19) * 0.12; // Shopping: 5-17%
    const tPct = 0.04 + seededRandom(seed + 20) * 0.08; // Transport: 4-12%
    const uPct = 0.05 + seededRandom(seed + 21) * 0.05; // Utilities: 5-10%
    const mcPct = 0.02 + seededRandom(seed + 22) * 0.06; // Healthcare: 2-8%
    const ePct = 0.05 + seededRandom(seed + 23) * 0.15; // Entertainment: 5-20%
    const edPct = 0.02 + seededRandom(seed + 24) * 0.08; // Education: 2-10%
    
    const totalExpPct = hPct + fPct + sPct + tPct + uPct + mcPct + ePct + edPct;
    const savingsRate = Math.max(0.04, 1.0 - totalExpPct);
    
    const expenseStructure = {
      housing: Math.floor(monthlySalary * hPct),
      food: Math.floor(monthlySalary * fPct),
      shopping: Math.floor(monthlySalary * sPct),
      transport: Math.floor(monthlySalary * tPct),
      utilities: Math.floor(monthlySalary * uPct),
      healthcare: Math.floor(monthlySalary * mcPct),
      entertainment: Math.floor(monthlySalary * ePct),
      education: Math.floor(monthlySalary * edPct),
    };
    
    const totalExp = Object.values(expenseStructure).reduce((a, b) => a + b, 0);
    const savings = monthlySalary - totalExp;
    const totalBalance = Math.floor(savings * (12 + seededRandom(seed + 25) * 48)); // 1 to 5 years of accumulated savings
    
    // Generate monthly history logs
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyHistory = months.map((month, idx) => {
      const monthSeed = seed + idx * 892;
      const variation = 0.85 + seededRandom(monthSeed) * 0.3; // +/- 15%
      const inc = Math.floor(monthlySalary * (0.95 + seededRandom(monthSeed + 1) * 0.1));
      const exp = Math.floor(totalExp * variation);
      return {
        month,
        income: inc,
        expenses: exp,
        savings: Math.max(0, inc - exp),
      };
    });
    
    customers.push({
      id,
      name,
      accountNumber,
      phone,
      email,
      status,
      riskLevel,
      financialScore,
      monthlySalary,
      savings,
      totalBalance,
      company,
      employmentType,
      address,
      avatar,
      avatarColor,
      riskBreakdown,
      expenseStructure,
      monthlyHistory,
    });
  }
  
  // Now, generate 5,000 realistic transactions spread across the 100 customers
  // Each customer gets exactly 50 transactions to reach exactly 100 * 50 = 5,000 transactions!
  const categories: ('Housing' | 'Food' | 'Shopping' | 'Transport' | 'Utilities' | 'Healthcare' | 'Entertainment' | 'Education')[] = [
    'Housing', 'Food', 'Shopping', 'Transport', 'Utilities', 'Healthcare', 'Entertainment', 'Education'
  ];
  
  const categoryDescs: Record<string, string[]> = {
    Housing: ['Mortgage Payment', 'Condo Rent ACH', 'Apartment Rent AutoPay', 'Home Depot Inc.', 'Property Tax Escrow'],
    Food: ['Walmart Supercenter', 'Whole Foods Market', 'Uber Eats Delivery', 'McDonalds Express', 'Starbucks Cafe', 'Local Market Grocery', 'Vientiane Food Mall', 'Saigon Bistro Diner'],
    Shopping: ['Amazon.com Prime', 'Zara Retail', 'Apple Online Mall', 'Nike Outlet Store', 'Target Direct', 'Cosmetics DutyFree', 'Miniso Convenience'],
    Transport: ['Shell Gas Station', 'Uber Ride Booking', 'Chevron Fuel', 'Metro Transit Pass', 'Tesla Supercharger', 'Vietnam Airlines Booking', 'Lao Aviation Ticketing'],
    Utilities: ['EDL Power Bill', 'City Water District', 'Metro Waste Authority', 'AT&T Mobile Auto', 'Comcast Internet Xfinity', 'Viettel Network Payment', 'Unitel Lao Bill'],
    Healthcare: ['CVS Pharmacy Store', 'Kaiser Permanente Insurance', 'Dental Care Associates', 'City Hospital Clinical', 'Community Health Medical'],
    Entertainment: ['Netflix.com Subscription', 'Spotify Premium Music', 'IMAX Cinema Ticket', 'Steam Games Online', 'Golf Course Green Fees', 'Local Lounge & Pub', 'Karaoke Central Club'],
    Education: ['Coursera Online Class', 'State University Tuition', 'Udemy Tech Course', 'Preschool Child Care', 'Textbook Store Purchase']
  };
  
  const monthsList = [
    { name: 'Jan', days: 31, year: 2026, monthNum: '01' },
    { name: 'Feb', days: 28, year: 2026, monthNum: '02' },
    { name: 'Mar', days: 31, year: 2026, monthNum: '03' },
    { name: 'Apr', days: 30, year: 2026, monthNum: '04' },
    { name: 'May', days: 31, year: 2026, monthNum: '05' },
    { name: 'Jun', days: 17, year: 2026, monthNum: '06' }, // to current date
  ];
  
  let txGlobalIndex = 1;
  const noteSnippets = [
    'Confidence verified via recurring footprint.',
    'Matches typical user lifecycle.',
    'Classified via custom neural heuristic.',
    'Under budget threshold for customer.',
    'Verified secure digital channel.',
    'Regular monthly payment verified.',
    'Discretionary transaction analysis safe.'
  ];
  
  customers.forEach((cust, cIdx) => {
    let currentBalance = cust.totalBalance - (cust.monthlySalary * 2.5); // Start slightly lower, build up to current state
    
    // Generate exactly 50 transactions for this customer
    for (let t = 1; t <= 50; t++) {
      const txSeed = cIdx * 93872 + t * 4392;
      
      // Determine the timestamp
      // Distribute transactions sequentially over our 5.5 months period
      const monthObj = monthsList[Math.floor((t - 1) / 10) % monthsList.length];
      const day = 1 + Math.floor(seededRandom(txSeed) * (monthObj.days - 1));
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      const hour = 8 + Math.floor(seededRandom(txSeed + 1) * 12);
      const minutes = Math.floor(seededRandom(txSeed + 2) * 60);
      const formattedTime = `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
      const dateStr = `${monthObj.year}-${monthObj.monthNum}-${formattedDay} ${formattedTime}`;
      
      // Types of transaction:
      // Once every 10 transactions is a Salary Credit
      const isSalaryTx = t % 10 === 0;
      
      let description = '';
      let debit = 0;
      let credit = 0;
      let category: Transaction['category'] = 'Other';
      let confidenceScore = 90 + Math.floor(seededRandom(txSeed + 5) * 10); // 90 to 100 by default
      let aiNotes = '';
      
      if (isSalaryTx) {
        credit = cust.monthlySalary;
        debit = 0;
        category = 'Salary';
        description = `${cust.company} Payroll Direct Deposit`;
        currentBalance += credit;
        aiNotes = 'Stable payroll credit. Frequency: Monthly. Confidence high.';
        confidenceScore = 99;
      } else {
        // Debit expense
        credit = 0;
        // Select category based on expense proportions or random choice
        const catIndex = Math.floor(seededRandom(txSeed + 3) * categories.length);
        category = categories[catIndex];
        
        const possibleDescs = categoryDescs[category];
        description = possibleDescs[Math.floor(seededRandom(txSeed + 4) * possibleDescs.length)];
        
        // Estimate a reasonable expense amount for the category
        const structureLimit = cust.expenseStructure[category.toLowerCase() as keyof typeof cust.expenseStructure] || 150;
        // We do 5 of these per month approximately, so make average transaction ~20% of monthly category budget
        const avgAmount = structureLimit / 5;
        const variation = 0.5 + seededRandom(txSeed + 12) * 1.0; // 50% to 150%
        debit = Math.max(5, Math.floor(avgAmount * variation));
        
        currentBalance -= debit;
        
        // Custom warning logs for AI Analysis
        if (category === 'Entertainment' && debit > 250) {
          aiNotes = 'Warning: Higher than average discretionary leisure spend detected.';
          confidenceScore = 88;
        } else if (category === 'Housing') {
          aiNotes = 'Recurring housing transaction. Matches credit record.';
          confidenceScore = 98;
        } else {
          aiNotes = noteSnippets[Math.floor(seededRandom(txSeed + 10) * noteSnippets.length)];
        }
      }
      
      transactions.push({
        id: `TX-${200000 + txGlobalIndex}`,
        customerId: cust.id,
        customerName: cust.name,
        date: dateStr,
        description,
        debit,
        credit,
        balance: currentBalance,
        category,
        confidenceScore,
        aiNotes,
      });
      
      txGlobalIndex++;
    }
    
    // Sort this customer's internal timeline so it shows nicely
    // Also update current customer balance with the final calculated one from chronological transactions
    const customerTx = transactions.filter(t => t.customerId === cust.id);
    customerTx.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (customerTx.length > 0) {
      cust.totalBalance = customerTx[0].balance;
    }
  });
  
  // Sort all global transactions chronologically descending to resemble a real master log
  transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Global aggregate stats
  const totalCustomers = customers.length;
  const totalStatements = 340; // Simulated historical logs
  const avgFinancialScore = Math.floor(customers.reduce((acc, c) => acc + c.financialScore, 0) / customers.length);
  const highRiskCount = customers.filter(c => c.riskLevel === 'HIGH').length;
  const mdRiskCount = customers.filter(c => c.riskLevel === 'MEDIUM').length;
  const lowRiskCount = customers.filter(c => c.riskLevel === 'LOW').length;
  
  // Calculate average savings rate
  const totalS_Rate = customers.reduce((acc, c) => {
    const rate = c.savings / Math.max(1, c.monthlySalary);
    return acc + rate;
  }, 0);
  const avgSavingsRate = Math.floor((totalS_Rate / customers.length) * 100);
  
  const globalStats = {
    totalCustomers,
    totalStatements,
    avgFinancialScore,
    highRiskCount,
    lowRiskCount,
    mediumRiskCount: mdRiskCount,
    avgSavingsRate,
  };
  
  return {
    customers,
    transactions,
    globalStats,
  };
}

// Generate audit log timeline events
export function generateAuditLogs(): AuditLog[] {
  return [
    { id: 'LOG-9102', date: '2026-06-17 11:15', action: 'Upload & Parse', user: 'abdullahiabubakar9991@gmail.com', description: 'Parsed corporate statement for account #4928193. Extracted 415 entries.', status: 'SUCCESS' },
    { id: 'LOG-9101', date: '2026-06-17 10:48', action: 'Credit Risk Analysis', user: 'abdullahiabubakar9991@gmail.com', description: 'Evaluated risk rating of LOW for customer Emily Davis.', status: 'SUCCESS' },
    { id: 'LOG-9100', date: '2026-06-17 09:30', action: 'System Alert Trigger', user: 'System Heuristics', description: 'High non-grocery subscription burn rate flagged on customer Somphone Vongsa.', status: 'WARNING' },
    { id: 'LOG-9099', date: '2026-06-16 16:45', action: 'Customer Status Modify', user: 'abdullahiabubakar9991@gmail.com', description: 'Suspended customer id BNK-1004 due to incomplete validation.', status: 'FAILED' },
    { id: 'LOG-9098', date: '2026-06-16 14:15', action: 'AI Executive Summary Export', user: 'abdullahiabubakar9991@gmail.com', description: 'Generated executive PDF credit report for John Smith.', status: 'SUCCESS' },
    { id: 'LOG-9097', date: '2026-06-16 11:32', action: 'Language Switch Config', user: 'abdullahiabubakar9991@gmail.com', description: 'Switched system locale to Lao (ພາສາລາວ) workspace.', status: 'SUCCESS' },
    { id: 'LOG-9096', date: '2026-06-16 09:12', action: 'Security Lockout System', user: 'Indochina System Core', description: 'IP 142.12.83.9 queried financial scorecards from Singapore terminal.', status: 'SUCCESS' },
    { id: 'LOG-9095', date: '2026-06-15 15:40', action: 'OCR Training Upload', user: 'Indochina System Core', description: 'Ingested and updated OCR categorizer matching rules. Re-classified 4,800 entries.', status: 'SUCCESS' }
  ];
}
