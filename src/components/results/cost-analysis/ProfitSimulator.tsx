
import React, { useState } from "react";
import { AnalysisResults } from "@/types/product";
import { Input } from "@/components/ui/input";

interface ProfitSimulatorProps {
  costAnalysis: NonNullable<AnalysisResults["costAnalysis"]>;
}

const ProfitSimulator: React.FC<ProfitSimulatorProps> = ({ costAnalysis }) => {
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
  const margin = parsedPrice > 0 ? profit / parsedPrice * 100 : 0;

  // Verificar se a margem está em zona de risco
  const isLowMargin = margin < 20;

  return (
    <div>
      <h4 className="text-lg font-medium mb-3">Simulador de Margem</h4>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Custo do Produto (R$)</label>
            <Input type="number" value={productCost} onChange={e => setProductCost(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Preço de Venda (R$)</label>
            <Input type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Custo de Envio (R$)</label>
            <Input type="number" value={shipping} onChange={e => setShipping(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Impostos (R$)</label>
            <Input type="number" value={taxes} onChange={e => setTaxes(e.target.value)} className="mt-1" />
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
        {isLowMargin && <div className="mt-3 bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm">
            <strong>Alerta:</strong> Margem abaixo de 20% pode ser arriscada. Considere aumentar o preço ou reduzir custos.
          </div>}
      </div>
    </div>
  );
};

export default ProfitSimulator;
