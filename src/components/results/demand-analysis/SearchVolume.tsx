
import React, { useState, useEffect } from "react";
import { trendingApi, TimeRange } from "@/services/trendingApi";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchVolumeProps {
  volumeBusca: number;
  productName?: string;
  timeRange?: TimeRange;
}

const SearchVolume: React.FC<SearchVolumeProps> = ({
  volumeBusca: initialVolume,
  productName,
  timeRange = "30d"
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState<number>(initialVolume);
  const [dataSource, setDataSource] = useState<"mock" | "realtime">("mock");
  
  useEffect(() => {
    if (productName) {
      const fetchSearchVolume = async () => {
        try {
          setIsLoading(true);
          const data = await trendingApi.getSearchVolume(productName, "googleTrends", timeRange);
          setVolume(data.volume);
          setDataSource("realtime");
        } catch (error) {
          console.error("Erro ao buscar volume de busca:", error);
          setVolume(initialVolume);
          setDataSource("mock");
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchSearchVolume();
    }
  }, [productName, timeRange, initialVolume]);

  return (
    <div className="mt-32 mb-8 py-0 my-0">
      <h4 className="text-lg font-medium mb-1">Volume de Busca Mensal Estimado</h4>
      
      {isLoading ? (
        <Skeleton className="h-8 w-32" />
      ) : (
        <>
          <p className="text-2xl font-bold text-primary">{volume.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">
            {dataSource === "realtime" 
              ? "Baseado em dados reais do Google Trends."
              : "Baseado em palavras-chave relacionadas ao produto e nicho de mercado."}
          </p>
        </>
      )}
    </div>
  );
};

export default SearchVolume;
