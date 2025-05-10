
import React from "react";
import ResultCard from "@/components/ResultCard";
import { TrendingUp } from "lucide-react";
import { AnalysisResults } from "@/types/product";

interface DemandAnalysisCardProps {
  demandAnalysis: AnalysisResults["demandAnalysis"];
}

const DemandAnalysisCard: React.FC<DemandAnalysisCardProps> = ({ demandAnalysis }) => {
  return (
    <ResultCard title="Análise de Demanda" icon={<TrendingUp size={18} />}>
      <div className="space-y-3">
        <div>
          <p className="font-medium">Demanda no Mercado:</p>
          <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${demandAnalysis.score}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Baixa</span>
            <span>Alta</span>
          </div>
        </div>
        <p className="text-gray-700">
          <span className="font-medium">Tendência:</span> {demandAnalysis.trend}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Volume de busca mensal estimado:</span> {demandAnalysis.volumeBusca.toLocaleString()}
        </p>
      </div>
    </ResultCard>
  );
};

export default DemandAnalysisCard;
