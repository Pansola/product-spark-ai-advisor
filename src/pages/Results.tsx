
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultCard from "@/components/ResultCard";
import ScoreGauge from "@/components/ScoreGauge";
import { TrendingUp, Users, Package, Award, Check } from "lucide-react";

interface ProductData {
  productName: string;
  productLink?: string;
  productDescription?: string;
  country: string;
}

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

const countryNames: Record<string, string> = {
  "brasil": "Brasil",
  "portugal": "Portugal",
  "estados-unidos": "Estados Unidos",
  "canada": "Canadá",
  "mexico": "México",
  "argentina": "Argentina",
  "reino-unido": "Reino Unido",
  "alemanha": "Alemanha",
  "espanha": "Espanha",
  "italia": "Itália",
};

const Results = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("gratuito");
  
  useEffect(() => {
    // Get data from sessionStorage
    const productDataStr = sessionStorage.getItem("productData");
    const analysisResultsStr = sessionStorage.getItem("analysisResults");
    const planStr = sessionStorage.getItem("selectedPlan");
    
    if (!productDataStr || !analysisResultsStr) {
      navigate("/plans");
      return;
    }
    
    setProductData(JSON.parse(productDataStr));
    setAnalysisResults(JSON.parse(analysisResultsStr));
    if (planStr) setSelectedPlan(planStr);
  }, [navigate]);
  
  if (!productData || !analysisResults) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="bg-primary p-6 text-white">
              <h1 className="text-2xl font-bold">
                Análise de Produto: {productData.productName}
              </h1>
              <p className="text-white/80 mt-2">
                País de destino: {countryNames[productData.country] || productData.country}
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex flex-col items-center">
                <ScoreGauge score={analysisResults.score} />
                <h2 className="text-xl font-semibold mt-4">
                  {analysisResults.score >= 80 ? "Produto com Excelente Potencial" :
                   analysisResults.score >= 60 ? "Produto com Bom Potencial" :
                   analysisResults.score >= 40 ? "Produto com Potencial Moderado" :
                   "Produto com Potencial Limitado"}
                </h2>
                <p className="text-gray-600 mt-2 max-w-xl text-center">
                  Com base na nossa análise, este produto apresenta um potencial de sucesso de {analysisResults.score}/100 
                  para o mercado de {countryNames[productData.country] || productData.country}.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <ResultCard title="Análise de Demanda" icon={<TrendingUp size={18} />}>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Demanda no Mercado:</p>
                      <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${analysisResults.demandAnalysis.score}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>Baixa</span>
                        <span>Alta</span>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Tendência:</span> {analysisResults.demandAnalysis.trend}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Volume de busca mensal estimado:</span> {analysisResults.demandAnalysis.volumeBusca.toLocaleString()}
                    </p>
                  </div>
                </ResultCard>
                
                <ResultCard title="Análise de Concorrência" icon={<Users size={18} />}>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <span className="font-medium">Nível de concorrência:</span>{" "}
                      <span className={`font-medium ${
                        analysisResults.competitionAnalysis.level === "baixa" ? "text-green-600" : 
                        analysisResults.competitionAnalysis.level === "média" ? "text-yellow-600" : 
                        "text-red-600"
                      }`}>
                        {analysisResults.competitionAnalysis.level}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Número estimado de concorrentes diretos:</span> {analysisResults.competitionAnalysis.competitors}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Recomendação:</span>{" "}
                      {analysisResults.competitionAnalysis.level === "baixa" ? 
                        "Excelente oportunidade para entrar no mercado rapidamente." : 
                        analysisResults.competitionAnalysis.level === "média" ? 
                        "Oportunidade moderada, considere diferenciais competitivos." : 
                        "Busque um nicho específico ou diferencial claro para competir neste mercado."
                      }
                    </p>
                  </div>
                </ResultCard>
                
                <ResultCard title="Estratégia de Marketing" icon={<Award size={18} />}>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Sugestão de Título:</p>
                      <p className="text-gray-700 mt-1 bg-secondary/30 p-2 rounded">
                        {analysisResults.marketingStrategy.title}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Sugestão de Descrição:</p>
                      <p className="text-gray-700 mt-1 bg-secondary/30 p-2 rounded">
                        {analysisResults.marketingStrategy.description}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Canais de Tráfego Recomendados:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {analysisResults.marketingStrategy.channels.map((channel, index) => (
                          <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                            {channel}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ResultCard>
                
                {(selectedPlan === "pro" || selectedPlan === "premium") && analysisResults.costAnalysis && (
                  <ResultCard title="Análise de Custo e Margem" icon={<Package size={18} />}>
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        <span className="font-medium">Custo estimado do produto:</span> R$ {analysisResults.costAnalysis.estimatedCost.toFixed(2)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Preço de venda recomendado:</span> R$ {analysisResults.costAnalysis.recommendedPrice.toFixed(2)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Margem de lucro estimada:</span> {analysisResults.costAnalysis.margin}%
                      </p>
                      <div className="mt-2">
                        <div className="bg-dark text-white p-3 rounded">
                          <p className="font-medium">Potencial de lucro por 100 vendas:</p>
                          <p className="text-2xl font-bold mt-1">
                            R$ {((analysisResults.costAnalysis.recommendedPrice - analysisResults.costAnalysis.estimatedCost) * 100).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ResultCard>
                )}
                
                {(selectedPlan === "pro" || selectedPlan === "premium") && analysisResults.suppliers && (
                  <div className="md:col-span-2">
                    <ResultCard title="Fornecedores Recomendados" icon={<Package size={18} />}>
                      <div className="space-y-3">
                        <p className="text-gray-700 mb-3">
                          Baseado no seu produto e mercado-alvo, recomendamos os seguintes fornecedores:
                        </p>
                        <div className="space-y-2">
                          {analysisResults.suppliers.map((supplier, index) => (
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
                  </div>
                )}
                
                {selectedPlan === "premium" && analysisResults.relatedProducts && (
                  <div className="md:col-span-2">
                    <ResultCard title="Produtos Validados e Populares" icon={<Award size={18} />}>
                      <div className="space-y-3">
                        <p className="text-gray-700 mb-3">
                          Com base no seu interesse, estes produtos têm alto potencial no mesmo mercado:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          {analysisResults.relatedProducts.map((product, index) => (
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
                  </div>
                )}
              </div>
              
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
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
