
import React, { useState } from "react";
import { Package } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import CostSummary from "./cost-analysis/CostSummary";
import ProfitSimulator from "./cost-analysis/ProfitSimulator";
import ProfitVolumeChart from "./cost-analysis/ProfitVolumeChart";
import BreakEvenPoint from "./cost-analysis/BreakEvenPoint";
import NicheMarginComparison from "./cost-analysis/NicheMarginComparison";

interface CostAnalysisCardProps {
  costAnalysis: NonNullable<AnalysisResults["costAnalysis"]>;
  id?: string;
}

const CostAnalysisCard: React.FC<CostAnalysisCardProps> = ({
  costAnalysis,
  id
}) => {
  // Estado para os valores editáveis do simulador
  const [productCost, setProductCost] = useState(costAnalysis.estimatedCost.toString());
  const [sellingPrice, setSellingPrice] = useState(costAnalysis.recommendedPrice.toString());
  const [shipping, setShipping] = useState((costAnalysis.shipping || 0).toString());
  const [taxes, setTaxes] = useState((costAnalysis.taxes || 0).toString());

  // Cálculos do simulador
  const parsedCost = parseFloat(productCost) || 0;
  const parsedPrice = parseFloat(sellingPrice) || 0;
  const parsedShipping = parseFloat(shipping) || 0;
  const parsedTaxes = parseFloat(taxes) || 0;
  const totalCost = parsedCost + parsedShipping + parsedTaxes;
  const profit = parsedPrice - totalCost;
  const margin = parsedPrice > 0 ? profit / parsedPrice * 100 : 0;

  // Conteúdo resumido que é sempre exibido
  const summaryContent = <CostSummary costAnalysis={costAnalysis} />;

  // Conteúdo detalhado que é exibido apenas quando expandido
  const detailedContent = (
    <div className="space-y-8">
      {/* Simulador de margem */}
      <ProfitSimulator costAnalysis={costAnalysis} />
      
      {/* Gráfico de lucro por volume */}
      <div className="mt-12 pb-6">
        <ProfitVolumeChart profit={profit} />
      </div>
      
      {/* Ponto de equilíbrio */}
      {costAnalysis.breakEvenPoint && (
        <BreakEvenPoint breakEvenPoint={costAnalysis.breakEvenPoint} />
      )}
      
      {/* Comparativo de margens do nicho */}
      {costAnalysis.nicheAverageMargin && (
        <NicheMarginComparison 
          currentMargin={margin} 
          nicheAverageMargin={costAnalysis.nicheAverageMargin} 
        />
      )}
    </div>
  );

  return (
    <AccordionCard 
      id={id} 
      title="Análise de Custo e Margem" 
      icon={<Package size={18} />} 
      summary={summaryContent} 
      details={detailedContent} 
    />
  );
};

export default CostAnalysisCard;
