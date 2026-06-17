import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Customer } from '../types';
import { Search, Filter, ShieldAlert, Sparkles, ChevronLeft, ChevronRight, Eye, UserPlus } from 'lucide-react';

export const CustomerManagement: React.FC = () => {
  const { customers, setSelectedCustomerId, setCurrentPage, currency, t } = useApp();

  // Local table filters & paging state
  const [cmSearch, setCmSearch] = useState('');
  const [cmStatus, setCmStatus] = useState<string>('All');
  const [cmRisk, setCmRisk] = useState<string>('All');
  const [cmPage, setCmPage] = useState(1);
  const rowsPerPage = 12;

  const handleInspect = (id: string) => {
    setSelectedCustomerId(id);
    setCurrentPage('customer-profile');
  };

  // Unique lists options
  const uniqueStatuses = ['All', 'Active', 'Suspended', 'In Progress'];
  const uniqueRisks = ['All', 'LOW', 'MEDIUM', 'HIGH'];

  // Filters math
  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (cmSearch) {
      const q = cmSearch.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.accountNumber.toLowerCase().includes(q)
      );
    }

    if (cmStatus !== 'All') {
      result = result.filter(c => c.status === cmStatus);
    }

    if (cmRisk !== 'All') {
      result = result.filter(c => c.riskLevel === cmRisk);
    }

    return result;
  }, [customers, cmSearch, cmStatus, cmRisk]);

  // Page index math
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const startIdx = (cmPage - 1) * rowsPerPage;
    return filteredCustomers.slice(startIdx, startIdx + rowsPerPage);
  }, [filteredCustomers, cmPage]);

  const rangeStart = (cmPage - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(cmPage * rowsPerPage, filteredCustomers.length);

  const getCurrencySymbol = () => {
    if (currency === 'LAK') return '₭';
    if (currency === 'VND') return '₫';
    return '$';
  };

  const formatMoney = (val: number) => {
    let scalar = 1;
    if (currency === 'LAK') scalar = 21000;
    if (currency === 'VND') scalar = 25000;
    
    return `${getCurrencySymbol()}${(val * scalar).toLocaleString()}`;
  };

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Top action grid with search, status filters, and risk levels */}
      <div className="flex flex-col xl:flex-row gap-4 items-center justify-between bg-white p-5 border border-slate-200 rounded-2xl shadow-xs">
        {/* Local Table search */}
        <div className="relative w-full xl:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            value={cmSearch}
            onChange={(e) => {
              setCmSearch(e.target.value);
              setCmPage(1);
            }}
            placeholder={t('searchCustomers')}
            className="w-full text-xs h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-[#00C48C] focus:bg-white"
          />
        </div>

        {/* Filters dropdowns selectors */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <span className="text-[11px] font-bold text-slate-500 uppercase">Status:</span>
            <select
              value={cmStatus}
              onChange={(e) => {
                setCmStatus(e.target.value);
                setCmPage(1);
              }}
              className="text-xs h-10 border border-slate-200 rounded-xl px-2.5 bg-slate-50 hover:bg-white transition-all focus:outline-none cursor-pointer"
            >
              {uniqueStatuses.map(s => (
                <option key={s} value={s}>{s === 'All' ? t('allStatus') : s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <span className="text-[11px] font-bold text-slate-500 uppercase">Risk Level:</span>
            <select
              value={cmRisk}
              onChange={(e) => {
                setCmRisk(e.target.value);
                setCmPage(1);
              }}
              className="text-xs h-10 border border-slate-200 rounded-xl px-2.5 bg-slate-50 hover:bg-white transition-all focus:outline-none cursor-pointer"
            >
              {uniqueRisks.map(r => (
                <option key={r} value={r}>{r === 'All' ? t('allRisk') : r}</option>
              ))}
            </select>
          </div>

          {/* Quick reset actions button */}
          <button
            onClick={() => {
              setCmSearch('');
              setCmStatus('All');
              setCmRisk('All');
              setCmPage(1);
            }}
            className="text-[10px] font-bold tracking-wider hover:bg-slate-200 text-slate-600 bg-slate-100 border border-slate-200 h-10 px-4 rounded-xl cursor-pointer"
          >
            RESET ALL
          </button>
        </div>
      </div>

      {/* Grid of customer lists on the registry */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse relative">
            <thead className="bg-slate-100/80 sticky top-0 border-b border-slate-200 select-none">
              <tr>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                  {t('customerId')}
                </th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                  {t('fullName')}
                </th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                  {t('accountNumber')}
                </th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                  {t('phone')}
                </th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                  {t('status')}
                </th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                  {t('riskLevel')}
                </th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                  Company / Organization
                </th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center font-sans">
                  {t('financialScore')}
                </th>
                <th className="p-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right font-sans">
                  {t('actions')}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-16 text-center text-slate-400 font-semibold italic text-xs">
                    No matching customer registries found. Try altering search filters.
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] font-bold text-slate-500 truncate whitespace-nowrap">
                      {cust.id}
                    </td>
                    
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg font-bold text-[10px] flex items-center justify-center ${cust.avatarColor}`}>
                          {cust.avatar}
                        </div>
                        <span className="font-bold text-slate-800 text-xs tracking-tight">{cust.name}</span>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono font-medium text-slate-600 truncate whitespace-nowrap">
                      {cust.accountNumber}
                    </td>

                    <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">
                      {cust.phone}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                        cust.status === 'Active' 
                          ? 'bg-emerald-50 text-accent border-emerald-100'
                          : cust.status === 'Suspended'
                            ? 'bg-rose-50 text-danger border-rose-100'
                            : 'bg-indigo-50 text-indigo-500 border-indigo-100'
                      }`}>
                        {cust.status === 'Active' 
                          ? t('statusActive') 
                          : cust.status === 'Suspended' 
                            ? t('statusSuspended') 
                            : t('statusInProgress')}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                        cust.riskLevel === 'HIGH' 
                          ? 'bg-rose-50 border-rose-100 text-danger' 
                          : cust.riskLevel === 'MEDIUM' 
                            ? 'bg-amber-50 border-amber-100 text-warning' 
                            : 'bg-emerald-50 border-emerald-100 text-accent'
                      }`}>
                        {cust.riskLevel === 'LOW' 
                          ? t('levelLow') 
                          : cust.riskLevel === 'MEDIUM' 
                            ? t('levelMedium') 
                            : t('levelHigh')}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-600 font-semibold truncate max-w-[150px]" title={cust.company}>
                      {cust.company}
                    </td>

                    <td className="p-3.5 text-center">
                      <div className="font-black text-slate-800 font-mono text-xs flex items-center justify-center gap-0.5">
                        <Sparkles size={11} className="text-purple-500" />
                        {cust.financialScore}
                      </div>
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleInspect(cust.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B3C5D]/5 hover:bg-[#0B3C5D]/10 text-primary rounded-lg text-[10px] font-extrabold uppercase transition-all tracking-wider cursor-pointer"
                      >
                        <Eye size={12} />
                        <span>Inspect Profile</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginated indicators footer */}
        {filteredCustomers.length > rowsPerPage && (
          <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-medium">
              Showing records {rangeStart} – {rangeEnd} of {filteredCustomers.length} total customers
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setCmPage(prev => Math.max(1, prev - 1))}
                disabled={cmPage === 1}
                className="px-3 h-8 text-[11px] font-bold border border-slate-200 rounded-lg text-slate-600 bg-white hover:bg-slate-50 cursor-pointer disabled:opacity-40"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1 px-3 text-xs font-bold text-slate-700">
                <span>{cmPage}</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-400 font-medium">{totalPages}</span>
              </div>

              <button
                onClick={() => setCmPage(prev => Math.min(totalPages, prev + 1))}
                disabled={cmPage === totalPages}
                className="px-3 h-8 text-[11px] font-bold border border-slate-200 rounded-lg text-slate-600 bg-white hover:bg-slate-50 cursor-pointer disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
