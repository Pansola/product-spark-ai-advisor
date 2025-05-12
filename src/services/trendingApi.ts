
/**
 * API Service para integração com fontes de dados de tendências de produto
 * Suporta integração com PyTrends (alternativa ao Google Trends), marketplaces e ferramentas de SEO
 */

import { toast } from "sonner";

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

class TrendingApiService {
  private apiConfigs: Map<DataSource, DataSourceConfig> = new Map();
  private pyTrendsEndpoint: string = "https://sua-api-pytrends.exemplo.com/trends";
  
  constructor() {
    // Configuração padrão para fontes de dados simuladas
    this.apiConfigs.set("pyTrends", {
      endpoint: this.pyTrendsEndpoint,
      rateLimit: 5 // requisições por minuto
    });
    this.apiConfigs.set("mercadoLivre", {
      endpoint: "https://api.mercadolibre.com/sites/MLB",
      rateLimit: 10
    });
  }
  
  // Configura a chave de API para uma fonte específica
  public configureApiKey(source: DataSource, apiKey: string): void {
    const config = this.apiConfigs.get(source) || {};
    this.apiConfigs.set(source, {
      ...config,
      apiKey
    });
    
    // Salvar a chave no localStorage para persistência (em produção, usar Supabase Secrets)
    localStorage.setItem(`apiKey_${source}`, apiKey);
    
    toast.success(`Chave de API para ${source} configurada com sucesso`);
  }

  // Configura o endpoint da API PyTrends
  public configurePyTrendsEndpoint(endpoint: string): void {
    this.pyTrendsEndpoint = endpoint;
    const config = this.apiConfigs.get("pyTrends") || {};
    this.apiConfigs.set("pyTrends", {
      ...config,
      endpoint
    });
    
    localStorage.setItem('pyTrendsEndpoint', endpoint);
    toast.success("Endpoint da API PyTrends configurado com sucesso");
  }
  
  // Verificar se uma fonte está configurada
  public isSourceConfigured(source: DataSource): boolean {
    const config = this.apiConfigs.get(source);
    // PyTrends não precisa de apiKey, apenas de um endpoint válido
    if (source === "pyTrends") {
      return config !== undefined && config.endpoint !== undefined;
    }
    return config !== undefined && config.apiKey !== undefined;
  }
  
  // Recuperar dados de tendência para um produto/termo
  public async getTrendData(
    keyword: string, 
    source: DataSource = "pyTrends", 
    timeRange: TimeRange = "6m"
  ): Promise<TrendData> {
    try {
      // Em produção, isso faria uma chamada para uma Edge Function no Supabase
      // que por sua vez executaria o PyTrends e retornaria os resultados
      
      if (source === "pyTrends") {
        // Verificar se temos um endpoint configurado para PyTrends
        const config = this.apiConfigs.get("pyTrends");
        if (config?.endpoint) {
          // Aqui chamaria a API intermediária PyTrends
          // Por enquanto vamos simular os dados
          return await this.simulatePyTrendsData(keyword, timeRange);
        } else {
          console.warn("Endpoint PyTrends não configurado, usando dados simulados");
          return await this.simulatePyTrendsData(keyword, timeRange);
        }
      }
      
      throw new Error(`Fonte de dados ${source} não implementada`);
    } catch (error) {
      console.error(`Erro ao obter dados de tendência: ${error}`);
      toast.error("Falha ao obter dados de tendência. Tente novamente mais tarde.");
      
      // Retornar dados simulados em caso de erro
      return this.createEmptyTrendData(keyword, source, timeRange);
    }
  }
  
  // Recuperar dados de comparação de competidores
  public async getCompetitorData(
    productName: string,
    source: DataSource = "mercadoLivre",
    timeRange: TimeRange = "30d"
  ): Promise<CompetitorData[]> {
    try {
      // Simular dados de competidores
      const competitors = ["Produto A", "Produto B", "Produto C"];
      return competitors.map(name => ({
        name,
        value: Math.floor(Math.random() * (100 - 30)) + 30,
        source,
        timeRange,
        lastUpdated: new Date()
      }));
    } catch (error) {
      console.error(`Erro ao obter dados de competidores: ${error}`);
      toast.error("Falha ao obter dados de competidores. Tente novamente mais tarde.");
      return [];
    }
  }
  
  // Recuperar volume de busca para um termo
  public async getSearchVolume(
    term: string,
    source: DataSource = "pyTrends", 
    timeRange: TimeRange = "30d"
  ): Promise<SearchVolumeData> {
    try {
      // Simular volume de busca
      return {
        term,
        volume: Math.floor(Math.random() * (10000 - 500)) + 500,
        source,
        timeRange,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error(`Erro ao obter volume de busca: ${error}`);
      toast.error("Falha ao obter volume de busca. Tente novamente mais tarde.");
      return {
        term,
        volume: 0,
        source,
        timeRange,
        lastUpdated: new Date()
      };
    }
  }
  
  // Simulação de dados do PyTrends (similar ao Google Trends)
  private async simulatePyTrendsData(keyword: string, timeRange: TimeRange): Promise<TrendData> {
    // Gerar dados simulados baseados no período
    let labels: string[] = [];
    let values: number[] = [];
    
    // Base value com alguma variação baseada no termo para simular relevância
    let baseValue = keyword.length * 10 + Math.floor(Math.random() * 50);
    
    switch(timeRange) {
      case "24h":
        labels = Array.from({length: 24}, (_, i) => `${i}h`);
        break;
      case "7d":
        labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        break;
      case "30d":
        labels = Array.from({length: 30}, (_, i) => `Dia ${i+1}`);
        break;
      case "6m":
        labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
        break;
      case "1y":
        labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        break;
    }
    
    // Gerar valores com tendência aleatória (crescente, estável ou decrescente)
    const trend = Math.random() > 0.6 ? "crescente" : Math.random() > 0.5 ? "estável" : "decrescente";
    
    values = labels.map((_, index) => {
      if (trend === "crescente") {
        baseValue += Math.floor(Math.random() * 20);
      } else if (trend === "decrescente") {
        baseValue -= Math.floor(Math.random() * 15);
        baseValue = Math.max(10, baseValue);
      } else {
        baseValue += Math.floor(Math.random() * 30) - 15;
        baseValue = Math.max(10, baseValue);
      }
      
      return baseValue;
    });
    
    return {
      labels,
      values,
      source: "pyTrends",
      keyword,
      relatedTerms: [
        `${keyword} preço`, 
        `${keyword} análise`, 
        `melhor ${keyword}`,
        `${keyword} alternativas`,
        `${keyword} reviews`
      ],
      timeRange,
      lastUpdated: new Date()
    };
  }
  
  private createEmptyTrendData(keyword: string, source: DataSource, timeRange: TimeRange): TrendData {
    return {
      labels: [],
      values: [],
      source,
      keyword,
      timeRange,
      lastUpdated: new Date()
    };
  }
}

// Exportar instância singleton do serviço
export const trendingApi = new TrendingApiService();
