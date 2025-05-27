
import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import DemandScore from "./demand-analysis/DemandScore";
import DemandTrendChart from "./demand-analysis/DemandTrendChart";
import TimeRangeSelector from "./demand-analysis/TimeRangeSelector";
import CompetitorComparison from "./demand-analysis/CompetitorComparison";
import SearchVolume from "./demand-analysis/SearchVolume";
import { mockDataByPeriod } from "./demand-analysis/mockTimeData";
import { TimeRange } from "@/services/trending";

interface DemandAnalysisCardProps {
  demandAnalysis: AnalysisResults["demandAnalysis"];
  productName?: string;
  id?: string;
}

const DemandAnalysisCard: React.FC<DemandAnalysisCardProps> = ({
  demandAnalysis,
  productName,
  id
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("6m");

  // Obter dados com base no período selecionado
  const getFilteredData = () => {
    // Se houver dados reais, podemos filtrá-los
    if (demandAnalysis.trendData && demandAnalysis.trendData.length > 0) {
      return demandAnalysis.trendData;
    }

    // Caso contrário, usamos os dados simulados
    return mockDataByPeriod[timeRange as keyof typeof mockDataByPeriod] || mockDataByPeriod["6m"];
  };

  // Conteúdo resumido que é sempre exibido
  const summaryContent = <DemandScore score={demandAnalysis.score} trend={demandAnalysis.trend} />;

  // Conteúdo detalhado que é exibido apenas quando expandido
  const detailedContent = <div className="space-y-6">
      {/* Seção de Tendência de Demanda com melhor espaçamento */}
      <div className="mt-4 pt-4 sm:pt-6">
        <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-5">Tendência de Demanda</h4>
        <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
        <DemandTrendChart 
          data={getFilteredData()} 
          productName={productName}
          timeRange={timeRange}
        />
      </div>

      {demandAnalysis.competitorComparison && <CompetitorComparison competitors={demandAnalysis.competitorComparison} />}

      <SearchVolume 
        volumeBusca={demandAnalysis.volumeBusca} 
        productName={productName}
        timeRange={timeRange}
      />
    </div>;

  return <AccordionCard id={id} title="Análise de Demanda" icon={<TrendingUp size={18} />} summary={summaryContent} details={detailedContent} />;
};

export default DemandAnalysisCard;
