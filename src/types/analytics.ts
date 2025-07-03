// Analysis phases
export type AnalysisPhase = "pre-analysis" | "funnel-core" | "post-analysis";

// Marketing channels for pre-analysis
export type MarketingChannel = "newsletter" | "push" | "organic" | "google";

// Traffic types
export type TrafficType = "bot" | "human" | "all";

// Pre-analysis data structure
export interface ChannelMetrics {
  total: number;
  bots: number;
  humans: number;
  desktop: number;
  mobile: number;
  tablet: number;
}

export interface PreAnalysisData {
  newsletter: ChannelMetrics;
  push: ChannelMetrics;
  organic: ChannelMetrics;
  google: ChannelMetrics;
}

// Post-analysis data structure (placeholder for future)
export interface PostAnalysisData {
  sections: {
    [key: string]: {
      revenue: number;
      conversions: number;
      attribution: number;
    };
  };
}

// Complete analytics data
export interface AnalyticsData {
  preAnalysis: PreAnalysisData;
  funnelCore: object; // Your existing funnel data
  postAnalysis: PostAnalysisData;
}

// Analysis navigation state
export interface AnalysisState {
  currentPhase: AnalysisPhase;
  selectedChannel?: MarketingChannel;
  trafficFilter: TrafficType;
}
