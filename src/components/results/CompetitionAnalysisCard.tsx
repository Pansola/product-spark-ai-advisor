
import React from "react";
import { Users } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import CompetitionSummary from "./competition-analysis/CompetitionSummary";
import MarketSummary from "./competition-analysis/MarketSummary";
import SwotAnalysis from "./competition-analysis/SwotAnalysis";
import EntryBarriers from "./competition-analysis/EntryBarriers";
import StrategicRecommendations from "./competition-analysis/StrategicRecommendations";

interface CompetitionAnalysisCardProps {
  competitionAnalysis: AnalysisResults["competitionAnalysis"];
  id?: string;
}

const CompetitionAnalysisCard: React.FC<CompetitionAnalysisCardProps> = ({ competitionAnalysis, id }) => {
  // Summary content that is always displayed
  const summaryContent = (
    <CompetitionSummary competitionAnalysis={competitionAnalysis} />
  );

  // Detailed content that is displayed only when expanded
  const detailedContent = (
    <div className="space-y-6">
      {/* Market Summary */}
      <MarketSummary competitionAnalysis={competitionAnalysis} />

      {/* SWOT Analysis */}
      <SwotAnalysis />

      {/* Entry Barriers */}
      <EntryBarriers />

      {/* Strategic Recommendations */}
      <StrategicRecommendations />
    </div>
  );

  return (
    <AccordionCard
      id={id}
      title="Análise de Concorrência"
      icon={<Users size={18} />}
      summary={summaryContent}
      details={detailedContent}
    />
  );
};

export default CompetitionAnalysisCard;
