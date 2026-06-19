import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dices, Settings, Award, Layers, TrendingUp, HelpCircle, 
  ArrowRight, Info, CheckCircle2, ChevronRight, BarChart
} from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { attributionModels } from '../mockData';

export default function AttributionLab() {
  const [activeModelName, setActiveModelName] = useState<string>('First Touch');

  const selectedModel = attributionModels.find(m => m.name === activeModelName) || attributionModels[0];

  // Map dataset for recharts comparison
  const chartData = Object.keys(selectedModel.revenueByChannel).map(channel => ({
    name: channel,
    revenue: selectedModel.revenueByChannel[channel],
    conversions: selectedModel.conversionsByChannel[channel]
  }));

  const formatINR = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Upper header */}
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">MULTI-TOUCH ATTRIBUTION AUDITING</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
          Attribution Model Lab
        </h1>
        <p className="text-slate-400 text-xs mt-1">Simulate multi-touch models. Compare First Touch, Linear, Time-Decay and Position-Based models to track actual credit flows.</p>
      </div>

      {/* Selector and Info Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Selector Panel */}
        <div className="bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl shadow-lg h-fit space-y-2 backdrop-blur-md">
          <h3 className="text-base font-bold pb-2 border-b border-slate-800/60 mb-3">Attribution Weighting Models</h3>
          
          {attributionModels.map((model) => (
            <button
              id={`attribution-model-${model.name.replace(' ', '')}-btn`}
              key={model.name}
              onClick={() => setActiveModelName(model.name)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                activeModelName === model.name 
                  ? 'bg-purple-500/10 border-[#7C3AED] text-white shadow-md' 
                  : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:bg-slate-900'
              }`}
            >
              <div>
                <span className="block text-xs font-bold text-slate-200">{model.name}</span>
                <span className="block text-[10px] text-slate-500 mt-1 truncate max-w-xs">{model.description}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${activeModelName === model.name ? 'rotate-90 text-indigo-300' : ''}`} />
            </button>
          ))}
        </div>

        {/* Detailed model description and charts breakdown */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between border-b border-slate-800/40 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white text-slate-200 bg-clip-text">{selectedModel.name} Attribution Overview</h3>
                <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">Weight Methodology Rules</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-450 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded">Active Lab Simulator</span>
            </div>

            <p className="text-xs text-slate-350 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-850/80 mb-6">
              💡 <strong>Model Definition:</strong> {selectedModel.description} Adjusting this weighting schema redistributes conversion credits and changes our evaluated channel Cost Per Acquisition (CPA) values.
            </p>

            {/* Simulated bar chart demonstrating distributed revenue by channel */}
            <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-4">Attributed Revenue flow by Channel Overview</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.6} />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff', fontSize: '11px' }}
                    formatter={(value: any) => [`₹${(Number(value)).toLocaleString('en-IN')}`, 'Attributed Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#7C3AED" name="Attributed Revenue" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-800/60 pt-5 mt-6 text-xs text-slate-400">
            <div>
              <span className="block text-[10px] uppercase font-semibold text-slate-500 mb-1">Cumulative Conversions</span>
              <strong className="text-white text-base">5,263 Conversions</strong>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-semibold text-slate-500 mb-1">Attributed Revenue</span>
              <strong className="text-emerald-400 text-base">{formatINR(18000000)}</strong>
            </div>
          </div>

        </div>

      </div>

      {/* Model side-by-side tabular matrices */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="p-5 border-b border-slate-800/60">
          <h3 className="text-lg font-bold">Interactive Attribution Comparison Matrices</h3>
          <p className="text-xs text-slate-400 mt-1">Study how conversion credits shift channels based on the model chosen.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-slate-950/70 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">Marketing Channel</th>
                <th className="p-4">First-Touch Revenue</th>
                <th className="p-4">Last-Touch Revenue</th>
                <th className="p-4">Linear Revenue</th>
                <th className="p-4 font-bold text-indigo-400">Position-Based Revenue</th>
                <th className="p-4">First-Touch Conversions</th>
                <th className="p-4">Last-Touch Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              <tr>
                <td className="p-4 font-bold text-slate-100">Google Ads</td>
                <td className="p-4 font-mono">₹6,480,000</td>
                <td className="p-4 font-mono">₹2,160,000</td>
                <td className="p-4 font-mono">₹4,860,000</td>
                <td className="p-4 font-mono font-bold text-emerald-400">₹5,580,000</td>
                <td className="p-4 font-mono">1,894</td>
                <td className="p-4 font-mono">631</td>
              </tr>
              <tr className="bg-slate-900/10">
                <td className="p-4 font-bold text-slate-100">Facebook Ads</td>
                <td className="p-4 font-mono">₹4,680,000</td>
                <td className="p-4 font-mono">₹1,800,000</td>
                <td className="p-4 font-mono">₹3,240,000</td>
                <td className="p-4 font-mono font-bold text-emerald-400">₹3,780,000</td>
                <td className="p-4 font-mono">1,368</td>
                <td className="p-4 font-mono">526</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-100">LinkedIn Ads</td>
                <td className="p-4 font-mono">₹3,600,000</td>
                <td className="p-4 font-mono">₹1,080,000</td>
                <td className="p-4 font-mono">₹2,160,000</td>
                <td className="p-4 font-mono font-bold text-emerald-400">₹1,620,000</td>
                <td className="p-4 font-mono">1,052</td>
                <td className="p-4 font-mono">315</td>
              </tr>
              <tr className="bg-slate-900/10">
                <td className="p-4 font-bold text-slate-100">Email Marketing</td>
                <td className="p-4 font-mono">₹720,000</td>
                <td className="p-4 font-mono">₹11,160,000</td>
                <td className="p-4 font-mono">₹4,140,000</td>
                <td className="p-4 font-mono font-bold text-emerald-400">₹4,680,000</td>
                <td className="p-4 font-mono">210</td>
                <td className="p-4 font-mono">3,263</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-100">Organic Search</td>
                <td className="p-4 font-mono">₹1,620,000</td>
                <td className="p-4 font-mono">₹1,440,000</td>
                <td className="p-4 font-mono">₹2,880,005</td>
                <td className="p-4 font-mono font-bold text-emerald-400">₹1,980,000</td>
                <td className="p-4 font-mono">473</td>
                <td className="p-4 font-mono">421</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
