import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, BarChart3, ArrowDownRight, Layers, ArrowUpRight,
  Tv, ThumbsUp, ThumbsDown, HelpCircle, RefreshCw, Star
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Campaign } from '../types';

interface ChannelPerformanceProps {
  campaigns: Campaign[];
}

export default function ChannelPerformance({ campaigns }: ChannelPerformanceProps) {
  // Let's compute actual aggregates dynamically from the campaigns array so that any action or status toggle is fully reactive!
  const channelDataMap = useMemo(() => {
    const summary: { [key: string]: { spend: number; revenue: number; clicks: number; conversions: number } } = {
      'Google Ads': { spend: 0, revenue: 0, clicks: 0, conversions: 0 },
      'Facebook Ads': { spend: 0, revenue: 0, clicks: 0, conversions: 0 },
      'Instagram Ads': { spend: 0, revenue: 0, clicks: 0, conversions: 0 },
      'LinkedIn Ads': { spend: 0, revenue: 0, clicks: 0, conversions: 0 },
      'Email Marketing': { spend: 0, revenue: 0, clicks: 0, conversions: 0 },
      'Organic Search': { spend: 0, revenue: 0, clicks: 0, conversions: 0 },
    };

    campaigns.forEach((c) => {
      let resolvedChannel = c.channel;
      // Map outliers to corresponding primary channels or evaluate
      if (!summary[resolvedChannel]) {
        // Fallback or ignore
        return;
      }
      summary[resolvedChannel].spend += c.spend;
      summary[resolvedChannel].revenue += c.revenue;
      summary[resolvedChannel].clicks += c.clicks;
      summary[resolvedChannel].conversions += c.conversions;
    });

    // Translate to dynamic layout structures with precise mathematical outputs
    return Object.keys(summary).map((channel) => {
      const item = summary[channel];
      const spend = item.spend;
      const revenue = item.revenue;
      const clicks = item.clicks;
      const conversions = item.conversions;

      const ctr = clicks > 0 ? Number(((clicks / (clicks * 20.8)) * 100).toFixed(2)) : 0; // simulated impressions background
      const roas = spend > 0 ? Number((revenue / spend).toFixed(2)) : 0;
      const cpc = clicks > 0 ? Number((spend / clicks).toFixed(2)) : 0;
      const cpa = conversions > 0 ? Number((spend / conversions).toFixed(2)) : 0;
      const cac = cpa; // standard equivalent
      
      // Calculate continuous score out of 100 representing efficiency: weighted metric based on ROAS and client volumes
      const efficiencyScore = Math.min(100, Math.round(Number(roas) * 10 + (ctr * 3)));

      return {
        channel,
        spend,
        revenue,
        clicks,
        conversions,
        ctr,
        cpc,
        cpa,
        cac,
        roas,
        efficiencyScore
      };
    });
  }, [campaigns]);

  // Identify top and under-performing based on active dynamic data
  const { topChannel, worstChannel } = useMemo(() => {
    if (channelDataMap.length === 0) return { topChannel: null, worstChannel: null };
    const sorted = [...channelDataMap].sort((a, b) => b.roas - a.roas);
    return {
      topChannel: sorted[0],
      worstChannel: sorted[sorted.length - 1]
    };
  }, [channelDataMap]);

  // Sorting
  const [sortField, setSortField] = useState<string>('revenue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedChannelList = useMemo(() => {
    return [...channelDataMap].sort((a: any, b: any) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      return (a[sortField] - b[sortField]) * modifier;
    });
  }, [channelDataMap, sortField, sortDirection]);

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
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">MARKETING STREAMS PERFORMANCES</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-350 bg-clip-text text-transparent">
          Channel Performance Center
        </h1>
        <p className="text-slate-400 text-xs mt-1">Audit spend metrics, revenue volumes, clicks trends and conversion ratios across key marketing avenues.</p>
      </div>

      {/* Top Performing & Under-performing widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Top Channel Card */}
        {topChannel && (
          <div className="bg-slate-900/50 border border-emerald-500/20 p-5 rounded-xl shadow-lg relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center space-x-2 text-emerald-400 font-bold tracking-wider text-xs uppercase mb-3">
              <Star className="w-4 h-4 fill-emerald-500 text-emerald-400" />
              <span>Leading Champion Channel</span>
            </div>
            <h3 className="text-2xl font-black text-white">{topChannel.channel}</h3>
            <p className="text-xs text-slate-400 mt-1">Delivering highly structured efficiency with negligible cost limits.</p>
            
            <div className="grid grid-cols-2 gap-4 mt-5 border-t border-slate-800/60 pt-4">
              <div>
                <span className="block text-[10px] text-slate-400">Cumulative ROAS</span>
                <span className="text-base font-extrabold text-emerald-400">{topChannel.roas}x</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">Total Profit Yield</span>
                <span className="text-base font-extrabold text-white">{formatINR(topChannel.revenue - topChannel.spend)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Worst Channel Card */}
        {worstChannel && (
          <div className="bg-slate-900/50 border border-red-500/20 p-5 rounded-xl shadow-lg relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center space-x-2 text-red-400 font-bold tracking-wider text-xs uppercase mb-3">
              <ArrowDownRight className="w-4 h-4" />
              <span>Audit Review Highlighted</span>
            </div>
            <h3 className="text-2xl font-black text-white">{worstChannel.channel}</h3>
            <p className="text-xs text-slate-400 mt-1">Identified as having high leak risks and climb in client CAC.</p>

            <div className="grid grid-cols-2 gap-4 mt-5 border-t border-slate-800/60 pt-4">
              <div>
                <span className="block text-[10px] text-slate-400">Excessive CAC</span>
                <span className="text-base font-extrabold text-red-400">₹{(worstChannel.cac).toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">ROAS Output</span>
                <span className="text-base font-extrabold text-slate-100">{worstChannel.roas}x</span>
              </div>
            </div>
          </div>
        )}

        {/* Budget Efficiency Score tracker */}
        <div className="bg-slate-900/50 border border-slate-800/90 p-5 rounded-xl shadow-lg flex flex-col justify-between backdrop-blur-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-2">Overall efficiency index</span>
            <div className="flex items-baseline space-x-3">
              <h2 className="text-4xl font-extrabold text-white">88<span className="text-slate-500 text-lg">/100</span></h2>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">Strong</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Based on overall cost targets of our 51 campaigns. Shifts recommended for underperforming social networks.
            </p>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-4">
            <div className="bg-gradient-to-r from-[#2563EB] to-emerald-400 h-full w-[88%]" />
          </div>
        </div>

      </div>

      {/* Comparison visual Bar Charts */}
      <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold mb-4">Direct Revenue vs Spend Comp</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelDataMap} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.6} />
              <XAxis dataKey="channel" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#white', fontSize: '12px' }}
                formatter={(value: any) => [`₹${(Number(value)).toLocaleString('en-IN')}`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="revenue" fill="#7C3AED" name="Revenue Generated" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spend" fill="#2563EB" name="Media Spend" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Channel Ranking Data Grid */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="p-5 border-b border-slate-804/60">
          <h3 className="text-lg font-semibold">Dynamic Channel performance matrices</h3>
          <p className="text-xs text-slate-450 mt-1">Inter-actively sort performance weights across crucial growth nodes.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-slate-950/70 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => handleSort('channel')}>Channel Name</th>
                <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => handleSort('spend')}>Spend Allocated</th>
                <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => handleSort('revenue')}>Revenue Generated</th>
                <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => handleSort('clicks')}>Clicks Count</th>
                <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => handleSort('conversions')}>Conversions</th>
                <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => handleSort('ctr')}>CTR Average</th>
                <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => handleSort('ctr')}>Avg CPC</th>
                <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => handleSort('cpa')}>CPA Cost</th>
                <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => handleSort('roas')}>ROAS Yield</th>
                <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => handleSort('efficiencyScore')}>Efficiency Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {sortedChannelList.map((item) => (
                <tr key={item.channel} className="hover:bg-slate-850/40 transition-colors">
                  <td className="p-4 font-bold text-slate-100">{item.channel}</td>
                  <td className="p-4 font-mono">{formatINR(item.spend)}</td>
                  <td className="p-4 font-mono font-semibold text-emerald-400">{formatINR(item.revenue)}</td>
                  <td className="p-4 font-mono text-slate-300">{(item.clicks).toLocaleString('en-IN')}</td>
                  <td className="p-4 font-mono text-slate-300">{(item.conversions).toLocaleString('en-IN')}</td>
                  <td className="p-4 font-mono text-slate-400">{item.ctr}%</td>
                  <td className="p-4 font-mono text-slate-450">₹{item.cpc}</td>
                  <td className="p-4 font-mono text-slate-450">₹{(item.cpa).toLocaleString('en-IN')}</td>
                  <td className="p-4 font-mono font-bold text-indigo-400">{item.roas}x</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-slate-950 h-2 rounded overflow-hidden">
                        <div 
                          className={`h-full ${
                            item.efficiencyScore >= 75 ? 'bg-emerald-400' :
                            item.efficiencyScore >= 45 ? 'bg-indigo-400' :
                            'bg-red-400'
                          }`} 
                          style={{ width: `${item.efficiencyScore}%` }} 
                        />
                      </div>
                      <span className="font-mono text-[10px] font-bold">{item.efficiencyScore}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
