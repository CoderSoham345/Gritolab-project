import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart2, Target, Workflow, Dices, Layers, HelpCircle, 
  Settings, Key, User, FileText, Brain, LogOut, Sparkles, 
  Tv, Compass, Activity, Bell, Menu, X, ChevronRight, BarChart
} from 'lucide-react';
import { Campaign, UserSession } from './types';
import { mockCampaigns } from './mockData';

// Component Lazy Imports
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import CampaignsTable from './components/CampaignsTable';
import ChannelPerformance from './components/ChannelPerformance';
import CustomerJourney from './components/CustomerJourney';
import AttributionLab from './components/AttributionLab';
import BudgetOptimizer from './components/BudgetOptimizer';
import InsightsEngine from './components/InsightsEngine';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import KPIAnalytics from './components/KPIAnalytics';
import RoiAnalysis from './components/RoiAnalysis';
import ReportsCenter from './components/ReportsCenter';
import AdminPanel from './components/AdminPanel';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import AIAdvisor from './components/AIAdvisor';

type WorkspaceView = 
  | 'landing' 
  | 'auth' 
  | 'dashboard' 
  | 'campaigns' 
  | 'channels' 
  | 'journey' 
  | 'attribution' 
  | 'budget' 
  | 'predictive' 
  | 'kpi' 
  | 'roi' 
  | 'insights' 
  | 'reports' 
  | 'admin' 
  | 'profile' 
  | 'settings' 
  | 'advisor';

