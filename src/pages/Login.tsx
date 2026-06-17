import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Sun, Moon, ArrowRight, RefreshCw } from 'lucide-react';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const Login: React.FC = () => {
  const { theme, setTheme, setIsLoggedIn, addToast, t } = useApp();
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Floating focus state flags for extra layout polish
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    
    // Email validate
    if (!email.trim()) {
      setEmailError('Email or username is required');
      isValid = false;
    } else if (email.includes('@') && !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validate
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    addToast('Securing gateway connection and validating keys...', 'info');

    // Simulate enterprise security validation handshake
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      addToast('Direct handshake established! Redirecting to secure BNK Finance ecosystem...', 'success');
    }, 1500);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    addToast('A secure password-reset protocol has been initiated. Check your registered device for push MFA verification.', 'success');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark-blue' : 'light');
    addToast(`Switched interface mapping to ${theme === 'light' ? 'Premium Dark Spruce' : 'Swiss Minimal Light'}.`, 'success');
  };

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between p-6 lg:p-8 transition-colors duration-500 overflow-y-auto ${
      theme === 'light' 
        ? 'bg-slate-50 text-slate-800' 
        : 'bg-[#121c16] text-[#e6decb]'
    }`}>
      {/* Top Header Utilities */}
      <header className="flex items-center justify-between w-full max-w-7xl mx-auto mb-8">
        {/* Brand Signpost */}
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter border shadow-sm transition-all duration-300 ${
            theme === 'light'
              ? 'bg-[#3E7C59]/10 border-[#3E7C59]/20 text-[#3E7C59]'
              : 'bg-[#00C48C] border-none text-white'
          }`}>
            B
          </div>
          <div>
            <h1 className="font-sans font-black text-sm tracking-tight leading-none">BNK INSURANCE</h1>
            <span className={`text-[8px] font-mono font-bold tracking-widest ${
              theme === 'light' ? 'text-slate-400' : 'text-[#00C48C]'
            }`}>UNDERWRITING LABS</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all duration-350 cursor-pointer ${
              theme === 'light'
                ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
            }`}
            title="Toggle Application Theme Mode"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </header>

      {/* Center Layout Anchor */}
      <main className="flex-1 flex items-center justify-center py-6 w-full max-w-md mx-auto">
        <div className={`w-full rounded-3xl border shadow-2xl p-8 lg:p-10 transition-all duration-500 transform ${
          theme === 'light'
            ? 'bg-white border-slate-100 shadow-slate-200/50'
            : 'bg-[#1b2b21] border-white/5 shadow-black/40'
        }`}>
          {/* Form Header */}
          <div className="text-center space-y-2.5 mb-8">
            <div className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-colors duration-300 ${
              theme === 'light'
                ? 'bg-emerald-50 border-emerald-100 text-[#3E7C59]'
                : 'bg-emerald-950/20 border-emerald-500/20 text-[#00C48C]'
            }`}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Access Executive Suite</h2>
              <p className={`text-xs ${
                theme === 'light' ? 'text-slate-500' : 'text-white/50'
              }`}>
                Please authenticate using your compliance credentials
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username/Email Input Container */}
            <div className="space-y-1.5 relative">
              <label 
                htmlFor="email"
                className={`text-[11px] font-extrabold uppercase tracking-widest block transition-colors duration-200 ${
                  emailFocused 
                    ? theme === 'light' ? 'text-[#3E7C59]' : 'text-[#00C48C]'
                    : theme === 'light' ? 'text-slate-500' : 'text-white/40'
                }`}
              >
                Compliance Email Address
              </label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  emailFocused
                    ? theme === 'light' ? 'text-[#3E7C59]' : 'text-[#00C48C]'
                    : theme === 'light' ? 'text-slate-400' : 'text-white/30'
                }`}>
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="text"
                  placeholder="e.g. compliance.officer@bnkinsurance.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateForm();
                  }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  autoComplete="email"
                  className={`w-full h-11.5 pl-10.5 pr-4 text-xs font-medium rounded-2xl border bg-transparent transition-all outline-none ${
                    theme === 'light'
                      ? 'border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#3E7C59] focus:ring-4 focus:ring-[#3E7C59]/5'
                      : 'border-white/10 text-white placeholder-white/25 focus:border-[#00C48C] focus:ring-4 focus:ring-[#00C48C]/5'
                  } ${emailError ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/5' : ''}`}
                />
              </div>
              {emailError && (
                <p className="text-[10px] text-rose-500 font-semibold tracking-wide animate-in fade-in duration-200">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Input Container */}
            <div className="space-y-1.5 relative">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password"
                  className={`text-[11px] font-extrabold uppercase tracking-widest block transition-colors duration-200 ${
                    passwordFocused 
                      ? theme === 'light' ? 'text-[#3E7C59]' : 'text-[#00C48C]'
                      : theme === 'light' ? 'text-slate-500' : 'text-white/40'
                  }`}
                >
                  Gateway Security Passkey
                </label>
              </div>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  passwordFocused
                    ? theme === 'light' ? 'text-[#3E7C59]' : 'text-[#00C48C]'
                    : theme === 'light' ? 'text-slate-400' : 'text-white/30'
                }`}>
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) validateForm();
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className={`w-full h-11.5 pl-10.5 pr-11 text-xs font-medium rounded-2xl border bg-transparent transition-all outline-none ${
                    theme === 'light'
                      ? 'border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#3E7C59] focus:ring-4 focus:ring-[#3E7C59]/5'
                      : 'border-white/10 text-white placeholder-white/25 focus:border-[#00C48C] focus:ring-4 focus:ring-[#00C48C]/5'
                  } ${passwordError ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/5' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer p-0.5 rounded-md hover:bg-white/5 transition-colors ${
                    theme === 'light' ? 'text-slate-400 hover:text-slate-600' : 'text-white/40 hover:text-white/70'
                  }`}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-[10px] text-rose-500 font-semibold tracking-wide animate-in fade-in duration-200">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Checkbox and Forgot Password Link */}
            <div className="flex items-center justify-between text-xs py-1 select-none">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`rounded-md w-4 h-4 transition-all focus:ring-0 ${
                    theme === 'light'
                      ? 'border-slate-300 text-[#3E7C59]'
                      : 'border-white/10 bg-[#121c16] text-[#00C48C]'
                  }`}
                />
                <span className={theme === 'light' ? 'text-slate-600' : 'text-white/60'}>
                  Remember session
                </span>
              </label>

              <a
                href="#"
                onClick={handleForgotPassword}
                className={`font-semibold hover:underline outline-none transition-colors ${
                  theme === 'light' ? 'text-[#3E7C59]' : 'text-[#00C48C]'
                }`}
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 ${
                theme === 'light'
                  ? 'bg-[#3E7C59] text-white hover:bg-[#34674a]'
                  : 'bg-[#00C48C] text-slate-950 hover:bg-[#00b07e] font-extrabold'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  Verifying Credentials & Handshaking...
                </>
              ) : (
                <>
                  Authenticate Securely
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Compliance notice */}
          <div className="mt-6 pt-5 border-t border-dashed border-slate-200/40 text-center">
            <span className={`text-[9px] font-mono font-bold uppercase tracking-widest block ${
              theme === 'light' ? 'text-slate-400' : 'text-white/30'
            }`}>
              SECURE CRYPTOGRAPHIC ENDPOINT
            </span>
          </div>
        </div>
      </main>

      {/* Footer System Details */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono font-bold text-slate-500/40 gap-4 mt-8">
        <p>SECURE LEDGER INTEGRITY PROTOCOL — 256-BIT HIGH INTENSITY TLS</p>
        <p>© {new Date().getFullYear()} BNK INSURANCE GLOBAL CORE. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};
