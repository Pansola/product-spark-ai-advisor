
import React, { useState } from "react";
import { Award, RefreshCw } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MarketingStrategyCardProps {
  marketingStrategy: AnalysisResults["marketingStrategy"];
}

const MarketingStrategyCard: React.FC<MarketingStrategyCardProps> = ({ marketingStrategy }) => {
  const [title, setTitle] = useState(marketingStrategy.title);
  const [description, setDescription] = useState(marketingStrategy.description);
  const [isGenerating, setIsGenerating] = useState(false);

  // Função para gerar novos conteúdos
  const generateNewContent = (type: 'title' | 'description') => {
    setIsGenerating(true);
    // Simulando uma chamada de API para geração de conteúdo
    setTimeout(() => {
      if (type === 'title') {
        const titles = [
          "Revolucione Seu Dia-a-Dia com Nosso Produto Inovador",
          "A Solução Definitiva que Você Estava Esperando",
          "Descubra o Segredo para Otimizar sua Rotina"
        ];
        setTitle(titles[Math.floor(Math.random() * titles.length)]);
      } else {
        const descriptions = [
          "Produto exclusivo que combina qualidade superior e design inovador. Resultados garantidos desde o primeiro uso, com satisfação total ou seu dinheiro de volta.",
          "Desenvolvido com a mais alta tecnologia e materiais premium. Economize tempo e dinheiro com nossa solução completa que já conquistou milhares de clientes satisfeitos.",
          "Esqueça as alternativas ineficientes. Nosso produto oferece uma experiência revolucionária, fabricado sob os mais altos padrões de qualidade e com garantia estendida."
        ];
        setDescription(descriptions[Math.floor(Math.random() * descriptions.length)]);
      }
      setIsGenerating(false);
      toast.success(`Nova ${type === 'title' ? 'título' : 'descrição'} gerado com sucesso!`);
    }, 800);
  };

  // Conteúdo resumido que é sempre exibido
  const summaryContent = (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="font-medium">Título & Descrição:</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => generateNewContent('title')}
            disabled={isGenerating}
            className="h-7 px-2"
          >
            <RefreshCw size={14} className={isGenerating ? "animate-spin" : ""} />
            <span className="ml-1 text-xs">Gerar Novo</span>
          </Button>
        </div>
        <div className="bg-secondary/30 p-2 rounded">
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      
      <div>
        <p className="font-medium">Canais Recomendados:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {marketingStrategy.channels.map((channel, index) => (
            <div key={index} className="bg-secondary px-2 py-1 rounded-full text-xs">
              {channel}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Conteúdo detalhado que é exibido apenas quando expandido
  const detailedContent = (
    <div className="space-y-5">
      {/* Gatilhos mentais */}
      {marketingStrategy.mentalTriggers && (
        <div>
          <h4 className="text-md font-medium mb-2">Gatilhos Mentais Recomendados</h4>
          <div className="flex flex-wrap gap-2">
            {marketingStrategy.mentalTriggers.map((trigger, index) => (
              <div 
                key={index} 
                className="bg-highlight text-dark px-3 py-1 rounded-md text-sm font-medium"
              >
                {trigger}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Palavras-chave */}
      {marketingStrategy.keywords && (
        <div>
          <h4 className="text-md font-medium mb-2">Palavras-chave Estratégicas</h4>
          <div className="flex flex-wrap gap-2">
            {marketingStrategy.keywords.map((keyword, index) => (
              <div 
                key={index} 
                className="bg-gray-100 border border-gray-200 px-2 py-1 rounded-md text-xs"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Sugestão visual */}
      {marketingStrategy.visualSuggestion && (
        <div>
          <h4 className="text-md font-medium mb-2">Sugestão de Criativo Visual</h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Formato ideal:</span> {marketingStrategy.visualSuggestion.format}
            </p>
            <p className="text-sm mt-1">
              <span className="font-medium">Descrição:</span> {marketingStrategy.visualSuggestion.description}
            </p>
          </div>
        </div>
      )}
      
      {/* Sugestões de copy para anúncios */}
      {marketingStrategy.adCopy && (
        <div>
          <h4 className="text-md font-medium mb-2">Copy para Anúncios</h4>
          <div className="space-y-2">
            <div>
              <p className="font-medium text-xs">Versão Curta (Meta/Google Ads):</p>
              <p className="bg-white p-2 rounded border border-gray-100 text-sm">
                {marketingStrategy.adCopy.short}
              </p>
            </div>
            <div>
              <p className="font-medium text-xs">Versão Longa (Email/Landing Page):</p>
              <p className="bg-white p-2 rounded border border-gray-100 text-sm">
                {marketingStrategy.adCopy.long}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Público-alvo */}
      {marketingStrategy.targetAudience && (
        <div>
          <h4 className="text-md font-medium mb-2">Público-Alvo</h4>
          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <p className="text-sm">
              <span className="font-medium">Faixa etária:</span> {marketingStrategy.targetAudience.ageRange}
            </p>
            <div>
              <p className="font-medium text-xs mb-1">Interesses:</p>
              <div className="flex flex-wrap gap-1">
                {marketingStrategy.targetAudience.interests.map((interest, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 px-2 py-0.5 rounded text-xs"
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium text-xs mb-1">Comportamentos:</p>
              <div className="flex flex-wrap gap-1">
                {marketingStrategy.targetAudience.behaviors.map((behavior, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 px-2 py-0.5 rounded text-xs"
                  >
                    {behavior}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Ideia promocional */}
      {marketingStrategy.promotionalIdea && (
        <div>
          <h4 className="text-md font-medium mb-2">Oferta Promocional Sugerida</h4>
          <div className="bg-dark text-white p-3 rounded-lg font-medium text-sm">
            {marketingStrategy.promotionalIdea}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <AccordionCard
      title="Estratégia de Marketing"
      icon={<Award size={18} />}
      summary={summaryContent}
      details={detailedContent}
    />
  );
};

export default MarketingStrategyCard;
