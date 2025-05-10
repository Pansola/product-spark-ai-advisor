
export interface ProductFormData {
  productName: string;
  productLink?: string;
  productDescription?: string;
  country: string;
}

export interface ProductData {
  productName: string;
  productLink?: string;
  productDescription?: string;
  country: string;
}

export interface AnalysisResults {
  demandAnalysis: {
    score: number;
    trend: string;
    volumeBusca: number;
    trendData?: {
      month: string;
      value: number;
    }[];
    competitorComparison?: {
      name: string;
      value: number;
    }[];
  };
  competitionAnalysis: {
    level: string;
    competitors: number;
    marketShare?: {
      user: number;
      competitors: number;
    };
    trend?: string;
    averagePrice?: number;
    swot?: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
  };
  marketingStrategy: {
    title: string;
    description: string;
    channels: string[];
    keywords?: string[];
    mentalTriggers?: string[];
    visualSuggestion?: {
      format: string;
      description: string;
    };
    adCopy?: {
      short: string;
      long: string;
    };
    targetAudience?: {
      ageRange: string;
      interests: string[];
      behaviors: string[];
    };
    promotionalIdea?: string;
  };
  score: number;
  costAnalysis?: {
    estimatedCost: number;
    recommendedPrice: number;
    margin: number;
    shipping?: number;
    taxes?: number;
    breakEvenPoint?: number;
    nicheAverageMargin?: number;
  };
  suppliers?: string[];
  relatedProducts?: {
    name: string;
    score: number;
    category: string;
    image?: string;
  }[];
}

export const countryOptions = [
  { value: "brasil", label: "Brasil" },
  { value: "portugal", label: "Portugal" },
  { value: "estados-unidos", label: "Estados Unidos" },
  { value: "canada", label: "Canadá" },
  { value: "mexico", label: "México" },
  { value: "argentina", label: "Argentina" },
  { value: "reino-unido", label: "Reino Unido" },
  { value: "alemanha", label: "Alemanha" },
  { value: "espanha", label: "Espanha" },
  { value: "italia", label: "Itália" },
];
