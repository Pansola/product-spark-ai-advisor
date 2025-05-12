
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataSource, trendingApi } from "@/services/trending";
import { toast } from "sonner";
import { KeyRound, Globe } from "lucide-react";

const API_SOURCES = [
  { 
    id: "pyTrends" as DataSource, 
    name: "PyTrends (Google Trends)", 
    description: "Acesso a dados de tendências globais e regionais usando PyTrends",
    docLink: "https://github.com/GeneralMills/pytrends",
    isPyTrends: true,
  },
  { 
    id: "mercadoLivre" as DataSource, 
    name: "Mercado Livre", 
    description: "Dados de produtos populares na América Latina",
    docLink: "https://developers.mercadolivre.com.br/pt_br/api-docs-pt-br",
    isPyTrends: false,
  },
  { 
    id: "semrush" as DataSource, 
    name: "SEMrush", 
    description: "Análise competitiva e volume de buscas",
    docLink: "https://developer.semrush.com/",
    isPyTrends: false,
  },
];

const ApiKeysConfig: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<Record<DataSource, string>>({
    pyTrends: '',
    mercadoLivre: '',
    amazon: '',
    semrush: '',
  });
  
  const [pyTrendsEndpoint, setPyTrendsEndpoint] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<Record<DataSource | 'pyTrendsEndpoint', boolean>>({
    pyTrends: false,
    mercadoLivre: false,
    amazon: false,
    semrush: false,
    pyTrendsEndpoint: false,
  });
  
  // Carregar chaves salvas no localStorage
  useEffect(() => {
    const savedKeys: Record<DataSource, string> = {
      pyTrends: '',
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
    
    // Carregar endpoint do PyTrends
    const savedEndpoint = localStorage.getItem('pyTrendsEndpoint');
    if (savedEndpoint) {
      setPyTrendsEndpoint(savedEndpoint);
    }
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

  const handleSavePyTrendsEndpoint = async () => {
    try {
      setIsLoading(prev => ({...prev, pyTrendsEndpoint: true}));
      
      trendingApi.configurePyTrendsEndpoint(pyTrendsEndpoint);
      
      // Simular validação do endpoint
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Endpoint do PyTrends configurado com sucesso.");
    } catch (error) {
      console.error("Erro ao configurar endpoint do PyTrends:", error);
      toast.error("Erro ao configurar endpoint do PyTrends.");
    } finally {
      setIsLoading(prev => ({...prev, pyTrendsEndpoint: false}));
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

      {/* Configuração do endpoint do PyTrends */}
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
            disabled={isLoading.pyTrendsEndpoint || !pyTrendsEndpoint}
            className="ml-auto"
          >
            {isLoading.pyTrendsEndpoint ? "Salvando..." : "Salvar Endpoint"}
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {API_SOURCES.filter(source => !source.isPyTrends).map(source => (
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
