
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ResultsActions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-8 text-center">
      <h3 className="font-medium mb-4 text-lg">Pronto para analisar outro produto?</h3>
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={() => navigate("/product-form")}
          variant="outline"
        >
          Analisar Outro Produto
        </Button>
        <Button
          onClick={() => navigate("/plans")}
          className="bg-primary hover:bg-primary/90"
        >
          Explorar Outros Planos
        </Button>
      </div>
    </div>
  );
};

export default ResultsActions;
