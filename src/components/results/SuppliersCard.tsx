
import React from "react";
import ResultCard from "@/components/ResultCard";
import { Package, Check } from "lucide-react";

interface SuppliersCardProps {
  suppliers: string[];
}

const SuppliersCard: React.FC<SuppliersCardProps> = ({ suppliers }) => {
  return (
    <ResultCard title="Fornecedores Recomendados" icon={<Package size={18} />}>
      <div className="space-y-3">
        <p className="text-gray-700 mb-3">
          Baseado no seu produto e mercado-alvo, recomendamos os seguintes fornecedores:
        </p>
        <div className="space-y-2">
          {suppliers.map((supplier, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check size={16} className="text-primary" /> 
              <span>{supplier}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Dica: Sempre solicite amostras antes de fazer grandes pedidos para verificar a qualidade do produto.
        </p>
      </div>
    </ResultCard>
  );
};

export default SuppliersCard;
