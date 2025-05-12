
import React, { useState, useEffect } from "react";
import { KeyRound } from "lucide-react";
import { DataSource } from "@/services/trending";
import PyTrendsEndpointConfig from "./api-config/PyTrendsEndpointConfig";
import ApiKeyCard from "./api-config/ApiKeyCard";
import { API_SOURCES } from "./api-config/constants";

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
  
  const handleSetApiKey = (source: DataSource, value: string) => {
    setApiKeys(prev => ({...prev, [source]: value}));
  };

  const handleSetIsLoading = (source: DataSource | 'pyTrendsEndpoint', value: boolean) => {
    setIsLoading(prev => ({...prev, [source]: value}));
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
      <PyTrendsEndpointConfig
        pyTrendsEndpoint={pyTrendsEndpoint}
        setPyTrendsEndpoint={setPyTrendsEndpoint}
        isLoading={isLoading.pyTrendsEndpoint}
        setIsLoading={(value) => handleSetIsLoading('pyTrendsEndpoint', value)}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {API_SOURCES.filter(source => !source.isPyTrends).map(source => (
          <ApiKeyCard
            key={source.id}
            source={source}
            apiKey={apiKeys[source.id]}
            setApiKey={handleSetApiKey}
            isLoading={isLoading[source.id]}
            setIsLoading={handleSetIsLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default ApiKeysConfig;
