
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductData, AnalysisResults } from "@/types/product";
import ResultsHeader from "@/components/results/ResultsHeader";
import ScoreSummary from "@/components/results/ScoreSummary";
import DemandAnalysisCard from "@/components/results/DemandAnalysisCard";
import CompetitionAnalysisCard from "@/components/results/CompetitionAnalysisCard";
import MarketingStrategyCard from "@/components/results/MarketingStrategyCard";
import CostAnalysisCard from "@/components/results/CostAnalysisCard";
import RelatedProductsCard from "@/components/results/RelatedProductsCard";
import ResultsActions from "@/components/results/ResultsActions";

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
            <ResultsHeader 
              productData={productData} 
              selectedPlan={selectedPlan} 
            />
            
            <div className="p-6">
              <ScoreSummary 
                analysisResults={analysisResults} 
                productData={productData} 
              />
              
              {/* Grid com 2 colunas para os cards principais */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <DemandAnalysisCard 
                  demandAnalysis={analysisResults.demandAnalysis} 
                  id="demand-analysis" 
                />
                <CompetitionAnalysisCard 
                  competitionAnalysis={analysisResults.competitionAnalysis} 
                  id="competition-analysis" 
                />
                <MarketingStrategyCard 
                  marketingStrategy={analysisResults.marketingStrategy} 
                  id="marketing-strategy" 
                />
                
                {(selectedPlan === "pro" || selectedPlan === "premium") && analysisResults.costAnalysis && (
                  <CostAnalysisCard 
                    costAnalysis={analysisResults.costAnalysis} 
                    id="cost-analysis" 
                  />
                )}
              </div>
              
              {/* Grid de 1 coluna (largura total) para o card de produtos relacionados */}
              <div className="mt-6">
                {selectedPlan === "premium" && analysisResults.relatedProducts && (
                  <div className="w-full">
                    <RelatedProductsCard 
                      relatedProducts={analysisResults.relatedProducts} 
                      id="related-products" 
                    />
                  </div>
                )}
              </div>
              
              <ResultsActions />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
