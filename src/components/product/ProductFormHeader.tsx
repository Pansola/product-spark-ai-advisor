
import React from "react";

interface ProductFormHeaderProps {
  selectedPlan: string;
}

const ProductFormHeader: React.FC<ProductFormHeaderProps> = ({ selectedPlan }) => {
  return (
    <div className="bg-primary p-6 text-white">
      <h1 className="text-2xl font-bold">
        Informações do Produto
      </h1>
      <p className="text-white/80 mt-2">
        Forneça os detalhes do seu produto para nossa análise
      </p>
    </div>
  );
};

export default ProductFormHeader;
