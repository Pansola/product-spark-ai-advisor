
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import Footer from "@/components/Footer";
import ProductFormHeader from "@/components/product/ProductFormHeader";
import PlanBadge from "@/components/product/PlanBadge";
import ProductFormFields from "@/components/product/ProductFormFields";
import SubmitButton from "@/components/product/SubmitButton";
import { Button } from "@/components/ui/button";
import { generateMockResults } from "@/utils/mockDataGenerator";
import { ProductFormData } from "@/types/product";
import { N8nService } from "@/services/n8nService";

const ProductForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProductFormData>({
    defaultValues: {
      productName: "",
      productLink: "",
      productDescription: "",
      country: ""
    }
  });
  
  const selectedPlan = sessionStorage.getItem("selectedPlan") || "gratuito";
  
  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);

    try {
      // Tentar análise via n8n
      const n8nResponse = await N8nService.analyzeProduct(data, selectedPlan);
      
      // Salvar dados do formulário
      sessionStorage.setItem("productData", JSON.stringify(data));
      
      let analysisResults;
      
      if (n8nResponse.success && n8nResponse.data) {
        // Usar dados do n8n se disponíveis
        analysisResults = n8nResponse.data;
        toast.success("Análise realizada com sucesso via n8n!");
        console.log("Usando dados do n8n:", analysisResults);
      } else {
        // Fallback para dados simulados
        analysisResults = generateMockResults(data, selectedPlan);
        toast.warning("Usando análise simulada. Verifique a conexão com n8n.");
        console.log("Usando dados simulados como fallback");
      }
      
      sessionStorage.setItem("analysisResults", JSON.stringify(analysisResults));
      navigate("/results");

    } catch (error) {
      console.error("Erro na análise:", error);
      toast.error("Erro na análise. Usando dados simulados.");
      
      // Fallback para dados simulados
      sessionStorage.setItem("productData", JSON.stringify(data));
      const mockResults = generateMockResults(data, selectedPlan);
      sessionStorage.setItem("analysisResults", JSON.stringify(mockResults));
      navigate("/results");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(-1)}
          className="border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      <main className="flex-grow py-8 sm:py-12 bg-gray-50">
        <div className="container max-w-3xl px-4 sm:px-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <ProductFormHeader selectedPlan={selectedPlan} />
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6">
              <div className="space-y-6">
                <div>
                  <PlanBadge plan={selectedPlan} />
                  
                  <ProductFormFields 
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                  />
                </div>
                
                <div className="pt-4">
                  <SubmitButton isLoading={isLoading} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductForm;
