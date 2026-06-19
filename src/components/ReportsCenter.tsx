import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, DownloadCloud, Trash2, Edit, Calendar, CheckSquare,
  AlertCircle, ShieldCheck, Mail, Users, FileSpreadsheet, PlusCircle
} from 'lucide-react';
import { Campaign } from '../types';

interface ReportsCenterProps {
  campaigns: Campaign[];
}

export default function ReportsCenter({ campaigns }: ReportsCenterProps) {
  // Let's create live report download simulations
  const [downloadingReportId, setDownloadingReportId] = useState<string | null>(null);
  const [downloadFormat, setDownloadFormat] = useState<'csv' | 'pdf' | 'xlsx'>('csv');
  const [reportState, setReportState] = useState([
    { id: 'rep1', name: 'Executive Summary Statement Q2', date: '2026-06-15', format: 'pdf', size: '2.4 MB', author: 'Siddharth' },
    { id: 'rep2', name: 'Channel Performance Metrics Analysis', date: '2026-06-11', format: 'xlsx', size: '1.2 MB', author: 'Neha' },
    { id: 'rep3', name: 'Active Attribution Multi-touch Lab Highlights', date: '2026-05-28', format: 'pdf', size: '4.8 MB', author: 'Aman' },
    { id: 'rep4', name: 'Dynamic Budget Optimization Advice Statement', date: '2026-05-19', format: 'csv', size: '150 KB', author: 'Siddharth' },
  ]);

  const handleDownloadSimulation = (id: string, name: string, format: string) => {
    setDownloadingReportId(id);
    // Mimic processing latency
    setTimeout(() => {
      // Create artificial element triggers to download small file or simply state complete success with elegance!
      const content = `Enterprise Analytics Report: ${name}\nGenerated on: ${new Date().toISOString()}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name.replace(/\s+/g, '_').toLowerCase()}_report.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadingReportId(null);
    }, 1500);
  };

  const handleDeleteReport = (id: string) => {
    setReportState(reportState.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6 text-white font-sans">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">SECURE DATA EXTRACTOR & CENTER</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-205 bg-clip-text text-transparent">
          Report Repository Center
        </h1>
        <p className="text-slate-400 text-xs mt-1">Generate high-fidelity marketing reports. Extract and compile current campaign files directly into secure CSV, Excel or PDF outputs.</p>
      </div>

      {/* Main Reports container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Generate Report Form */}
        <div className="bg-slate-900/50 border border-slate-800/85 p-5 rounded-xl shadow-lg h-fit backdrop-blur-md">
          <h3 className="text-base font-bold pb-2 border-b border-slate-800/60 mb-4">Export Performance Metrics</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Pick Export Format Target</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="format-csv-btn"
                  onClick={() => setDownloadFormat('csv')}
                  className={`py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    downloadFormat === 'csv' ? 'bg-[#7C3AED]/15 border-[#7C3AED] text-white' : 'bg-slate-950/60 border-slate-850 text-slate-400'
                  }`}
                >
                  CSV Format
                </button>
                <button
                  id="format-pdf-btn"
                  onClick={() => setDownloadFormat('pdf')}
                  className={`py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    downloadFormat === 'pdf' ? 'bg-[#7C3AED]/15 border-[#7C3AED] text-white' : 'bg-slate-950/60 border-slate-850 text-slate-400'
                  }`}
                >
                  PDF Report
                </button>
                <button
                  id="format-xlsx-btn"
                  onClick={() => setDownloadFormat('xlsx')}
                  className={`py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    downloadFormat === 'xlsx' ? 'bg-[#7C3AED]/15 border-[#7C3AED] text-white' : 'bg-slate-950/60 border-slate-850 text-slate-400'
                  }`}
                >
                  Excel XLSX
                </button>
              </div>
            </div>

            <button
              id="generate-instant-report-btn"
              onClick={() => {
                const id = 'rep_custom_' + Date.now();
                const title = `Direct Channel Export Campaign Metrics - ${downloadFormat.toUpperCase()}`;
                const newRep = {
                  id,
                  name: title,
                  date: new Date().toISOString().split('T')[0],
                  format: downloadFormat,
                  size: downloadFormat === 'csv' ? '12 KB' : '1.4 MB',
                  author: 'Active User'
                };
                setReportState([newRep, ...reportState]);
              }}
              className="w-full text-center py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:brightness-110 text-xs font-bold rounded-lg flex items-center justify-center space-x-2 shadow-lg transition-transform cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Compile Instant Analytics report</span>
            </button>
          </div>
        </div>

        {/* Existing reports lists map */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800/50 pb-3 mb-4">
            <h3 className="text-base font-bold">Secure Extracted Reports Archive</h3>
            <span className="text-[10px] bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded font-mono text-slate-400">Total: {reportState.length}</span>
          </div>

          <div className="space-y-3">
            {reportState.map((rep) => (
              <div 
                key={rep.id} 
                className="flex items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-850 hover:border-slate-800 transition-colors"
              >
                <div className="flex items-center space-x-3.5 text-xs">
                  <div className="p-2.5 bg-slate-900 rounded-lg text-[#7C3AED] border border-slate-850">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">{rep.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-1">Generated: {rep.date} • {rep.size} • format: <strong className="text-indigo-400 uppercase">{rep.format}</strong> • Compiled by {rep.author}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    id={`download-report-${rep.id}-btn`}
                    onClick={() => handleDownloadSimulation(rep.id, rep.name, rep.format)}
                    disabled={downloadingReportId === rep.id}
                    className={`p-2 rounded border cursor-pointer transition-colors ${
                      downloadingReportId === rep.id 
                        ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-purple-400' 
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-350'
                    }`}
                    title="Download Report"
                  >
                    <DownloadCloud className={`w-4 h-4 ${downloadingReportId === rep.id ? 'animate-bounce' : ''}`} />
                  </button>
                  <button
                    id={`delete-report-${rep.id}-btn`}
                    onClick={() => handleDeleteReport(rep.id)}
                    className="p-2 bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/20 rounded text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete Report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
