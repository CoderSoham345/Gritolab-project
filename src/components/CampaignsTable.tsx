import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, SlidersHorizontal, CheckCircle2, AlertTriangle, Play, Pause,
  ChevronLeft, ChevronRight, Download, BarChart2, PlusCircle, ArrowUpDown
} from 'lucide-react';
import { Campaign } from '../types';

interface CampaignsTableProps {
  campaigns: Campaign[];
  onToggleStatus: (id: string) => void;
  onAddCampaign: (newCamp: Campaign) => void;
}

export default function CampaignsTable({ campaigns, onToggleStatus, onAddCampaign }: CampaignsTableProps) {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters state
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [performanceFilter, setPerformanceFilter] = useState('All'); // 'All' | 'High' | 'Mid' | 'Low'

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting state
  const [sortField, setSortField] = useState<keyof Campaign>('revenue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // New campaign modal form state (for additions)
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignChannel, setNewCampaignChannel] = useState('Google Ads');
  const [newCampaignSpend, setNewCampaignSpend] = useState<number>(50000);
  const [newCampaignRevenue, setNewCampaignRevenue] = useState<number>(180000);
  const [newCampaignClicks, setNewCampaignClicks] = useState<number>(1200);
  const [newCampaignConversions, setNewCampaignConversions] = useState<number>(60);
  const [newCampaignRegion, setNewCampaignRegion] = useState<'North'|'South'|'East'|'West'|'Global'>('Global');

  // Trigger sorting
  const handleSort = (field: keyof Campaign) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filter & sort logic
  const filteredCampaigns = useMemo(() => {
    let result = [...campaigns];

    // Text search
    if (searchTerm.trim() !== '') {
      result = result.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Channel filter
    if (selectedChannel !== 'All') {
      result = result.filter(c => c.channel === selectedChannel);
    }

    // Region filter
    if (selectedRegion !== 'All') {
      result = result.filter(c => c.region === selectedRegion);
    }

    // Status filter
    if (selectedStatus !== 'All') {
      result = result.filter(c => c.status === selectedStatus.toLowerCase());
    }

    // Performance Level filter
    if (performanceFilter !== 'All') {
      if (performanceFilter === 'High') {
        result = result.filter(c => c.roas >= 4.0);
      } else if (performanceFilter === 'Mid') {
        result = result.filter(c => c.roas >= 2.0 && c.roas < 4.0);
      } else {
        result = result.filter(c => c.roas < 2.0);
      }
    }

    // Sort operations
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle string comparison safely
      if (typeof valA === 'string') {
        valA = (valA as string).toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [campaigns, searchTerm, selectedChannel, selectedRegion, selectedStatus, performanceFilter, sortField, sortDirection]);

  // Pagination metrics
  const totalItems = filteredCampaigns.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedCampaigns = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCampaigns, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Add campaign submit
  const handleAddNewCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName) return;

    const roas = Number((newCampaignRevenue / newCampaignSpend).toFixed(2));
    const ctr = Number(((newCampaignClicks / (newCampaignClicks * 20.8)) * 100).toFixed(2));
    const cpc = Number((newCampaignSpend / newCampaignClicks).toFixed(2));
    const cpa = Number((newCampaignSpend / newCampaignConversions).toFixed(2));

    const newCampaignItem: Campaign = {
      id: 'c_custom_' + Date.now(),
      name: newCampaignName,
      channel: newCampaignChannel,
      spend: newCampaignSpend,
      clicks: newCampaignClicks,
      ctr,
      conversions: newCampaignConversions,
      revenue: newCampaignRevenue,
      roas,
      status: 'active',
      region: newCampaignRegion,
      startDate: new Date().toISOString().split('T')[0],
      cpc,
      cpa
    };

    onAddCampaign(newCampaignItem);
    
    // Reset Form fields
    setNewCampaignName('');
    setNewCampaignSpend(50000);
    setNewCampaignRevenue(180000);
    setNewCampaignClicks(1200);
    setNewCampaignConversions(60);
    setShowAddForm(false);
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">REAL-TIME AUDIT MASTERGRID</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Campaign Performance Page
          </h1>
          <p className="text-slate-400 text-xs mt-1">Directly search, filter, sort and toggle active execution states of all 50+ enterprise marketing campaigns.</p>
        </div>
        <button
          id="toggle-add-campaign-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:brightness-110 text-xs font-bold rounded-lg flex items-center space-x-2 shrink-0 shadow-lg cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Launch Campaign</span>
        </button>
      </div>

      {/* Campaign Add Form panel overlay / collapsible */}
      {showAddForm && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-slate-900 border border-[#7C3AED]/40 rounded-xl max-w-2xl mx-auto space-y-4"
        >
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-bold text-white text-sm">Add New Marketing Campaign</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Define metrics directly. The engine calculates standard ROAS, CPA, CTR and CPC parameters.</p>
          </div>

          <form onSubmit={handleAddNewCampaign} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Campaign Title Name</label>
              <input 
                id="new-campaign-name-input"
                type="text" 
                placeholder="Google Search - B2B Autumn Leads"
                value={newCampaignName}
                onChange={(e) => setNewCampaignName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 pr-4 pl-3 py-2 text-xs rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#7C3AED]"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Marketing Channel</label>
              <select 
                id="new-campaign-channel-select"
                value={newCampaignChannel}
                onChange={(e) => setNewCampaignChannel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs rounded-lg text-slate-350 focus:outline-none focus:border-[#7C3AED]"
              >
                <option value="Google Ads">Google Ads</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Instagram Ads">Instagram Ads</option>
                <option value="LinkedIn Ads">LinkedIn Ads</option>
                <option value="Email Marketing">Email Marketing</option>
                <option value="Organic Search">Organic Search</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Budget Allocation (INR)</label>
              <input 
                id="new-campaign-spend-input"
                type="number" 
                value={newCampaignSpend}
                onChange={(e) => setNewCampaignSpend(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs rounded-lg text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Expected Revenue Projection (INR)</label>
              <input 
                id="new-campaign-revenue-input"
                type="number" 
                value={newCampaignRevenue}
                onChange={(e) => setNewCampaignRevenue(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs rounded-lg text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Expected clicks</label>
              <input 
                id="new-campaign-clicks-input"
                type="number" 
                value={newCampaignClicks}
                onChange={(e) => setNewCampaignClicks(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs rounded-lg text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Expected conversions count</label>
              <input 
                id="new-campaign-conversions-input"
                type="number" 
                value={newCampaignConversions}
                onChange={(e) => setNewCampaignConversions(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs rounded-lg text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Target Sales Region</label>
              <select 
                id="new-campaign-region-select"
                value={newCampaignRegion}
                onChange={(e) => setNewCampaignRegion(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs rounded-lg text-slate-350 focus:outline-none"
              >
                <option value="Global">Global Region</option>
                <option value="North">North India</option>
                <option value="South">South India</option>
                <option value="East">East India</option>
                <option value="West">West India</option>
              </select>
            </div>

            <div className="flex items-end space-x-2 md:col-span-2 pt-2">
              <button 
                id="submit-add-campaign-btn"
                type="submit" 
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg text-xs cursor-pointer text-white"
              >
                Launch Active Campaign
              </button>
              <button 
                id="cancel-add-campaign-btn"
                type="button" 
                onClick={() => setShowAddForm(false)} 
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Interactive search filter row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-850/70">
        
        {/* Search */}
        <div className="relative lg:col-span-1">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            id="campaign-search-input"
            type="text"
            placeholder="Search campaign name..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8.5 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Channel filter */}
        <select
          id="channel-filter-select"
          value={selectedChannel}
          onChange={(e) => { setSelectedChannel(e.target.value); setCurrentPage(1); }}
          className="bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-350 focus:outline-[#7C3AED] cursor-pointer"
        >
          <option value="All">All Channels</option>
          <option value="Google Ads">Google Ads</option>
          <option value="Facebook Ads">Facebook Ads</option>
          <option value="Instagram Ads">Instagram Ads</option>
          <option value="LinkedIn Ads">LinkedIn Ads</option>
          <option value="Email Marketing">Email Marketing</option>
          <option value="Organic Search">Organic Search</option>
        </select>

        {/* Region filter */}
        <select
          id="region-filter-select"
          value={selectedRegion}
          onChange={(e) => { setSelectedRegion(e.target.value); setCurrentPage(1); }}
          className="bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-350 focus:outline-[#7C3AED] cursor-pointer"
        >
          <option value="All">All Regions</option>
          <option value="Global">Global</option>
          <option value="North">North India</option>
          <option value="South">South India</option>
          <option value="East">East India</option>
          <option value="West">West India</option>
        </select>

        {/* Status Filter */}
        <select
          id="status-filter-select"
          value={selectedStatus}
          onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
          className="bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-350 focus:outline-[#7C3AED] cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Performance level filter */}
        <select
          id="performance-filter-select"
          value={performanceFilter}
          onChange={(e) => { setPerformanceFilter(e.target.value); setCurrentPage(1); }}
          className="bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-350 focus:outline-[#7C3AED] cursor-pointer"
        >
          <option value="All">All ROAS Tiers</option>
          <option value="High">Elite Performance (ROAS ≥ 4.0)</option>
          <option value="Mid">Moderate Yield (2.0 - 4.0)</option>
          <option value="Low">Review Overdue (ROAS &lt; 2.0)</option>
        </select>

      </div>

      {/* Campaigns list Table design Grid */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-4 cursor-pointer hover:bg-slate-900 pr-5" onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Campaign Name</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="p-4 cursor-pointer hover:bg-slate-900" onClick={() => handleSort('channel')}>Channel</th>
                <th className="p-4 cursor-pointer hover:bg-slate-900" onClick={() => handleSort('spend')}>Spend Allocated</th>
                <th className="p-4 cursor-pointer hover:bg-slate-900" onClick={() => handleSort('clicks')}>Clicks</th>
                <th className="p-4 cursor-pointer hover:bg-slate-900" onClick={() => handleSort('ctr')}>CTR</th>
                <th className="p-4 cursor-pointer hover:bg-slate-900" onClick={() => handleSort('conversions')}>Conversions</th>
                <th className="p-4 cursor-pointer hover:bg-slate-900" onClick={() => handleSort('revenue')}>Revenue Generated</th>
                <th className="p-4 cursor-pointer hover:bg-slate-900" onClick={() => handleSort('roas')}>ROAS</th>
                <th className="p-4">Region</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Interactive Quick-State Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {paginatedCampaigns.length > 0 ? (
                paginatedCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-850/40 transition-colors">
                    <td className="p-4 font-bold text-slate-100 max-w-xs truncate">{camp.name}</td>
                    <td className="p-4">
                      <span className="text-[10px] bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded font-semibold text-slate-300">
                        {camp.channel}
                      </span>
                    </td>
                    <td className="p-4 font-mono">{formatINR(camp.spend)}</td>
                    <td className="p-4 font-mono text-slate-350">{(camp.clicks).toLocaleString('en-IN')}</td>
                    <td className="p-4 font-mono text-slate-400">{camp.ctr}%</td>
                    <td className="p-4 font-mono text-slate-350">{camp.conversions}</td>
                    <td className="p-4 font-mono text-emerald-400 font-semibold">{formatINR(camp.revenue)}</td>
                    <td className="p-4 font-mono">
                      <span className={`font-bold ${
                        camp.roas >= 4.0 ? 'text-emerald-400' :
                        camp.roas >= 2.0 ? 'text-indigo-400' :
                        'text-red-400'
                      }`}>
                        {camp.roas}x
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{camp.region}</td>
                    <td className="p-4">
                      <span className={`flex items-center space-x-1 text-[9px] font-bold uppercase ${
                        camp.status === 'active' ? 'text-emerald-400' :
                        camp.status === 'paused' ? 'text-amber-500' :
                        'text-indigo-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          camp.status === 'active' ? 'bg-emerald-450 animate-pulse' :
                          camp.status === 'paused' ? 'bg-amber-500' :
                          'bg-indigo-400'
                        }`} />
                        <span>{camp.status}</span>
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {camp.status !== 'completed' ? (
                        <button
                          id={`toggle-status-camp-${camp.id}-btn`}
                          onClick={() => onToggleStatus(camp.id)}
                          className={`p-1.5 rounded border transition-colors cursor-pointer ${
                            camp.status === 'active' 
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-550/20' 
                              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-550/20'
                          }`}
                          title={camp.status === 'active' ? 'Pause Campaign' : 'Activate Campaign'}
                        >
                          {camp.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">Locked</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-slate-500 font-semibold">
                    <AlertTriangle className="w-6 h-6 mx-auto text-amber-500 mb-2" />
                    No campaigns matched search parameters. Reset filters and try search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Interactive Pagination controls */}
        {totalPages > 1 && (
          <div className="p-4 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Showing pg <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({totalItems} total items)</span>
            <div className="flex items-center space-x-2">
              <button
                id="prev-page-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="next-page-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
