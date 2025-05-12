
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataSource, trendingApi } from "@/services/trendingApi";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

const API_SOURCES = [
  { 
    id: "googleTrends" as DataSource, 
    name: "Google Trends", 
    description: "Acesso a dados de tendências globais e regionais",
    docLink: "https://support.google.com/trends/answer/6015068?hl=pt-BR",
  },
  { 
    id: "mercadoLivre" as DataSource, 
    name: "Mercado Livre", 
    description: "Dados de produtos populares na América Latina",
    docLink: "https://developers.mercadolivre.com.br/pt_br/api-docs-pt-br",
  },
  { 
    id: "semrush" as DataSource, 
    name: "SEMrush", 
    description: "Análise competitiva e volume de buscas",
    docLink: "https://developer.semrush.com/",
  },
];

const ApiKeysConfig: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<Record<DataSource, string>>({
    googleTrends: '',
    mercadoLivre: '',
    amazon: '',
    semrush: '',
  });
  
  const [isLoading, setIsLoading] = useState<Record<DataSource, boolean>>({
    googleTrends: false,
    mercadoLivre: false,
    amazon: false,
    semrush: false,
  });
  
  // Carregar chaves salvas no localStorage
  useEffect(() => {
    const savedKeys: Record<DataSource, string> = {
      googleTrends: '',
      mercadoLivre: '',
      amazon: '',
      semrush: '',
    };
    
    Object.keys(savedKeys).forEach(source => {
      const key = localStorage.getItem(`apiKey_${source}`);
      if (key) {
        savedKeys[source as DataSource] = key;
      }
    });
    
    setApiKeys(savedKeys);
  }, []);
  
  const handleSaveApiKey = async (source: DataSource) => {
    try {
      setIsLoading(prev => ({...prev, [source]: true}));
      
      // Em produção, utilizaríamos Supabase Secrets
      trendingApi.configureApiKey(source, apiKeys[source]);
      
      // Simular validação da API key
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success(`Chave de API para ${source} salva com sucesso.`);
    } catch (error) {
      console.error(`Erro ao salvar chave de API para ${source}:`, error);
      toast.error(`Erro ao salvar chave de API para ${source}.`);
    } finally {
      setIsLoading(prev => ({...prev, [source]: false}));
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <KeyRound className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Configuração de APIs Externas</h2>
      </div>
      
      <p className="text-muted-foreground">
        Configure suas chaves de API para acessar dados reais de tendências e análises de mercado.
        Para maior segurança, recomendamos utilizar a integração com Supabase.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {API_SOURCES.map(source => (
          <Card key={source.id}>
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
                  value={apiKeys[source.id]}
                  onChange={(e) => 
                    setApiKeys(prev => ({...prev, [source.id]: e.target.value}))
                  }
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
                onClick={() => handleSaveApiKey(source.id)}
                disabled={isLoading[source.id] || !apiKeys[source.id]}
              >
                {isLoading[source.id] ? "Salvando..." : "Salvar"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApiKeysConfig;
