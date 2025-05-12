
import { CompetitorData, TimeRange, DataSource } from './types';

/**
 * Service for marketplace integrations (Mercado Livre, Amazon, etc)
 */
export class MarketplaceService {
  private apiKey: string | undefined;
  private source: DataSource;
  private endpoint: string | undefined;

  constructor(source: DataSource, config?: { apiKey?: string, endpoint?: string }) {
    this.source = source;
    this.apiKey = config?.apiKey;
    this.endpoint = config?.endpoint;
  }

  /**
   * Set API key for this marketplace
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    localStorage.setItem(`apiKey_${this.source}`, apiKey);
  }

  /**
   * Get competitor data from marketplace
   */
  async getCompetitorData(productName: string, timeRange: TimeRange): Promise<CompetitorData[]> {
    try {
      // Simular dados de competidores
      const competitors = ["Produto A", "Produto B", "Produto C"];
      return competitors.map(name => ({
        name,
        value: Math.floor(Math.random() * (100 - 30)) + 30,
        source: this.source,
        timeRange,
        lastUpdated: new Date()
      }));
    } catch (error) {
      console.error(`Erro ao obter dados de competidores: ${error}`);
      throw error;
    }
  }
}
