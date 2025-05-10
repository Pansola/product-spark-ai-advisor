import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ProductFormData {
  productName: string;
  productLink?: string;
  productDescription?: string;
  country: string;
}

// Define a comprehensive interface for all possible analysis results
interface AnalysisResults {
  demandAnalysis: {
    score: number;
    trend: string;
    volumeBusca: number;
  };
  competitionAnalysis: {
    level: string;
    competitors: number;
  };
  marketingStrategy: {
    title: string;
    description: string;
    channels: string[];
  };
  score: number;
  costAnalysis?: {
    estimatedCost: number;
    recommendedPrice: number;
    margin: number;
  };
  suppliers?: string[];
  relatedProducts?: {
    name: string;
    score: number;
    category: string;
  }[];
}

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
      generateMockResults(data, selectedPlan);
      
      setIsLoading(false);
      toast.success("Análise realizada com sucesso!");
      navigate("/results");
    }, 2000);
  };
  
  const generateMockResults = (data: ProductFormData, plan: string) => {
    // Generate random score between 30 and 95
    const score = Math.floor(Math.random() * (95 - 30 + 1)) + 30;
    
    // Generate mock analysis data with the proper type
    let mockResults: AnalysisResults = {
      demandAnalysis: {
        score: Math.floor(Math.random() * (100 - 30 + 1)) + 30,
        trend: Math.random() > 0.5 ? "crescente" : "estável",
        volumeBusca: Math.floor(Math.random() * (10000 - 500 + 1)) + 500,
      },
      competitionAnalysis: {
        level: score > 70 ? "baixa" : score > 40 ? "média" : "alta",
        competitors: Math.floor(Math.random() * (50 - 5 + 1)) + 5,
      },
      marketingStrategy: {
        title: `${data.productName} - Solução Inovadora para seu Dia a Dia`,
        description: `Descubra como ${data.productName} pode transformar sua experiência. Design exclusivo, alta qualidade e entrega expressa para ${data.country}.`,
        channels: ["Google Ads", "Facebook", "Instagram"],
      },
      score: score,
    };
    
    // Add PRO and Premium features if applicable
    if (plan === "pro" || plan === "premium") {
      mockResults = {
        ...mockResults,
        costAnalysis: {
          estimatedCost: Math.floor(Math.random() * (300 - 50 + 1)) + 50,
          recommendedPrice: Math.floor(Math.random() * (1000 - 200 + 1)) + 200,
          margin: Math.floor(Math.random() * (70 - 20 + 1)) + 20,
        },
        suppliers: [
          "AliExpress Premium Sellers",
          "CJ Dropshipping",
          "Alibaba Selected"
        ]
      };
    }
    
    // Add Premium exclusive features
    if (plan === "premium") {
      mockResults = {
        ...mockResults,
        relatedProducts: [
          {
            name: "Produto Similar Premium",
            score: 87,
            category: "Acessórios",
          },
          {
            name: "Alternativa Tendência",
            score: 92,
            category: "Lifestyle",
          },
          {
            name: "Complemento Essencial",
            score: 78,
            category: "Casa & Decoração",
          },
        ]
      };
    }
    
    sessionStorage.setItem("analysisResults", JSON.stringify(mockResults));
  };

  const countryOptions = [
    { value: "brasil", label: "Brasil" },
    { value: "portugal", label: "Portugal" },
    { value: "estados-unidos", label: "Estados Unidos" },
    { value: "canada", label: "Canadá" },
    { value: "mexico", label: "México" },
    { value: "argentina", label: "Argentina" },
    { value: "reino-unido", label: "Reino Unido" },
    { value: "alemanha", label: "Alemanha" },
    { value: "espanha", label: "Espanha" },
    { value: "italia", label: "Itália" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-primary p-6 text-white">
              <h1 className="text-2xl font-bold">
                Informações do Produto
              </h1>
              <p className="text-white/80 mt-2">
                Forneça os detalhes do seu produto para nossa análise
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-right mb-1">
                    <span className="inline-block px-3 py-1 bg-secondary rounded-full text-dark font-medium">
                      Plano: {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="productName">
                        Nome do Produto <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="productName"
                        placeholder="Ex: Escova Alisadora Profissional"
                        {...register("productName", { 
                          required: "Nome do produto é obrigatório" 
                        })}
                        className={errors.productName ? "border-red-500" : ""}
                      />
                      {errors.productName && (
                        <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="productLink">
                        Link do Produto (opcional)
                      </Label>
                      <Input
                        id="productLink"
                        placeholder="https://exemplo.com/produto"
                        {...register("productLink")}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="productDescription">
                        Descrição do Produto (opcional)
                      </Label>
                      <Textarea
                        id="productDescription"
                        placeholder="Descreva seu produto em detalhes..."
                        className="resize-y min-h-[100px]"
                        {...register("productDescription")}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country">
                        País onde deseja vender <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        onValueChange={(value) => setValue("country", value)} 
                        defaultValue={watch("country")}
                      >
                        <SelectTrigger id="country" className={errors.country ? "border-red-500" : ""}>
                          <SelectValue placeholder="Selecione o país" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">Selecione um país</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Analisando..." : "Analisar Produto"}
                  </Button>
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
