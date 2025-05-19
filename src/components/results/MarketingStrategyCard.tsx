
import React, { useState } from "react";
import { Award, RefreshCw, Video } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface MarketingStrategyCardProps {
  marketingStrategy: AnalysisResults["marketingStrategy"];
  id?: string;
}

const MarketingStrategyCard: React.FC<MarketingStrategyCardProps> = ({ marketingStrategy, id }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [adCopyShort, setAdCopyShort] = useState(marketingStrategy.adCopy?.short || "");
  const [adCopyLong, setAdCopyLong] = useState(marketingStrategy.adCopy?.long || "");
  const [visualDescription, setVisualDescription] = useState(
    marketingStrategy.visualSuggestion?.description || ""
  );

  // Função para gerar novos conteúdos
  const generateNewContent = (type: 'short' | 'long' | 'visual') => {
    setIsGenerating(true);
    // Simulando uma chamada de API para geração de conteúdo
    setTimeout(() => {
      if (type === 'short') {
        const options = [
          "Transforme seu dia a dia com nossa solução exclusiva! Resultados garantidos ou seu dinheiro de volta.",
          "Descubra o segredo dos especialistas. Produto revolucionário com 93% de satisfação.",
          "A solução que você procurava acabou de chegar. Aproveite 30% OFF na primeira compra!"
        ];
        setAdCopyShort(options[Math.floor(Math.random() * options.length)]);
      } else if (type === 'long') {
        const options = [
          "Cansado de alternativas que não entregam o que prometem? Nosso produto foi desenvolvido após anos de pesquisa para oferecer uma solução completa e eficiente. Clientes relatam melhoria de resultados em apenas 7 dias de uso. Satisfação garantida ou seu dinheiro de volta!",
          "Revolucione sua experiência com nossa solução inovadora, desenvolvida por especialistas para garantir máxima eficiência. Economize tempo e dinheiro com tecnologia de ponta e praticidade no dia a dia. Junte-se aos milhares de clientes satisfeitos!",
          "Descubra por que nosso produto está transformando o mercado. Com tecnologia exclusiva e design pensado para você, oferecemos a melhor relação custo-benefício disponível hoje. Não perca mais tempo com soluções medianas. Faça como nossos clientes satisfeitos!"
        ];
        setAdCopyLong(options[Math.floor(Math.random() * options.length)]);
      } else {
        const options = [
          "Vídeo de 15-30 segundos mostrando o produto em uso, destacando os principais benefícios visuais e com depoimento rápido de usuário satisfeito.",
          "Sequência de antes/depois mostrando a solução do problema, com foco nos resultados práticos e tangíveis para o consumidor.",
          "Demo rápida do produto em situações do dia a dia, enfatizando a praticidade e a economia de tempo que proporciona."
        ];
        setVisualDescription(options[Math.floor(Math.random() * options.length)]);
      }
      setIsGenerating(false);
      toast.success(`Nova ${type === 'short' ? 'versão curta' : type === 'long' ? 'versão longa' : 'sugestão visual'} gerada com sucesso!`);
    }, 800);
  };

  // Função para gerar vídeo
  const generateVideo = () => {
    setIsGenerating(true);
    toast.info("Gerando vídeo promocional...");
    
    // Simulação de geração de vídeo (na vida real seria uma chamada de API)
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Link para vídeo promocional gerado! Confira em seu e-mail.");
    }, 1500);
  };

  // Conteúdo resumido que é sempre exibido
  const summaryContent = (
    <div className="space-y-3">      
      <div className="space-y-2">
        <p className="font-medium mb-2">Canais Recomendados:</p>
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
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-lg font-medium mb-3">Gatilhos Mentais Recomendados</h4>
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
          </CardContent>
        </Card>
      )}
      
      {/* Palavras-chave */}
      {marketingStrategy.keywords && (
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-lg font-medium mb-3">Palavras-chave Estratégicas</h4>
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
          </CardContent>
        </Card>
      )}
      
      {/* Sugestão visual */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-medium">Sugestão de Criativo Visual</h4>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => generateNewContent('visual')}
              disabled={isGenerating}
              className="h-7 px-2"
            >
              <RefreshCw size={14} className={isGenerating ? "animate-spin mr-1" : "mr-1"} />
              <span className="text-xs">Gerar Nova</span>
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Formato ideal:</p>
              <Button 
                variant="default" 
                size="sm"
                onClick={generateVideo}
                disabled={isGenerating}
                className="h-7"
              >
                <Video size={14} className="mr-1" />
                <span className="text-xs">Gerar Vídeo</span>
              </Button>
            </div>
            <p className="text-sm bg-gray-50 p-3 rounded-lg">{marketingStrategy.visualSuggestion?.format}</p>
            
            <p className="text-sm font-medium">Descrição:</p>
            <p className="text-sm bg-gray-50 p-3 rounded-lg">{visualDescription}</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Sugestões de copy para anúncios */}
      {marketingStrategy.adCopy && (
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-lg font-medium mb-3">Copy para Anúncios</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-sm">Versão Curta (Meta/Google Ads):</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateNewContent('short')}
                    disabled={isGenerating}
                    className="h-7 px-2"
                  >
                    <RefreshCw size={14} className={isGenerating ? "animate-spin mr-1" : "mr-1"} />
                    <span className="text-xs">Gerar Nova</span>
                  </Button>
                </div>
                <p className="bg-white p-3 rounded border border-gray-100 text-sm">
                  {adCopyShort}
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-sm">Versão Longa (Email/Landing Page):</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateNewContent('long')}
                    disabled={isGenerating}
                    className="h-7 px-2"
                  >
                    <RefreshCw size={14} className={isGenerating ? "animate-spin mr-1" : "mr-1"} />
                    <span className="text-xs">Gerar Nova</span>
                  </Button>
                </div>
                <p className="bg-white p-3 rounded border border-gray-100 text-sm">
                  {adCopyLong}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Público-alvo */}
      {marketingStrategy.targetAudience && (
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-lg font-medium mb-3">Público-Alvo</h4>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Faixa etária:</p>
                <p className="text-sm">{marketingStrategy.targetAudience.ageRange}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Interesses:</p>
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
                <p className="text-sm font-medium mb-1">Comportamentos:</p>
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
          </CardContent>
        </Card>
      )}
      
      {/* Ideia promocional */}
      {marketingStrategy.promotionalIdea && (
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-lg font-medium mb-2">Oferta Promocional Sugerida</h4>
            <div className="bg-dark text-white p-3 rounded-lg font-medium text-sm">
              {marketingStrategy.promotionalIdea}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <AccordionCard
      id={id}
      title="Estratégia de Marketing"
      icon={<Award size={18} />}
      summary={summaryContent}
      details={detailedContent}
    />
  );
};

export default MarketingStrategyCard;
