import React from "react";
import { Award } from "lucide-react";
import { AnalysisResults, ProductData } from "@/types/product";
import AccordionCard from "@/components/AccordionCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { generateMockResults } from "@/utils/mockDataGenerator";

interface RelatedProductsCardProps {
  relatedProducts: NonNullable<AnalysisResults["relatedProducts"]>;
  id?: string;
}

const RelatedProductsCard: React.FC<RelatedProductsCardProps> = ({ relatedProducts, id }) => {
  const navigate = useNavigate();

  const handleAnalyzeProduct = (product: AnalysisResults["relatedProducts"][0]) => {
    // Criando dados do produto selecionado
    const selectedProduct: ProductData = {
      productName: product.name,
      country: "brasil", // Default
    };
    
    // Salva o produto selecionado no sessionStorage
    sessionStorage.setItem('productData', JSON.stringify(selectedProduct));
    
    // Gera resultados para o novo produto
    const selectedPlan = sessionStorage.getItem('selectedPlan') || 'premium';
    const newResults = generateMockResults(selectedProduct, selectedPlan);
    sessionStorage.setItem('analysisResults', JSON.stringify(newResults));
    
    toast.success(`Análise de "${product.name}" concluída`, {
      description: "Exibindo resultados..."
    });
    
    // Recarrega a página atual para exibir os novos resultados
    window.location.reload();
  };

  // Conteúdo resumido que é sempre exibido
  const summaryContent = (
    <div className="space-y-3">
      <p className="text-gray-700 mb-3">
        Você também pode considerar estes produtos com alto potencial
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {relatedProducts.map((product, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{product.name}</span>
              <span className="bg-highlight text-dark px-2 py-0.5 rounded text-xs font-medium">
                {product.score}/100
              </span>
            </div>
            <p className="text-gray-500 text-xs">Categoria: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Conteúdo detalhado que é exibido apenas quando expandido
  const detailedContent = (
    <div className="space-y-6">
      <h4 className="text-lg font-medium mb-3">Outras Oportunidades Promissoras no Mesmo Nicho</h4>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedProducts.map((product, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-highlight text-dark px-2 py-1 rounded text-sm font-bold">
                {product.score}/100
              </div>
            </div>
            
            <div className="p-4">
              <h5 className="font-medium text-lg mb-1">{product.name}</h5>
              <p className="text-gray-600 text-sm mb-4">Categoria: {product.category}</p>
              
              <Button 
                className="w-full"
                onClick={() => handleAnalyzeProduct(product)}
              >
                Analisar Produto
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <AccordionCard
      id={id}
      title="Produtos Validados e Populares"
      icon={<Award size={18} />}
      summary={summaryContent}
      details={detailedContent}
    />
  );
};

export default RelatedProductsCard;
