import React from "react";
import { Country, FunnelStage, DeviceType } from "../../types";
import "./CountryList.css";

interface CountryListProps {
  countries: Country[];
  selectedStage: FunnelStage;
  selectedDevice: DeviceType | "all";
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  selectedStage,
  selectedDevice,
}) => {
  // Sort countries based on selected stage and device
  const sortedCountries = React.useMemo(() => {
    return [...countries].sort((a, b) => {
      let valueA, valueB;

      if (selectedStage === "sessions") {
        valueA =
          selectedDevice === "all"
            ? a.sessions.total
            : a.sessions[selectedDevice];
        valueB =
          selectedDevice === "all"
            ? b.sessions.total
            : b.sessions[selectedDevice];
      } else if (selectedStage === "purchase") {
        valueA =
          selectedDevice === "all"
            ? a.conversions.total
            : a.conversions[selectedDevice];
        valueB =
          selectedDevice === "all"
            ? b.conversions.total
            : b.conversions[selectedDevice];
      } else {
        // For other stages we'll use the sessions as default
        valueA =
          selectedDevice === "all"
            ? a.sessions.total
            : a.sessions[selectedDevice];
        valueB =
          selectedDevice === "all"
            ? b.sessions.total
            : b.sessions[selectedDevice];
      }

      return valueB - valueA;
    });
  }, [countries, selectedStage, selectedDevice]);

  // Get the correct value based on selected stage and device
  const getMetricValue = (country: Country) => {
    if (selectedStage === "sessions") {
      return selectedDevice === "all"
        ? country.sessions.total
        : country.sessions[selectedDevice];
    } else if (selectedStage === "purchase") {
      return selectedDevice === "all"
        ? country.conversions.total
        : country.conversions[selectedDevice];
    }
    // For other stages, default to sessions
    return selectedDevice === "all"
      ? country.sessions.total
      : country.sessions[selectedDevice];
  };

  // Get the conversion rate
  const getConversionRate = (country: Country) => {
    const sessions =
      selectedDevice === "all"
        ? country.sessions.total
        : country.sessions[selectedDevice];

    const conversions =
      selectedDevice === "all"
        ? country.conversions.total
        : country.conversions[selectedDevice];

    if (!sessions) return 0;
    return (conversions / sessions) * 100;
  };

  // Get metric label based on selected stage
  const getMetricLabel = () => {
    switch (selectedStage) {
      case "sessions":
        return "Sessions";
      case "viewProduct":
        return "Views";
      case "addToCart":
        return "Cart Adds";
      case "purchase":
        return "Purchases";
      default:
        return "Sessions";
    }
  };

  return (
    <div className="country-list-container">
      <h2 className="country-list-title">Countries</h2>
      <div className="country-list-header">
        <span className="header-country"></span>
        <span className="header-metric">{getMetricLabel()}</span>
        <span className="header-conversion">C.R</span>
        <span className="header-revenue">Crec.</span>
      </div>
      <div className="country-list">
        {sortedCountries.map((country) => (
          <div key={country.code} className="country-item">
            <div className="country-name-container">
              <span className="country-name">{country.name}</span>
            </div>
            <div className="country-metric">
              {getMetricValue(country).toLocaleString()}
            </div>
            <div className="country-conversion">
              {getConversionRate(country).toFixed(1)}%
            </div>
            <div
              className={`country-revenue ${
                country.growth >= 0
                  ? "country-growth-positive"
                  : "country-growth-negative"
              }`}
            >
              {country.growth > 0 ? "+" : ""}
              {country.growth.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
