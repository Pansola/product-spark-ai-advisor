
import { AnalysisResults, ProductFormData } from "@/types/product";

/**
 * Generates mock analysis results based on product data and selected plan
 */
export const generateMockResults = (data: ProductFormData, plan: string): AnalysisResults => {
  // Generate random score between 30 and 95
  const score = Math.floor(Math.random() * (95 - 30 + 1)) + 30;
  
  // Generate base mock analysis data
  let mockResults: AnalysisResults = {
    demandAnalysis: {
      score: Math.floor(Math.random() * (100 - 30 + 1)) + 30,
      trend: Math.random() > 0.5 ? "crescente" : "estável",
      volumeBusca: Math.floor(Math.random() * (10000 - 500 + 1)) + 500,
    },
    competitionAnalysis: {
      level: score > 70 ? "baixa" : score > 40 ? "média" : "alta",
      competitors: Math.floor(Math.random() * (50 - 5 + 1)) + 5,
    },
    marketingStrategy: {
      title: `${data.productName} - Solução Inovadora para seu Dia a Dia`,
      description: `Descubra como ${data.productName} pode transformar sua experiência. Design exclusivo, alta qualidade e entrega expressa para ${data.country}.`,
      channels: ["Google Ads", "Facebook", "Instagram"],
    },
    score: score,
  };
  
  // Add PRO and Premium features if applicable
  if (plan === "pro" || plan === "premium") {
    mockResults = {
      ...mockResults,
      costAnalysis: {
        estimatedCost: Math.floor(Math.random() * (300 - 50 + 1)) + 50,
        recommendedPrice: Math.floor(Math.random() * (1000 - 200 + 1)) + 200,
        margin: Math.floor(Math.random() * (70 - 20 + 1)) + 20,
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
        },
        {
          name: "Alternativa Tendência",
          score: 92,
          category: "Lifestyle",
        },
        {
          name: "Complemento Essencial",
          score: 78,
          category: "Casa & Decoração",
        },
      ]
    };
  }
  
  return mockResults;
};
