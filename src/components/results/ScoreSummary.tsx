
import React from "react";
import ScoreGauge from "@/components/ScoreGauge";
import { countryNames } from "@/utils/countryMapping";
import { ProductData, AnalysisResults } from "@/types/product";

interface ScoreSummaryProps {
  analysisResults: AnalysisResults;
  productData: ProductData;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({ analysisResults, productData }) => {
  return (
    <div className="mb-6 flex flex-col items-center">
      <ScoreGauge score={analysisResults.score} />
      <h2 className="text-xl font-semibold mt-4">
        {analysisResults.score >= 80 ? "Produto com Excelente Potencial" :
         analysisResults.score >= 60 ? "Produto com Bom Potencial" :
         analysisResults.score >= 40 ? "Produto com Potencial Moderado" :
         "Produto com Potencial Limitado"}
      </h2>
      <p className="text-gray-600 mt-2 max-w-xl text-center">
        Com base na nossa análise, este produto apresenta um potencial de sucesso de {analysisResults.score}/100 
        para o mercado de {countryNames[productData.country] || productData.country}.
      </p>
    </div>
  );
};

export default ScoreSummary;
