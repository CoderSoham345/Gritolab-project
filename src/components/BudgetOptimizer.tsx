import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, ArrowRight, TrendingUp, Sparkles, Sliders, CheckSquare,
  AlertCircle, DollarSign, Award, RefreshCw
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { budgetAllocationData, budgetOptimizationSummary } from '../mockData';

export default function BudgetOptimizer() {
  const formatINR = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">SMART RE-ALLOCATION UTILITY</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-205 bg-clip-text text-transparent">
          Budget Optimization Engine
        </h1>
        <p className="text-slate-400 text-xs mt-1">Simulate AI recommended budget models. Re-weight capital toward high converting channels to accelerate ROAS.</p>
      </div>

      {/* Overview stats panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Score indicator */}
        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl shadow-md text-center">
          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Optimization Score</span>
          <h2 className="text-3xl font-black text-indigo-400">{budgetOptimizationSummary.optimizationScore}<span className="text-xs text-slate-500">/100</span></h2>
          <span className="text-[10px] text-emerald-450 mt-1 block">✓ High Efficiency</span>
        </div>

        {/* Expected Revenue Increase */}
        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl shadow-md text-center">
          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Expected Revenue Lift</span>
          <h2 className="text-2xl font-extrabold text-emerald-400">+{formatINR(budgetOptimizationSummary.expectedRevenueIncrease)}</h2>
          <span className="text-[10px] text-slate-400 mt-1 block">Monthly projected growth</span>
        </div>

        {/* ROAS Lift */}
        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl shadow-md text-center">
          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Expected ROAS Increase</span>
          <h2 className="text-2xl font-extrabold text-white">+{budgetOptimizationSummary.expectedRoasIncrease}x</h2>
          <span className="text-[10px] text-slate-400 mt-1 block">Boost global yield to 4.02x</span>
        </div>

        {/* Core Shift */}
        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl shadow-md text-center">
          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Total Shift Budget</span>
          <h2 className="text-2xl font-extrabold text-[#2563EB]">₹4,30,000</h2>
          <span className="text-[10px] text-indigo-300 mt-1 block">Re-routed from Meta platforms</span>
        </div>

      </div>

      {/* Dual Bar Chart Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold mb-4">Current allocation vs Recommended weights (INR)</h3>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetAllocationData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.6} />
                <XAxis dataKey="channel" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff', fontSize: '11px' }}
                  formatter={(value: any) => [`₹${(Number(value)).toLocaleString('en-IN')}`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="current" fill="#475569" name="Current Budget" radius={[4, 4, 0, 0]} />
                <Bar dataKey="recommended" fill="#7C3AED" name="Recommended Model" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Suggested shift instructions cards */}
        <div className="bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl shadow-xl flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-800/60 pb-3 mb-4">
              <Sparkles className="w-4.5 h-4.5 text-purple-400 shrink-0" />
              <h3 className="text-base font-bold">Suggested Allocation Shifts</h3>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-200 rounded-lg text-xs">
                <span className="font-bold">De-prioritize FB Broad:</span> Decreasing Facebook Ads allocation by <strong>₹4.3L</strong> is advised due to deteriorating CTR conversions and climbing CAC.
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 rounded-lg text-xs">
                <span className="font-bold">Increase Intent Search & Email:</span> Funnel ₹1.75L into Email newsletter sequences (191x ROAS) and ₹2.55L into Google Search channels.
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-850 p-4.5 rounded-xl text-xs mt-4">
            <span className="block font-bold text-white mb-1">Expected ROI increase:</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Applying this model immediately boosts expected revenue targets by ₹2.15M while holding cost thresholds completely flat.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
