import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Compass, DollarSign, Activity, Users, Clock, 
  Map, Workflow, TrendingUp, Info
} from 'lucide-react';
import { JourneyPath } from '../types';
import { customerJourneys } from '../mockData';

export default function CustomerJourney() {
  const [selectedPathId, setSelectedPathId] = useState<string>('jp1');

  const selectedPath = customerJourneys.find(p => p.id === selectedPathId) || customerJourneys[0];

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
        <span className="text-xs uppercase font-bold tracking-widest text-[#7C3AED] flex items-center space-x-1.5">
          <Workflow className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full animate-bounce" />
          <span>CUSTOMER JOURNEYS VISUALIZATION</span>
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
          User Flow Journey Maps
        </h1>
        <p className="text-slate-400 text-xs mt-1">Isolate multi-stage user routes. Track high revenue tunnels and pinpoint friction delays on custom touchpoint segments.</p>
      </div>

      {/* Stats overlay */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold text-slate-400">Primary Touchpoints</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-black mt-1">5 Prime Paths</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Continuous cookie-match</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold text-slate-400">Avg Time to Purchase</span>
            <Clock className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <h3 className="text-2xl font-black mt-1">19.4 Days</h3>
          <p className="text-[10px] text-emerald-400 mt-0.5">• Steady velocity</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold text-slate-400">Highest Revenue Path</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold mt-1 text-slate-200">Google Ads → Email</h3>
          <p className="text-[10px] text-emerald-400 mt-0.5">₹7.5M generated</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold text-slate-400">Highest Conversion Path</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mt-1 text-slate-200">Google Ads Flow</h3>
          <p className="text-[10px] text-indigo-400 mt-0.5">2,150 Purchases</p>
        </div>
      </div>

      {/* Main Multi-Stage Interactive visualizer panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Selector Panel */}
        <div className="bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl shadow-lg h-fit space-y-3.5 backdrop-blur-md">
          <h3 className="text-base font-bold pb-2 border-b border-slate-800">Identify Active Paths</h3>
          
          {customerJourneys.map((path) => (
            <button
              id={`journey-path-${path.id}-btn`}
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all relative cursor-pointer ${
                selectedPathId === path.id 
                  ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-md' 
                  : 'bg-slate-950/60 border-slate-850 text-slate-350 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-100">
                  {path.id === 'jp1' ? '1. Google Ads Intent Flow' :
                   path.id === 'jp2' ? '2. Social Paid Target Route' :
                   path.id === 'jp3' ? '3. Long Enterprise SEO Loop' :
                   path.id === 'jp4' ? '4. High-Touch LinkedIn B2B' :
                   '5. Standard Direct Organic Access'}
                </span>
                <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  path.type === 'organic' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  path.type === 'paid' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                  'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                }`}>
                  {path.type}
                </span>
              </div>

              {/* Steps display preview */}
              <div className="flex items-center space-x-1 text-[10px] text-slate-400 mt-2 truncate max-w-full">
                {path.steps.map((st, sidx) => (
                  <React.Fragment key={st}>
                    <span>{st}</span>
                    {sidx < path.steps.length - 1 && <span className="text-[9px] text-[#7C3AED]">→</span>}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono font-semibold text-slate-500 mt-3 border-t border-slate-950/40 pt-2 pb-0">
                <span>Revenue: <strong className="text-emerald-400">{formatINR(path.revenue)}</strong></span>
                <span>Vol: <strong className="text-indigo-400">{path.conversions}</strong></span>
              </div>
            </button>
          ))}
        </div>

        {/* Visual Map Render Panel */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/85 p-6 rounded-xl shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold">Dynamic Interactive Journey Layout</h3>
            <p className="text-xs text-slate-400 mb-6">Explore the full conversion funnel nodes of the selected path segment.</p>

            {/* Sequence Cards Node Map */}
            <div className="flex flex-col md:flex-row items-center justify-center p-6 border border-slate-850/80 rounded-xl bg-slate-950/40 relative min-h-[14rem] overflow-x-auto gap-4 md:gap-2">
              {selectedPath.steps.map((step, idx) => (
                <React.Fragment key={step}>
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl text-center min-w-[7.5rem] max-w-[10rem] flex flex-col items-center justify-center shadow-lg relative shrink-0"
                  >
                    {/* Node order flag */}
                    <span className="absolute top-1.5 left-2 text-[9px] font-mono text-[#7C3AED] font-bold">NODE {idx + 1}</span>
                    <span className="block text-xs font-bold text-white mt-2">{step}</span>
                    <span className="block text-[9px] text-slate-400 mt-1">
                      {idx === 0 ? 'Referrer Node' :
                       idx === selectedPath.steps.length - 1 ? 'Closed Deal' :
                       'Midpoint Flow'}
                    </span>
                  </motion.div>

                  {idx < selectedPath.steps.length - 1 && (
                    <div className="flex items-center shrink-0">
                      <ArrowRight className="w-5 h-5 text-indigo-500 rotate-90 md:rotate-0" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Core Insights relating to current selected path */}
          <div className="bg-slate-950/70 border border-indigo-950/50 p-4 rounded-xl mt-6">
            <div className="flex items-start space-x-2 text-xs">
              <Info className="w-4.5 h-4.5 text-indigo-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-200">Segment Velocity & Performance Metrics:</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Enterprise client loops indicate an average transition wait of <strong>{selectedPath.avgTimeDays} days</strong> between Touchpoint 1 and final checkout. 
                  This sequence generates an average contract value (ACV) of <strong>{formatINR(Math.round(selectedPath.revenue / selectedPath.conversions))}</strong>.
                </p>
                <div className="flex items-center space-x-6 text-[10px] font-semibold text-slate-400 mt-2">
                  <span>Conversions: <strong className="text-white">{selectedPath.conversions}</strong></span>
                  <span>Aggregate Value: <strong className="text-emerald-400">{formatINR(selectedPath.revenue)}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
