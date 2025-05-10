
import React from "react";
import { countryNames } from "@/utils/countryMapping";
import { ProductData } from "@/types/product";
import PlanBadge from "@/components/product/PlanBadge";

interface ResultsHeaderProps {
  productData: ProductData;
  selectedPlan: string;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ productData, selectedPlan }) => {
  return (
    <div className="bg-primary p-6 text-white">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">
            Análise de Produto: {productData.productName}
          </h1>
          <p className="text-white/80 mt-2">
            País de destino: {countryNames[productData.country] || productData.country}
          </p>
        </div>
        <PlanBadge plan={selectedPlan} />
      </div>
    </div>
  );
};

export default ResultsHeader;
