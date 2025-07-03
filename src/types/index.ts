// Device types
export type DeviceType = "desktop" | "mobile" | "tablet";

// Funnel data structure
export interface DeviceMetrics {
  total: number;
  desktop: number;
  mobile: number;
  tablet: number;
}

export interface FunnelData {
  sessions: DeviceMetrics;
  viewProduct: DeviceMetrics;
  addToCart: DeviceMetrics;
  purchase: DeviceMetrics;
}

// Country data
export interface Country {
  name: string;
  code: string;
  sessions: DeviceMetrics;
  conversions: DeviceMetrics;
  revenue: number;
  growth: number;
  flag: string;
}

// Product data
export interface Product {
  id: string;
  name: string;
  category: string;
  views: DeviceMetrics;
  image: string;
  price: number;
}

// Filter types
export type FunnelStage = "sessions" | "viewProduct" | "addToCart" | "purchase";

export interface DateRange {
  start: Date;
  end: Date;
}

// App state
export interface AppState {
  selectedStage: FunnelStage;
  selectedDevice: DeviceType | "all";
  dateRange: DateRange;
}

// Chart data for ECharts
export interface ChartData {
  name: string;
  value: number;
  itemStyle?: {
    color: string;
  };
}
