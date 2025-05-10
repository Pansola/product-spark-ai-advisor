
import React from "react";
import ResultCard from "@/components/ResultCard";
import { Award } from "lucide-react";
import { AnalysisResults } from "@/types/product";

interface RelatedProductsCardProps {
  relatedProducts: NonNullable<AnalysisResults["relatedProducts"]>;
}

const RelatedProductsCard: React.FC<RelatedProductsCardProps> = ({ relatedProducts }) => {
  return (
    <ResultCard title="Produtos Validados e Populares" icon={<Award size={18} />}>
      <div className="space-y-3">
        <p className="text-gray-700 mb-3">
          Com base no seu interesse, estes produtos têm alto potencial no mesmo mercado:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {relatedProducts.map((product, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{product.name}</span>
                <span className="bg-highlight text-dark px-2 py-1 rounded text-sm font-medium">
                  {product.score}/100
                </span>
              </div>
              <p className="text-gray-500 text-sm">Categoria: {product.category}</p>
            </div>
          ))}
        </div>
      </div>
    </ResultCard>
  );
};

export default RelatedProductsCard;
