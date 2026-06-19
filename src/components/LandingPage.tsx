import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Layers, Compass, ArrowRight, ShieldCheck, Zap, BarChart3, Users } from 'lucide-react';

interface LandingPageProps {
  onStartDemo: () => void;
  onGoToLogin: () => void;
}

export default function LandingPage({ onStartDemo, onGoToLogin }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-[#071426] text-white overflow-hidden font-sans">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7C3AED]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2563EB]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Sparkles decorative */}
      <div className="absolute top-[20%] right-[15%] w-2 h-2 bg-emerald-400 rounded-full animate-ping pointer-events-none" />
      <div className="absolute bottom-[30%] left-[10%] w-3 h-3 bg-indigo-400 rounded-full animate-pulse pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/600 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-tr from-[#7C3AED] to-[#2563EB] rounded-lg shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            MARKETING ANALYTICS INTELLIGENCE
          </span>
          <span className="text-[10px] uppercase font-semibold text-emerald-400 border border-emerald-500/30 px-2 py-0.5 roundedbg-emerald-500/10">v2.4 LTS</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            id="nav-login-btn"
            onClick={onGoToLogin} 
            className="text-sm font-medium hover:text-white/80 transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button 
            id="nav-demo-btn"
            onClick={onStartDemo} 
            className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-sm font-medium rounded-lg hover:brightness-110 shadow-md shadow-indigo-900/30 transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            Launch Hub
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block text-xs uppercase font-semibold tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full mb-6">
            ENTERPRISE MARKETING ATTRIBUTION & PERFORMANCE ANALYTICS
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15]">
            Marketing Analytics <br />
            <span className="bg-gradient-to-r from-[#7C3AED] via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Intelligence Hub
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Analyze campaign performance, customer journeys, attribution models, and marketing ROI through a unified enterprise intelligence platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              id="hero-dashboard-btn"
              onClick={onStartDemo}
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#071426] font-semibold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center space-x-2 group shadow-xl cursor-pointer"
            >
              <span>View Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-demo-btn"
              onClick={onGoToLogin}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 border border-slate-700 font-semibold rounded-xl hover:bg-slate-700 hover:border-slate-650 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Try Demo Core</span>
            </button>
            <button
              id="hero-explore-btn"
              onClick={onStartDemo}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#7C3AED]/40 to-[#2563EB]/40 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-200 font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Explore Analytics Insights</span>
            </button>
          </div>
        </motion.div>

        {/* Animated Metrics Panels */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 bg-slate-900/40 border border-slate-800/80 p-6 md:p-8 rounded-2xl backdrop-blur-lg shadow-2xl max-w-6xl mx-auto text-left"
        >
          {/* Metric 1 */}
          <div className="p-4 border-r border-slate-800/60 last:border-0">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
              Total Revenue
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">₹18M</h3>
            <p className="text-[10px] text-emerald-400 mt-1 font-medium flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              +18.4% MoM
            </p>
          </div>

          {/* Metric 2 */}
          <div className="p-4 border-r border-slate-800/60 last:border-0">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">ROAS Target</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">3.6x</h3>
            <span className="text-[10px] text-indigo-400 mt-1 font-medium">Enterprise Average</span>
          </div>

          {/* Metric 3 */}
          <div className="p-4 border-r border-slate-800/60 last:border-0">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Click Through</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">4.8%</h3>
            <p className="text-[10px] text-[#2563EB] mt-1 font-medium">104k+ Total Clicks</p>
          </div>

          {/* Metric 4 */}
          <div className="p-4 border-r border-slate-800/60 last:border-0">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Weighted CAC</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">₹950</h3>
            <span className="text-[10px] text-emerald-400 mt-1 font-medium">Optimized -8.3%</span>
          </div>

          {/* Metric 5 */}
          <div className="p-4 last:border-0">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Customer CLV</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">₹14,500</h3>
            <span className="text-[10px] text-purple-400 mt-1 font-medium">LTV/CAC: 15.2x</span>
          </div>
        </motion.div>

        {/* Feature Highlights section */}
        <section className="mt-32 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-900/30 border border-slate-850 rounded-xl hover:border-slate-700 transition-all text-left">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg w-fit mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold mb-2">Multi-Touch Attribution</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dynamically compare First Touch, Last Touch, Linear, Time Decay, and Position-Based models to track actual conversion credit.
            </p>
          </div>

          <div className="p-6 bg-slate-900/30 border border-slate-850 rounded-xl hover:border-slate-700 transition-all text-left">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg w-fit mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold mb-2">Customer Journeys</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Visualize precise touchpoint sequences, track highest value paths, average time-to-conversion, and isolate friction dropoffs.
            </p>
          </div>

          <div className="p-6 bg-slate-900/30 border border-slate-850 rounded-xl hover:border-slate-700 transition-all text-left">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg w-fit mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold mb-2">Smart Budget Shifter</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Run Scenario what-if modeling. Re-allocate budgets to high-efficiency campaigns recommendations automatically.
            </p>
          </div>
        </section>

        {/* Brand Proof */}
        <div className="mt-28 opacity-45">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-6">TRUSTED BY MODERN GROWTH TEAMS AT INDUSTRIES LEADERS</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 font-mono text-sm tracking-wider font-bold text-slate-400">
            <span>HUBSPOT analytics</span>
            <span>AMPLITUDE enterprise</span>
            <span>ALPHAVALUE marketing</span>
            <span>GA4.ENTERPRISE</span>
            <span>ADOBE.MARKETING</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/40 relative z-10 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Marketing Analytics Intelligence Hub. All Rights Reserved. Enterprise Level 1 Security Certified.</p>
      </footer>
    </div>
  );
}
