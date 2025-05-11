
import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

interface DemandAnalysisCardProps {
  demandAnalysis: AnalysisResults["demandAnalysis"];
  id?: string;
}

// Dados simulados para diferentes períodos de tempo
const mockDataByPeriod = {
  "24h": [
    { month: "00:00", value: 20 },
    { month: "04:00", value: 15 },
    { month: "08:00", value: 35 },
    { month: "12:00", value: 45 },
    { month: "16:00", value: 55 },
    { month: "20:00", value: 40 },
    { month: "23:00", value: 30 },
  ],
  "7d": [
    { month: "Seg", value: 30 },
    { month: "Ter", value: 35 },
    { month: "Qua", value: 45 },
    { month: "Qui", value: 40 },
    { month: "Sex", value: 55 },
    { month: "Sáb", value: 65 },
    { month: "Dom", value: 50 },
  ],
  "30d": [
    { month: "Sem 1", value: 40 },
    { month: "Sem 2", value: 45 },
    { month: "Sem 3", value: 55 },
    { month: "Sem 4", value: 60 },
  ],
  "6m": [
    { month: "Jan", value: 30 },
    { month: "Fev", value: 40 },
    { month: "Mar", value: 45 },
    { month: "Abr", value: 55 },
    { month: "Mai", value: 60 },
    { month: "Jun", value: 65 },
  ],
  "1y": [
    { month: "Jan", value: 30 },
    { month: "Fev", value: 35 },
    { month: "Mar", value: 40 },
    { month: "Abr", value: 45 },
    { month: "Mai", value: 50 },
    { month: "Jun", value: 55 },
    { month: "Jul", value: 60 },
    { month: "Ago", value: 65 },
    { month: "Set", value: 70 },
    { month: "Out", value: 75 },
    { month: "Nov", value: 80 },
    { month: "Dez", value: 85 },
  ]
};

const DemandAnalysisCard: React.FC<DemandAnalysisCardProps> = ({ demandAnalysis, id }) => {
  const [timeRange, setTimeRange] = useState<string>("6m");
  
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
  const summaryContent = (
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
    </div>
  );

  // Conteúdo detalhado que é exibido apenas quando expandido
  const detailedContent = (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium mb-3">Tendência de Demanda</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            size="sm" 
            variant={timeRange === "24h" ? "default" : "outline"} 
            onClick={() => setTimeRange("24h")}
          >
            Últimas 24h
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === "7d" ? "default" : "outline"} 
            onClick={() => setTimeRange("7d")}
          >
            7 dias
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === "30d" ? "default" : "outline"} 
            onClick={() => setTimeRange("30d")}
          >
            30 dias
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === "6m" ? "default" : "outline"} 
            onClick={() => setTimeRange("6m")}
          >
            6 meses
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === "1y" ? "default" : "outline"} 
            onClick={() => setTimeRange("1y")}
          >
            1 ano
          </Button>
        </div>
        
        {/* Aumentei o espaçamento antes do gráfico e ajustei a altura */}
        <div className="mt-8 h-72 w-full"> 
          <ChartContainer
            config={{
              trend: { color: "#4F7CAC" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getFilteredData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }} 
                  angle={0}
                  padding={{ left: 10, right: 10 }}
                  height={50}
                />
                <YAxis tick={{ fontSize: 12 }} width={40} />
                <Tooltip />
                <Line
                  name="Procuras"
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-trend, #4F7CAC)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <p className="text-sm mt-4 text-gray-500">
          Fonte: Baseado em dados de busca online e tendências de mercado.
        </p>
      </div>

      {demandAnalysis.competitorComparison && (
        <div className="mt-10">
          <h4 className="text-lg font-medium mb-3">Comparação com Produtos Similares</h4>
          <div className="space-y-3">
            {demandAnalysis.competitorComparison.map((competitor, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span>{competitor.name}</span>
                  <span className="font-medium">{competitor.value}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/70 rounded-full"
                    style={{ width: `${competitor.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <h4 className="text-lg font-medium mb-1">Volume de Busca Mensal Estimado</h4>
        <p className="text-2xl font-bold text-primary">{demandAnalysis.volumeBusca.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-1">
          Baseado em palavras-chave relacionadas ao produto e nicho de mercado.
        </p>
      </div>
    </div>
  );

  return (
    <AccordionCard
      id={id}
      title="Análise de Demanda"
      icon={<TrendingUp size={18} />}
      summary={summaryContent}
      details={detailedContent}
    />
  );
};

export default DemandAnalysisCard;
