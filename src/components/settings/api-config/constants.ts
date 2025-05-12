
import { DataSource } from "@/services/trending";

export const API_SOURCES = [
  { 
    id: "pyTrends" as DataSource, 
    name: "PyTrends (Google Trends)", 
    description: "Acesso a dados de tendências globais e regionais usando PyTrends",
    docLink: "https://github.com/GeneralMills/pytrends",
    isPyTrends: true,
  },
  { 
    id: "mercadoLivre" as DataSource, 
    name: "Mercado Livre", 
    description: "Dados de produtos populares na América Latina",
    docLink: "https://developers.mercadolivre.com.br/pt_br/api-docs-pt-br",
    isPyTrends: false,
  },
  { 
    id: "semrush" as DataSource, 
    name: "SEMrush", 
    description: "Análise competitiva e volume de buscas",
    docLink: "https://developer.semrush.com/",
    isPyTrends: false,
  },
];
