import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, Layers, RefreshCw, BarChart2, Award, 
  HelpCircle, Sparkles, CheckSquare, Plus, ArrowUpRight, DollarSign
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { enterpriseOverviewStats } from '../mockData';

export default function RoiAnalysis() {
  // Simulator States
  const [targetSpend, setTargetSpend] = useState<number>(5000000); // 50 Lakhs default
  const [expectedRoas, setExpectedRoas] = useState<number>(3.6); 

  const metrics = useMemo(() => {
    const projectedRevenue = Math.round(targetSpend * expectedRoas);
    const projectedProfit = projectedRevenue - targetSpend;
    const projectedRoi = Math.round((projectedProfit / targetSpend) * 100);

    const spendDifference = targetSpend - enterpriseOverviewStats.totalSpend;
    const revenueDifference = projectedRevenue - enterpriseOverviewStats.totalRevenue;
    
    return {
      projectedRevenue,
      projectedProfit,
      projectedRoi,
      spendDifference,
      revenueDifference
    };
  }, [targetSpend, expectedRoas]);

  // Comparison data for Recharts chart representation
  const comparisonChartData = [
    {
      name: 'Media Spend',
      current: enterpriseOverviewStats.totalSpend,
      simulated: targetSpend
    },
    {
      name: 'Gross Revenue',
      current: enterpriseOverviewStats.totalRevenue,
      simulated: metrics.projectedRevenue
    },
    {
      name: 'Net Profit',
      current: enterpriseOverviewStats.netProfit,
      simulated: metrics.projectedProfit
    }
  ];

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
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">FINANCIAL ROI SCENARIOS MODELER</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-205 bg-clip-text text-transparent">
          ROI Analysis Center
        </h1>
        <p className="text-slate-400 text-xs mt-1">Simulate growth scenarios. Tweak capital levels and track target net-profits, conversion outputs, and ROI rates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders Control Panel */}
        <div className="bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl backdrop-blur-md shadow-lg h-fit space-y-6">
          <div className="border-b border-slate-800 pb-3 mb-2">
            <h3 className="font-bold text-slate-200">Simulation Controls</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Drag indices to compute outcome margins</p>
          </div>

          {/* Spend Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-300">Simulate Media Spend:</span>
              <span className="text-indigo-400 font-mono font-bold">{formatINR(targetSpend)}</span>
            </div>
            <input 
              id="spend-simulator-slider"
              type="range" 
              min={1000000} 
              max={25000000} 
              step={500000} 
              value={targetSpend} 
              onChange={(e) => setTargetSpend(Number(e.target.value))}
              className="w-full accent-[#7C3AED] h-1.5 bg-slate-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1">
              <span>₹10L</span>
              <span>Baseline: ₹50L</span>
              <span>₹2.5Cr</span>
            </div>
          </div>

          {/* ROAS Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-300">Simulate Target ROAS:</span>
              <span className="text-purple-400 font-mono font-semibold">{expectedRoas}x</span>
            </div>
            <input 
              id="roas-simulator-slider"
              type="range" 
              min={1.0} 
              max={8.0} 
              step={0.1} 
              value={expectedRoas} 
              onChange={(e) => setExpectedRoas(Number(e.target.value))}
              className="w-full accent-purple-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1">
              <span>1.0x</span>
              <span>Baseline: 3.6x</span>
              <span>8.0x</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Spend Variation:</span>
              <span className={`font-mono font-bold ${metrics.spendDifference >= 0 ? 'text-indigo-400' : 'text-emerald-400'}`}>
                {metrics.spendDifference >= 0 ? `+${formatINR(metrics.spendDifference)}` : formatINR(metrics.spendDifference)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Revenue Lift:</span>
              <span className={`font-mono font-bold ${metrics.revenueDifference >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {metrics.revenueDifference >= 0 ? `+${formatINR(metrics.revenueDifference)}` : formatINR(metrics.revenueDifference)}
              </span>
            </div>
          </div>

        </div>

        {/* Chart Comparison Panel */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl backdrop-blur-md shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold">Scenario Outcome Comp</h3>
            <p className="text-xs text-slate-400 mb-6">Compare Baseline metrics against simulated targets side-by-side</p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.6} />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff', fontSize: '11px' }}
                    formatter={(value: any) => [`₹${(Number(value)).toLocaleString('en-IN')}`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="current" fill="#475569" name="Baseline (Current)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="simulated" fill="#7C3AED" name="Simulated Scenario" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-800/60 pt-4 mt-6">
            <div className="p-3 bg-slate-950/60 rounded-lg text-center">
              <span className="block text-[9px] uppercase text-slate-500 font-bold mb-1">Projected Revenue</span>
              <strong className="text-sm font-black text-emerald-400">{formatINR(metrics.projectedRevenue)}</strong>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-lg text-center">
              <span className="block text-[9px] uppercase text-slate-500 font-bold mb-1">Projected Profit</span>
              <strong className="text-sm font-black text-white">{formatINR(metrics.projectedProfit)}</strong>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-lg text-center">
              <span className="block text-[9px] uppercase text-slate-500 font-bold mb-1">Simulated ROI%</span>
              <strong className="text-sm font-black text-indigo-400">{metrics.projectedRoi}%</strong>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
