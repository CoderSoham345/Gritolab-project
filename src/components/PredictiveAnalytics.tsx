import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, Compass, Clock, Activity, AlertCircle,
  HelpCircle, Sparkles, Sliders, ChevronDown
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { proactive90DaysForecast } from '../mockData';

type ForecastType = 'revenue' | 'spend' | 'conversions';

export default function PredictiveAnalytics() {
  const [forecastMetric, setForecastMetric] = useState<ForecastType>('revenue');

  const metricLabel = forecastMetric === 'revenue' ? 'Projected Revenue' : 
                      forecastMetric === 'spend' ? 'Projected Spend' : 
                      'Projected Conversions';

  const strokeColor = forecastMetric === 'revenue' ? '#7C3AED' : 
                      forecastMetric === 'spend' ? '#2563EB' : 
                      '#10B981';

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">90-DAY FUTURE TRENDS MODELING</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-205 bg-clip-text text-transparent">
          Predictive Analytics Projections
        </h1>
        <p className="text-slate-400 text-xs mt-1">Simulate future performances. View custom machine forecasts for revenues, clicks, and acquisition channels over 90 days.</p>
      </div>

      {/* Selector row Buttons */}
      <div className="flex bg-slate-950/60 p-2.5 border border-slate-850/80 rounded-xl space-x-2.5 max-w-lg">
        <button
          id="forecast-revenue-btn"
          onClick={() => setForecastMetric('revenue')}
          className={`flex-1 text-center py-2 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
            forecastMetric === 'revenue' ? 'bg-[#7C3AED] text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Revenue Projections
        </button>
        <button
          id="forecast-spend-btn"
          onClick={() => setForecastMetric('spend')}
          className={`flex-1 text-center py-2 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
            forecastMetric === 'spend' ? 'bg-[#2563EB] text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Spend Forecasts
        </button>
        <button
          id="forecast-conversions-btn"
          onClick={() => setForecastMetric('conversions')}
          className={`flex-1 text-center py-2 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
            forecastMetric === 'conversions' ? 'bg-[#10B981] text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Conversions Curve
        </button>
      </div>

      {/* Main interactive chart container */}
      <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-5 border-b border-slate-800/60 pb-3">
          <div>
            <h3 className="text-lg font-bold">{metricLabel} (90-Day Forward Forecast)</h3>
            <span className="text-[10px] uppercase text-indigo-400 font-semibold tracking-wider">Predictive Modeling Framework</span>
          </div>
          <span className="text-xs font-semibold text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            <span>AI Projected confidence: 94.2%</span>
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={proactive90DaysForecast.slice(0, 45)} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.6} />
              <XAxis dataKey="date" stroke="#64748B" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff', fontSize: '11px' }}
                formatter={(value: any) => [
                  forecastMetric === 'conversions' ? value : `₹${Number(value).toLocaleString('en-IN')}`, 
                  metricLabel
                ]}
              />
              <Area type="monotone" dataKey={forecastMetric} stroke={strokeColor} strokeWidth={2.5} fillOpacity={1} fill="url(#forecastFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel specific prediction details */}
      <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl shadow-lg relative overflow-hidden backdrop-blur-md">
        <h3 className="text-base font-bold pb-2 border-b border-slate-800/60 mb-4">Underlying forecast assumptions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-350 leading-relaxed">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-850">
            <h4 className="font-bold text-white mb-1.5 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>Google Ads Scale Forecast</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Assumes immediate shift of INR 4.3L from Meta channels. Conversion volumes are projected to scale by +21% within 30 days due to high keyword match accuracy.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-850">
            <h4 className="font-bold text-white mb-1.5 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Email Automation expansion</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Extrapolating cart win-back automation curves. Expanding VIP customer flash deals yields linear incremental growths holding spends zero.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-850">
            <h4 className="font-bold text-white mb-1.5 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Weighted CAC trends</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Aggregated CAC expected to decline from ₹950 to ₹870 over 90 days. Driven by conversion increases in highly optimized SEO comparisons tables.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
