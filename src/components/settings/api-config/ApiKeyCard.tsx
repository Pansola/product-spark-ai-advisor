
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataSource, trendingApi } from "@/services/trending";
import { toast } from "sonner";

interface ApiKeyCardProps {
  source: {
    id: DataSource;
    name: string;
    description: string;
    docLink: string;
    isPyTrends: boolean;
  };
  apiKey: string;
  setApiKey: (source: DataSource, value: string) => void;
  isLoading: boolean;
  setIsLoading: (source: DataSource, isLoading: boolean) => void;
}

const ApiKeyCard: React.FC<ApiKeyCardProps> = ({
  source,
  apiKey,
  setApiKey,
  isLoading,
  setIsLoading
}) => {
  const handleSaveApiKey = async () => {
    try {
      setIsLoading(source.id, true);
      
      // Em produção, utilizaríamos Supabase Secrets
      trendingApi.configureApiKey(source.id, apiKey);
      
      // Simular validação da API key
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success(`Chave de API para ${source.id} salva com sucesso.`);
    } catch (error) {
      console.error(`Erro ao salvar chave de API para ${source.id}:`, error);
      toast.error(`Erro ao salvar chave de API para ${source.id}.`);
    } finally {
      setIsLoading(source.id, false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{source.name}</CardTitle>
        <CardDescription>{source.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor={`api-key-${source.id}`}>Chave de API</Label>
          <Input
            id={`api-key-${source.id}`}
            type="password"
            placeholder="Digite sua chave de API"
            value={apiKey}
            onChange={(e) => setApiKey(source.id, e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <a 
          href={source.docLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Documentação
        </a>
        <Button
          onClick={handleSaveApiKey}
          disabled={isLoading || !apiKey}
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiKeyCard;
