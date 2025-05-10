
export interface ProductFormData {
  productName: string;
  productLink?: string;
  productDescription?: string;
  country: string;
}

// Adding the ProductData interface that was missing
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
  };
  competitionAnalysis: {
    level: string;
    competitors: number;
  };
  marketingStrategy: {
    title: string;
    description: string;
    channels: string[];
  };
  score: number;
  costAnalysis?: {
    estimatedCost: number;
    recommendedPrice: number;
    margin: number;
  };
  suppliers?: string[];
  relatedProducts?: {
    name: string;
    score: number;
    category: string;
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
