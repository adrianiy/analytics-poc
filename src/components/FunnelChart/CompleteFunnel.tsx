import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { FunnelData, FunnelStage, DeviceType } from "../../types";
import "./CompleteFunnel.css";

interface CompleteFunnelProps {
  data: FunnelData;
  selectedDevice: DeviceType | "all";
  onStageSelect: (stage: FunnelStage) => void;
}

type StageInfo = {
  key: FunnelStage;
  label: string;
  value: {
    total: number;
    desktop: number;
    mobile: number;
    tablet: number;
  };
};

const CompleteFunnel: React.FC<CompleteFunnelProps> = ({
  data,
  onStageSelect,
}) => {
  // Prepare the stages data
  const stages: StageInfo[] = [
    { key: "sessions", label: "Active Sessions", value: data.sessions },
    { key: "viewProduct", label: "View Product", value: data.viewProduct },
    { key: "addToCart", label: "Active Carts", value: data.addToCart },
    { key: "purchase", label: "Orders", value: data.purchase },
  ];

  // Colors for devices (matching Vue component)
  const deviceColors = [
    ["#FFB178", "#FF9A9A"],
    ["#43c39a", "#0058a5"],
    ["#A0BBFF", "#EC77FF"],
    ["#A0F9FF", "#7795FF"],
    ["#66c4e8", "#4e656f"],
  ];

  // Calculate total sessions for percentage calculation
  const totalSessions = stages[0].value.total;

  // Get device percentage for current stage
  const getDevicePercentage = (
    deviceType: DeviceType,
    stage: StageInfo
  ): number => {
    const deviceValue = stage.value[deviceType];
    const total = stage.value.total;
    return Math.round((deviceValue / total) * 100);
  };

  // Create complete horizontal funnel chart
  const chartOption = useMemo(() => {
    const series: any[] = [];
    const deviceTypes: DeviceType[] = ["desktop", "mobile", "tablet"];

    // Create data points for horizontal funnel
    deviceTypes.forEach((deviceType, idx) => {
      const dataPoints = stages.map((stage, stageIndex) => {
        const deviceValue = stage.value[deviceType];
        // Create smooth transitions between stages
        const xPosition = stageIndex * 3; // Spacing between stages
        return [xPosition, deviceValue];
      });

      series.push({
        name: deviceType,
        type: "line",
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: deviceColors[idx][0] },
              { offset: 1, color: deviceColors[idx][1] },
            ],
          },
        },
        lineStyle: {
          width: 0,
        },
        symbol: "none",
        smooth: true,
        stack: "total",
        data: dataPoints,
      });
    });

    return {
      grid: {
        left: "5%",
        right: "5%",
        top: "15%",
        bottom: "15%",
        containLabel: false,
      },
      xAxis: {
        type: "value",
        show: false,
        min: 0,
        max: (stages.length - 1) * 3,
      },
      yAxis: {
        type: "value",
        show: false,
        max: totalSessions * 1.1,
      },
      series,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
        formatter: (params: any) => {
          if (params && params.length > 0) {
            const stageIndex = Math.round(params[0].data[0] / 3);
            const stage = stages[stageIndex];
            const deviceType = params[0].seriesName as DeviceType;
            const deviceValue = stage.value[deviceType];
            const devicePercentage = getDevicePercentage(deviceType, stage);
            const conversionRate = (
              (stage.value.total / totalSessions) *
              100
            ).toFixed(1);

            return `
              <div style="padding: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <div style="font-weight: 600; font-size: 14px; margin-bottom: 8px; color: #1a202c;">
                  ${stage.label}
                </div>
                <div style="color: #2b6cb0; font-weight: 500; margin-bottom: 6px; font-size: 13px;">
                  ${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}
                </div>
                <div style="margin-bottom: 4px; font-size: 13px; color: #2d3748;">
                  <strong>${deviceValue.toLocaleString()}</strong> usuarios
                </div>
                <div style="font-size: 12px; color: #718096; margin-bottom: 2px;">
                  ${devicePercentage}% del total en esta etapa
                </div>
                <div style="font-size: 12px; color: #718096;">
                  ${conversionRate}% de conversión general
                </div>
              </div>
            `;
          }
          return "";
        },
      },
    };
  }, [stages, totalSessions, deviceColors]);

  // Get device icon
  const getDeviceIcon = (deviceType: DeviceType): string => {
    switch (deviceType) {
      case "desktop":
        return "💻";
      case "mobile":
        return "📱";
      case "tablet":
        return "📟";
      default:
        return "⚫";
    }
  };

  const handleStageClick = (stage: FunnelStage) => {
    onStageSelect(stage);
  };

  return (
    <div className="complete-funnel-container">
      {/* Title */}
      <div className="funnel-title-section">
        <h2 className="funnel-title">Conversion Funnel</h2>
      </div>

      {/* Stage Headers - All stages visible at once */}
      <div className="stages-header">
        {stages.map((stage, index) => {
          const conversionRate = (
            (stage.value.total / totalSessions) *
            100
          ).toFixed(1);
          return (
            <div
              key={stage.key}
              className="stage-header-item"
              onClick={() => handleStageClick(stage.key)}
            >
              <div className="stage-number">
                {stage.value.total.toLocaleString()}
              </div>
              <div className="stage-name">{stage.label}</div>
              <div className="stage-conversion">
                {conversionRate}% Conversion rate
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Horizontal Chart */}
      <div className="chart-container">
        <ReactECharts
          option={chartOption}
          style={{ height: "300px", width: "100%" }}
          onEvents={{
            click: (params: any) => {
              if (params.dataIndex !== undefined) {
                const stageIndex = Math.round(params.data[0] / 3);
                const stage = stages[stageIndex];
                if (stage) {
                  handleStageClick(stage.key);
                }
              }
            },
          }}
        />
      </div>

      {/* Legend with all device percentages */}
      <div className="complete-legend">
        {(["desktop", "mobile", "tablet"] as DeviceType[]).map(
          (deviceType, index) => {
            // Calculate average percentage across all stages
            const avgPercentage = Math.round(
              stages.reduce(
                (sum, stage) => sum + getDevicePercentage(deviceType, stage),
                0
              ) / stages.length
            );

            return (
              <div key={deviceType} className="legend-item">
                <div
                  className="device-circle"
                  style={{
                    background: deviceColors[index][0],
                  }}
                />
                <span className="device-icon">{getDeviceIcon(deviceType)}</span>
                <div className="device-info">
                  <span className="device-percentage">{avgPercentage}%</span>
                  <span className="device-name">{deviceType}</span>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Conversion Metrics */}
      <div className="conversion-metrics">
        <div className="metric-item">
          <div className="metric-value">
            {((data.viewProduct.total / data.sessions.total) * 100).toFixed(1)}%
          </div>
          <div className="metric-label">Product View Rate</div>
        </div>
        <div className="metric-item">
          <div className="metric-value">
            {((data.addToCart.total / data.viewProduct.total) * 100).toFixed(1)}
            %
          </div>
          <div className="metric-label">Add to Cart Rate</div>
        </div>
        <div className="metric-item">
          <div className="metric-value">
            {((data.purchase.total / data.addToCart.total) * 100).toFixed(1)}%
          </div>
          <div className="metric-label">Purchase Rate</div>
        </div>
      </div>
    </div>
  );
};

export default CompleteFunnel;
