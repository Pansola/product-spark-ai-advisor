
import React from "react";
import ResultCard from "@/components/ResultCard";
import { Users } from "lucide-react";
import { AnalysisResults } from "@/types/product";

interface CompetitionAnalysisCardProps {
  competitionAnalysis: AnalysisResults["competitionAnalysis"];
}

const CompetitionAnalysisCard: React.FC<CompetitionAnalysisCardProps> = ({ competitionAnalysis }) => {
  return (
    <ResultCard title="Análise de Concorrência" icon={<Users size={18} />}>
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-medium">Nível de concorrência:</span>{" "}
          <span className={`font-medium ${
            competitionAnalysis.level === "baixa" ? "text-green-600" : 
            competitionAnalysis.level === "média" ? "text-yellow-600" : 
            "text-red-600"
          }`}>
            {competitionAnalysis.level}
          </span>
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Número estimado de concorrentes diretos:</span> {competitionAnalysis.competitors}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Recomendação:</span>{" "}
          {competitionAnalysis.level === "baixa" ? 
            "Excelente oportunidade para entrar no mercado rapidamente." : 
            competitionAnalysis.level === "média" ? 
            "Oportunidade moderada, considere diferenciais competitivos." : 
            "Busque um nicho específico ou diferencial claro para competir neste mercado."
          }
        </p>
      </div>
    </ResultCard>
  );
};

export default CompetitionAnalysisCard;
