
import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ProfitVolumeChartProps {
  profit: number;
}

const ProfitVolumeChart: React.FC<ProfitVolumeChartProps> = ({ profit }) => {
  // Dados para o gráfico de lucro por volume
  const volumeData = [
    { name: '10 un.', lucro: profit * 10 },
    { name: '50 un.', lucro: profit * 50 },
    { name: '100 un.', lucro: profit * 100 },
    { name: '500 un.', lucro: profit * 500 }
  ];

  return (
    <div>
      <h4 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Projeção de Lucro por Volume</h4>
      <div className="h-64 sm:h-80 w-full mt-4 sm:mt-8">
        <ChartContainer config={{
          profit: {
            color: "#4F7CAC"
          }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData} margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 40
            }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }} 
                height={50} 
              />
              <YAxis 
                tick={{ fontSize: 10 }} 
                width={60} 
              />
              <Tooltip 
                formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}`}
                labelFormatter={(name) => `${name}`}
                contentStyle={{ 
                  padding: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="lucro" 
                name="Lucro Total" 
                fill="var(--color-profit, #4F7CAC)" 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      {/* Legenda do gráfico reposicionada com mais espaço abaixo */}
      <div className="text-center mt-8 sm:mt-16 mb-4 sm:mb-8">
        <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
          <span className="h-3 w-3 mr-2 bg-[#4F7CAC] rounded-sm"></span>
          <span className="text-xs sm:text-sm text-gray-700">Lucro Total</span>
        </span>
      </div>
    </div>
  );
};

export default ProfitVolumeChart;
