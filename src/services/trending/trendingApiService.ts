
import { toast } from "sonner";
import { DataSource, DataSourceConfig, TrendData, TimeRange, SearchVolumeData, CompetitorData } from "./types";
import { PyTrendsService } from "./pyTrendsService";
import { MarketplaceService } from "./marketplaceService";
import { MockDataGenerator } from "./mockDataGenerator";

/**
 * Main service for integrating with trend data sources
 */
class TrendingApiService {
  private apiConfigs: Map<DataSource, DataSourceConfig> = new Map();
  private pyTrendsService: PyTrendsService;
  private marketplaceServices: Map<DataSource, MarketplaceService> = new Map();
  
  constructor() {
    // Inicializar serviço PyTrends
    const savedEndpoint = localStorage.getItem('pyTrendsEndpoint');
    this.pyTrendsService = new PyTrendsService(savedEndpoint || undefined);
    
    // Configuração padrão para fontes de dados
    this.apiConfigs.set("pyTrends", {
      endpoint: savedEndpoint,
      rateLimit: 5 // requisições por minuto
    });
    this.apiConfigs.set("mercadoLivre", {
      endpoint: "https://api.mercadolibre.com/sites/MLB",
      rateLimit: 10
    });
    
    // Inicializar serviços de marketplace
    this.marketplaceServices.set("mercadoLivre", new MarketplaceService("mercadoLivre", {
      endpoint: "https://api.mercadolibre.com/sites/MLB"
    }));
    
    // Carregar chaves de API salvas
    this.loadSavedApiKeys();
  }

  /**
   * Carregar chaves de API salvas no localStorage
   */
  private loadSavedApiKeys(): void {
    const sources: DataSource[] = ["mercadoLivre", "amazon", "semrush"];
    
    sources.forEach(source => {
      const apiKey = localStorage.getItem(`apiKey_${source}`);
      if (apiKey) {
        this.configureApiKey(source, apiKey);
      }
    });
  }
  
  /**
   * Configura a chave de API para uma fonte específica
   */
  public configureApiKey(source: DataSource, apiKey: string): void {
    const config = this.apiConfigs.get(source) || {};
    this.apiConfigs.set(source, {
      ...config,
      apiKey
    });
    
    // Configurar no serviço de marketplace correspondente
    if (this.marketplaceServices.has(source)) {
      this.marketplaceServices.get(source)?.setApiKey(apiKey);
    }
    
    // Salvar no localStorage
    localStorage.setItem(`apiKey_${source}`, apiKey);
    
    toast.success(`Chave de API para ${source} configurada com sucesso`);
  }

  /**
   * Configura o endpoint da API PyTrends
   */
  public configurePyTrendsEndpoint(endpoint: string): void {
    const config = this.apiConfigs.get("pyTrends") || {};
    this.apiConfigs.set("pyTrends", {
      ...config,
      endpoint
    });
    
    // Configurar no serviço PyTrends
    this.pyTrendsService.setEndpoint(endpoint);
  }
  
  /**
   * Verificar se uma fonte está configurada
   */
  public isSourceConfigured(source: DataSource): boolean {
    const config = this.apiConfigs.get(source);
    // PyTrends não precisa de apiKey, apenas de um endpoint válido
    if (source === "pyTrends") {
      return config !== undefined && config.endpoint !== undefined;
    }
    return config !== undefined && config.apiKey !== undefined;
  }
  
  /**
   * Recuperar dados de tendência para um produto/termo
   */
  public async getTrendData(
    keyword: string, 
    source: DataSource = "pyTrends", 
    timeRange: TimeRange = "6m"
  ): Promise<TrendData> {
    try {
      if (source === "pyTrends") {
        return await this.pyTrendsService.getTrendData(keyword, timeRange);
      }
      
      throw new Error(`Fonte de dados ${source} não implementada`);
    } catch (error) {
      console.error(`Erro ao obter dados de tendência: ${error}`);
      toast.error("Falha ao obter dados de tendência. Tente novamente mais tarde.");
      
      // Retornar dados simulados em caso de erro
      return MockDataGenerator.createEmptyTrendData(keyword, source, timeRange);
    }
  }
  
  /**
   * Recuperar dados de comparação de competidores
   */
  public async getCompetitorData(
    productName: string,
    source: DataSource = "mercadoLivre",
    timeRange: TimeRange = "30d"
  ): Promise<CompetitorData[]> {
    try {
      const marketplaceService = this.marketplaceServices.get(source);
      if (marketplaceService) {
        return await marketplaceService.getCompetitorData(productName, timeRange);
      }
      
      throw new Error(`Fonte de dados ${source} não implementada para comparação de competidores`);
    } catch (error) {
      console.error(`Erro ao obter dados de competidores: ${error}`);
      toast.error("Falha ao obter dados de competidores. Tente novamente mais tarde.");
      return [];
    }
  }
  
  /**
   * Recuperar volume de busca para um termo
   */
  public async getSearchVolume(
    term: string,
    source: DataSource = "pyTrends", 
    timeRange: TimeRange = "30d"
  ): Promise<SearchVolumeData> {
    try {
      let volume = 0;
      
      if (source === "pyTrends") {
        volume = await this.pyTrendsService.getSearchVolume(term, timeRange);
      } else {
        throw new Error(`Fonte de dados ${source} não implementada para volume de busca`);
      }
      
      return {
        term,
        volume,
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
}

// Exportar instância singleton do serviço
export const trendingApiService = new TrendingApiService();
