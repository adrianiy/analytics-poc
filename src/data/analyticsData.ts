import { PreAnalysisData, PostAnalysisData } from "../types/analytics";

// Mock data for pre-analysis (marketing channels + bot detection)
export const preAnalysisData: PreAnalysisData = {
  newsletter: {
    total: 25000,
    bots: 1500,
    humans: 23500,
    desktop: 12000,
    mobile: 11000,
    tablet: 2000,
  },
  push: {
    total: 18500,
    bots: 2100,
    humans: 16400,
    desktop: 8000,
    mobile: 9000,
    tablet: 1500,
  },
  organic: {
    total: 65000,
    bots: 8500,
    humans: 56500,
    desktop: 28000,
    mobile: 30000,
    tablet: 7000,
  },
  google: {
    total: 28954,
    bots: 4200,
    humans: 24754,
    desktop: 17000,
    mobile: 10454,
    tablet: 1500,
  },
};

// Mock data for post-analysis (attribution by web sections)
export const postAnalysisData: PostAnalysisData = {
  sections: {
    home: {
      revenue: 45600,
      conversions: 234,
      attribution: 18.5,
    },
    "product-listing": {
      revenue: 89200,
      conversions: 456,
      attribution: 35.2,
    },
    "product-detail": {
      revenue: 67800,
      conversions: 389,
      attribution: 28.1,
    },
    checkout: {
      revenue: 51200,
      conversions: 298,
      attribution: 18.2,
    },
  },
};

// Helper function to get total metrics for pre-analysis
export const getPreAnalysisTotals = () => {
  const totals = {
    sessions: 0,
    bots: 0,
    humans: 0,
    desktop: 0,
    mobile: 0,
    tablet: 0,
  };

  Object.values(preAnalysisData).forEach((channel) => {
    totals.sessions += channel.total;
    totals.bots += channel.bots;
    totals.humans += channel.humans;
    totals.desktop += channel.desktop;
    totals.mobile += channel.mobile;
    totals.tablet += channel.tablet;
  });

  return {
    ...totals,
    botPercentage: Math.round((totals.bots / totals.sessions) * 100),
    humanPercentage: Math.round((totals.humans / totals.sessions) * 100),
  };
};
