import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import { useApp } from '../context/AppContext';
import { Search, ChevronUp, ChevronDown, Sparkles, Filter, CreditCard, ArrowRight, Table } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  compact?: boolean;
}

const CATEGORY_STYLES: Record<string, string> = {
  Housing: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  Food: 'bg-amber-50 text-amber-700 border-amber-100',
  Shopping: 'bg-rose-50 text-rose-700 border-rose-100',
  Transport: 'bg-blue-50 text-blue-700 border-blue-100',
  Utilities: 'bg-cyan-50 text-cyan-700 border-cyan-100',
  Healthcare: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Entertainment: 'bg-purple-50 text-purple-700 border-purple-100',
  Education: 'bg-teal-50 text-teal-700 border-teal-100',
  Salary: 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold',
  Other: 'bg-slate-50 text-slate-600 border-slate-100',
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  compact = false,
}) => {
  const { searchQuery, t, currency } = useApp();
  
  // Local sorting & pagination state
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortField, setSortField] = useState<'date' | 'debit' | 'credit' | 'balance' | 'confidenceScore'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const rowsPerPage = compact ? 10 : 15;

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // List of unique categories for filter
  const uniqueCategories = useMemo(() => {
    const list = new Set(transactions.map(t => t.category));
    return ['All', ...Array.from(list)];
  }, [transactions]);

  // Filter & Sort math
  const processedTransactions = useMemo(() => {
    let result = [...transactions];

    // Align with global searching AND local searching
    const activeSearch = (localSearch || searchQuery).toLowerCase();
    if (activeSearch) {
      result = result.filter(
        t =>
          t.description.toLowerCase().includes(activeSearch) ||
          t.id.toLowerCase().includes(activeSearch) ||
          t.customerName.toLowerCase().includes(activeSearch) ||
          t.category.toLowerCase().includes(activeSearch)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(t => t.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      // Handle raw dates parsing
      if (sortField === 'date') {
        valA = new Date(a.date).getTime();
        valB = new Date(b.date).getTime();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [transactions, searchQuery, localSearch, selectedCategory, sortField, sortDirection]);

  // Pagination bounds
  const totalPages = Math.ceil(processedTransactions.length / rowsPerPage) || 1;
  const paginatedTxs = useMemo(() => {
    const startIdx = (currentPageNum - 1) * rowsPerPage;
    return processedTransactions.slice(startIdx, startIdx + rowsPerPage);
  }, [processedTransactions, currentPageNum, rowsPerPage]);

  const displayedRange = {
    start: (currentPageNum - 1) * rowsPerPage + 1,
    end: Math.min(currentPageNum * rowsPerPage, processedTransactions.length),
    total: processedTransactions.length,
  };

  const getCurrencySymbol = () => {
    if (currency === 'LAK') return '₭';
    if (currency === 'VND') return '₫';
    return '$';
  };

  const formatMoneyValue = (amt: number) => {
    let scalar = 1;
    if (currency === 'LAK') scalar = 21000;
    if (currency === 'VND') scalar = 25000;
    
    return `${getCurrencySymbol()}${(amt * scalar).toLocaleString()}`;
  };

  return (
    <div className="space-y-4">
      {/* Header filter controls */}
      {!compact && (
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                setCurrentPageNum(1);
              }}
              placeholder="Search table rows..."
              className="w-full text-xs h-9 pl-9 pr-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary focus:bg-white bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={14} className="text-slate-400" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPageNum(1);
              }}
              className="text-xs h-9 border border-slate-200 rounded-lg px-2 bg-white focus:outline-none focus:border-primary"
            >
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Classes' : cat}</option>
              ))}
            </select>
            
            <button
              onClick={() => {
                setLocalSearch('');
                setSelectedCategory('All');
                setSortField('date');
                setSortDirection('desc');
                setCurrentPageNum(1);
              }}
              className="text-[10px] font-bold tracking-wide hover:bg-slate-200 px-2.5 h-9 rounded-lg border border-slate-200 bg-white cursor-pointer"
            >
              RESET FILTERS
            </button>
          </div>
        </div>
      )}

      {/* Actual Data Table layout */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-[500px]">
        <table className="w-full border-collapse text-left relative">
          {/* STICKY HEADER */}
          <thead className="sticky top-0 bg-slate-100 border-b border-slate-200 z-10">
            <tr>
              <th 
                className="p-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-200 font-sans"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-1.5 justify-between">
                  <span>Date/Time</span>
                  {sortField === 'date' && (sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                </div>
              </th>
              {!compact && (
                <th className="p-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                  Account Name
                </th>
              )}
              <th className="p-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                Description
              </th>
              <th 
                className="p-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide text-right cursor-pointer hover:bg-slate-200 font-sans"
                onClick={() => handleSort('debit')}
              >
                <div className="flex items-center gap-1.5 justify-end">
                  <span>Debit</span>
                  {sortField === 'debit' && (sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                </div>
              </th>
              <th 
                className="p-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide text-right cursor-pointer hover:bg-slate-200 font-sans"
                onClick={() => handleSort('credit')}
              >
                <div className="flex items-center gap-1.5 justify-end">
                  <span>Credit</span>
                  {sortField === 'credit' && (sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                </div>
              </th>
              <th 
                className="p-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide text-right cursor-pointer hover:bg-slate-200 font-sans"
                onClick={() => handleSort('balance')}
              >
                <div className="flex items-center gap-1.5 justify-end">
                  <span>Balance</span>
                  {sortField === 'balance' && (sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                </div>
              </th>
              <th className="p-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                Classification
              </th>
              {!compact && (
                <th 
                  className="p-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-200 font-sans"
                  onClick={() => handleSort('confidenceScore')}
                >
                  <div className="flex items-center gap-1.5 justify-between">
                    <span>Confidence</span>
                    {sortField === 'confidenceScore' && (sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                  </div>
                </th>
              )}
              <th className="p-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans min-w-[150px]">
                AI Analyst Notes
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 bg-white">
            {paginatedTxs.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-12 text-center text-slate-400 font-medium text-xs">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Table size={32} className="text-slate-300" />
                    <p>No matching banking records found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedTxs.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 text-[11px] font-mono font-medium text-slate-500 truncate whitespace-nowrap">
                    {tx.date}
                  </td>
                  {!compact && (
                    <td className="p-3 text-xs font-semibold text-slate-700 truncate whitespace-nowrap">
                      {tx.customerName}
                    </td>
                  )}
                  <td className="p-3 text-xs font-semibold text-primary truncate max-w-[180px]" title={tx.description}>
                    {tx.description}
                  </td>
                  <td className="p-3 text-xs font-bold font-mono text-danger text-right whitespace-nowrap">
                    {tx.debit > 0 ? `-${formatMoneyValue(tx.debit)}` : '—'}
                  </td>
                  <td className="p-3 text-xs font-bold font-mono text-accent text-right whitespace-nowrap">
                    {tx.credit > 0 ? `+${formatMoneyValue(tx.credit)}` : '—'}
                  </td>
                  <td className="p-3 text-xs font-semibold font-mono text-slate-800 text-right whitespace-nowrap">
                    {formatMoneyValue(tx.balance)}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${CATEGORY_STYLES[tx.category] || 'bg-slate-50 text-slate-600'}`}>
                      {tx.category}
                    </span>
                  </td>
                  {!compact && (
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0">
                          <div 
                            className={`h-full ${tx.confidenceScore > 95 ? 'bg-accent' : tx.confidenceScore > 90 ? 'bg-blue-500' : 'bg-warning'}`}
                            style={{ width: `${tx.confidenceScore}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold font-mono text-slate-600 shrink-0">
                          {tx.confidenceScore}%
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="p-3 text-[10px] font-medium text-slate-500 italic max-w-sm">
                    <span className="flex items-center gap-1">
                      <Sparkles size={10} className="text-purple-500 shrink-0" />
                      <span>{tx.aiNotes}</span>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Sticky pagination footer */}
      {processedTransactions.length > rowsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-xl text-xs">
          <div className="text-slate-400 font-medium">
            {t('showingRecords')
              .replace('{start}', String(displayedRange.start))
              .replace('{end}', String(displayedRange.end))
              .replace('{total}', String(displayedRange.total))}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPageNum(prev => Math.max(1, prev - 1))}
              disabled={currentPageNum === 1}
              className="px-2.5 py-1 rounded-lg border border-slate-200 font-semibold hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              {t('previous')}
            </button>
            
            <div className="flex items-center gap-1 font-bold">
              <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-800 font-mono">
                {currentPageNum}
              </span>
              <span className="text-slate-400 font-medium">/</span>
              <span className="text-slate-400 font-mono font-medium">{totalPages}</span>
            </div>

            <button
              onClick={() => setCurrentPageNum(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPageNum === totalPages}
              className="px-2.5 py-1 rounded-lg border border-slate-200 font-semibold hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
