import React from "react";
import { Button } from "@/components/ui/button";
import { TimeRange } from "@/services/trending";

interface TimeRangeSelectorProps {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  timeRange,
  setTimeRange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button 
        size="sm" 
        variant={timeRange === "24h" ? "default" : "outline"} 
        onClick={() => setTimeRange("24h")}
      >
        Últimas 24h
      </Button>
      <Button 
        size="sm" 
        variant={timeRange === "7d" ? "default" : "outline"} 
        onClick={() => setTimeRange("7d")}
      >
        7 dias
      </Button>
      <Button 
        size="sm" 
        variant={timeRange === "30d" ? "default" : "outline"} 
        onClick={() => setTimeRange("30d")}
      >
        30 dias
      </Button>
      <Button 
        size="sm" 
        variant={timeRange === "6m" ? "default" : "outline"} 
        onClick={() => setTimeRange("6m")}
      >
        6 meses
      </Button>
      <Button 
        size="sm" 
        variant={timeRange === "1y" ? "default" : "outline"} 
        onClick={() => setTimeRange("1y")}
      >
        1 ano
      </Button>
    </div>
  );
};

export default TimeRangeSelector;
