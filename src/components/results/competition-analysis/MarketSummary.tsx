
import React from "react";
import { AnalysisResults } from "@/types/product";
import CompetitionLevel from "./CompetitionLevel";

interface MarketSummaryProps {
  competitionAnalysis: AnalysisResults["competitionAnalysis"];
}

const MarketSummary: React.FC<MarketSummaryProps> = ({ competitionAnalysis }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-3">Resumo Geral do Nicho</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="font-medium">Nível de concorrência:</span>
              <CompetitionLevel level={competitionAnalysis.level} />
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Concorrentes diretos:</span>
              <span>{competitionAnalysis.competitors}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Tendência do nicho:</span>
              <span className="text-green-600">Crescente</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="font-medium">Ticket médio:</span>
              <span>R$ 189,90</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Sua participação:</span>
              <span>5%</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Conc. principais:</span>
              <span>35%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketSummary;
