
import React from "react";
import { AnalysisResults } from "@/types/product";
import CompetitionLevel from "./CompetitionLevel";

interface CompetitionSummaryProps {
  competitionAnalysis: AnalysisResults["competitionAnalysis"];
}

const CompetitionSummary: React.FC<CompetitionSummaryProps> = ({ competitionAnalysis }) => {
  return (
    <div className="space-y-3">
      <p className="text-gray-700">
        <span className="font-medium">Nível de concorrência:</span>{" "}
        <CompetitionLevel level={competitionAnalysis.level} />
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Número estimado de concorrentes diretos:</span> {competitionAnalysis.competitors}
      </p>
    </div>
  );
};

export default CompetitionSummary;
