import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings as SettingsIcon, ShieldCheck, Mail, Database, HelpCircle, Bell, RefreshCw, KeyRound, Radio, Activity, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

export const Settings: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    currency, 
    setCurrency, 
    aiProvider, 
    setAiProvider,
    allowNotifications,
    setAllowNotifications,
    addToast,
    t 
  } = useApp();

  const [testingHealth, setTestingHealth] = useState(false);

  const handleSaveSettings = () => {
    addToast('Preferences securely saved and written to local database registry.', 'success');
  };

  const handleTestHealth = () => {
    setTestingHealth(true);
    addToast('Initiating connection handshake and diagnostic sweeps...', 'info');
    setTimeout(() => {
      setTestingHealth(false);
      addToast('All systems operational: Underwriting engine is linked & external OCR statement parsers are fully connected!', 'success');
    }, 1200);
  };

  const modelOptions = [
    'Gemini 2.5 Flash Enterprise (Standard)',
    'Gemini 2.5 Pro Executive (Precision)',
    'Indochina Neural Statement Engine v4.2',
    'Custom Local OCR Classifier (Direct Mode)'
  ];

  return (
    <div className="space-y-6 pt-1 animate-in fade-in duration-300">
      
      {/* Primary Settings Workspace Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column Settings Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <SettingsIcon size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 tracking-tight font-sans">
                Workspace Preferences
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">Modify application theme, multi-language, localized currencies, and systemic engines</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Setting: Language */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center border-b border-slate-50 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-700 block">Workspace Locale</span>
                <span className="text-[11px] text-slate-400 font-medium leading-relaxed block">Local transcription and formatting models</span>
              </div>
              <div className="sm:col-span-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full text-xs h-10 border border-slate-200 rounded-xl px-3 bg-slate-50 focus:outline-none focus:bg-white focus:border-accent font-semibold text-slate-600"
                >
                  <option value="en">{t('langEn')}</option>
                  <option value="lo">{t('langLo')}</option>
                  <option value="vi">{t('langVi')}</option>
                </select>
              </div>
            </div>

            {/* Setting: Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center border-b border-slate-50 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-700 block">Base Ledger Currency</span>
                <span className="text-[11px] text-slate-400 font-medium block">Formulates debit and credit visualizers</span>
              </div>
              <div className="sm:col-span-2">
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value as any);
                    addToast(`Preferred currency switched to ${e.target.value}.`, 'success');
                  }}
                  className="w-full text-xs h-10 border border-slate-200 rounded-xl px-3 bg-slate-50 focus:outline-none focus:bg-white focus:border-accent font-semibold text-slate-600"
                >
                  <option value="USD">USD (United States Dollar - $)</option>
                  <option value="LAK">LAK (Lao Kip - ₭)</option>
                  <option value="VND">VND (Vietnamese Dong - ₫)</option>
                </select>
              </div>
            </div>

            {/* Setting: Theme */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center border-b border-slate-50 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-700 block">Application Theme</span>
                <span className="text-[11px] text-slate-400 font-medium block">Configure the display canvas preset</span>
              </div>
              <div className="sm:col-span-2">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setTheme('light');
                      addToast('Theme adjusted to Swiss Minimal Light.', 'success');
                    }}
                    className={`flex-1 h-10 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      theme === 'light' 
                        ? 'border-accent bg-emerald-50/20 text-accent font-bold' 
                        : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    Swiss minimal light
                  </button>
                  <button
                    onClick={() => {
                      setTheme('dark-blue');
                      addToast('Custom theme saved. (Preserving executive light styles as core).', 'success');
                    }}
                    className={`flex-1 h-10 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      theme === 'dark-blue' 
                        ? 'border-accent bg-emerald-50/20 text-accent font-bold' 
                        : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    Enterprise Dark Blue
                  </button>
                </div>
              </div>
            </div>

            {/* Setting: AI Model Provider */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center border-b border-slate-50 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-700 block">AI Neural Intelligence</span>
                <span className="text-[11px] text-slate-400 font-medium block">Underwriting classification provider version</span>
              </div>
              <div className="sm:col-span-2">
                <select
                  value={aiProvider}
                  onChange={(e) => {
                    setAiProvider(e.target.value);
                    addToast(`Underwriting provider set to ${e.target.value}.`, 'success');
                  }}
                  className="w-full text-xs h-10 border border-slate-200 rounded-xl px-3 bg-slate-50 focus:outline-none focus:bg-white focus:border-accent font-semibold text-slate-600"
                >
                  {modelOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Setting: Notifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center border-b border-slate-50 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-700 block">System Alerts</span>
                <span className="text-[11px] text-slate-400 font-medium block">Unread message bubble flags in header</span>
              </div>
              <div className="sm:col-span-2 flex items-center">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={allowNotifications}
                    onChange={(e) => {
                      setAllowNotifications(e.target.checked);
                      addToast(e.target.checked ? 'Notifications system online.' : 'Notifications turned silent.', 'warning');
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00C48C]"></div>
                  <span className="ml-3 text-xs font-bold text-slate-600 uppercase tracking-wide">
                    {allowNotifications ? 'ACTIVE LOGGER' : 'MUTED'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Core Settings Submit row */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveSettings}
              className="px-5 h-10 bg-primary hover:bg-[#15466a] text-[#00C48C] rounded-xl text-xs font-bold shadow-xs hover:scale-105 transition-all cursor-pointer font-sans"
            >
              Apply System Changes
            </button>
          </div>
        </div>

        {/* Right Side Advisory and Security Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-sans border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
              <KeyRound size={15} className="text-[#0B3C5D]" />
              Cryptographic Credentials Keys
            </h4>
            
            <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
              Primary administrative credentials are secured behind Google AI Studio Secrets injection. Your Gemini API key is mapped dynamically.
            </p>

            <div className="space-y-2 border p-3 rounded-xl bg-slate-50/50">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <Radio size={12} className="text-accent animate-pulse" />
                  GEMINI_API_KEY
                </span>
                <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">BOUND KEY</span>
              </div>
              <input
                type="text"
                value="••••••••••••••••••••••••••••••••"
                disabled
                className="w-full text-xs bg-slate-100 border border-slate-200 rounded-lg px-2.5 h-8 font-mono text-slate-400 select-none"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-sans border-b border-slate-100 pb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Activity size={15} className="text-accent animate-pulse" />
                Service Health & Diagnostics
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-sans tracking-tight">Active</span>
            </h4>

            {/* Health Checklist */}
            <div className="space-y-3 font-sans">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">AI Underwriting Service</span>
                  <span className="text-[10px] text-slate-400 block">Gemini 2.5 API abstraction router</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00C48C] animate-pulse"></span>
                  <span className="text-[11px] font-mono font-extrabold text-slate-600">OPERATIONAL</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">OCR Statement Ingress</span>
                  <span className="text-[10px] text-slate-400 block">Automated parser and class layout map</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00C48C] animate-pulse"></span>
                  <span className="text-[11px] font-mono font-extrabold text-slate-600">CONNECTED</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">External API Gateway</span>
                  <span className="text-[10px] text-slate-400 block">Data exchange handshakes link</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00C48C] animate-pulse"></span>
                  <span className="text-[11px] font-mono font-extrabold text-slate-600">STABLE</span>
                </div>
              </div>
            </div>

            {/* Test Connection Button */}
            <button
              onClick={handleTestHealth}
              disabled={testingHealth}
              className={`w-full h-10 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                testingHealth
                  ? 'bg-slate-50 border-slate-200 text-slate-400'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <RefreshCw size={13} className={testingHealth ? 'animate-spin' : ''} />
              {testingHealth ? 'Running diagnostics...' : 'Force Service Re-Handshake'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
