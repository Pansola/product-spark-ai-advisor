
import { AnalysisResults, ProductFormData } from "@/types/product";

/**
 * Generates mock trend data for the last 6 months
 */
const generateTrendData = (trend: string) => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const trendData = [];
  
  // Base value
  let baseValue = Math.floor(Math.random() * (1000 - 300)) + 300;
  
  for (let i = 0; i < months.length; i++) {
    // Adjust based on trend
    if (trend === "crescente") {
      baseValue += Math.floor(Math.random() * 100);
    } else if (trend === "decrescente") {
      baseValue -= Math.floor(Math.random() * 70);
      baseValue = Math.max(200, baseValue); // Don't go below 200
    } else {
      // Stable but with small variations
      baseValue += Math.floor(Math.random() * 60) - 30;
    }
    
    trendData.push({
      month: months[i],
      value: baseValue
    });
  }
  
  return trendData;
};

/**
 * Generates mock competitor comparison data
 */
const generateCompetitorComparison = () => {
  const competitors = ["Produto A", "Produto B", "Produto C"];
  return competitors.map(name => ({
    name,
    value: Math.floor(Math.random() * (100 - 30)) + 30
  }));
};

/**
 * Generates mock analysis results based on product data and selected plan
 */
export const generateMockResults = (data: ProductFormData, plan: string): AnalysisResults => {
  // Generate random score between 30 and 95
  const score = Math.floor(Math.random() * (95 - 30 + 1)) + 30;
  const trend = Math.random() > 0.3 ? 
    (Math.random() > 0.5 ? "crescente" : "estável") : 
    "decrescente";
  
  // Generate base mock analysis data
  let mockResults: AnalysisResults = {
    demandAnalysis: {
      score: Math.floor(Math.random() * (100 - 30 + 1)) + 30,
      trend: trend,
      volumeBusca: Math.floor(Math.random() * (10000 - 500 + 1)) + 500,
      trendData: generateTrendData(trend),
      competitorComparison: generateCompetitorComparison(),
    },
    competitionAnalysis: {
      level: score > 70 ? "baixa" : score > 40 ? "média" : "alta",
      competitors: Math.floor(Math.random() * (50 - 5 + 1)) + 5,
    },
    marketingStrategy: {
      title: `${data.productName} - Solução Inovadora para seu Dia a Dia`,
      description: `Descubra como ${data.productName} pode transformar sua experiência. Design exclusivo, alta qualidade e entrega expressa para ${data.country}.`,
      channels: ["Google Ads", "Facebook", "Instagram"],
      keywords: ["produto inovador", "alta qualidade", "entrega rápida", "solução prática", data.productName.toLowerCase()],
      mentalTriggers: ["Escassez", "Urgência", "Prova Social", "Autoridade"],
      visualSuggestion: {
        format: Math.random() > 0.5 ? "Imagem" : "Vídeo curto",
        description: `Demonstração real do produto ${data.productName} sendo utilizado, destacando os benefícios principais.`
      },
      adCopy: {
        short: `${data.productName}: transforme seu dia. Qualidade garantida, entrega expressa. Compre agora!`,
        long: `Cansado das limitações dos produtos comuns? ${data.productName} traz uma solução inovadora que economiza seu tempo e dinheiro. Design exclusivo, materiais premium e entrega expressa para todo o ${data.country}. Não perca tempo - milhares já descobriram a diferença!`
      },
      targetAudience: {
        ageRange: "25-45 anos",
        interests: ["Tecnologia", "Lifestyle", "Bem-estar", "Compras online"],
        behaviors: ["Compradores frequentes", "Early adopters", "Buscadores de novidades"]
      },
      promotionalIdea: Math.random() > 0.5 ? 
        "Oferta por tempo limitado: Frete Grátis + 15% OFF na primeira compra" :
        "Leve 2, Pague 1 - Apenas para os primeiros 100 clientes"
    },
    score: score,
  };
  
  // Add PRO and Premium features if applicable
  if (plan === "pro" || plan === "premium") {
    const estimatedCost = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
    const recommendedPrice = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
    const margin = Math.floor(Math.round(((recommendedPrice - estimatedCost) / recommendedPrice) * 100));
    
    mockResults = {
      ...mockResults,
      costAnalysis: {
        estimatedCost: estimatedCost,
        recommendedPrice: recommendedPrice,
        margin: margin,
        shipping: Math.floor(Math.random() * 50) + 10,
        taxes: Math.floor(recommendedPrice * 0.15),
        breakEvenPoint: Math.floor((estimatedCost * 100) / (recommendedPrice - estimatedCost)),
        nicheAverageMargin: margin + (Math.floor(Math.random() * 10) - 5),
      },
      suppliers: [
        "AliExpress Premium Sellers",
        "CJ Dropshipping",
        "Alibaba Selected"
      ]
    };
  }
  
  // Add Premium exclusive features
  if (plan === "premium") {
    mockResults = {
      ...mockResults,
      relatedProducts: [
        {
          name: "Produto Similar Premium",
          score: 87,
          category: "Acessórios",
          image: "https://placehold.co/200x150/9EEFE5/1A1A1A?text=Produto+A"
        },
        {
          name: "Alternativa Tendência",
          score: 92,
          category: "Lifestyle",
          image: "https://placehold.co/200x150/4F7CAC/FFFFFF?text=Produto+B"
        },
        {
          name: "Complemento Essencial",
          score: 78,
          category: "Casa & Decoração",
          image: "https://placehold.co/200x150/986C6A/FFFFFF?text=Produto+C"
        },
      ]
    };
  }
  
  return mockResults;
};
