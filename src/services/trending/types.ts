
/**
 * Types for trending API services
 */

// Tipos para as diferentes fontes de dados
export type DataSource = "pyTrends" | "mercadoLivre" | "amazon" | "semrush";

// Configurações para cada fonte de dados
export interface DataSourceConfig {
  apiKey?: string;
  username?: string;
  password?: string;
  endpoint?: string;
  rateLimit?: number;
}

// Período de tempo para análise
export type TimeRange = "24h" | "7d" | "30d" | "6m" | "1y";

// Interface de resposta padronizada
export interface TrendData {
  labels: string[];          // Períodos (dias, meses, etc)
  values: number[];          // Valores numéricos das tendências
  source: DataSource;        // Fonte dos dados
  keyword: string;           // Palavra-chave analisada
  relatedTerms?: string[];   // Termos relacionados
  timeRange: TimeRange;      // Período analisado
  lastUpdated: Date;         // Data da última atualização
}

export interface CompetitorData {
  name: string;
  value: number;
  source: DataSource;
  timeRange: TimeRange;
  lastUpdated: Date;
}

export interface SearchVolumeData {
  term: string;
  volume: number;
  source: DataSource;
  timeRange: TimeRange;
  lastUpdated: Date;
}
