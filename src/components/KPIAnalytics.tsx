import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Percent, DollarSign, Target, MousePointer, Award } from 'lucide-react';
import { Campaign } from '../types';
import { historicalTrendData } from '../mockData';

interface KPIAnalyticsProps {
  campaigns: Campaign[];
}

export default function KPIAnalytics({ campaigns }: KPIAnalyticsProps) {
  // Let's create a beautiful breakdown distribution by channel for a premium visual Pie chart!
  const channelDistribution = [
    { name: 'Google Ads', value: 35.8, color: '#2563EB' },
    { name: 'Facebook Ads', value: 30.6, color: '#7C3AED' },
    { name: 'LinkedIn Ads', value: 22.6, color: '#10B981' },
    { name: 'Email Marketing', value: 6.0, color: '#F59E0B' },
    { name: 'Organic Search', value: 5.0, color: '#3B82F6' },
  ];

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">PERFORMANCE AUDIT METRICS</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-205 bg-clip-text text-transparent">
          KPI Analytics Center
        </h1>
        <p className="text-slate-400 text-xs mt-1">Audit high-fidelity trend charts. Evaluate Click-Through Rates, cost targets and client Lifetime conversions.</p>
      </div>

      {/* Grid of secondary KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Click card */}
        <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Aggregate Ctr average</span>
            <MousePointer className="w-4 h-4 text-purple-400" />
          </div>
          <h2 className="text-3xl font-black">4.8%</h2>
          <p className="text-[10px] text-slate-500 mt-1">Calculated across 2.17M cumulative display impressions.</p>
        </div>

        {/* CPC card */}
        <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Weighted Cost Per Click</span>
            <DollarSign className="w-4 h-4 text-[#2563EB]" />
          </div>
          <h2 className="text-3xl font-black">₹48.00</h2>
          <p className="text-[10px] text-emerald-450 mt-1">Decreased 1.4% from matching search queries.</p>
        </div>

        {/* CLV */}
        <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Customer Customer CLV</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black">₹14,500</h2>
          <p className="text-[10px] text-purple-400 mt-1">15.2x LTV/CAC ratio represents stable growth pipelines.</p>
        </div>

      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CTR timeline Area chart */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">Ctr & Conversion rate performance index</h3>
            <p className="text-xs text-slate-400 mb-4">Click and conversion trends over a reactive 30-day timeline</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalTrendData.slice(-30)}>
                <XAxis dataKey="date" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff', fontSize: '11px' }} />
                <Area type="monotone" dataKey="clicks" name="Weekly clicks" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Share Distribution Pie Chart */}
        <div className="bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold">Marketing Share Distribution</h3>
            <p className="text-xs text-slate-400 mb-6">Aggregate channel spend budget shares</p>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {channelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value}%`, 'Spend Cap Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend indicators */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-400 pt-3 border-t border-slate-800/60 mt-4">
            {channelDistribution.map((item) => (
              <div key={item.name} className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
