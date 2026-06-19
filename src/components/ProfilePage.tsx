import React from 'react';
import { motion } from 'motion/react';
import { 
  User, Shield, Calendar, Mail, FileText, Activity, 
  HelpCircle, Sparkles, Key, LogIn
} from 'lucide-react';
import { UserSession } from '../types';

interface ProfilePageProps {
  user: UserSession;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">SECURE USER IDENTITIES CENTER</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-205 bg-clip-text text-transparent">
          User Profile Hub
        </h1>
        <p className="text-slate-400 text-xs mt-1">Review verified profile metadata, security access cards and credentials authorizations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="bg-slate-900/50 border border-slate-800/85 p-6 rounded-xl hover:border-slate-800 transition-colors backdrop-blur-md shadow-lg h-fit flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-20 h-20 bg-gradient-to-tr from-[#7C3AED] to-[#2563EB] rounded-full flex items-center justify-center text-2xl font-black mb-4 select-none">
            {user.name.charAt(0)}
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-white mb-1.5">{user.name}</h2>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded font-bold uppercase mb-4">{user.role}</span>
          
          <div className="w-full text-xs text-slate-400 text-left border-t border-slate-805 pt-4 space-y-3.5">
            <div className="flex justify-between">
              <span>Primary Email:</span>
              <strong className="text-white font-mono">{user.email}</strong>
            </div>
            <div className="flex justify-between">
              <span>Security Level:</span>
              <strong className="text-white">Admin Clearance</strong>
            </div>
            <div className="flex justify-between">
              <span>Last Login UTC:</span>
              <strong className="text-white font-mono">{new Date().toISOString().slice(0,10)}</strong>
            </div>
          </div>
        </div>

        {/* Saved Items */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl backdrop-blur-md shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold border-b border-slate-800 pb-3 mb-4">Saved Report Templates</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-850 text-xs flex justify-between items-center">
                <div>
                  <span className="block font-bold text-slate-200">Weekly Executive Media Audit</span>
                  <span className="block text-[10px] text-slate-500 mt-1">Compiled in March • PDF Format • 1.2MB</span>
                </div>
                <button className="text-[10px] text-indigo-400 hover:underline font-bold">Launch Export</button>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-850 text-xs flex justify-between items-center">
                <div>
                  <span className="block font-bold text-slate-200">ROI Attribution Lab Scenario Model</span>
                  <span className="block text-[10px] text-slate-500 mt-1">Scenario Target (3.6x ROAS) • CSV Format</span>
                </div>
                <button className="text-[10px] text-indigo-400 hover:underline font-bold">Launch Export</button>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-850 text-xs flex justify-between items-center">
                <div>
                  <span className="block font-bold text-slate-200">Budget optimization Shifts Advice</span>
                  <span className="block text-[10px] text-slate-500 mt-1">Recommended changes • Google/Email focus</span>
                </div>
                <button className="text-[10px] text-indigo-400 hover:underline font-bold">Launch Export</button>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl text-xs flex items-start space-x-2 mt-6">
            <Activity className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Saved report preferences are synchronized directly to your local workspace account cache. Cleared caches wipe configuration history.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
