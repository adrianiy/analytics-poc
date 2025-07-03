import React from "react";
import { AnalysisPhase } from "../../types/analytics";
import "./AnalysisNavigator.css";

interface AnalysisNavigatorProps {
  currentPhase: AnalysisPhase;
  onPhaseChange: (phase: AnalysisPhase) => void;
}

const AnalysisNavigator: React.FC<AnalysisNavigatorProps> = ({
  currentPhase,
  onPhaseChange,
}) => {
  const phases = [
    {
      id: "pre-analysis" as AnalysisPhase,
      title: "Canales",
      subtitle: "Marketing + Bots",
      icon: "📊",
      description: "Análisis de canales y detección de bots",
    },
    {
      id: "funnel-core" as AnalysisPhase,
      title: "Conversión",
      subtitle: "Funnel Principal",
      icon: "🎯",
      description: "Análisis del funnel de conversión",
    },
    {
      id: "post-analysis" as AnalysisPhase,
      title: "Atribución",
      subtitle: "Secciones Web",
      icon: "📈",
      description: "Atribución de ventas por secciones",
      disabled: true,
    },
  ];

  return (
    <div className="analysis-navigator">
      <div className="analysis-phases">
        {phases.map((phase, index) => (
          <React.Fragment key={phase.id}>
            <div
              className={`analysis-phase ${
                currentPhase === phase.id ? "active" : ""
              } ${phase.disabled ? "disabled" : ""}`}
              onClick={() => !phase.disabled && onPhaseChange(phase.id)}
            >
              <div className="phase-icon">{phase.icon}</div>
              <div className="phase-content">
                <div className="phase-title">{phase.title}</div>
                <div className="phase-subtitle">{phase.subtitle}</div>
              </div>
              {phase.disabled && (
                <div className="coming-soon">Próximamente</div>
              )}
            </div>

            {index < phases.length - 1 && (
              <div className="phase-connector">
                <div className="connector-line"></div>
                <div className="connector-arrow">→</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AnalysisNavigator;
