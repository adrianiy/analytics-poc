import React, { useState } from "react";
import { DateRange } from "../../types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "./DateFilter.css";

interface DateFilterProps {
  onDateChange: (dateRange: DateRange) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onDateChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("today");

  // Get date ranges
  const getDateRange = (filter: string): DateRange => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const weekStart = new Date();
    weekStart.setDate(today.getDate() - 7);

    const monthStart = new Date();
    monthStart.setDate(today.getDate() - 30);

    switch (filter) {
      case "today":
        return { start: today, end: today };
      case "yesterday":
        return { start: yesterday, end: yesterday };
      case "last7days":
        return { start: weekStart, end: today };
      case "last30days":
        return { start: monthStart, end: today };
      default:
        return { start: today, end: today };
    }
  };

  // Format date range for display
  const formatDateRange = (dateRange: DateRange): string => {
    const { start, end } = dateRange;
    const isSameDay = format(start, "yyyy-MM-dd") === format(end, "yyyy-MM-dd");

    if (isSameDay) {
      return format(start, "d 'de' MMMM yyyy", { locale: es });
    } else {
      return `${format(start, "d 'de' MMM", { locale: es })} - ${format(
        end,
        "d 'de' MMM yyyy",
        { locale: es }
      )}`;
    }
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    const dateRange = getDateRange(filter);
    onDateChange(dateRange);
  };

  return (
    <div className="date-filter-container">
      <div className="date-filter-header">
        <h2 className="date-filter-title">
          Periodo: {formatDateRange(getDateRange(selectedFilter))}
        </h2>
      </div>
      <div className="date-filter-options">
        <button
          className={`date-btn ${selectedFilter === "today" ? "active" : ""}`}
          onClick={() => handleFilterChange("today")}
        >
          Hoy
        </button>
        <button
          className={`date-btn ${
            selectedFilter === "yesterday" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("yesterday")}
        >
          Ayer
        </button>
        <button
          className={`date-btn ${
            selectedFilter === "last7days" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("last7days")}
        >
          Últimos 7 días
        </button>
        <button
          className={`date-btn ${
            selectedFilter === "last30days" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("last30days")}
        >
          Últimos 30 días
        </button>
      </div>
    </div>
  );
};

export default DateFilter;
