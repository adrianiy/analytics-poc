import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { BarChart3, Shield } from "lucide-react";
import { AnalysisPhase } from "../../types/analytics";
import FunnelSections from "../FunnelChart/FunnelSections";
import { FunnelData, FunnelStage } from "../../types";
import "./FunnelCarousel.css";

interface FunnelCarouselProps {
  currentPhase: AnalysisPhase;
  onPhaseChange: (phase: AnalysisPhase) => void;
  funnelData: FunnelData;
  onStageSelect: (stage: FunnelStage) => void;
}

const FunnelCarousel: React.FC<FunnelCarouselProps> = ({
  currentPhase,
  onPhaseChange,
  funnelData,
  onStageSelect,
}) => {
  // Configuración del mini donut chart
  const getMiniDonutOption = () => ({
    animation: true,
    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],
        data: [
          { value: 88, name: "Real", itemStyle: { color: "#4299e1" } },
          { value: 12, name: "Bots", itemStyle: { color: "#e2e8f0" } },
        ],
        label: { show: false },
        emphasis: { disabled: true },
        silent: true,
      },
    ],
  });

  // Configuración del pie chart expandido para bots
  const getBotsPieChartOption = () => ({
    animation: true,
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151",
        fontSize: 12,
      },
      padding: [12, 16],
      formatter: function (params: any) {
        const totalUsers = 120; // Total de usuarios (88% real + 12% bots = 120K aprox)
        const realUsers = Math.round((totalUsers * 88) / 100);
        const botUsers = Math.round((totalUsers * 12) / 100);
        const absoluteValue =
          params.name === "Real Users" ? realUsers : botUsers;

        return `
          <div style="margin-bottom: 8px;">
            <div style="font-weight: 600; font-size: 13px; color: #1f2937; margin-bottom: 6px;">
              ${params.name}
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <div style="color: #6b7280; font-size: 12px;">
                <span style="font-weight: 500;">${absoluteValue}K</span> usuarios
              </div>
              <div style="color: #6b7280; font-size: 12px;">
                <span style="font-weight: 500;">${params.value}%</span> del total
              </div>
            </div>
          </div>
        `.trim();
      },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["30%", "50%"],
        data: [
          {
            value: 88,
            name: "Real Users",
            itemStyle: { color: "#4299e1" },
          },
          {
            value: 12,
            name: "Bots",
            itemStyle: { color: "#e5e7eb" },
          },
        ],
        label: { show: false },
        emphasis: {
          disabled: true,
        },
      },
    ],
  });

  // Configuración del gráfico de barras para canales
  const getChannelBarChartOption = () => ({
    animation: true,
    grid: {
      left: "1%",
      right: "1%",
      top: "3%",
      bottom: "12%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Organic", "Google", "Newsletter", "Push"],
      axisLabel: {
        fontSize: 11,
        color: "#6b7280",
        fontWeight: "normal",
      },
      axisLine: {
        lineStyle: {
          color: "#e5e7eb",
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 10,
        color: "#9ca3af",
        formatter: function (value: number) {
          if (value >= 1000) {
            return (value / 1000).toFixed(0) + "K";
          }
          return value.toString();
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: "bar",
        data: [
          { value: 65, itemStyle: { color: "#2b6cb0" } },
          { value: 29, itemStyle: { color: "#4299e1" } },
          { value: 25, itemStyle: { color: "#63b3ed" } },
          { value: 18, itemStyle: { color: "#90cdf4" } },
        ],
        barWidth: "60%",
        label: {
          show: true,
          position: "top",
          formatter: function (params: any) {
            const percentages = {
              Organic: 47,
              Google: 21,
              Newsletter: 18,
              Push: 13,
            };
            return percentages[params.name as keyof typeof percentages] + "%";
          },
          fontSize: 12,
          color: "#4a5568",
          fontWeight: "500",
        },
        emphasis: {
          disabled: true,
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151",
        fontSize: 12,
      },
      padding: [12, 16],
      formatter: function (params: any) {
        const data = params[0];
        const percentages = {
          Organic: 47,
          Google: 21,
          Newsletter: 18,
          Push: 13,
        };
        const percentage = percentages[data.name as keyof typeof percentages];

        return `
          <div style="margin-bottom: 8px;">
            <div style="font-weight: 600; font-size: 13px; color: #1f2937; margin-bottom: 6px;">
              ${data.name}
            </div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <div style="color: #6b7280; font-size: 12px;">
                <span style="font-weight: 500;">${data.value}K</span> visitas
              </div>
              <div style="color: #6b7280; font-size: 12px;">
                <span style="font-weight: 500;">${percentage}%</span> del total
              </div>
            </div>
          </div>
        `.trim();
      },
    },
  });

  // Estado para controlar transiciones
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevPhase, setPrevPhase] = useState<AnalysisPhase>(currentPhase);

  // Efecto para detectar cambios de fase y activar la transición
  useEffect(() => {
    if (currentPhase !== prevPhase) {
      setIsTransitioning(true);

      // Tiempo para la transición completa
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevPhase(currentPhase);
      }, 500); // Duración de la transición

      return () => clearTimeout(timer);
    }
  }, [currentPhase, prevPhase]);

  // Manejador de cambio de fase con animación
  const handlePhaseChange = (phase: AnalysisPhase) => {
    if (phase === currentPhase) return;

    setIsTransitioning(true);
    onPhaseChange(phase);
  };

  // Determinar clase para el carousel según fase activa
  const getCarouselTrackClass = () => {
    if (currentPhase === "pre-analysis") return "pre-active";
    if (currentPhase === "post-analysis") return "post-active";
    return ""; // Funnel activo (default)
  };

  // Renderizado del contenido de Pre-Analysis expandido
  const renderExpandedPreContent = () => (
    <div className="phase-content">
      <div className="pre-analysis-expanded">
        <div className="charts-container">
          <div className="left-chart">
            <div className="stage-header">
              <div className="title-section">
                <BarChart3 size={18} className="stage-icon" />
                <h3 className="stage-title">Distribución por Canal</h3>
              </div>
              <h2 className="stage-value">137K</h2>
            </div>
            <ReactECharts
              option={getChannelBarChartOption()}
              style={{ height: "280px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
          <div className="right-chart">
            <div className="stage-header">
              <div className="title-section">
                <Shield size={18} className="stage-icon" />
                <h3 className="stage-title">Calidad del Tráfico</h3>
              </div>
              <h2 className="stage-value">88%</h2>
            </div>
            <ReactECharts
              option={getBotsPieChartOption()}
              style={{ height: "250px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color user-color"></div>
                <span>88% Real Users</span>
              </div>
              <div className="legend-item">
                <div className="legend-color bot-color"></div>
                <span>12% Bots</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizado del contenido de Post-Analysis expandido
  const renderExpandedPostContent = () => (
    <div className="phase-content">
      <div className="coming-soon">
        <span>Revenue attribution</span>
        <span>Available soon</span>
      </div>
    </div>
  );

  // Datos del pre-análisis - versión con onClick actualizado
  const renderPreAnalysisPanel = () => (
    <div
      className={`side-panel pre-panel ${
        currentPhase === "pre-analysis" ? "active" : ""
      }`}
      onClick={() => handlePhaseChange("pre-analysis")}
    >
      <div className="panel-content">
        <h3>Pre</h3>
        <div className="panel-summary">
          {/* Traffic Quality Section */}
          <div className="panel-section">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="mini-donut-container">
                <ReactECharts
                  option={getMiniDonutOption()}
                  style={{ height: "60px", width: "60px" }}
                  opts={{ renderer: "svg" }}
                />
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color user-color"></div>
                  <span>88% Real</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color bot-color"></div>
                  <span>12% Bots</span>
                </div>
              </div>
            </div>
          </div>

          {/* Channels Section */}
          <div className="panel-section">
            <div className="channels-container">
              <div className="channel-pill organic-pill">Organic 47%</div>
              <div className="channel-pill google-pill">Google 21%</div>
              <div className="channel-pill newsletter-pill">News 18%</div>
              <div className="channel-pill push-pill">Push 13%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Datos del post-análisis - versión con onClick actualizado
  const renderPostAnalysisPanel = () => (
    <div
      className={`side-panel post-panel ${
        currentPhase === "post-analysis" ? "active" : ""
      }`}
      onClick={() => handlePhaseChange("post-analysis")}
    >
      <div className="panel-content">
        <h3>Atribución</h3>
        <div className="panel-summary">
          <div className="panel-metric">
            <span className="label">Revenue attribution</span>
          </div>
          <div className="panel-metric">
            <span className="label">Próximamente</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Placeholder con onClick actualizado
  const renderFunnelPlaceholder = () => (
    <div
      className="side-panel funnel-panel"
      onClick={() => handlePhaseChange("funnel-core")}
      style={{ cursor: "pointer" }}
    >
      <div className="panel-content">
        <h3>Análisis de Sesiones</h3>
        <div className="panel-summary">
          <div className="panel-metric">
            <span className="label">Análisis del embudo</span>
          </div>
          <div className="panel-metric">
            <span className="label">Click para activar</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="full-width-carousel">
      <div className={`carousel-track ${getCarouselTrackClass()}`}>
        {/* Primera sección - cambia según la fase activa */}
        <div className="panel-inner">
          <div className="content-wrapper">
            {/* Pre Analysis contenido expandido */}
            <div
              className={`content-container ${
                currentPhase === "pre-analysis"
                  ? "active content-fade-in"
                  : "inactive"
              }`}
            >
              <div className="center-content">{renderExpandedPreContent()}</div>
            </div>

            {/* Pre Analysis panel compacto */}
            <div
              className={`content-container ${
                currentPhase !== "pre-analysis"
                  ? "active content-fade-in"
                  : "inactive"
              }`}
              style={{
                display:
                  currentPhase !== "pre-analysis" || isTransitioning
                    ? "flex"
                    : "none",
              }}
            >
              {renderPreAnalysisPanel()}
            </div>
          </div>
        </div>

        {/* Segunda sección - cambia según la fase activa */}
        <div className="center-inner">
          <div className="content-wrapper">
            {/* Funnel contenido central */}
            <div
              className={`content-container funnel-container ${
                currentPhase === "funnel-core"
                  ? "active content-fade-in"
                  : "inactive"
              }`}
              style={{
                position:
                  currentPhase === "funnel-core" ? "relative" : "absolute",
              }}
            >
              <div className="center-content">
                <FunnelSections
                  data={funnelData}
                  onStageSelect={onStageSelect}
                />
              </div>
            </div>

            {/* Placeholder cuando funnel no está activo */}
            <div
              className={`content-container ${
                currentPhase !== "funnel-core"
                  ? "active content-fade-in"
                  : "inactive"
              }`}
              style={{
                display:
                  currentPhase !== "funnel-core" || isTransitioning
                    ? "flex"
                    : "none",
              }}
            >
              {currentPhase === "post-analysis"
                ? renderPostAnalysisPanel()
                : renderFunnelPlaceholder()}
            </div>
          </div>
        </div>

        {/* Tercera sección - cambia según la fase activa */}
        <div className="panel-inner">
          <div className="content-wrapper">
            {/* Post Analysis contenido expandido */}
            <div
              className={`content-container ${
                currentPhase === "post-analysis"
                  ? "active content-fade-in"
                  : "inactive"
              }`}
            >
              <div className="center-content">
                {renderExpandedPostContent()}
              </div>
            </div>

            {/* Post Analysis panel compacto */}
            <div
              className={`content-container ${
                currentPhase !== "post-analysis"
                  ? "active content-fade-in"
                  : "inactive"
              }`}
              style={{
                display:
                  currentPhase !== "post-analysis" || isTransitioning
                    ? "flex"
                    : "none",
              }}
            >
              {renderPostAnalysisPanel()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelCarousel;
