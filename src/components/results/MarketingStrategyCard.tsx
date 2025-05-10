
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
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  // Funções para gerar novos conteúdos
  const generateNewTitle = () => {
    setIsGeneratingTitle(true);
    // Simulando uma chamada de API para geração de conteúdo
    setTimeout(() => {
      const titles = [
        "Revolucione Seu Dia-a-Dia com Nosso Produto Inovador",
        "A Solução Definitiva que Você Estava Esperando",
        "Descubra o Segredo para Otimizar sua Rotina"
      ];
      setTitle(titles[Math.floor(Math.random() * titles.length)]);
      setIsGeneratingTitle(false);
      toast.success("Novo título gerado com sucesso!");
    }, 800);
  };

  const generateNewDescription = () => {
    setIsGeneratingDescription(true);
    // Simulando uma chamada de API para geração de conteúdo
    setTimeout(() => {
      const descriptions = [
        "Produto exclusivo que combina qualidade superior e design inovador. Resultados garantidos desde o primeiro uso, com satisfação total ou seu dinheiro de volta.",
        "Desenvolvido com a mais alta tecnologia e materiais premium. Economize tempo e dinheiro com nossa solução completa que já conquistou milhares de clientes satisfeitos.",
        "Esqueça as alternativas ineficientes. Nosso produto oferece uma experiência revolucionária, fabricado sob os mais altos padrões de qualidade e com garantia estendida."
      ];
      setDescription(descriptions[Math.floor(Math.random() * descriptions.length)]);
      setIsGeneratingDescription(false);
      toast.success("Nova descrição gerada com sucesso!");
    }, 1000);
  };

  // Conteúdo resumido que é sempre exibido
  const summaryContent = (
    <div className="space-y-3">
      <div>
        <p className="font-medium">Sugestão de Título:</p>
        <p className="text-gray-700 mt-1 bg-secondary/30 p-2 rounded">
          {title}
        </p>
      </div>
      
      <div>
        <p className="font-medium">Sugestão de Descrição:</p>
        <p className="text-gray-700 mt-1 bg-secondary/30 p-2 rounded">
          {description}
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
  );

  // Conteúdo detalhado que é exibido apenas quando expandido
  const detailedContent = (
    <div className="space-y-6">
      {/* Seção de título e descrição com botões de geração */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-medium">Sugestão de Título:</p>
            <p className="text-gray-700 mt-1 bg-secondary/30 p-2 rounded border border-secondary">
              {title}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="ml-2 flex-shrink-0"
            onClick={generateNewTitle}
            disabled={isGeneratingTitle}
          >
            <RefreshCw size={16} className={isGeneratingTitle ? "animate-spin" : ""} />
            <span className="ml-1">Gerar Novo</span>
          </Button>
        </div>
        
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-medium">Sugestão de Descrição:</p>
            <p className="text-gray-700 mt-1 bg-secondary/30 p-2 rounded border border-secondary">
              {description}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="ml-2 flex-shrink-0"
            onClick={generateNewDescription}
            disabled={isGeneratingDescription}
          >
            <RefreshCw size={16} className={isGeneratingDescription ? "animate-spin" : ""} />
            <span className="ml-1">Gerar Nova</span>
          </Button>
        </div>
      </div>
      
      {/* Gatilhos mentais */}
      {marketingStrategy.mentalTriggers && (
        <div>
          <h4 className="text-lg font-medium mb-2">Gatilhos Mentais Recomendados</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {marketingStrategy.mentalTriggers.map((trigger, index) => (
              <div 
                key={index} 
                className="bg-highlight text-dark px-3 py-1 rounded-md text-sm font-medium"
              >
                {trigger}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Utilize estes gatilhos mentais em seus textos e anúncios para aumentar a conversão.
          </p>
        </div>
      )}
      
      {/* Palavras-chave */}
      {marketingStrategy.keywords && (
        <div>
          <h4 className="text-lg font-medium mb-2">Palavras-chave Estratégicas</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {marketingStrategy.keywords.map((keyword, index) => (
              <div 
                key={index} 
                className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-md text-sm"
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
          <h4 className="text-lg font-medium mb-2">Sugestão de Criativo Visual</h4>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p>
              <span className="font-medium">Formato ideal:</span> {marketingStrategy.visualSuggestion.format}
            </p>
            <p>
              <span className="font-medium">Descrição:</span> {marketingStrategy.visualSuggestion.description}
            </p>
          </div>
        </div>
      )}
      
      {/* Sugestões de copy para anúncios */}
      {marketingStrategy.adCopy && (
        <div>
          <h4 className="text-lg font-medium mb-2">Sugestão de Copy para Anúncios</h4>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-sm">Versão Curta (Meta/Google Ads):</p>
              <p className="bg-white p-3 rounded border border-gray-100 text-sm">
                {marketingStrategy.adCopy.short}
              </p>
            </div>
            <div>
              <p className="font-medium text-sm">Versão Longa (Email/Landing Page):</p>
              <p className="bg-white p-3 rounded border border-gray-100 text-sm">
                {marketingStrategy.adCopy.long}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Público-alvo */}
      {marketingStrategy.targetAudience && (
        <div>
          <h4 className="text-lg font-medium mb-2">Segmentos de Público-Alvo</h4>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <p>
              <span className="font-medium">Faixa etária ideal:</span> {marketingStrategy.targetAudience.ageRange}
            </p>
            <div>
              <p className="font-medium mb-1">Interesses:</p>
              <div className="flex flex-wrap gap-2">
                {marketingStrategy.targetAudience.interests.map((interest, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 px-2 py-1 rounded text-sm"
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium mb-1">Comportamentos:</p>
              <div className="flex flex-wrap gap-2">
                {marketingStrategy.targetAudience.behaviors.map((behavior, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 px-2 py-1 rounded text-sm"
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
          <h4 className="text-lg font-medium mb-2">Ideia de Oferta Promocional</h4>
          <div className="bg-dark text-white p-4 rounded-lg font-medium">
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
