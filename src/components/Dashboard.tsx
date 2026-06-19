import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, TrendingDown, DollarSign, Award, Target, MousePointer, 
  Sparkles, Percent, AlertCircle, ArrowUpRight, HelpCircle, Activity,
  Layers, DownloadCloud, Brain
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Campaign, UserSession } from '../types';
import { enterpriseOverviewStats, historicalTrendData, automatedAdvisorInsights, recentPlatformActivities } from '../mockData';

interface DashboardProps {
  campaigns: Campaign[];
  user: UserSession;
  onNavigate: (page: string) => void;
}

export default function Dashboard({ campaigns, user, onNavigate }: DashboardProps) {
  // Scenario sliders state
  const [targetRoas, setTargetRoas] = useState(3.6);
  const [sliderSpend, setSliderSpend] = useState(5000000); // 50 Lakhs default
  
  // Dynamic forecast calculations based on scenarios
  const hypotheticalRevenue = Math.round(sliderSpend * targetRoas);
  const hypotheticalProfit = hypotheticalRevenue - sliderSpend;
  const growthChangePercent = Number(((hypotheticalRevenue - enterpriseOverviewStats.totalRevenue) / enterpriseOverviewStats.totalRevenue * 100).toFixed(1));

  // Format currency in Indian format
  const formatINR = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800/60 pb-5 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#7C3AED] flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full animate-bounce" />
            <span>EXECUTIVE COMMAND CENTER</span>
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white via-slate-200 to-indigo-100 bg-clip-text text-transparent">
            Welcome back, {user.name}
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">Real-time enterprise overview of campaign performance thresholds, dynamic conversion attribution and ROI.</p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <div className="text-right hidden md:block">
            <p className="text-[10px] uppercase font-bold text-slate-500">System Permission Tier</p>
            <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded font-semibold">{user.role}</span>
          </div>
          <button 
            id="advisor-nav-btn"
            onClick={() => onNavigate('advisor')}
            className="px-4 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:brightness-110 text-xs font-bold rounded-lg flex items-center space-x-2 shadow-lg hover:-translate-y-0.5 transition-transform cursor-pointer"
          >
            <Brain className="w-4 h-4 text-emerald-400" />
            <span>Consult AI Advisor</span>
          </button>
        </div>
      </div>

      {/* KPI Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total revenue */}
        <motion.div 
          className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl hover:border-indigo-500/30 transition-all shadow-lg"
          whileHover={{ y: -3 }}
        >
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue Generated</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-3xl font-black">{formatINR(enterpriseOverviewStats.totalRevenue)}</h2>
          <div className="flex items-center space-x-1.5 mt-3 text-xs text-emerald-400 font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+18.4% MoM Growth</span>
            <span className="text-[10px] text-slate-500 font-normal">• Verified</span>
          </div>
        </motion.div>

        {/* Total Spend */}
        <motion.div 
          className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl hover:border-indigo-500/30 transition-all shadow-lg"
          whileHover={{ y: -3 }}
        >
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Marketing Spend Outlay</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-3xl font-black">{formatINR(enterpriseOverviewStats.totalSpend)}</h2>
          <div className="flex items-center space-x-1.5 mt-3 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">• Active Budget Cap: ₹60L</span>
            <span className="text-[10px] text-slate-500 font-normal">83.3% utilized</span>
          </div>
        </motion.div>

        {/* ROAS */}
        <motion.div 
          className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl hover:border-indigo-500/30 transition-all shadow-lg"
          whileHover={{ y: -3 }}
        >
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Cumulative ROAS</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-3xl font-black">{enterpriseOverviewStats.roas}x</h2>
          <div className="flex items-center space-x-1.5 mt-3 text-xs text-emerald-400 font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>Target Exceeded (3.5x cap)</span>
          </div>
        </motion.div>

        {/* Customer Acquisition Cost */}
        <motion.div 
          className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl hover:border-indigo-500/30 transition-all shadow-lg"
          whileHover={{ y: -3 }}
        >
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Weighted CAC</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-3xl font-black">₹{enterpriseOverviewStats.cac}</h2>
          <div className="flex items-center space-x-1.5 mt-3 text-xs text-emerald-400 font-medium">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span>Decreased -8.3% MoM</span>
          </div>
        </motion.div>
      </div>

      {/* Primary Chart & AI Insights row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Trend Lines graph */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/40">
            <div>
              <h3 className="text-lg font-bold">Executive Revenue & Spend Trend</h3>
              <p className="text-xs text-slate-400">Cumulative weekly performance values over the past 90 days</p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 bg-[#7C3AED] rounded-sm" />
                <span className="text-slate-300">Revenue</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 bg-[#2563EB] rounded-sm" />
                <span className="text-slate-300">Spend</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalTrendData.slice(-30)} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.6} />
                <XAxis dataKey="date" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff', fontSize: '12px' }} 
                  formatter={(value: any) => [`₹${(Number(value)).toLocaleString('en-IN')}`, '']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="spend" stroke="#2563EB" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Advisor insights Widget */}
        <div className="bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center mb-1 text-white">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2 shrink-0 animate-pulse" />
              <span>Attribution Insights AI</span>
            </h3>
            <p className="text-xs text-slate-400 border-b border-slate-800 pb-3">Automated prioritizations configured on our campaigns:</p>

            <div className="space-y-3.5 mt-4">
              {automatedAdvisorInsights.slice(0, 3).map((insight) => (
                <div key={insight.id} className="p-3 bg-slate-950/70 border border-slate-850 rounded-lg hover:border-slate-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      insight.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      insight.priority === 'High' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}>
                      {insight.priority} • {insight.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{insight.impact}</span>
                  </div>
                  <h4 className="text-xs font-bold mt-2 text-white">{insight.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            id="view-all-insights-btn"
            onClick={() => onNavigate('insights')}
            className="w-full text-center py-2 bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-semibold text-slate-300 pointer mt-4 transition-colors"
          >
            Manage Insights Priority Queue
          </button>
        </div>

      </div>

      {/* Advanced scenario simulation and secondary stats row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scenario What-If Modeling */}
        <div className="bg-slate-900/50 border border-slate-805 p-5 rounded-xl hover:border-slate-800 transition-colors backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-emerald-400 shrink-0" />
              <h3 className="text-base font-bold">Scenario What-if Calculator</h3>
            </div>
            <p className="text-xs text-slate-400 border-b border-slate-800 pb-3 mb-4">Simulate return outcomes by adjusting expected budgets and client ROAS targets.</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Hypothetical Budget Outlay:</span>
                  <span className="text-indigo-400 font-mono font-bold">{formatINR(sliderSpend)}</span>
                </div>
                <input 
                  id="budget-scenario-slider"
                  type="range" 
                  min={1000000} 
                  max={20000000} 
                  step={500000} 
                  value={sliderSpend} 
                  onChange={(e) => setSliderSpend(Number(e.target.value))}
                  className="w-full accent-[#7C3AED] h-1 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Expected ROAS Target:</span>
                  <span className="text-purple-400 font-mono font-semibold">{targetRoas}x</span>
                </div>
                <input 
                  id="roas-scenario-slider"
                  type="range" 
                  min={1.5} 
                  max={10.0} 
                  step={0.1} 
                  value={targetRoas} 
                  onChange={(e) => setTargetRoas(Number(e.target.value))}
                  className="w-full accent-purple-500 h-1 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl mt-6">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Estimated Business Outcomes</p>
            <div className="grid grid-cols-2 gap-3 mt-2.5">
              <div>
                <span className="block text-[10px] text-slate-400">Expected Revenue</span>
                <span className="block text-sm font-bold text-emerald-400">{formatINR(hypotheticalRevenue)}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">Net Return Lift</span>
                <span className={`block text-sm font-bold ${growthChangePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {growthChangePercent >= 0 ? `+${growthChangePercent}%` : `${growthChangePercent}%`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary KPI Cards */}
        <div className="bg-slate-900/50 border border-slate-805 p-5 rounded-xl hover:border-slate-800 transition-colors backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold mb-1">Secondary Performance Indicators</h3>
            <p className="text-xs text-slate-400 border-b border-slate-800 pb-3 mb-4">Core digital analytics metrics</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950/50 border border-slate-850 rounded-lg">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">LTV / CAC ratio</span>
                <h4 className="text-xl font-bold mt-1 text-white">15.2x</h4>
                <p className="text-[10px] text-emerald-400 mt-1">Excellent (enterprise ideal is 3x)</p>
              </div>

              <div className="p-3 bg-slate-950/50 border border-slate-850 rounded-lg">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Net Profit</span>
                <h4 className="text-xl font-bold mt-1 text-white">₹1.3Cr</h4>
                <span className="text-[10px] text-indigo-400 mt-1 font-semibold">260% ROI</span>
              </div>

              <div className="p-3 bg-slate-950/50 border border-slate-850 rounded-lg">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Ctr average</span>
                <h4 className="text-xl font-bold mt-1 text-white">4.8%</h4>
                <p className="text-[10px] text-slate-400 mt-1">104K+ Clicks total</p>
              </div>

              <div className="p-3 bg-slate-950/50 border border-slate-850 rounded-lg">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Conversion Rate</span>
                <h4 className="text-xl font-bold mt-1 text-white">5.05%</h4>
                <span className="text-[10px] text-emerald-400 mt-1 font-semibold">5,263 Conversions</span>
              </div>
            </div>
          </div>

          <button 
            id="roi-navigate-btn"
            onClick={() => onNavigate('roi')}
            className="w-full text-center py-2.5 bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800/80 hover:border-slate-700/80 rounded-lg text-xs font-semibold mt-4 transition-colors text-indigo-300 cursor-pointer"
          >
            Open ROI Analytics Center
          </button>
        </div>

        {/* Recent Audit Activities log */}
        <div className="bg-slate-900/50 border border-slate-805 p-5 rounded-xl hover:border-slate-800 transition-colors backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Activity className="w-4 h-4 text-indigo-400" />
              <h3 className="text-base font-bold">Platform Activity Logs</h3>
            </div>
            <p className="text-xs text-slate-400 border-b border-slate-800 pb-3">Real-time workspace modifications</p>

            <div className="space-y-4 mt-4">
              {recentPlatformActivities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 text-xs border-b border-slate-850/60 pb-3 last:border-0 last:pb-0">
                  <div className="p-1 bg-[#2563EB]/10 rounded border border-[#2563EB]/20 mt-0.5 shrink-0 font-bold text-[10px] text-indigo-400 uppercase">
                    Hub
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">{activity.event}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            id="admin-navigate-btn"
            onClick={() => onNavigate('admin')}
            className="w-full text-center py-2 bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 hover:border-indigo-500/20 rounded-lg text-xs font-semibold text-slate-400 transition-colors mt-4 cursor-pointer"
          >
            Manage Admins Access Permissions
          </button>
        </div>

      </div>
    </div>
  );
}
