import React from "react";
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
  const phases = [
    { id: "pre-analysis" as AnalysisPhase, title: "Canales" },
    { id: "funnel-core" as AnalysisPhase, title: "Conversión" },
    { id: "post-analysis" as AnalysisPhase, title: "Atribución" },
  ];

  const renderPhaseContent = (phase: { id: AnalysisPhase; title: string }) => {
    if (phase.id === "funnel-core") {
      return <FunnelSections data={funnelData} onStageSelect={onStageSelect} />;
    }

    if (phase.id === "pre-analysis") {
      return (
        <div className="phase-content">
          <div className="metrics-grid">
            <div className="metric">
              <span className="value">137K</span>
              <span className="label">Total visits</span>
            </div>
            <div className="metric">
              <span className="value">25K</span>
              <span className="label">Newsletter</span>
            </div>
            <div className="metric">
              <span className="value">65K</span>
              <span className="label">Organic</span>
            </div>
            <div className="metric">
              <span className="value">29K</span>
              <span className="label">Google</span>
            </div>
            <div className="metric">
              <span className="value">18K</span>
              <span className="label">Push</span>
            </div>
            <div className="metric">
              <span className="value">12%</span>
              <span className="label">Bots detected</span>
            </div>
          </div>
        </div>
      );
    }

    if (phase.id === "post-analysis") {
      return (
        <div className="phase-content">
          <div className="coming-soon">
            <span>Revenue attribution</span>
            <span>Available soon</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="funnel-carousel">
      {/* Phase Navigation */}
      <div className="phase-navigation">
        {phases.map((phase) => (
          <button
            key={phase.id}
            className={`phase-tab ${currentPhase === phase.id ? "active" : ""}`}
            onClick={() => onPhaseChange(phase.id)}
          >
            {phase.title}
          </button>
        ))}
        <div
          className="active-indicator"
          style={{
            transform: `translateX(${
              phases.findIndex((p) => p.id === currentPhase) * 100
            }%)`,
          }}
        />
      </div>

      {/* Phase Content */}
      <div className="carousel-content">
        {phases.map((phase) => (
          <div
            key={phase.id}
            className={`phase-section ${
              currentPhase === phase.id ? "active" : "inactive"
            }`}
          >
            {currentPhase === phase.id && renderPhaseContent(phase)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunnelCarousel;
