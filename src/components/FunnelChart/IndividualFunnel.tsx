import React, { useMemo, useRef, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import {
  Monitor,
  Smartphone,
  Tablet,
  Users,
  Search,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { FunnelData, FunnelStage, DeviceType } from "../../types";
import "./IndividualFunnel.css";

interface IndividualFunnelProps {
  data: FunnelData;
  start: FunnelStage;
  end: FunnelStage;
  stops: [number, number];
  active: boolean;
  legend?: boolean;
  rate?: boolean;
  onStageSelect: (stage: FunnelStage) => void;
}

interface EChartsSeriesItem {
  type: string;
  areaStyle: {
    color: {
      type: string;
      x: number;
      y: number;
      x2: number;
      y2: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  lineStyle: {
    width: number;
  };
  symbol: string;
  smooth: boolean;
  data: Array<[number, number]>;
}

const IndividualFunnel: React.FC<IndividualFunnelProps> = ({
  data,
  start,
  end,
  stops,
  active,
  legend = false,
  rate = false,
  onStageSelect,
}) => {
  const chartRef = useRef<ReactECharts>(null);

  // Colors for devices (matching Vue component)
  const colors = [
    ["#FFB178", "#FF9A9A"],
    ["#43c39a", "#0058a5"],
    ["#A0BBFF", "#EC77FF"],
    ["#A0F9FF", "#7795FF"],
    ["#66c4e8", "#4e656f"],
  ];

  const deviceTypes: DeviceType[] = ["desktop", "mobile", "tablet"];

  // Get stage title and icon
  const getStageTitle = (stage: FunnelStage): string => {
    switch (stage) {
      case "sessions":
        return "Sesiones";
      case "viewProduct":
        return "Visualizaciones";
      case "addToCart":
        return "Carrito";
      case "purchase":
        return "Compras";
      default:
        return stage;
    }
  };

  const getStageIcon = (stage: FunnelStage) => {
    switch (stage) {
      case "sessions":
        return <Users size={18} className="stage-icon" />;
      case "viewProduct":
        return <Search size={18} className="stage-icon" />;
      case "addToCart":
        return <ShoppingCart size={18} className="stage-icon" />;
      case "purchase":
        return <CreditCard size={18} className="stage-icon" />;
      default:
        return <Users size={18} className="stage-icon" />;
    }
  };

  const getConversionIcon = (rate: number) => {
    return rate > 0 ? (
      <TrendingUp size={14} className="conversion-icon" />
    ) : (
      <TrendingDown size={14} className="conversion-icon" />
    );
  };

  // Get stage value
  const getStageValue = (stage: FunnelStage): number => {
    return data[stage].total;
  };

  // Get max stage value
  const getMaxStageValue = (stage: FunnelStage): number => {
    return Math.max(
      ...deviceTypes.map((deviceType) => data[stage][deviceType])
    );
  };

  // Get device percentage
  const getPercentage = (
    deviceType: DeviceType,
    stage: FunnelStage
  ): number => {
    const stageData = data[stage];
    const deviceValue = stageData[deviceType];
    const total = stageData.total;
    return Math.round((deviceValue / total) * 100);
  };

  // Get color with interpolation
  const getColor = (idx: number): string => {
    const colorPair = colors[idx];
    const t = stops[0];
    // Simple linear interpolation
    const r1 = parseInt(colorPair[0].slice(1, 3), 16);
    const g1 = parseInt(colorPair[0].slice(3, 5), 16);
    const b1 = parseInt(colorPair[0].slice(5, 7), 16);
    const r2 = parseInt(colorPair[1].slice(1, 3), 16);
    const g2 = parseInt(colorPair[1].slice(3, 5), 16);
    const b2 = parseInt(colorPair[1].slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Get device icon component
  const getDeviceIcon = (deviceType: DeviceType) => {
    switch (deviceType) {
      case "desktop":
        return <Monitor size={16} className="device-icon" />;
      case "mobile":
        return <Smartphone size={16} className="device-icon" />;
      case "tablet":
        return <Tablet size={16} className="device-icon" />;
      default:
        return <Monitor size={16} className="device-icon" />;
    }
  };

  // Calculate conversion rate
  const conversionRate = useMemo(() => {
    const sessions = getStageValue("sessions");
    const stageValue = getStageValue(start);
    return Math.round((stageValue / sessions) * 10000) / 100;
  }, [data, start]);

  // Format number
  const formatNumber = (n: number): string => {
    return Math.ceil(n).toLocaleString("es-ES");
  };

  // Get stage value for device (using real values)
  const getStageValueForDevice = (
    deviceType: DeviceType,
    stage: FunnelStage
  ): number => {
    return data[stage][deviceType];
  };

  // Chart options
  const chartOptions = useMemo(() => {
    const series: EChartsSeriesItem[] = [];

    deviceTypes.forEach((deviceType, idx) => {
      const startValue = getStageValueForDevice(deviceType, start);
      const endValue = getStageValueForDevice(deviceType, end);

      series.push({
        type: "line",
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: getColor(idx) },
              { offset: 1, color: colors[idx][1] },
            ],
          },
        },
        lineStyle: {
          width: 0,
        },
        symbol: "none",
        smooth: true,
        data: [
          [0, startValue],
          [1, startValue],
          [2, endValue],
          [3, endValue],
        ],
      });
    });

    return {
      grid: {
        left: "0%",
        right: "0%",
        top: "5%",
        bottom: "5%",
        containLabel: false,
      },
      xAxis: {
        type: "value",
        show: false,
        min: 0,
        max: 3,
      },
      yAxis: {
        type: "value",
        show: false,
        max: getMaxStageValue("sessions"),
      },
      series,
      tooltip: {
        show: false,
      },
    };
  }, [data, start, end, stops]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = formatNumber(getStageValue(start));
  const conversionText =
    start === "addToCart" ? "Carritos por sesión" : "Tasa de conversión";

  return (
    <div
      className={`individual-funnel-container ${active ? "active" : ""}`}
      onClick={() => onStageSelect(start)}
    >
      <div className="data-container">
        <div className="stage-header">
          <div className="title-section">
            {getStageIcon(start)}
            <h3 className="stage-title">{getStageTitle(start)}</h3>
          </div>
          <h2 className="stage-value">{value}</h2>
        </div>
        {rate && start !== "sessions" ? (
          <div className="conversion-section">
            {getConversionIcon(conversionRate)}
            <span className="conversion-rate">{conversionRate}%</span>
            <span className="conversion-label">{conversionText}</span>
          </div>
        ) : (
          <div className="conversion-placeholder"></div>
        )}
      </div>

      <div className="chart-container">
        <ReactECharts
          ref={chartRef}
          option={chartOptions}
          style={{ height: "220px", width: "100%" }}
          opts={{ renderer: "canvas" }}
        />
      </div>

      {legend && (
        <div className="legend">
          {deviceTypes.map((deviceType, index) => (
            <div
              key={deviceType}
              className="item row middle"
              title={deviceType}
            >
              <div
                className="circle"
                style={{
                  background: getColor(index),
                }}
              />
              {getDeviceIcon(deviceType)}
              <div className="row baseline">
                <span>{getPercentage(deviceType, start)}</span>
                <span className="small">%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndividualFunnel;
