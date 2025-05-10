
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductFormHeader from "@/components/product/ProductFormHeader";
import PlanBadge from "@/components/product/PlanBadge";
import ProductFormFields from "@/components/product/ProductFormFields";
import SubmitButton from "@/components/product/SubmitButton";
import { generateMockResults } from "@/utils/mockDataGenerator";
import { ProductFormData } from "@/types/product";

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
  
  const onSubmit = (data: ProductFormData) => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Save form data to sessionStorage for use in results page
      sessionStorage.setItem("productData", JSON.stringify(data));
      
      // Generate mock results based on selectedPlan
      const mockResults = generateMockResults(data, selectedPlan);
      sessionStorage.setItem("analysisResults", JSON.stringify(mockResults));
      
      setIsLoading(false);
      toast.success("Análise realizada com sucesso!");
      navigate("/results");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <ProductFormHeader selectedPlan={selectedPlan} />
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
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
