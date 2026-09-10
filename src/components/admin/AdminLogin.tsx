import React, { useState } from 'react';
import { IPCLogo } from '../IPCLogo';
import { MotionBackground } from '../MotionBackground';
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (token: string, user: { username: string; name: string; role: string }) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // Mock login since there is no backend server
      await new Promise(resolve => setTimeout(resolve, 800));

      if (username && password) {
        const mockUser = { username: username, name: 'System Admin', role: 'Super Admin' };
        const mockToken = 'mock-jwt-token-123';
        
        localStorage.setItem('ipc_admin_token', mockToken);
        localStorage.setItem('ipc_admin_user', JSON.stringify(mockUser));

        onLoginSuccess(mockToken, mockUser);
      } else {
        throw new Error('Please enter a username and password.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to connect to station server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111E] text-stone-100 flex flex-col justify-between relative overflow-hidden font-sans">
      <MotionBackground />
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#9B1B1E]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D49B44]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Back Button */}
      <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Website</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#D49B44] tracking-widest uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Restricted Portal</span>
        </div>
      </div>

      {/* Center Auth Card */}
      <div className="relative z-10 max-w-md w-full mx-auto px-4 py-8">
        <div className="bg-[#0D1E33]/90 backdrop-blur-xl border border-[#1E3A5F] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
          
          {/* Brand Logo & Station Header */}
          <div className="text-center flex flex-col items-center mb-6">
            <div className="mb-3 transform hover:scale-105 transition-transform">
              <IPCLogo variant="light" size="lg" badgeOnly={true} className="drop-shadow-2xl" />
            </div>
            
            <h1 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              Station Command
            </h1>
            <p className="text-xs text-[#D49B44] font-semibold uppercase tracking-[0.2em] mt-1">
              Indian Paratha Company • Authorized Staff Only
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#DE2428]/20 border border-[#DE2428]/50 text-[#FFA0A3] text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#DE2428]" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Staff Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="admin-username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter staff username"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#112338] border border-[#1E3A5F] focus:border-[#D49B44] focus:ring-1 focus:ring-[#D49B44] rounded-xl text-white placeholder-stone-500 text-sm font-sans transition-colors outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Station Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-10 pr-11 py-3 bg-[#112338] border border-[#1E3A5F] focus:border-[#D49B44] focus:ring-1 focus:ring-[#D49B44] rounded-xl text-white placeholder-stone-500 text-sm font-sans transition-colors outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="admin-login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#9B1B1E] to-[#BA2024] hover:from-[#801416] hover:to-[#9B1B1E] text-white font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-[#DE2428]/40"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating Station...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Access Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Security Assurance */}
          <div className="mt-6 pt-5 border-t border-[#1E3A5F]/60 flex items-center justify-center gap-2 text-[11px] text-stone-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Encrypted highway station management channel</span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 p-4 text-center text-xs text-stone-500 font-sans">
        Indian Paratha Company &copy; {new Date().getFullYear()} • Station NH7 Bangalore Hub
      </div>
    </div>
  );
};
