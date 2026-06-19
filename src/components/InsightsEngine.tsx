import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, CheckSquare, Plus, ArrowUpRight, DollarSign,
  AlertTriangle, Flame, ShieldAlert, Award, Compass, Zap
} from 'lucide-react';
import { automatedAdvisorInsights } from '../mockData';

export default function InsightsEngine() {
  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">AUTOMATED INSIGHT AUDIT QUEUE</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-205 bg-clip-text text-transparent">
          Insights Engine
        </h1>
        <p className="text-slate-400 text-xs mt-1">Review active anomalies and recommendations. Insights are automatically updated hourly based on multi-touch attribution patterns.</p>
      </div>

      {/* Grid distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Priority recommendation */}
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl shadow-lg relative backdrop-blur-md">
          <div className="flex items-center space-x-2.5 text-[#7C3AED] font-bold tracking-wider text-xs uppercase mb-3 pb-2 border-b border-slate-800/60">
            <Flame className="w-4 h-4 text-[#7C3AED] animate-pulse" />
            <span>Highest Priority Recommendations</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Double down on trigger automated Email workflows</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Email marketing processes currently operate at an elite <strong>191.0x ROAS</strong> on tiny capital spends. Automating abandoned cart triggers has massive potential to unlock ₹14.5L more revenue safely with virtually zero customer acquisition overheads.
          </p>
          <span className="text-[10px] bg-purple-500/15 border border-purple-500/20 text-purple-400 px-2.5 py-1 rounded font-bold uppercase block w-fit">Estimated Impact: ₹14.5L Revenue Increase</span>
        </div>

        {/* Risks */}
        <div className="bg-slate-900/50 border border-red-500/10 p-5 rounded-xl shadow-lg relative backdrop-blur-md">
          <div className="flex items-center space-x-2.5 text-red-400 font-bold tracking-wider text-xs uppercase mb-3 pb-2 border-b border-slate-800/60">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>High Risk Warning Areas</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Meta social networks CTR conversion decay</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Facebook Ads campaign metrics indicate an average conversion drop-off rate of 14% this month, resulting in a climbing customer acquisition cost (CAC) of <strong>₹1,230</strong>. Immediate broad audience optimization is highly suggested.
          </p>
          <span className="text-[10px] bg-red-500/10 border border-red-500/25 text-red-400 px-2.5 py-1 rounded font-bold uppercase block w-fit">Priority: Critical Action Overdue</span>
        </div>

        {/* Quick Win */}
        <div className="bg-slate-900/50 border border-emerald-500/10 p-5 rounded-xl shadow-lg relative backdrop-blur-md">
          <div className="flex items-center space-x-2.5 text-emerald-400 font-bold tracking-wider text-xs uppercase mb-3 pb-2 border-b border-slate-800/60">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>High Yield Quick Wins</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Redirect Taboola Native spend into search intent</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Native Taboola campaigns (C39) currently yield a sub-par 1.5x ROAS. Terminating this and shifting that monthly <strong>₹70,000</strong> directly into high-intent Google PMax search keywords drives concrete results within 48 hours.
          </p>
          <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded font-bold uppercase block w-fit">Expected Lift: +0.42x ROAS Boost</span>
        </div>

        {/* Growth Opportunities */}
        <div className="bg-slate-900/50 border border-blue-500/15 p-5 rounded-xl shadow-lg relative backdrop-blur-md">
          <div className="flex items-center space-x-2.5 text-blue-400 font-bold tracking-wider text-xs uppercase mb-3 pb-2 border-b border-slate-800/60">
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Long Term Growth Opportunities</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">B2B Content Pillar SEO Scaling</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Organic site comparisons and Pillar resource assets display an excellent average transition period of just 4 days from visitor signup to closing direct software checks. Expanding keywords will secure sustainable outbound flow.
          </p>
          <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2.5 py-1 rounded font-bold uppercase block w-fit">Sustainable Low-Cost Leads Stream</span>
        </div>

      </div>

    </div>
  );
}
