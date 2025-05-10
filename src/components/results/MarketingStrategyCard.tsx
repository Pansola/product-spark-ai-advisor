
import React from "react";
import ResultCard from "@/components/ResultCard";
import { Award } from "lucide-react";
import { AnalysisResults } from "@/types/product";

interface MarketingStrategyCardProps {
  marketingStrategy: AnalysisResults["marketingStrategy"];
}

const MarketingStrategyCard: React.FC<MarketingStrategyCardProps> = ({ marketingStrategy }) => {
  return (
    <ResultCard title="Estratégia de Marketing" icon={<Award size={18} />}>
      <div className="space-y-3">
        <div>
          <p className="font-medium">Sugestão de Título:</p>
          <p className="text-gray-700 mt-1 bg-secondary/30 p-2 rounded">
            {marketingStrategy.title}
          </p>
        </div>
        
        <div>
          <p className="font-medium">Sugestão de Descrição:</p>
          <p className="text-gray-700 mt-1 bg-secondary/30 p-2 rounded">
            {marketingStrategy.description}
          </p>
        </div>
        
        <div>
          <p className="font-medium">Canais de Tráfego Recomendados:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {marketingStrategy.channels.map((channel, index) => (
              <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                {channel}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ResultCard>
  );
};

export default MarketingStrategyCard;
