
import React from "react";
import ResultCard from "@/components/ResultCard";
import { Package } from "lucide-react";
import { AnalysisResults } from "@/types/product";

interface CostAnalysisCardProps {
  costAnalysis: NonNullable<AnalysisResults["costAnalysis"]>;
}

const CostAnalysisCard: React.FC<CostAnalysisCardProps> = ({ costAnalysis }) => {
  return (
    <ResultCard title="Análise de Custo e Margem" icon={<Package size={18} />}>
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-medium">Custo estimado do produto:</span> R$ {costAnalysis.estimatedCost.toFixed(2)}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Preço de venda recomendado:</span> R$ {costAnalysis.recommendedPrice.toFixed(2)}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Margem de lucro estimada:</span> {costAnalysis.margin}%
        </p>
        <div className="mt-2">
          <div className="bg-dark text-white p-3 rounded">
            <p className="font-medium">Potencial de lucro por 100 vendas:</p>
            <p className="text-2xl font-bold mt-1">
              R$ {((costAnalysis.recommendedPrice - costAnalysis.estimatedCost) * 100).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
            </p>
          </div>
        </div>
      </div>
    </ResultCard>
  );
};

export default CostAnalysisCard;
