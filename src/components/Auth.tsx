import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, LogIn, Key, Mail, UserPlus, Info, CheckCircle2, User, HelpCircle, ArrowLeft } from 'lucide-react';
import { UserSession } from '../types';

interface AuthProps {
  onLoginSuccess: (session: UserSession) => void;
  onGoToLanding: () => void;
}

type AuthTab = 'login' | 'signup' | 'forgot' | 'reset';

export default function Auth({ onLoginSuccess, onGoToLanding }: AuthProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Analyst' | 'Marketing Manager'>('Admin');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password reset state
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleDemoSignIn = (role: 'Admin' | 'Analyst' | 'Marketing Manager') => {
    setErrorMessage('');
    setSuccessMessage('');
    let demoEmail = '';
    
    if (role === 'Admin') {
      demoEmail = 'admin@analytics.com';
    } else if (role === 'Analyst') {
      demoEmail = 'analyst@analytics.com';
    } else {
      demoEmail = 'manager@analytics.com';
    }

    onLoginSuccess({
      id: `usr_${role.toLowerCase()}`,
      email: demoEmail,
      name: `${role} Professional`,
      role,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${role}`
    });
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password fields.');
      return;
    }

    // Standard checking
    const formattedEmail = email.trim().toLowerCase();
    
    if (formattedEmail === 'admin@analytics.com' && password === 'Admin@123') {
      onLoginSuccess({
        id: 'usr_admin',
        email: 'admin@analytics.com',
        name: 'Enterprise Admin',
        role: 'Admin',
        avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Admin'
      });
    } else if (formattedEmail === 'analyst@analytics.com' && password === 'Analyst@123') {
      onLoginSuccess({
        id: 'usr_analyst',
        email: 'analyst@analytics.com',
        name: 'Lead Marketing Analyst',
        role: 'Analyst',
        avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Analyst'
      });
    } else if (formattedEmail === 'manager@analytics.com' && password === 'Manager@123') {
      onLoginSuccess({
        id: 'usr_manager',
        email: 'manager@analytics.com',
        name: 'SaaS Marketing Manager',
        role: 'Marketing Manager',
        avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Manager'
      });
    } else {
      // Allow general simulation accounts with correct verification
      if (formattedEmail.includes('@') && password.length >= 6) {
        onLoginSuccess({
          id: 'usr_custom',
          email: formattedEmail,
          name: name || formattedEmail.split('@')[0],
          role: selectedRole,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${formattedEmail}`
        });
      } else {
        setErrorMessage('Invalid credentials. Check demo accounts: admin@analytics.com / Admin@123');
      }
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password || !name) {
      setErrorMessage('Name, email, and password are required.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setSuccessMessage('Account created successfully! Auto-logging you in...');
    setTimeout(() => {
      onLoginSuccess({
        id: 'usr_custom_' + Date.now(),
        email: email.trim().toLowerCase(),
        name: name.trim(),
        role: selectedRole,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`
      });
    }, 1200);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!resetEmail) {
      setErrorMessage('Please type your registered email address.');
      return;
    }

    setSuccessMessage('Password reset instructions and verification code sent to ' + resetEmail);
    // Transition to reset password after 2 seconds
    setTimeout(() => {
      setActiveTab('reset');
      setSuccessMessage('');
    }, 2500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!resetToken || !newPassword) {
      setErrorMessage('Both verification token and new password are required.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    setSuccessMessage('Your password has been successfully reset! Redirecting to login page...');
    setTimeout(() => {
      setActiveTab('login');
      setPassword('');
      setSuccessMessage('');
    }, 2500);
  };

  return (
    <div className="relative min-h-screen bg-[#071426] text-white flex flex-col justify-center items-center px-4 font-sans py-12">
      {/* Background radial effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#7C3AED]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#2563EB]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md z-10">
        {/* Hub Title Logo */}
        <div className="flex flex-col items-center mb-8 cursor-pointer" onClick={onGoToLanding}>
          <div className="flex items-center space-x-2 text-indigo-400 font-bold tracking-widest text-xs uppercase mb-2">
            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping" />
            <span>ENTERPRISE HUB PORTAL</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-100 bg-clip-text text-transparent text-center">
            Attribution & Intelligence
          </h2>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/60 border border-slate-800/85 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative">
          
          {/* Status Message Panel */}
          {errorMessage && (
            <div className="flex items-start space-x-2.5 bg-red-950/40 border border-red-500/30 text-red-200 p-3 rounded-lg mb-4 text-xs">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start space-x-2.5 bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 p-3 rounded-lg mb-4 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* LOGIN CASE */}
            {activeTab === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-bold">Sign In to Dashboard</h3>
                  <p className="text-xs text-slate-400 mt-1">Provide your credentials or launch pre-configured demo roles</p>
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        id="login-email-input"
                        type="email"
                        placeholder="e.g., admin@analytics.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C3AED] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
                      <button
                        id="to-forgot-btn"
                        type="button"
                        onClick={() => setActiveTab('forgot')}
                        className="text-xs text-indigo-400 hover:underline hover:text-indigo-300"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Key className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        id="login-password-input"
                        type="password"
                        placeholder="Enter premium account password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C3AED] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    id="submit-login-btn"
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:brightness-110 font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 text-sm shadow-md shadow-indigo-950/40"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Access Executive Platform</span>
                  </button>
                </form>

                {/* Third Party Login Buttons */}
                <div className="mt-6">
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-800"></div>
                    <span className="flex-shrink mx-4 text-xs text-slate-500 font-semibold uppercase tracking-wider">Or OAuth Login</span>
                    <div className="flex-grow border-t border-slate-800"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <button
                      id="oauth-google-btn"
                      onClick={() => handleDemoSignIn('Admin')}
                      className="flex items-center justify-center space-x-2 py-2.5 bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors text-xs cursor-pointer hover:border-slate-700"
                    >
                      <span className="text-red-400 font-bold">G</span>
                      <span className="text-slate-300">Google Workspace</span>
                    </button>
                    <button
                      id="oauth-github-btn"
                      onClick={() => handleDemoSignIn('Analyst')}
                      className="flex items-center justify-center space-x-2 py-2.5 bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors text-xs cursor-pointer hover:border-slate-700"
                    >
                      <span className="text-indigo-400 font-bold">Git</span>
                      <span className="text-slate-300">GitHub Enterprise</span>
                    </button>
                  </div>
                </div>

                {/* Quick Demo Login Accounts */}
                <div className="mt-8 bg-slate-950/70 border border-indigo-950/50 p-4 rounded-xl">
                  <div className="flex items-center space-x-1.5 text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-3">
                    <Info className="w-3.5 h-3.5" />
                    <span>SaaS Client Mock Logins</span>
                  </div>
                  <div className="space-y-2">
                    <button
                      id="quick-demo-admin-btn"
                      onClick={() => {
                        setEmail('admin@analytics.com');
                        setPassword('Admin@123');
                      }}
                      className="w-full flex items-center justify-between p-2 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 rounded-lg text-left transition-all text-xs group"
                    >
                      <div>
                        <span className="font-semibold text-white group-hover:text-amber-400 transition-colors">1. Executive Admin</span>
                        <span className="block text-[10px] text-slate-400">admin@analytics.com • Admin@123</span>
                      </div>
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold uppercase shrink-0">Admin</span>
                    </button>

                    <button
                      id="quick-demo-analyst-btn"
                      onClick={() => {
                        setEmail('analyst@analytics.com');
                        setPassword('Analyst@123');
                      }}
                      className="w-full flex items-center justify-between p-2 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 rounded-lg text-left transition-all text-xs group"
                    >
                      <div>
                        <span className="font-semibold text-white group-hover:text-purple-400 transition-colors">2. Senior Analyst</span>
                        <span className="block text-[10px] text-slate-400">analyst@analytics.com • Analyst@123</span>
                      </div>
                      <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 font-bold uppercase shrink-0">Analyst</span>
                    </button>

                    <button
                      id="quick-demo-manager-btn"
                      onClick={() => {
                        setEmail('manager@analytics.com');
                        setPassword('Manager@123');
                      }}
                      className="w-full flex items-center justify-between p-2 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 rounded-lg text-left transition-all text-xs group"
                    >
                      <div>
                        <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">3. Marketing Manager</span>
                        <span className="block text-[10px] text-slate-400">manager@analytics.com • Manager@123</span>
                      </div>
                      <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-bold uppercase shrink-0">Manager</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 text-center text-xs text-slate-400">
                  <span>Don't have an enterprise account? </span>
                  <button id="to-signup-btn" type="button" onClick={() => { setActiveTab('signup'); setErrorMessage(''); }} className="text-indigo-400 font-semibold hover:underline">
                    Create free account
                  </button>
                </div>
              </motion.div>
            )}

            {/* SIGNUP TAB */}
            {activeTab === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-bold">Register Enterprise Account</h3>
                  <p className="text-xs text-slate-400 mt-1">Start tracking real multi-touch campaign performance</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        id="signup-name-input"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C3AED] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Business Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        id="signup-email-input"
                        type="email"
                        placeholder="e.g., mail@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C3AED] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Secure Password</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        id="signup-password-input"
                        type="password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C3AED] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Default Access Role</label>
                    <select
                      id="signup-role-select"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C3AED] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-slate-300 transition-all cursor-pointer"
                    >
                      <option value="Admin">Administrator (Full Access)</option>
                      <option value="Analyst">Analyst (Schema & Modeling Expert)</option>
                      <option value="Marketing Manager">Marketing Manager (Allocations & Campaigns)</option>
                    </select>
                  </div>

                  <button
                    id="submit-signup-btn"
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:brightness-110 font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 text-sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Create Free Account</span>
                  </button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-400">
                  <span>Already registered? </span>
                  <button id="signup-to-login-btn" type="button" onClick={() => { setActiveTab('login'); setErrorMessage(''); }} className="text-indigo-400 font-semibold hover:underline">
                    Back to login
                  </button>
                </div>
              </motion.div>
            )}

            {/* FORGOT PASSWORD TAB */}
            {activeTab === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-bold flex items-center justify-center space-x-2">
                    <HelpCircle className="w-5 h-5 text-[#7C3AED]" />
                    <span>Recover Credentials</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Provide your registered email address. We will transmit an edit token code.</p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Registered Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        id="forgot-email-input"
                        type="email"
                        placeholder="e.g. yourname@analytics.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C3AED] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    id="submit-forgot-btn"
                    type="submit"
                    className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] font-bold rounded-xl transition-all cursor-pointer text-sm"
                  >
                    Transmit Reset Token Code
                  </button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center space-x-1">
                  <ArrowLeft className="w-3 h-3 text-slate-500" />
                  <button id="forgot-to-login-btn" type="button" onClick={() => { setActiveTab('login'); setErrorMessage(''); }} className="text-slate-400 hover:text-white font-medium">
                    Cancel and return to Sign In
                  </button>
                </div>
              </motion.div>
            )}

            {/* RESET PASSWORD TAB */}
            {activeTab === 'reset' && (
              <motion.div
                key="reset"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-bold">Configure New Password</h3>
                  <p className="text-xs text-slate-400 mt-1">Provide the received recovery token code and specify your new business password.</p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Recovery Token Code</label>
                    <input
                      id="reset-token-input"
                      type="text"
                      placeholder="e.g., ANALYTICS_SEC_5230"
                      value={resetToken}
                      onChange={(e) => setResetToken(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C3AED] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">New Secure Password</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        id="reset-newpassword-input"
                        type="password"
                        placeholder="Min 6 characters required"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C3AED] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    id="submit-reset-btn"
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 font-bold rounded-xl transition-all cursor-pointer text-sm"
                  >
                    Commit New Security Password
                  </button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-400">
                  <button id="reset-to-login-btn" type="button" onClick={() => { setActiveTab('login'); setErrorMessage(''); }} className="text-indigo-400 font-semibold hover:underline">
                    Back to login
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