export default function App() {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [view, setView] = useState<WorkspaceView>('landing');
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Manage Campaign mutations (durable reactive states!)
  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'active' ? 'paused' : 'active';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleAddCampaign = (newCamp: Campaign) => {
    setCampaigns(prev => [newCamp, ...prev]);
  };

  const handleLogout = () => {
    setUserSession(null);
    setView('landing');
  };

  // Safe router parser
  const renderActiveScreen = () => {
    if (!userSession) return null;

    switch (view) {
      case 'dashboard':
        return <Dashboard campaigns={campaigns} user={userSession} onNavigate={(v) => setView(v as any)} />;
      case 'campaigns':
        return <CampaignsTable campaigns={campaigns} onToggleStatus={handleToggleCampaignStatus} onAddCampaign={handleAddCampaign} />;
      case 'channels':
        return <ChannelPerformance campaigns={campaigns} />;
      case 'journey':
        return <CustomerJourney />;
      case 'attribution':
        return <AttributionLab />;
      case 'budget':
        return <BudgetOptimizer />;
      case 'predictive':
        return <PredictiveAnalytics />;
      case 'kpi':
        return <KPIAnalytics campaigns={campaigns} />;
      case 'roi':
        return <RoiAnalysis />;
      case 'insights':
        return <InsightsEngine />;
      case 'reports':
        return <ReportsCenter campaigns={campaigns} />;
      case 'admin':
        return <AdminPanel user={userSession} />;
      case 'profile':
        return <ProfilePage user={userSession} />;
      case 'settings':
        return <SettingsPage />;
      case 'advisor':
        return <AIAdvisor campaigns={campaigns} />;
      default:
        return <Dashboard campaigns={campaigns} user={userSession} onNavigate={(v) => setView(v as any)} />;
    }
  };

  // Authenticated sidebar options list
  const sidebarNavItems = [
    { section: 'Core Analytics Hub', items: [
      { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart2 },
      { id: 'campaigns', label: 'Campaigns Monitor', icon: Target },
      { id: 'channels', label: 'Channel Audits', icon: Tv },
    ]},
    { section: 'Predictive & Attribution Models', items: [
      { id: 'journey', label: 'Sequence Journey Maps', icon: Workflow },
      { id: 'attribution', label: 'Attribution Lab model', icon: Dices },
      { id: 'budget', label: 'Budget Reallocation', icon: Layers },
      { id: 'predictive', label: 'Projections 90D', icon: Compass },
    ]},
    { section: 'Insights & Financial Metrics', items: [
      { id: 'kpi', label: 'KPI Diagnostics', icon: Activity },
      { id: 'roi', label: 'ROI Simulation', icon: BarChart },
      { id: 'insights', label: 'Insights Engine', icon: Sparkles },
      { id: 'reports', label: 'Reports Download', icon: FileText },
    ]},
    { section: 'AI Assistants', items: [
      { id: 'advisor', label: 'AI Advisor Chatbot', icon: Brain },
    ]},
    { section: 'User Console Controls', items: [
      { id: 'admin', label: 'Admin Access Control', icon: Key },
      { id: 'profile', label: 'User Profile details', icon: User },
      { id: 'settings', label: 'Workspace Settings', icon: Settings },
    ]}
  ];

  // Unauthenticated page flow checks
  if (!userSession) {
    if (view === 'auth') {
      return (
        <Auth 
          onLoginSuccess={(session) => {
            setUserSession(session);
            setView('dashboard');
          }}
          onGoToLanding={() => setView('landing')}
        />
      );
    }
    return (
      <LandingPage 
        onStartDemo={() => setView('auth')} 
        onGoToLogin={() => setView('auth')} 
      />
    );
  }

  // Authenticated workspace scaffold
  return (
    <div className="min-h-screen bg-[#071426] text-white flex select-none overflow-hidden relative">
      {/* Decorative ambiance background flares */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Left Navigation Sidebar - Desktop view */}
      <aside className="w-64 border-r border-slate-800/60 bg-slate-950/80 backdrop-blur-xl hidden lg:flex flex-col justify-between shrink-0 relative z-30">
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 pb-6">
          
          {/* Workspace Title Brand */}
          <div className="p-6 border-b border-slate-800/60 shrink-0">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#7C3AED]">Marketing Analytics Hub</span>
            <h1 className="text-xl font-black mt-1 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent flex items-center space-x-1.5 cursor-pointer" onClick={() => setView('dashboard')}>
              <Sparkles className="w-5 h-5 text-[#7C3AED] animate-pulse" />
              <span>MARKETO_AI</span>
            </h1>
          </div>

          {/* Navigation groups */}
          <div className="p-4 space-y-6">
            {sidebarNavItems.map((group) => (
              <div key={group.section} className="space-y-1.5">
                <span className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-500">{group.section}</span>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = view === item.id;
                    return (
                      <button
                        id={`sidebar-nav-${item.id}-btn`}
                        key={item.id}
                        onClick={() => setView(item.id as any)}
                        className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer ${
                          isActive 
                            ? 'bg-[#7C3AED]/15 border-l-2 border-[#7C3AED] text-white' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#7C3AED]' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#7C3AED]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* User identification base cell */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setView('profile')}>
            <div className="w-9 h-9 bg-gradient-to-tr from-[#7C3AED] to-[#2563EB] rounded-full flex items-center justify-center font-black text-xs text-white uppercase shadow-sm">
              {userSession.name.charAt(0)}
            </div>
            <div className="max-w-[7rem] truncate select-none">
              <p className="text-xs font-bold text-slate-200">{userSession.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{userSession.email}</p>
            </div>
          </div>
          <button 
            id="sidebar-logout-btn"
            onClick={handleLogout}
            className="p-1.5 hover:bg-red-500/15 rounded border border-transparent hover:border-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            title="SaaS Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </aside>

      {/* Main viewport Container area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen">
        
        {/* Upper Header strip */}
        <header className="h-16 shrink-0 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl flex items-center justify-between px-6 z-20">
          
          {/* Mobile toggle menu burger */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-slate-900 border border-slate-800 rounded-md text-slate-400 hover:text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop header text */}
          <div className="hidden lg:flex items-center space-x-2">
            <span className="text-[10px] uppercase font-bold text-[#7C3AED] border border-[#7C3AED]/25 bg-[#7C3AED]/10 px-2 py-0.5 rounded">Saas Sandbox Active</span>
            <span className="text-xs font-semibold text-slate-400">Database synchronization active and verified.</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">Workspace Workspace</span>
              <span className="text-xs font-bold text-slate-300">Default Sandbox</span>
            </div>
          </div>

        </header>

        {/* Content Viewer viewport scroll box */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-800 bg-[#071426]/40">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="max-w-7xl mx-auto h-full"
            >
              {renderActiveScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

      {/* Mobile Sliding drawer menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop cover blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Shift Side menu drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-slate-950 border-r border-slate-800/80 z-50 p-5 flex flex-col justify-between lg:hidden"
            >
              <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none pb-6">
                
                {/* Brand Header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-800/60 mb-5">
                  <h1 className="text-lg font-black bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                    <span>MARKETO_AI</span>
                  </h1>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-white pointer cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Options List */}
                <div className="space-y-6">
                  {sidebarNavItems.map((group) => (
                    <div key={group.section} className="space-y-1.5">
                      <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-500">{group.section}</span>
                      <div className="space-y-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = view === item.id;
                          return (
                            <button
                              id={`mobile-nav-${item.id}-btn`}
                              key={item.id}
                              onClick={() => { setView(item.id as any); setIsMobileMenuOpen(false); }}
                              className={`w-full flex items-center space-x-2.5 text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                                isActive ? 'bg-[#7C3AED]/15 text-white' : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              <Icon className="w-4 h-4 shrink-0" />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Logout button */}
              <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center shrink-0">
                <span className="text-xs font-bold text-slate-200">{userSession.name}</span>
                <button 
                  id="mobile-logout-btn"
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold uppercase rounded border border-red-500/25 cursor-pointer"
                >
                  Logout
                </button>
              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
