
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { trendingApi } from "@/services/trending";
import { Globe } from "lucide-react";
import { toast } from "sonner";

interface PyTrendsEndpointConfigProps {
  pyTrendsEndpoint: string;
  setPyTrendsEndpoint: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const PyTrendsEndpointConfig: React.FC<PyTrendsEndpointConfigProps> = ({
  pyTrendsEndpoint,
  setPyTrendsEndpoint,
  isLoading,
  setIsLoading
}) => {
  const handleSavePyTrendsEndpoint = async () => {
    try {
      setIsLoading(true);
      
      trendingApi.configurePyTrendsEndpoint(pyTrendsEndpoint);
      
      // Simular validação do endpoint
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Endpoint do PyTrends configurado com sucesso.");
    } catch (error) {
      console.error("Erro ao configurar endpoint do PyTrends:", error);
      toast.error("Erro ao configurar endpoint do PyTrends.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Configuração do PyTrends
        </CardTitle>
        <CardDescription>Configure o endpoint da API intermediária que utiliza PyTrends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="pytrends-endpoint">URL do Endpoint do PyTrends</Label>
          <Input
            id="pytrends-endpoint"
            type="url"
            placeholder="https://sua-api-pytrends.exemplo.com/trends"
            value={pyTrendsEndpoint}
            onChange={(e) => setPyTrendsEndpoint(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Este deve ser o endpoint de uma API que utiliza a biblioteca PyTrends para acessar dados do Google Trends.
            Você precisa hospedar esta API em um serviço como Supabase Edge Functions, Vercel Functions, AWS Lambda, etc.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSavePyTrendsEndpoint}
          disabled={isLoading || !pyTrendsEndpoint}
          className="ml-auto"
        >
          {isLoading ? "Salvando..." : "Salvar Endpoint"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PyTrendsEndpointConfig;
