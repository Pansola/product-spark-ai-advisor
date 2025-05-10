
import React, { useState } from "react";
import { Package } from "lucide-react";
import { AnalysisResults } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Input } from "@/components/ui/input";

interface CostAnalysisCardProps {
  costAnalysis: NonNullable<AnalysisResults["costAnalysis"]>;
}

const CostAnalysisCard: React.FC<CostAnalysisCardProps> = ({ costAnalysis }) => {
  // Estado para os valores editáveis do simulador
  const [productCost, setProductCost] = useState(costAnalysis.estimatedCost.toString());
  const [sellingPrice, setSellingPrice] = useState(costAnalysis.recommendedPrice.toString());
  const [shipping, setShipping] = useState((costAnalysis.shipping || 0).toString());
  const [taxes, setTaxes] = useState((costAnalysis.taxes || 0).toString());

  // Cálculos do simulador
  const parsedCost = parseFloat(productCost) || 0;
  const parsedPrice = parseFloat(sellingPrice) || 0;
  const parsedShipping = parseFloat(shipping) || 0;
  const parsedTaxes = parseFloat(taxes) || 0;
  
  const totalCost = parsedCost + parsedShipping + parsedTaxes;
  const profit = parsedPrice - totalCost;
  const margin = parsedPrice > 0 ? (profit / parsedPrice) * 100 : 0;
  
  // Dados para o gráfico de lucro por volume
  const volumeData = [
    { name: '10 unidades', lucro: profit * 10 },
    { name: '50 unidades', lucro: profit * 50 },
    { name: '100 unidades', lucro: profit * 100 },
    { name: '500 unidades', lucro: profit * 500 },
  ];

  // Verificar se a margem está em zona de risco
  const isLowMargin = margin < 20;

  // Conteúdo resumido que é sempre exibido
  const summaryContent = (
    <div className="space-y-3">
      <p className="text-gray-700">
        <span className="font-medium">Custo estimado do produto:</span> R$ {costAnalysis.estimatedCost.toFixed(2)}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Preço de venda recomendado:</span> R$ {costAnalysis.recommendedPrice.toFixed(2)}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Margem de lucro estimada:</span> {costAnalysis.margin}%
      </p>
      <div className="mt-2">
        <div className="bg-dark text-white p-3 rounded">
          <p className="font-medium">Potencial de lucro por 100 vendas:</p>
          <p className="text-2xl font-bold mt-1 text-highlight">
            R$ {((costAnalysis.recommendedPrice - costAnalysis.estimatedCost) * 100).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </p>
        </div>
      </div>
    </div>
  );

  // Conteúdo detalhado que é exibido apenas quando expandido
  const detailedContent = (
    <div className="space-y-6">
      {/* Simulador de margem */}
      <div>
        <h4 className="text-lg font-medium mb-3">Simulador de Margem</h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Custo do Produto (R$)</label>
              <Input
                type="number"
                value={productCost}
                onChange={(e) => setProductCost(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Preço de Venda (R$)</label>
              <Input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Custo de Envio (R$)</label>
              <Input
                type="number"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Impostos (R$)</label>
              <Input
                type="number"
                value={taxes}
                onChange={(e) => setTaxes(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">Custo Total:</span>
              <span>R$ {totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium">Lucro por Unidade:</span>
              <span className={profit < 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                R$ {profit.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium">Margem:</span>
              <span className={isLowMargin ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                {margin.toFixed(1)}%
              </span>
            </div>
          </div>
          
          {/* Alerta de margem baixa */}
          {isLowMargin && (
            <div className="mt-3 bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm">
              <strong>Alerta:</strong> Margem abaixo de 20% pode ser arriscada. Considere aumentar o preço ou reduzir custos.
            </div>
          )}
        </div>
      </div>
      
      {/* Gráfico de lucro por volume */}
      <div>
        <h4 className="text-lg font-medium mb-3">Projeção de Lucro por Volume</h4>
        <div className="h-64">
          <ChartContainer
            config={{
              profit: { color: "#4F7CAC" },
            }}
          >
            <BarChart
              data={volumeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`} />
              <Legend />
              <Bar 
                dataKey="lucro" 
                name="Lucro Total" 
                fill="var(--color-profit, #4F7CAC)" 
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
      
      {/* Ponto de equilíbrio */}
      {costAnalysis.breakEvenPoint && (
        <div>
          <h4 className="text-lg font-medium mb-2">Ponto de Equilíbrio</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-lg">{costAnalysis.breakEvenPoint} unidades</p>
            <p className="text-sm text-gray-600 mt-1">
              Você precisará vender pelo menos esta quantidade de produtos para cobrir todos os custos iniciais.
            </p>
          </div>
        </div>
      )}
      
      {/* Comparativo de margens do nicho */}
      {costAnalysis.nicheAverageMargin && (
        <div>
          <h4 className="text-lg font-medium mb-2">Comparativo com o Nicho</h4>
          <div className="flex items-center mt-2">
            <div className="flex-1">
              <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-primary rounded-full absolute left-0" 
                  style={{ width: `${margin}%` }}
                ></div>
                <div 
                  className="h-full w-1 bg-dark absolute" 
                  style={{ left: `${costAnalysis.nicheAverageMargin}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            <div className="ml-4 text-right">
              <p className="text-sm font-medium">Sua margem: <span className={isLowMargin ? "text-red-600" : "text-green-600"}>{margin.toFixed(1)}%</span></p>
              <p className="text-sm font-medium">Média do nicho: {costAnalysis.nicheAverageMargin}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <AccordionCard
      title="Análise de Custo e Margem"
      icon={<Package size={18} />}
      summary={summaryContent}
      details={detailedContent}
    />
  );
};

export default CostAnalysisCard;
