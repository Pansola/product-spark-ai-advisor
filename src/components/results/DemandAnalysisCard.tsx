
import React from "react";
import { TrendingUp } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DemandAnalysisCardProps {
  demandAnalysis: AnalysisResults["demandAnalysis"];
}

const DemandAnalysisCard: React.FC<DemandAnalysisCardProps> = ({ demandAnalysis }) => {
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
  const detailedContent = demandAnalysis.trendData ? (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium mb-3">Tendência dos Últimos 6 Meses</h4>
        <div className="h-64">
          <ChartContainer
            config={{
              trend: { color: "#4F7CAC" },
            }}
          >
            <LineChart
              data={demandAnalysis.trendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
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
          </ChartContainer>
        </div>
        <p className="text-sm mt-3 text-gray-500">Fonte: Baseado em dados de busca online e tendências de mercado.</p>
      </div>

      {demandAnalysis.competitorComparison && (
        <div>
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

      <div>
        <h4 className="text-lg font-medium mb-1">Volume de Busca Mensal Estimado</h4>
        <p className="text-2xl font-bold text-primary">{demandAnalysis.volumeBusca.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-1">
          Baseado em palavras-chave relacionadas ao produto e nicho de mercado.
        </p>
      </div>
    </div>
  ) : (
    <p>Dados detalhados não disponíveis</p>
  );

  return (
    <AccordionCard
      title="Análise de Demanda"
      icon={<TrendingUp size={18} />}
      summary={summaryContent}
      details={detailedContent}
    />
  );
};

export default DemandAnalysisCard;
