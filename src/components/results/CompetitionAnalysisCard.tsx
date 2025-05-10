
import React from "react";
import { Users } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface CompetitionAnalysisCardProps {
  competitionAnalysis: AnalysisResults["competitionAnalysis"];
}

const CompetitionAnalysisCard: React.FC<CompetitionAnalysisCardProps> = ({ competitionAnalysis }) => {
  // Cores para o nível de concorrência
  const getLevelColor = () => {
    if (competitionAnalysis.level === "baixa") return "text-green-600";
    if (competitionAnalysis.level === "média") return "text-yellow-600";
    return "text-red-600";
  };

  // Dados para o gráfico de pizza de concorrência
  const pieData = [
    { name: 'Seu produto', value: 1 },
    { name: 'Concorrentes', value: competitionAnalysis.competitors }
  ];
  const COLORS = ['#4F7CAC', '#C0E0DE'];

  // Conteúdo resumido que é sempre exibido
  const summaryContent = (
    <div className="space-y-3">
      <p className="text-gray-700">
        <span className="font-medium">Nível de concorrência:</span>{" "}
        <span className={`font-medium ${getLevelColor()}`}>
          {competitionAnalysis.level}
        </span>
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Número estimado de concorrentes diretos:</span> {competitionAnalysis.competitors}
      </p>
    </div>
  );

  // Conteúdo detalhado que é exibido apenas quando expandido
  const detailedContent = (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium mb-3">Distribuição de Mercado</h4>
        <div className="h-64 flex justify-center">
          <ChartContainer
            config={{
              your: { color: "#4F7CAC", label: "Seu produto" },
              competitors: { color: "#C0E0DE", label: "Concorrentes" },
            }}
          >
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartContainer>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-3">Análise de Competitividade</h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium mb-2">Recomendação Estratégica:</p>
          <p className="text-gray-700">
            {competitionAnalysis.level === "baixa" ? 
              "Excelente oportunidade para entrar no mercado rapidamente. Considere ampliar o investimento para dominar este nicho antes que a concorrência aumente." : 
              competitionAnalysis.level === "média" ? 
              "Oportunidade moderada. Foque em diferenciais competitivos claros e considere nichos específicos dentro deste mercado para se destacar da concorrência." : 
              "Mercado com alta competitividade. Recomendamos buscar um nicho muito específico ou diferencial claro para competir. Considere uma estratégia de marketing diferenciada e foco total na experiência do cliente."
            }
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-2">Barreiras de Entrada</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>
            {competitionAnalysis.level === "baixa" ? 
              "Baixo custo inicial para entrar no mercado" : 
              competitionAnalysis.level === "média" ? 
              "Investimento moderado para se destacar" : 
              "Alto investimento necessário para competir"
            }
          </li>
          <li>
            {competitionAnalysis.level === "baixa" ? 
              "Poucos competidores estabelecidos" : 
              competitionAnalysis.level === "média" ? 
              "Alguns competidores fortes, mas com espaço para novos entrantes" : 
              "Mercado dominado por grandes players"
            }
          </li>
          <li>
            {competitionAnalysis.level === "baixa" ? 
              "Baixa fidelidade de marca no nicho" : 
              competitionAnalysis.level === "média" ? 
              "Fidelidade moderada às marcas existentes" : 
              "Alta fidelidade de clientes às marcas estabelecidas"
            }
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <AccordionCard
      title="Análise de Concorrência"
      icon={<Users size={18} />}
      summary={summaryContent}
      details={detailedContent}
    />
  );
};

export default CompetitionAnalysisCard;
