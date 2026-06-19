export interface Campaign {
  id: string;
  name: string;
  channel: string;
  spend: number;
  clicks: number;
  ctr: number;
  conversions: number;
  revenue: number;
  roas: number;
  status: 'active' | 'paused' | 'completed';
  region: 'North' | 'South' | 'East' | 'West' | 'Global';
  startDate: string;
  cpc: number;
  cpa: number;
}

export interface ChannelPerformance {
  channel: string;
  spend: number;
  revenue: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
  cac: number;
  efficiencyScore: number;
}

export interface JourneyPath {
  id: string;
  steps: string[];
  conversions: number;
  revenue: number;
  avgTimeDays: number;
  type: 'organic' | 'paid' | 'mixed';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Analyst' | 'Marketing Manager';
  avatar?: string;
}

export interface SavedReport {
  id: string;
  title: string;
  type: string;
  createdOn: string;
  createdBy: string;
  size: string;
}

export interface NotificationSettings {
  emailAlerts: boolean;
  weeklyDigest: boolean;
  budgetAlerts: boolean;
  anomalyDetection: boolean;
}

export interface AppSettings {
  language: 'English' | 'Spanish' | 'Hindi' | 'German';
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  timezone: string;
}
