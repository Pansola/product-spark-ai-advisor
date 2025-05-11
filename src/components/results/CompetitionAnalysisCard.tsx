
import React from "react";
import { Users, Check, X } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";

interface CompetitionAnalysisCardProps {
  competitionAnalysis: AnalysisResults["competitionAnalysis"];
  id?: string;
}

const CompetitionAnalysisCard: React.FC<CompetitionAnalysisCardProps> = ({ competitionAnalysis, id }) => {
  // Cores para o nível de concorrência
  const getLevelColor = () => {
    if (competitionAnalysis.level === "baixa") return "text-green-600";
    if (competitionAnalysis.level === "média") return "text-yellow-600";
    return "text-red-600";
  };

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
      {/* Resumo Geral do Nicho */}
      <div>
        <h4 className="text-lg font-medium mb-3">Resumo Geral do Nicho</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-medium">Nível de concorrência:</span>
                <span className={getLevelColor()}>{competitionAnalysis.level}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Concorrentes diretos:</span>
                <span>{competitionAnalysis.competitors}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Tendência do nicho:</span>
                <span className="text-green-600">Crescente</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-medium">Ticket médio:</span>
                <span>R$ 189,90</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Sua participação:</span>
                <span>5%</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Conc. principais:</span>
                <span>35%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Análise SWOT */}
      <div>
        <h4 className="text-lg font-medium mb-3">Análise SWOT do Produto</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-medium text-green-700 mb-2">Forças</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Preço competitivo</li>
              <li>Qualidade superior</li>
              <li>Design inovador</li>
            </ul>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h5 className="font-medium text-red-700 mb-2">Fraquezas</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Marca desconhecida</li>
              <li>Limitações logísticas</li>
              <li>Baixo orçamento inicial</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-700 mb-2">Oportunidades</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Mercado em expansão</li>
              <li>Novos canais de divulgação</li>
              <li>Parcerias estratégicas</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-medium text-yellow-700 mb-2">Ameaças</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Novos entrantes</li>
              <li>Produtos substitutos</li>
              <li>Instabilidade econômica</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barreiras de Entrada */}
      <div>
        <h4 className="text-lg font-medium mb-2">Barreiras de Entrada</h4>
        <ul className="space-y-2">
          <li className="flex items-center">
            <Check size={18} className="text-green-600 mr-2" />
            <span>Baixo custo inicial para entrar no mercado</span>
          </li>
          <li className="flex items-center">
            <Check size={18} className="text-green-600 mr-2" />
            <span>Poucos competidores estabelecidos</span>
          </li>
          <li className="flex items-center">
            <Check size={18} className="text-green-600 mr-2" />
            <span>Nicho com baixa lealdade à marca</span>
          </li>
          <li className="flex items-center">
            <X size={18} className="text-red-600 mr-2" />
            <span className="text-red-600 font-medium">Fácil replicação do produto (risco)</span>
          </li>
        </ul>
      </div>

      {/* Recomendações Estratégicas */}
      <div>
        <h4 className="text-lg font-medium mb-3">Recomendações Estratégicas</h4>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-3 py-1">
            <h5 className="font-medium">Curto Prazo (1-3 meses)</h5>
            <p className="text-sm text-gray-600">Investimento em tráfego pago para gerar as primeiras vendas e feedback de clientes.</p>
          </div>
          <div className="border-l-4 border-green-500 pl-3 py-1">
            <h5 className="font-medium">Médio Prazo (3-6 meses)</h5>
            <p className="text-sm text-gray-600">Construção de autoridade através de reviews, parcerias com influenciadores e conteúdo educativo.</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-3 py-1">
            <h5 className="font-medium">Longo Prazo (6+ meses)</h5>
            <p className="text-sm text-gray-600">Estratégia de diferenciação através de branding, programa de assinatura exclusivo e construção de comunidade.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AccordionCard
      id={id}
      title="Análise de Concorrência"
      icon={<Users size={18} />}
      summary={summaryContent}
      details={detailedContent}
    />
  );
};

export default CompetitionAnalysisCard;
