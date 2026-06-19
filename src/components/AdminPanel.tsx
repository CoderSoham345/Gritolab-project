import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Key, Database, ShieldAlert, CheckCircle2, Sliders,
  HelpCircle, Settings, Layers, RefreshCw, Radio
} from 'lucide-react';
import { UserSession } from '../types';

interface AdminPanelProps {
  user: UserSession;
}

export default function AdminPanel({ user }: AdminPanelProps) {
  // Simulator state
  const [googleAnalyticsConn, setGoogleAnalyticsConn] = useState(true);
  const [facebookConn, setFacebookConn] = useState(true);
  const [linkedinConn, setLinkedinConn] = useState(false);
  const [hubspotConn, setHubspotConn] = useState(true);

  const [simulatedPermissions, setSimulatedPermissions] = useState([
    { role: 'Admin', read: true, write: true, delete: true, editAllocations: true },
    { role: 'Analyst', read: true, write: true, delete: false, editAllocations: true },
    { role: 'Marketing Manager', read: true, write: true, delete: false, editAllocations: false },
    { role: 'Guest', read: true, write: false, delete: false, editAllocations: false },
  ]);

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">SYSTEM CLEARANCES & CONNECTIONS</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-205 bg-clip-text text-transparent">
          System Admin Panel
        </h1>
        <p className="text-slate-400 text-xs mt-1">Configure global API synchronizations, review team status parameters, and moderate role-based feature clearances.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Connection Pipelines */}
        <div className="bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl backdrop-blur-md shadow-lg h-fit space-y-4">
          <div className="border-b border-slate-800 pb-2 mb-2">
            <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-1.5">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>SaaS Data Connectors</span>
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Moderate integrations linking to marketing hubs</p>
          </div>

          {/* GA4 */}
          <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-850">
            <div>
              <span className="block text-xs font-bold">Google Analytics 4 Connection</span>
              <span className="block text-[9px] text-[#2563EB] font-semibold uppercase mt-0.5">Sync pipeline active</span>
            </div>
            <button
              id="toggle-ga4-conn"
              onClick={() => setGoogleAnalyticsConn(!googleAnalyticsConn)}
              className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded transition-colors cursor-pointer ${
                googleAnalyticsConn ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-red-500/10 text-red-400 border border-red-500/25'
              }`}
            >
              {googleAnalyticsConn ? 'Online' : 'Offline'}
            </button>
          </div>

          {/* FB */}
          <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-850">
            <div>
              <span className="block text-xs font-bold">Meta Graph Graph API</span>
              <span className="block text-[9px] text-indigo-400 font-semibold uppercase mt-0.5">Sync pipeline active</span>
            </div>
            <button
              id="toggle-facebook-conn"
              onClick={() => setFacebookConn(!facebookConn)}
              className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded transition-colors cursor-pointer ${
                facebookConn ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-red-500/10 text-red-400 border border-red-500/25'
              }`}
            >
              {facebookConn ? 'Online' : 'Offline'}
            </button>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-850">
            <div>
              <span className="block text-xs font-bold">LinkedIn Campaign Manager API</span>
              <span className="block text-[9px] text-slate-500 font-semibold uppercase mt-0.5">Credentials needed</span>
            </div>
            <button
              id="toggle-linkedin-conn"
              onClick={() => setLinkedinConn(!linkedinConn)}
              className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded transition-colors cursor-pointer ${
                linkedinConn ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-red-500/10 text-red-400 border border-[#2563EB]/25'
              }`}
            >
              {linkedinConn ? 'Online' : 'Offline'}
            </button>
          </div>

          {/* HubSpot */}
          <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-850">
            <div>
              <span className="block text-xs font-bold">HubSpot CRM Attribution Sync</span>
              <span className="block text-[9px] text-pink-400 font-semibold uppercase mt-0.5">OAuth Verified ready</span>
            </div>
            <button
              id="toggle-hubspot-conn"
              onClick={() => setHubspotConn(!hubspotConn)}
              className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded transition-colors cursor-pointer ${
                hubspotConn ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-red-500/10 text-red-400 border border-red-500/25'
              }`}
            >
              {hubspotConn ? 'Online' : 'Offline'}
            </button>
          </div>

        </div>

        {/* Permissions list Grid */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl backdrop-blur-md shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-800/50 pb-3 mb-4">
              <Key className="w-5 h-5 text-[#7C3AED]" />
              <h3 className="text-lg font-bold">Team Role Clearance Matrix</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left font-sans">
                <thead className="bg-[#071426]/70 text-slate-400">
                  <tr>
                    <th className="p-3">Role Tier Name</th>
                    <th className="p-3 text-center">Read Analytics</th>
                    <th className="p-3 text-center">Write/Edit</th>
                    <th className="p-3 text-center">Delete Reports</th>
                    <th className="p-3 text-center">Modify Budgets</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {simulatedPermissions.map((item) => (
                    <tr key={item.role} className="hover:bg-slate-850/40 transition-colors">
                      <td className="p-3 py-4 font-bold text-slate-200">{item.role}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${item.read ? 'bg-emerald-450' : 'bg-red-450'}`} />
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${item.write ? 'bg-emerald-450' : 'bg-red-450'}`} />
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${item.delete ? 'bg-emerald-450' : 'bg-red-450'}`} />
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${item.editAllocations ? 'bg-emerald-450' : 'bg-red-450'}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <div className="bg-slate-950/70 border border-slate-850 p-4.5 rounded-xl text-xs flex items-start space-x-2 mt-6">
            <ShieldAlert className="w-4.5 h-4.5 text-indigo-400 mt-0.5 shrink-0" />
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Clearance credentials prevent lower level analyst users from modifying the <strong>Google PMax & Meta Advertising allocations</strong>. Administrative roles automatically inherit full credentials.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
