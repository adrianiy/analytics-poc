import React, { useState } from "react";
import Layout from "./components/Layout/Layout";
import DateFilter from "./components/DateFilter/DateFilter";
import FunnelCarousel from "./components/FunnelCarousel/FunnelCarousel";
import CountryList from "./components/CountryList/CountryList";
import ProductRanking from "./components/ProductRanking/ProductRanking";
import { FunnelStage, DateRange } from "./types";
import { AnalysisPhase } from "./types/analytics";
import { funnelData, countries, products } from "./data/mockData";
import "./App.css";

const App: React.FC = () => {
  // State for managing filters and selections
  const [selectedStage, setSelectedStage] = useState<FunnelStage>("sessions");
  const [currentAnalysisPhase, setCurrentAnalysisPhase] =
    useState<AnalysisPhase>("funnel-core");

  // Function to handle stage selection from the funnel chart
  const handleStageSelect = (stage: FunnelStage) => {
    setSelectedStage(stage);
  };

  // Function to handle analysis phase change
  const handleAnalysisPhaseChange = (phase: AnalysisPhase) => {
    setCurrentAnalysisPhase(phase);
  };

  // Function to handle date range selection
  const handleDateChange = (newDateRange: DateRange) => {
    // Handle date change logic here
    console.log("Date range changed:", newDateRange);
  };

  return (
    <Layout>
      <DateFilter onDateChange={handleDateChange} />

      {/* Funnel Carousel */}
      <FunnelCarousel
        currentPhase={currentAnalysisPhase}
        onPhaseChange={handleAnalysisPhaseChange}
        funnelData={funnelData}
        onStageSelect={handleStageSelect}
      />

      {/* Countries and Products Grid - Only show for funnel-core phase */}
      {currentAnalysisPhase === "funnel-core" && (
        <div className="dashboard-grid">
          <div className="dashboard-item half-width">
            <CountryList
              countries={countries}
              selectedStage={selectedStage}
              selectedDevice="all"
            />
          </div>

          <div className="dashboard-item half-width">
            <ProductRanking
              products={products}
              selectedStage={selectedStage}
              selectedDevice="all"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
