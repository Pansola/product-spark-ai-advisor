import React, { useState } from "react";
import { Award } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import { toast } from "sonner";

// Import sub-components
import ChannelsList from "./marketing-strategy/ChannelsList";
import MentalTriggers from "./marketing-strategy/MentalTriggers";
import Keywords from "./marketing-strategy/Keywords";
import VisualSuggestion from "./marketing-strategy/VisualSuggestion";
import AdCopy from "./marketing-strategy/AdCopy";
import TargetAudience from "./marketing-strategy/TargetAudience";
import PromotionalIdea from "./marketing-strategy/PromotionalIdea";

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
  const [promotionalIdea, setPromotionalIdea] = useState(
    marketingStrategy.promotionalIdea || ""
  );

  // Função para gerar novos conteúdos
  const generateNewContent = (type: 'short' | 'long' | 'visual' | 'promo') => {
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
      } else if (type === 'visual') {
        const options = [
          "Vídeo de 15-30 segundos mostrando o produto em uso, destacando os principais benefícios visuais e com depoimento rápido de usuário satisfeito.",
          "Sequência de antes/depois mostrando a solução do problema, com foco nos resultados práticos e tangíveis para o consumidor.",
          "Demo rápida do produto em situações do dia a dia, enfatizando a praticidade e a economia de tempo que proporciona."
        ];
        setVisualDescription(options[Math.floor(Math.random() * options.length)]);
      } else if (type === 'promo') {
        const options = [
          "Compre 1 e leve 2: Na primeira compra, ganhe um produto adicional grátis para presentear um amigo.",
          "Oferta especial de lançamento: 30% de desconto nos primeiros 100 pedidos + frete grátis para todo o Brasil.",
          "Combo exclusivo: Adquira o produto principal com 25% de desconto e ganhe acesso ao curso online complementar."
        ];
        setPromotionalIdea(options[Math.floor(Math.random() * options.length)]);
      }
      setIsGenerating(false);
      toast.success(`Nova ${type === 'short' ? 'versão curta' : type === 'long' ? 'versão longa' : type === 'promo' ? 'oferta promocional' : 'sugestão visual'} gerada com sucesso!`);
    }, 800);
  };

  // Conteúdo resumido que é sempre exibido
  const summaryContent = (
    <div className="space-y-4">      
      <ChannelsList channels={marketingStrategy.channels} />
    </div>
  );

  // Conteúdo detalhado que é exibido apenas quando expandido
  const detailedContent = (
    <div className="space-y-5">
      {/* Gatilhos mentais */}
      <MentalTriggers triggers={marketingStrategy.mentalTriggers || []} />
      
      {/* Palavras-chave */}
      <Keywords keywords={marketingStrategy.keywords || []} />
      
      {/* Sugestão visual */}
      <VisualSuggestion 
        format={marketingStrategy.visualSuggestion?.format}
        description={visualDescription}
        onGenerateNew={() => generateNewContent('visual')}
      />
      
      {/* Sugestões de copy para anúncios */}
      <AdCopy 
        shortCopy={adCopyShort}
        longCopy={adCopyLong}
        onGenerateShort={() => generateNewContent('short')}
        onGenerateLong={() => generateNewContent('long')}
      />
      
      {/* Público-alvo */}
      <TargetAudience 
        ageRange={marketingStrategy.targetAudience?.ageRange}
        interests={marketingStrategy.targetAudience?.interests}
        behaviors={marketingStrategy.targetAudience?.behaviors}
      />
      
      {/* Ideia promocional */}
      <PromotionalIdea 
        promotionalIdea={promotionalIdea || marketingStrategy.promotionalIdea} 
        onGenerateNew={() => generateNewContent('promo')}
      />
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
