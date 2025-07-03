import React, { useState } from "react";
import IndividualFunnel from "./IndividualFunnel";
import { FunnelData, FunnelStage } from "../../types";
import "./FunnelSections.css";

interface FunnelSectionsProps {
  data: FunnelData;
  onStageSelect: (stage: FunnelStage) => void;
}

const FunnelSections: React.FC<FunnelSectionsProps> = ({
  data,
  onStageSelect,
}) => {
  const [activeKpi, setActiveKpi] = useState<FunnelStage>("sessions");

  const handleKpiChange = (stage: FunnelStage) => {
    setActiveKpi(stage);
    onStageSelect(stage);
  };

  return (
    <div className="funnel-sections-container">
      <div className="funnel-sections-grid">
        {/* Section 1: Sessions to View Product */}
        <div
          className="funnel-section"
          onClick={() => handleKpiChange("sessions")}
        >
          <IndividualFunnel
            data={data}
            start="sessions"
            end="viewProduct"
            stops={[0, 0.25]}
            active={activeKpi === "sessions"}
            legend={true}
            onStageSelect={handleKpiChange}
          />
        </div>

        {/* Section 2: View Product to Add to Cart */}
        <div
          className="funnel-section"
          onClick={() => handleKpiChange("viewProduct")}
        >
          <IndividualFunnel
            data={data}
            start="viewProduct"
            end="addToCart"
            stops={[0.25, 0.5]}
            active={activeKpi === "viewProduct"}
            rate={true}
            legend={true}
            onStageSelect={handleKpiChange}
          />
        </div>

        {/* Section 3: Add to Cart to Purchase */}
        <div
          className="funnel-section"
          onClick={() => handleKpiChange("addToCart")}
        >
          <IndividualFunnel
            data={data}
            start="addToCart"
            end="purchase"
            stops={[0.5, 0.75]}
            active={activeKpi === "addToCart"}
            rate={true}
            legend={true}
            onStageSelect={handleKpiChange}
          />
        </div>

        {/* Section 4: Purchase (final) */}
        <div
          className="funnel-section"
          onClick={() => handleKpiChange("purchase")}
        >
          <IndividualFunnel
            data={data}
            start="purchase"
            end="purchase"
            stops={[0.75, 1]}
            active={activeKpi === "purchase"}
            rate={true}
            legend={true}
            onStageSelect={handleKpiChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FunnelSections;
