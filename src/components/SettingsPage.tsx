import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sliders, Settings, Bell, Shield, Archive, RefreshCw, 
  HelpCircle, Sparkles, CheckSquare, Plus
} from 'lucide-react';

export default function SettingsPage() {
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [weeklyDigests, setWeeklyDigests] = useState(true);
  const [anonymizeData, setAnonymizeData] = useState(false);
  const [alertChannels, setAlertChannels] = useState<'all' | 'critical' | 'none'>('critical');

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">APPLICATION SETTINGS & CONFIGS</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-205 bg-clip-text text-transparent">
          Workspace Settings
        </h1>
        <p className="text-slate-400 text-xs mt-1">Configure user alert parameters, choose system communication formats, and configure system data preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alerts Configuration */}
        <div className="bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl backdrop-blur-md shadow-lg h-fit space-y-4">
          <div className="border-b border-slate-800 pb-2 mb-2">
            <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-1.5 animate-pulse">
              <Bell className="w-4 h-4 text-[#7C3AED]" />
              <span>Diagnostic Alerts</span>
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Toggle alert limits on campaign variations</p>
          </div>

          <div className="flex items-center justify-between p-1">
            <span className="text-xs text-slate-300">Allow Live push notifications</span>
            <input 
              id="push-notifications-toggle"
              type="checkbox" 
              checked={allowNotifications} 
              onChange={() => setAllowNotifications(!allowNotifications)}
              className="accent-[#7C3AED] scale-110 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-1">
            <span className="text-xs text-slate-300">Email Weekly Performance Digests</span>
            <input 
              id="weekly-digests-toggle"
              type="checkbox" 
              checked={weeklyDigests} 
              onChange={() => setWeeklyDigests(!weeklyDigests)}
              className="accent-[#7C3AED] scale-110 cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Anomaly alert frequency tier</label>
            <select
              id="alert-frequency-select"
              value={alertChannels}
              onChange={(e) => setAlertChannels(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-[#7C3AED] focus:border-[#7C3AED]"
            >
              <option value="all">Publish All Changes (Standard)</option>
              <option value="critical">Only Critical Events (Default)</option>
              <option value="none">De-prioritize Alerts (Quiet Mode)</option>
            </select>
          </div>
        </div>

        {/* Workspace Preferences */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl backdrop-blur-md shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-800/50 pb-3 mb-4">
              <Shield className="w-5 h-5 text-[#2563EB]" />
              <h3 className="text-lg font-bold">Workspace Data and Security Policies</h3>
            </div>

            <div className="space-y-4 text-xs text-slate-350 leading-relaxed">
              <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-850">
                <div>
                  <span className="block font-bold text-slate-200">Export Anonymization Protocol</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Encrypt customer identifier credentials on exports</span>
                </div>
                <input 
                  id="anonymize-data-toggle"
                  type="checkbox" 
                  checked={anonymizeData} 
                  onChange={() => setAnonymizeData(!anonymizeData)}
                  className="accent-indigo-500 scale-110 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-850">
                <div>
                  <span className="block font-bold text-slate-200">Purge Workspace Cache database</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Clears custom campaigns additions keeping baseline data intact</span>
                </div>
                <button 
                  id="purge-cache-btn"
                  onClick={() => alert('Diagnostic cache cleared successfully.')}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded font-bold uppercase text-[9px] text-red-400 transition-colors cursor-pointer"
                >
                  Purge Cache
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-850 p-4.5 rounded-xl text-xs flex items-start space-x-2 mt-6">
            <Archive className="w-4.5 h-4.5 text-indigo-400 mt-0.5 shrink-0" />
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Secure policies comply with enterprise standard marketing regulations. Deleting or modifying authorization paths clears pipeline tokens.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
