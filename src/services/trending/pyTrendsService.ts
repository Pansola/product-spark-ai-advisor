
import { TrendData, TimeRange, DataSource } from './types';
import { MockDataGenerator } from './mockDataGenerator';
import { toast } from 'sonner';

/**
 * Service for interacting with PyTrends API
 */
export class PyTrendsService {
  private endpoint: string | undefined;
  
  constructor(endpoint?: string) {
    this.endpoint = endpoint;
  }

  /**
   * Configure PyTrends endpoint
   */
  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
    localStorage.setItem('pyTrendsEndpoint', endpoint);
    toast.success("Endpoint da API PyTrends configurado com sucesso");
  }

  /**
   * Get trend data from PyTrends
   */
  async getTrendData(keyword: string, timeRange: TimeRange): Promise<TrendData> {
    try {
      if (!this.endpoint) {
        console.warn("Endpoint PyTrends não configurado, usando dados simulados");
        return MockDataGenerator.generateTrendData(keyword, timeRange);
      }
      
      // Aqui faria a chamada para a API PyTrends
      // Por enquanto vamos simular os dados
      return MockDataGenerator.generateTrendData(keyword, timeRange);
    } catch (error) {
      console.error(`Erro ao obter dados do PyTrends: ${error}`);
      throw error;
    }
  }

  /**
   * Get search volume from PyTrends
   */
  async getSearchVolume(term: string, timeRange: TimeRange): Promise<number> {
    try {
      // Simular volume de busca
      return Math.floor(Math.random() * (10000 - 500)) + 500;
    } catch (error) {
      console.error(`Erro ao obter volume de busca do PyTrends: ${error}`);
      throw error;
    }
  }
}
