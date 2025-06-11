
import { ProductFormData } from "@/types/product";

const N8N_WEBHOOK_URL = "https://n8n.gabrielmaquinateste.site/webhook-test/bca828d0-3886-4df5-ab8f-23624f10886b";

export interface N8nPayload {
  productName: string;
  productLink: string;
  productDescription: string;
  country: string;
  selectedPlan: string;
  timestamp: string;
}

export interface N8nResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Serviço para comunicação com n8n
 */
export class N8nService {
  /**
   * Enviar dados do produto para análise via n8n
   */
  static async analyzeProduct(
    productData: ProductFormData, 
    selectedPlan: string
  ): Promise<N8nResponse> {
    try {
      const payload: N8nPayload = {
        productName: productData.productName,
        productLink: productData.productLink,
        productDescription: productData.productDescription || "",
        country: productData.country,
        selectedPlan: selectedPlan,
        timestamp: new Date().toISOString()
      };

      console.log("Enviando para n8n:", payload);

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Resposta do n8n:", data);

      return {
        success: true,
        data: data
      };

    } catch (error) {
      console.error("Erro no n8nService:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido"
      };
    }
  }

  /**
   * Testar conectividade com o webhook n8n
   */
  static async testConnection(): Promise<boolean> {
    try {
      const testPayload = {
        test: true,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testPayload),
      });

      return response.ok;
    } catch (error) {
      console.error("Teste de conexão n8n falhou:", error);
      return false;
    }
  }
}
