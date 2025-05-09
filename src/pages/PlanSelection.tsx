
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlanCard, { PlanFeature, PlanProps } from "@/components/PlanCard";

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
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold text-dark mb-4">
              Escolha o plano ideal para você
            </h1>
            <p className="text-gray-600">
              Todos os planos oferecem acesso à nossa análise de IA para validar seu produto.
              Selecione aquele que melhor atende suas necessidades.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className="h-full">
                <PlanCard 
                  {...plan} 
                  onClick={() => handleSelectPlan(plan.name.toLowerCase())}
                />
              </div>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto mt-16 bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Compromisso com sua satisfação</h3>
            <p className="text-gray-600">
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
