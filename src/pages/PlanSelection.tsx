
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import PlanCard, { PlanFeature, PlanProps } from "@/components/PlanCard";
import { Button } from "@/components/ui/button";

const PlanSelection = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planType: string) => {
    setSelectedPlan(planType);
    
    // Store the selected plan in session storage
    sessionStorage.setItem("selectedPlan", planType);
    
    // Navigate to product form
    navigate("/product-form");
  };

  const plans: Omit<PlanProps, "onClick">[] = [
    {
      name: "Gratuito",
      price: "Grátis",
      description: "Ideal para iniciantes que querem validar uma ideia",
      features: [
        { title: "Análise de Demanda no País", included: true },
        { title: "Análise de Concorrência", included: true },
        { title: "Sugestão de Título e Descrição", included: true },
        { title: "Estratégia de Tráfego", included: true },
        { title: "Pontuação do Produto", included: true },
        { title: "Estimativa de Custo e Margem", included: false },
        { title: "Sugestão de Fornecedores", included: false },
        { title: "Sugestões de Produtos Validados", included: false },
      ],
    },
    {
      name: "Pro",
      price: "R$ 97",
      description: "Para empreendedores buscando análises detalhadas",
      features: [
        { title: "Análise de Demanda no País", included: true },
        { title: "Análise de Concorrência", included: true },
        { title: "Sugestão de Título e Descrição", included: true },
        { title: "Estratégia de Tráfego", included: true },
        { title: "Pontuação do Produto", included: true },
        { title: "Estimativa de Custo e Margem", included: true },
        { title: "Sugestão de Fornecedores", included: true },
        { title: "Sugestões de Produtos Validados", included: false },
      ],
      highlighted: true,
    },
    {
      name: "Premium",
      price: "R$ 197",
      description: "Solução completa para maximizar suas chances de sucesso",
      features: [
        { title: "Análise de Demanda no País", included: true },
        { title: "Análise de Concorrência", included: true },
        { title: "Sugestão de Título e Descrição", included: true },
        { title: "Estratégia de Tráfego", included: true },
        { title: "Pontuação do Produto", included: true },
        { title: "Estimativa de Custo e Margem", included: true },
        { title: "Sugestão de Fornecedores", included: true },
        { title: "Sugestões de Produtos Validados", included: true },
      ],
    },
  ];

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
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-dark mb-4">
              Escolha o plano ideal para você
            </h1>
            <p className="text-gray-600 px-4">
              Todos os planos oferecem acesso à nossa análise de IA para validar seu produto.
              Selecione aquele que melhor atende suas necessidades.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className="h-full">
                <PlanCard 
                  {...plan} 
                  onClick={() => handleSelectPlan(plan.name.toLowerCase())}
                />
              </div>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto mt-12 sm:mt-16 bg-white p-4 sm:p-6 rounded-xl shadow mx-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Compromisso com sua satisfação</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Todos os planos pagos vêm com garantia de devolução do dinheiro em até 7 dias. 
              Se você não ficar satisfeito com nossa análise, devolvemos seu investimento.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlanSelection;
