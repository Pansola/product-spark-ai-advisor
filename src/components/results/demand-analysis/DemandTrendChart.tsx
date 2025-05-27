import React, { useState, useEffect } from "react";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { trendingApi, TrendData, TimeRange } from "@/services/trending";
import { Skeleton } from "@/components/ui/skeleton";

interface DemandTrendChartProps {
  data: Array<{
    month: string;
    value: number;
  }>;
  productName?: string;
  timeRange: TimeRange;
}

const DemandTrendChart: React.FC<DemandTrendChartProps> = ({ 
  data: initialData,
  productName,
  timeRange
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [realTimeData, setRealTimeData] = useState<TrendData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"mock" | "realtime">("mock");
  
  // Converter dados reais para o formato esperado pelo gráfico
  const getChartData = () => {
    if (dataSource === "realtime" && realTimeData) {
      return realTimeData.labels.map((label, index) => ({
        month: label,
        value: realTimeData.values[index]
      }));
    }
    return initialData;
  };
  
  useEffect(() => {
    if (productName) {
      const fetchRealTimeData = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const data = await trendingApi.getTrendData(productName, "pyTrends", timeRange);
          setRealTimeData(data);
          setDataSource("realtime");
        } catch (error) {
          console.error("Erro ao buscar dados de tendência:", error);
          setError("Não foi possível obter dados reais. Usando dados simulados.");
          setDataSource("mock");
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchRealTimeData();
    }
  }, [productName, timeRange]);
  
  if (isLoading) {
    return (
      <div className="h-[300px] sm:h-[400px] w-full">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }
  
  return (
    <div className="w-full">
      {error && (
        <div className="text-amber-600 text-sm mb-2 p-2 bg-amber-50 rounded-md border border-amber-100">
          {error}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
        <div className="text-xs text-gray-500">
          {dataSource === "realtime" ? "Dados de tendências reais (PyTrends)" : "Dados simulados"}
        </div>
        {realTimeData && (
          <div className="text-xs text-gray-500">
            Última atualização: {new Date(realTimeData.lastUpdated).toLocaleString()}
          </div>
        )}
      </div>
      
      <div className="h-[300px] sm:h-[400px] w-full">
        <ChartContainer config={{
          trend: {
            color: "#4F7CAC"
          }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={getChartData()} 
              margin={{
                top: 10,
                right: 15,
                left: 5,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }} 
                angle={-45} 
                textAnchor="end"
                height={50} 
                interval={0}
              />
              <YAxis tick={{ fontSize: 10 }} width={40} />
              <Tooltip 
                contentStyle={{ 
                  fontSize: '12px',
                  padding: '8px'
                }}
              />
              <Line 
                name="Procuras" 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-trend, #4F7CAC)" 
                strokeWidth={2} 
                dot={{ r: 3 }} 
                activeDot={{ r: 5 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default DemandTrendChart;
