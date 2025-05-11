
import React from "react";
import { AnalysisResults } from "@/types/product";

interface CompetitionLevelProps {
  level: AnalysisResults["competitionAnalysis"]["level"];
}

const CompetitionLevel: React.FC<CompetitionLevelProps> = ({ level }) => {
  const getLevelColor = () => {
    if (level === "baixa") return "text-green-600";
    if (level === "média") return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <span className={`font-medium ${getLevelColor()}`}>
      {level}
    </span>
  );
};

export default CompetitionLevel;
