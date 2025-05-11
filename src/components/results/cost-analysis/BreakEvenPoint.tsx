
import React from "react";

interface BreakEvenPointProps {
  breakEvenPoint: number;
}

const BreakEvenPoint: React.FC<BreakEvenPointProps> = ({ breakEvenPoint }) => {
  return (
    <div className="mt-12">
      <h4 className="text-lg font-medium mb-3">Ponto de Equilíbrio</h4>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-medium text-lg">{breakEvenPoint} unidades</p>
        <p className="text-sm text-gray-600 mt-1">
          Você precisará vender pelo menos esta quantidade de produtos para cobrir todos os custos iniciais.
        </p>
      </div>
    </div>
  );
};

export default BreakEvenPoint;
