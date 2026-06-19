import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Brain, Compass, HelpCircle, Sparkles, Activity,
  DownloadCloud, Trash2, ArrowUpRight, CheckCircle, RefreshCw,
  TrendingUp, TrendingDown, ArrowRight, AlertTriangle, Award, 
  ChevronRight, Percent, DollarSign, ShieldAlert, CheckCircle2,
  LineChart, Sparkle, RefreshCw as SpinIcon
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { ChatMessage, Campaign } from '../types';
import { mockCampaigns } from '../mockData';

interface AIAdvisorProps {
  campaigns?: Campaign[];
}

export default function AIAdvisor({ campaigns }: AIAdvisorProps) {
  const currentCampaigns = campaigns || mockCampaigns;

  // React State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg1',
      role: 'model',
      content: `### Summary
Hello! I am your Enterprise Marketing Intelligence Assistant. I have audited your active ${currentCampaigns.filter(c => c.status === 'active').length} campaigns, multi-touch attribution metrics, and channel allocation models.

### Key Findings
* Overall ROAS is operating at stable benchmark levels.
* Email marketing represents a massive underfunded revenue lever (191.0x ROAS).
* Facebook conversion thresholds show broad demographic CTR decay.

### Business Impact
Direct CAC leakages are impacting net-profit margins by 5% to 8%. Proper shifting of underperforming seed budgets can unlock immediate capital efficiency.

### Recommended Actions
1. Query. "Which channel performs best?" to run deep audits.
2. Query. "How should I reallocate budget?" to identify ₹430,000 in spend re-assignments.
3. Use the predefined buttons below to run direct attribution and pause-candidate simulations.

### Expected Outcome
Fully optimized campaign mapping promises **+12% average ROAS lift** and **+8% monthly revenue scaling** within a 90-day implementation sprint.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [linkStatus, setLinkStatus] = useState<'testing' | 'live' | 'simulation'>('testing');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. DYNAMIC METRIC AUDITS FROM REAL-TIME LIVE CAMPAIGN STATE
  const activeCampaigns = currentCampaigns.filter(c => c.status === 'active');
  const totalSpend = currentCampaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = currentCampaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalClicks = currentCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalConversions = currentCampaigns.reduce((sum, c) => sum + c.conversions, 0);

  const averageCtr = totalClicks > 0 ? (currentCampaigns.reduce((sum, c) => sum + (c.ctr * c.clicks), 0) / totalClicks) : 4.8;
  const currentRoas = totalSpend > 0 ? (totalRevenue / totalSpend) : 3.6;
  const currentCac = totalConversions > 0 ? (totalSpend / totalConversions) : 950;
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 5.05;

  // 2. MARKETING HEALTH SCORE DYNAMIC ENGINE (ROAS, CAC, CTR, Conv Rate, Revenue Growth, Budget Efficiency)
  // Let's generate a smart health score dynamically.
  const calculateHealthScore = () => {
    let score = 82; // Baseline
    
    // ROAS Contribution (benchmark is 3.5)
    score += Math.min(6, Math.max(-10, Math.round((currentRoas - 3.5) * 8)));
    
    // Conversion Rate Contribution (benchmark is 5%)
    score += Math.min(4, Math.max(-8, Math.round((conversionRate - 5) * 5)));
    
    // CTR Contribution (benchmark is 4.5)
    score += Math.min(3, Math.max(-5, Math.round((averageCtr - 4.5) * 4)));
    
    // Leakage Penalties: Subtract score points if we have active campaigns with ROAS < 2.0 (waste of money)
    const leakageCampaigns = activeCampaigns.filter(c => c.roas < 2.0);
    score -= leakageCampaigns.length * 3;

    // Status mapping
    score = Math.min(100, Math.max(30, score));
    let statusText = 'Excellent';
    let statusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
    if (score < 60) {
      statusText = 'Critical Leakage';
      statusColor = 'text-rose-400 bg-rose-500/10 border-rose-500/25';
    } else if (score < 75) {
      statusText = 'Fair / Improving';
      statusColor = 'text-amber-400 bg-amber-500/10 border-amber-500/25';
    } else if (score < 88) {
      statusText = 'Optimal';
      statusColor = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25';
    }

    return { score, statusText, statusColor };
  };

  const health = calculateHealthScore();

  // Test live connection to verify server-side pipeline
  useEffect(() => {
    const testConnection = async () => {
      try {
        const testRes = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'health_test_ping' }] })
        });
        if (testRes.ok) {
          const testData = await testRes.json();
          // If server returned a non-error output, mark as live!
          if (testData.text && !testData.text.toLowerCase().includes('fallback')) {
            setLinkStatus('live');
            return;
          }
        }
        setLinkStatus('simulation');
      } catch (e) {
        setLinkStatus('simulation');
      }
    };
    testConnection();
  }, []);

  // 3. PREDICTIVE INSIGHTS GENERATION & TIMELINE METRICS
  const listPredictiveProjections = [
    { name: 'Current', Revenue: totalRevenue / 100000, Conversions: totalConversions, ROAS: Number(currentRoas.toFixed(2)), Spend: totalSpend / 100000 },
    { name: 'Month 1 (Pr.)', Revenue: (totalRevenue * 1.09) / 100000, Conversions: Math.round(totalConversions * 1.08), ROAS: Number((currentRoas * 1.09).toFixed(2)), Spend: totalSpend / 100000 },
    { name: 'Month 2 (Pr.)', Revenue: (totalRevenue * 1.184) / 100000, Conversions: Math.round(totalConversions * 1.142), ROAS: Number((currentRoas * 1.116).toFixed(2)), Spend: totalSpend / 100000 },
  ];

  // 4. PARSE ENGINE FOR SMART RESPONSE LAYOUT
  // To keep visual parity and clear bento cards, we parse responses with ### sections
  const parseSmartResponse = (text: string) => {
    const sections = {
      summary: '',
      keyFindings: [] as string[],
      businessImpact: '',
      recommendedActions: [] as string[],
      expectedOutcome: ''
    };

    const lines = text.split('\n');
    let currentSection: 'summary' | 'findings' | 'impact' | 'actions' | 'outcome' | null = null;
    let fallbackText = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const lower = trimmed.toLowerCase();
      
      // Match section patterns
      if (lower.startsWith('summary') || lower.includes('### summary') || lower.includes('**summary')) {
        currentSection = 'summary';
        continue;
      } else if (lower.includes('findings') || lower.includes('key findings') || lower.includes('### key findings') || lower.includes('**key findings')) {
        currentSection = 'findings';
        continue;
      } else if (lower.includes('impact') || lower.includes('business impact') || lower.includes('### business impact') || lower.includes('**business impact')) {
        currentSection = 'impact';
        continue;
      } else if (lower.includes('recommend') || lower.includes('recommendations') || lower.includes('recommended action') || lower.includes('### recommended action') || lower.includes('### recommendations')) {
        currentSection = 'actions';
        continue;
      } else if (lower.includes('expected outcome') || lower.includes('expected impact') || lower.includes('outcome') || lower.includes('### expected outcome') || lower.includes('### expected impact')) {
        currentSection = 'outcome';
        continue;
      }

      // Appending content
      if (currentSection === 'summary') {
        sections.summary += (sections.summary ? '\n' : '') + trimmed.replace(/^[-*#\s:]+/, '');
      } else if (currentSection === 'findings') {
        sections.keyFindings.push(trimmed.replace(/^[-*#\s:\d\.)]+/, ''));
      } else if (currentSection === 'impact') {
        sections.businessImpact += (sections.businessImpact ? '\n' : '') + trimmed.replace(/^[-*#\s:]+/, '');
      } else if (currentSection === 'actions') {
        sections.recommendedActions.push(trimmed.replace(/^[-*#\s:\d\.)]+/, ''));
      } else if (currentSection === 'outcome') {
        sections.expectedOutcome += (sections.expectedOutcome ? '\n' : '') + trimmed.replace(/^[-*#\s:]+/, '');
      } else {
        fallbackText += (fallbackText ? '\n' : '') + line;
      }
    }

    // Checking if parser successfully isolated sections
    if (!sections.summary && !sections.expectedOutcome && !sections.businessImpact) {
      return { isParsed: false, rawText: text };
    }
    return { isParsed: true, sections };
  };

  // Predefined interactive marketing queries
  const predefinedQuestions = [
    { text: "Which channel performs best?", icon: "📈" },
    { text: "How should I reallocate budget?", icon: "💰" },
    { text: "How can I increase conversions?", icon: "🚀" },
    { text: "Which campaign should be paused?", icon: "📊" },
    { text: "What is driving revenue growth?", icon: "🎯" },
    { text: "Show attribution insights.", icon: "🔍" }
  ];

  // Dynamic simulation replies based on live campaigns state
  const getSimulatedAnalystResponse = (text: string) => {
    const query = text.toLowerCase();
    
    // Dynamic active listings
    const activeEmails = activeCampaigns.filter(c => c.channel === 'Email Marketing');
    const activeFacebooks = activeCampaigns.filter(c => c.channel === 'Facebook Ads');
    const worstFacebook = currentCampaigns.find(c => c.id === 'c14'); // testing broad
    const isWorstFBActive = worstFacebook?.status === 'active';

    if (query.includes('channel') && query.includes('best') || query.includes('highest') || query.includes('perform')) {
      return `### Summary
Our channel diagnostics show **Email Marketing** is delivering the highest return on spend, while **Google Ads** remains the primary volume generator for client acquisitions. 

### Key Findings
* **Email Marketing**: Stands unmatched at an elite **191.0x ROAS** (₹3.8M generated on micro investment, driven by recoveries).
* **Google Ads**: Driving **${currentCampaigns.filter(c => c.channel === 'Google Ads').reduce((sum, c) => sum + c.conversions, 0)} direct conversions** (ROAS of 3.8x).
* **Organic SEO**: Providing high-value sustainable traffic pipelines with zero incremental ad costs (average 16.2x ROI).

### Business Impact
We have left massive ad leverage unutilized. Scaling our search intent keywords and dynamic cart automation loops is critical to maximize our ₹1.8 Crore ARR path.

### Recommended Actions
1. Deploy ₹150,000 extra ad budget immediately into Google Brand Generic Search keywords.
2. Maximize contact rate for EM Cart Recoveries by shortening the first email send trigger to 15 minutes.

### Expected Outcome
Secures an estimated monthly sales margin scale of **+₹450,000** with no increased ad-tech infrastructure cost.`;
    }

    if (query.includes('reallocate') || query.includes('budget') || query.includes('spend')) {
      return `### Summary
We have identified **₹430,000** in active marketing spend leakage that should be siphoned away from low-conversions social demographics and directly reinvested into intent channels.

### Key Findings
* **Facebook Ads broad targeting**: Yields a sub-par **1.8x ROAS** with an average CAC of ₹1,230 (climbing due to targeting saturation).
* **Email Workflows**: Running at 191x ROAS, meaning every ₹1,000 spent returns ₹191,000 inside transaction logs.
* **Google Search Enterprise**: Capturing buyers with high conversion velocity (4.2x ROAS).

### Business Impact
Stopping this budget waste immediately reduces cumulative CAC from ₹950 down to ₹815. Reinvestment enhances our overall revenue capture.

### Recommended Actions
1. Pause ${isWorstFBActive ? `"FB - Broad Demographic Testing" (C14)` : 'underperforming social test groups'} and redirect ₹100,000 to Email sequences.
2. Shift ₹330,000 from Instagram broad styled carousel/tutorials into Google Search enterprise intent terms and PMax.

### Expected Outcome
Expect **+12% cumulative ROAS improvement** and **+8% immediate revenue growth** (₹2,150,000 in net positive ARR metrics).`;
    }

    if (query.includes('conversions') || query.includes('increase') || query.includes('ctr') || query.includes('improve')) {
      return `### Summary
Conversion velocity audits reveal mid-funnel path drop-offs. Optimizing high-intent asset touchpoints will trigger conversion increases.

### Key Findings
* Email cart recovery sequences show the highest conversion rate at **22.4%**.
* Broad Facebook test CTR is currently stagnant at **1.9%** (with CPC at ₹43.4).
* Organic Search resource pillars drive high volume traffic but lack clear lead-capture blocks.

### Business Impact
Improving our average conversion rate from ${conversionRate.toFixed(2)}% to 5.8% saves ₹3.1L in paid media display impressions required to hit transaction goals.

### Recommended Actions
1. Implement exit-intent modals with a 10% promo code across all high-traffic Organic search pillar pages.
2. Launch instant-answer Google Display Ads variations to raise CTR threshold from 1.8% to 2.5%.

### Expected Outcome
Expect **+14% total conversions lift** (adding approximately 750+ incremental transactions monthly).`;
    }

    if (query.includes('pause') || query.includes('campaign') || query.includes('paused')) {
      const activePausedCandidates = currentCampaigns.filter(c => c.status === 'active' && c.roas < 2.0);
      return `### Summary
We recommend pausing **${activePausedCandidates.length > 0 ? activePausedCandidates.length : '3'} low-performing campaigns** immediately. These campaigns are operating below a 2.0x ROAS threshold.

### Key Findings
* ${isWorstFBActive ? `**FB - Broad Demographic Testing (C14)**: Operating at an unsustainable **1.8x ROAS** with high CAC of ₹2,380.` : `**Instagram Videos (C19)** and low intent carousels showing high ad-burn rates.`}
* **Native Taboola Discovery (C39)**: Spend of ₹70,000 yielding a sub-par 1.5x ROAS and low qualifying score.
* **LinkedIn Job Pipeline (C24)**: High CPC of ₹94 with a poor ROAS of 2.0x.

### Business Impact
Halting these passive spend leaks saves a total of **₹250,000** in active monthly ad spend, increasing net profit margins by 5.2% instantly.

### Recommended Actions
1. Transition C14 ("FB - Broad Demographic Testing") and Taboola Discovery to 'Paused' in your Campaign Monitor.
2. Reallocate the ₹2,50,000 saved monthly ad budget into *Google Search - High Intent Enterprise* (4.2x ROAS).

### Expected Outcome
Eradication of poor spend. Reinvestment yields an estimated **+0.35x increase in target ROI**.`;
    }

    if (query.includes('revenue') || query.includes('growth') || query.includes('profit') || query.includes('driving')) {
      return `### Summary
Our growth engine audit isolates two main factors driving ₹1.8 Crore cumulative revenue: **B2B Intent Search Capture** and **Behavioral Email Workflows**.

### Key Findings
* **Google Search & PMax**: Commands over **₹3.2M** in active attributed revenue.
* **Email automated sequences**: Represents high retention LTV (clv benchmark average ₹14,500).
* **Organic Search (SEO)**: Drives reliable low-cost discovery, bringing in ₹2.3M.

### Business Impact
Solidifying these customer conversion channels guarantees a high defensive margin, insulating the company from rising advertising CPM costs on Meta's bidding platforms.

### Recommended Actions
1. Double down on B2B ABM targeting; scale sponsorship for LinkedIn executive creator series.
2. Re-engage historic leads database with automated reactivation triggers.

### Expected Outcome
Sustained **+18.4% MoM Revenue growth velocity** with robust brand loyalty milestones.`;
    }

    if (query.includes('attribution') || query.includes('insight') || query.includes('attribution insights')) {
      return `### Summary
Multi-touch attribution models show standard last-click reporting undervalues first-touch social channels (Facebook, Instagram) by **18-20%**, as they act as key introductory triggers.

### Key Findings
* **First-Touch Action**: Facebook campaigns spark discovery, driving 40% of first-touch interactions.
* **Last-Touch Closers**: Google Search and Email automation act as the final-touch conversion engines.
* **Sequence Path**: 35% of high-value enterprise accounts search for us on Google after discover on LinkedIn.

### Business Impact
Relying strictly on Last-Click variables causes premature budget reductions in marketing discovery channels, choking off the long-term pipeline.

### Recommended Actions
1. Transition your analytics cockpit from Last-Click attribution tracking to a **W-Shaped Model** (allocating 40% first-touch, 40% lead generation, 20% middle-touch).
2. Sync custom cookies tracking with AdRoll to map sequential touchpoints accurately.

### Expected Outcome
Enhanced spend confidence, allowing you to scale first-touch social budgets by 25% with verified attribution paths.`;
    }

    // Default conversational consultant reply
    return `### Summary
I have processed your analytics question. Based on audited metrics (Spend: ₹${(totalSpend/100000).toFixed(1)}L, Revenue: ₹${(totalRevenue/100000).toFixed(1)}L, ROAS: ${currentRoas.toFixed(2)}x), we can pinpoint optimization paths.

### Key Findings
* Total active campaign volume stands at ${activeCampaigns.length} groups.
* The average customer acquisition cost (CAC) is ₹${currentCac.toFixed(0)}, while the average lifetime value is ₹14,500.
* Conversion rate stands at ${conversionRate.toFixed(2)}% with a CTR of ${averageCtr.toFixed(2)}%.

### Business Impact
Under-utilization of intent keyword clusters and over-burn on top-of-funnel demographic profiles are capping ARR potential.

### Recommended Actions
1. Click any predefined card below to trigger pre-composed attribution and budget reallocation algorithms.
2. Refine target search phrases and verify active campaigns in CRM dashboard.

### Expected Outcome
Continuous optimization stabilizes CAC below ₹800 and increases ad efficiency by up to 22%.`;
  };

  // Auto scroll to latest bubbles
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Append user bubble
    const userMessage: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Prepare complete message array history for server
    const currentHistory = [
      ...messages.map(m => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: text }
    ];

    try {
      // POST safely to server API proxy endpoint
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: currentHistory })
      });

      if (!res.ok) {
        throw new Error('API server connection error');
      }

      const data = await res.json();
      
      const botMessage: ChatMessage = {
        id: 'bot_' + Date.now(),
        role: 'model',
        content: data.text || "I apologize. I encountered a pipeline parsing error. Please check your system connection.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      // Graceful high-fidelity simulated response generator block when server-side Gemini key is absent!
      setTimeout(() => {
        const simulatedReply = getSimulatedAnalystResponse(text);
        const fallbackMsg: ChatMessage = {
          id: 'bot_err_' + Date.now(),
          role: 'model',
          content: simulatedReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, fallbackMsg]);
        setIsTyping(false);
      }, 700);
      return;
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 text-white font-sans flex flex-col min-h-screen pb-12">
      
      {/* Title */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#7C3AED] flex items-center space-x-1.5">
            <Brain className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>EXECUTIVE MARKETING INTELLIGENCE COCKPIT</span>
          </span>
          <h1 className="text-3xl font-black tracking-tight mt-1 bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
            Growth & Marketing Consultant
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Grounded diagnostic AI powered by predictive algorithms, campaign tracking arrays, and behavioral attribution profiles.
          </p>
        </div>

        {/* Pipeline Link Status Indicator */}
        <div className="flex items-center space-x-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-1.5 shrink-0 self-start md:self-auto select-none">
          <div className={`w-2 h-2 rounded-full ${linkStatus === 'live' ? 'bg-emerald-400 animate-pulse' : 'bg-indigo-400 animate-pulse'}`} />
          <span className="text-[10px] font-bold tracking-wider uppercase font-mono text-slate-300">
            {linkStatus === 'live' ? 'Gemini 3.5 Live Link' : 'Grounded Analyst Simulation'}
          </span>
        </div>
      </div>

      {/* THREE TIER LAYOUT: Marketing Health, Predictive Insights, Chat workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: DIAGNOSIS & PREDICTIVE SYSTEMS (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* A. MARKETING HEALTH SCORE */}
          <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-2xl relative overflow-hidden backdrop-blur-md shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/5 rounded-full blur-2xl pointer-events-none" />
            
            <h2 className="text-sm font-bold text-slate-200 tracking-wide flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Marketing Performance Health Score</span>
            </h2>

            <div className="mt-4 flex items-center justify-between gap-6">
              {/* Radial Score Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="#1e293b"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="url(#purpleGradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 46}
                    strokeDashoffset={2 * Math.PI * 46 * (1 - health.score / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-black text-white">{health.score}</span>
                  <span className="text-[10px] text-slate-500 font-bold block">/100</span>
                </div>
              </div>

              {/* Status details & quick descriptor */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">STATUS:</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${health.statusColor}`}>
                    {health.statusText}
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Calculated based on live ROAS ({currentRoas.toFixed(1)}x), optimal CAC (₹{currentCac.toFixed(0)}), converting speed ({(conversionRate).toFixed(1)}%), and actively active ad-waste leakage profiles.
                </p>
              </div>
            </div>

            {/* Health Factors Progress indicators */}
            <div className="mt-6 space-y-3 pt-4 border-t border-slate-800/60">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#7C3AED] block">DIAGNOSTIC FACTOR RATINGS</span>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Fact 1 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span>Ad Spend ROAS Yield</span>
                    <span className="text-emerald-400 font-mono">{(currentRoas/5 * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${Math.min(100, (currentRoas/5 * 100))}%` }} />
                  </div>
                </div>
                {/* Fact 2 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span>CAC Value Efficiency</span>
                    <span className="text-emerald-400 font-mono">{Math.min(100, Math.round((2000 - currentCac)/1500 * 100))}%</span>
                  </div>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${Math.min(100, Math.round((2000 - currentCac)/1500 * 100))}%` }} />
                  </div>
                </div>
                {/* Fact 3 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span>Funnel Conversion Rate</span>
                    <span className="text-indigo-400 font-mono">{(conversionRate/8 * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${Math.min(100, (conversionRate/8 * 100))}%` }} />
                  </div>
                </div>
                {/* Fact 4 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span>Budget Efficiency</span>
                    <span className="text-indigo-400 font-mono">
                      {Math.max(40, 100 - activeCampaigns.filter(c => c.roas < 2.0).length * 15)}%
                    </span>
                  </div>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${Math.max(40, 100 - activeCampaigns.filter(c => c.roas < 2.0).length * 15)}%` }} />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* B. AI DASHBOARD PANEL COCKPIT */}
          <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-2xl backdrop-blur-md shadow-lg space-y-4">
            <h2 className="text-sm font-bold text-slate-200 tracking-wide flex items-center gap-1.5 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Marketing Performance AI Dashboard</span>
            </h2>
            
            <div className="space-y-3.5">
              
              {/* Box 1 */}
              <div className="bg-slate-900/40 border border-slate-800/80 p-3 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#7C3AED]">TOP STRATEGIC INSIGHT</span>
                <p className="text-xs font-bold text-slate-100 mt-0.5 leading-relaxed">
                  Email Marketing generates an elite 191x ROAS (₹3.82M on ₹20k spend), making it severely under-invested compared to social.
                </p>
              </div>

              {/* Grid indices */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/40 border border-slate-800/80 p-3 rounded-xl">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-400">BEST OPPORTUNITY</span>
                  <p className="text-xs font-extrabold text-emerald-400 mt-0.5 mt-1">Reallocate Facebook leakage to Google Search & Email</p>
                </div>
                <div className="bg-slate-900/40 border border-slate-800/80 p-3 rounded-xl">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-400">CHAMPION CHANNEL</span>
                  <p className="text-xs font-extrabold text-white mt-0.5 mt-1">Email Marketing (191.0x average ROAS)</p>
                </div>
                <div className="bg-slate-900/40 border border-slate-800/80 p-3 rounded-xl col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-red-400">HIGHEST CAC CHANNEL WARNING</span>
                    <span className="text-[9px] font-mono text-slate-400 font-bold">₹2,564 / acquisition</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 mt-0.5 mt-1">
                    LinkedIn Ads yields pristine enterprise leads, but spikes client acquisition burn thresholds.
                  </p>
                </div>
              </div>

              {/* Box Action */}
              <div className="bg-indigo-950/20 border border-indigo-500/25 p-3 rounded-xl flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-300 block">IMMEDIATE RECOMMENDED ACTION</span>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-semibold">
                    Pause active campaign C14 (Facebook broad targeting testing) to instantly plugging ₹100,000 monthly burn. Reinvest into lookalike purchasers.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* C. PREDICTIVE INSIGHTS PANEL AND RECHARTS FORECAST */}
          <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-2xl backdrop-blur-md shadow-lg space-y-4">
            <div>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#7C3AED] block">SAAS PREDICTIVE ENGINE</span>
              <h2 className="text-sm font-bold text-slate-200 tracking-wide flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                <span>Predictive Insights (90D Forecast)</span>
              </h2>
            </div>

            {/* Forecast stats list */}
            <div className="grid grid-cols-4 gap-2 text-center select-none">
              <div className="bg-slate-900/50 p-2 border border-slate-850 rounded-xl">
                <span className="text-[9px] text-slate-500 uppercase font-bold block">REVENUE</span>
                <span className="text-xs font-black text-emerald-400 block font-mono">₹2.01Cr</span>
                <span className="text-[8px] text-slate-400 block mt-0.5">+11.9% Lift</span>
              </div>
              <div className="bg-slate-900/50 p-2 border border-slate-850 rounded-xl">
                <span className="text-[9px] text-slate-500 uppercase font-bold block">CONVERSIONS</span>
                <span className="text-xs font-black text-white block font-mono">6,013</span>
                <span className="text-[8px] text-indigo-400 block mt-0.5">+14.2% Lift</span>
              </div>
              <div className="bg-slate-900/50 p-2 border border-slate-850 rounded-xl">
                <span className="text-[9px] text-slate-500 uppercase font-bold block">AVG ROAS</span>
                <span className="text-xs font-black text-white block font-mono">4.02x</span>
                <span className="text-[8px] text-indigo-400 block mt-0.5">+11.6% Gain</span>
              </div>
              <div className="bg-slate-900/50 p-2 border border-slate-850 rounded-xl">
                <span className="text-[9px] text-slate-500 uppercase font-bold block">SPEND REQ</span>
                <span className="text-xs font-black text-slate-300 block font-mono">₹50.0L</span>
                <span className="text-[8px] text-slate-400 block mt-0.5">0% Extra</span>
              </div>
            </div>

            {/* Area Chart Forecast */}
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={listPredictiveProjections}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="revenueProjGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="roasProjGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 9 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 9 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontSize: '10px', color: '#fff', borderRadius: '8px' }} 
                  />
                  <Area type="monotone" dataKey="Revenue" name="Revenue Proj (Lakhs)" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#revenueProjGrad)" />
                  <Area type="monotone" dataKey="ROAS" name="Expected ROAS" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#roasProjGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <ul className="text-[11px] text-slate-400 leading-relaxed font-medium space-y-1.5 list-disc pl-4 pt-1">
              <li>Expected ROI curve is modeled on the instant reallocation of low performing segment spend directly matching highest-attracting touchpoints.</li>
              <li>90D Forecasting maps direct conversion cycles from LinkedIn, Facebook, and Organic search pillars.</li>
            </ul>

          </div>

        </div>

        {/* RIGHT COLUMN: CORE CONSULTANT CHATBOT (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col h-[calc(100vh-13rem)] min-h-[500px]">
          
          <div className="flex-1 bg-slate-950/50 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md">
            
            {/* Chat header area */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4 h-9">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 font-mono">Attribution Lab Consultant session</span>
              </div>
              <button 
                onClick={() => setMessages([{
                  id: 'msg_reset_' + Date.now(),
                  role: 'model',
                  content: `### Summary\nWelcome back. Fresh consultation logs are compiled. Run any query to begin.`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }])}
                className="p-1 px-2.5 hover:bg-slate-900 border border-slate-850 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] uppercase font-bold flex items-center space-x-1"
                title="Reset Workspace Log"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Chat</span>
              </button>
            </div>

            {/* Chat logs scroll container */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1 mb-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950/50">
              {messages.map((msg) => {
                const parsed = parseSmartResponse(msg.content);
                return (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[95%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    
                    {msg.role === 'user' ? (
                      // User bubble
                      <div className="p-3 bg-[#7C3AED] border border-[#7C3AED]/70 text-xs font-bold leading-relaxed text-white rounded-2xl rounded-tr-none shadow-md">
                        {msg.content}
                      </div>
                    ) : (
                      // Smart Consultant Response cards layout
                      <div className="space-y-3 w-full">
                        {parsed && parsed.isParsed ? (
                          // Renders beautiful, separate cards per required CMO block
                          <div className="space-y-4 w-full text-slate-100 select-text">
                            
                            {/* 1. Summary Block */}
                            {parsed.sections.summary && (
                              <div className="p-4 bg-slate-950/80 border-l-4 border-indigo-500 rounded-lg shadow">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-400 block font-mono">📋 Executive Summary</span>
                                <p className="text-xs leading-relaxed text-slate-200 mt-1 font-semibold whitespace-pre-wrap">{parsed.sections.summary}</p>
                              </div>
                            )}

                            {/* 2. Key Findings Block */}
                            {parsed.sections.keyFindings.length > 0 && (
                              <div className="p-4 bg-slate-950/80 border border-slate-900 rounded-lg shadow space-y-2">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-400 block font-mono">🔍 Key Findings</span>
                                <ul className="space-y-2">
                                  {parsed.sections.keyFindings.map((finding, idx) => (
                                    <li key={idx} className="text-xs flex items-start gap-2 text-slate-350">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                      <span>{finding}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* 3. Business Impact Block */}
                            {parsed.sections.businessImpact && (
                              <div className="p-4 bg-rose-950/10 border border-rose-950/50 rounded-lg shadow flex items-start gap-3">
                                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-rose-400 block font-mono">🔥 Financial Stake & Business Impact</span>
                                  <p className="text-xs leading-relaxed text-slate-300 mt-1 whitespace-pre-wrap font-medium">{parsed.sections.businessImpact}</p>
                                </div>
                              </div>
                            )}

                            {/* 4. Recommended Actions Block */}
                            {parsed.sections.recommendedActions.length > 0 && (
                              <div className="p-4 bg-slate-950/80 border border-slate-900 rounded-lg shadow space-y-2.1">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-400 block font-mono">🛠️ Recommended Action Roadmap</span>
                                <div className="space-y-2.5">
                                  {parsed.sections.recommendedActions.map((action, idx) => (
                                    <div key={idx} className="flex gap-3 text-xs">
                                      <div className="w-5 h-5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-black rounded-full flex items-center justify-center shrink-0">
                                        {idx + 1}
                                      </div>
                                      <span className="text-slate-200 mt-0.5 font-medium leading-relaxed">{action}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* 5. Expected Outcome Impact stats */}
                            {parsed.sections.expectedOutcome && (
                              <div className="p-4 bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-lg shadow">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-purple-300 block font-mono">🎯 Expected Outcome & ROI Boost</span>
                                <p className="text-xs leading-relaxed text-indigo-200 mt-1 font-extrabold whitespace-pre-wrap">{parsed.sections.expectedOutcome}</p>
                              </div>
                            )}

                          </div>
                        ) : (
                          // Fallback standard text render
                          <div className="p-4 bg-slate-950/80 border border-slate-900 text-slate-100 text-xs leading-relaxed rounded-2xl rounded-tl-none shadow-md whitespace-pre-wrap select-text">
                            {msg.content}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <span className="text-[9px] text-slate-500 font-mono mt-1 font-bold">
                      {msg.timestamp} • {msg.role === 'user' ? 'You' : 'Intelligence Engine'}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="mr-auto items-start flex flex-col max-w-[40%]">
                  <div className="p-3 bg-slate-950/80 border border-slate-850 rounded-xl rounded-bl-none flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* PREDEFINED QUESTIONS AND INPUT BAR SUBMIT ZONE */}
            <div className="shrink-0 space-y-4 pt-4 border-t border-slate-800/60 bg-slate-950/30">
              
              {/* Clickable cards predefined questions panel */}
              <div className="space-y-1.5">
                <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">SELECT TACTICAL CORE QUERY SYSTEM:</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {predefinedQuestions.map((q) => (
                    <button
                      id={`predef-card-${q.text.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      key={q.text}
                      onClick={() => handleSendMessage(q.text)}
                      className="p-2.5 bg-slate-950 hover:bg-slate-900/80 border border-slate-850 text-left rounded-xl transition-all hover:border-[#7C3AED] cursor-pointer group flex items-start gap-2 hover:shadow-md"
                    >
                      <span className="text-sm shrink-0">{q.icon}</span>
                      <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white leading-snug">
                        {q.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input text submit bar */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }} 
                className="flex items-center space-x-2 relative"
              >
                <input
                  id="advisor-chat-input"
                  type="text"
                  placeholder="Pose clear tactical queries e.g. 'Isolate highest CAC channels with allocations'..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-12 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all font-medium"
                />
                <button
                  id="advisor-send-msg-btn"
                  type="submit"
                  className="absolute right-2 top-2 p-2 bg-[#7C3AED] hover:bg-[#7C3AED]/95 rounded-lg text-white transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
