
import { TrendData, DataSource, TimeRange } from './types';

/**
 * Generates mock trend data for testing and fallback purposes
 */
export class MockDataGenerator {
  /**
   * Simulate PyTrends data for a keyword and timerange
   */
  static generateTrendData(keyword: string, timeRange: TimeRange, source: DataSource = "pyTrends"): TrendData {
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
    
    values = labels.map(() => {
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
      source,
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

  /**
   * Create empty trend data object
   */
  static createEmptyTrendData(keyword: string, source: DataSource, timeRange: TimeRange): TrendData {
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
