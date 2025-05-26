
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ArrowRight, TrendingUp, Users, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-dark py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/60"></div>
          <AnimatedBackground />
          
          <div className="container relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in">
                Descubra o potencial real do seu produto antes de investir.
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Nossa IA analisa ideias de produtos para e-commerce e dropshipping, fornecendo insights 
                valiosos para sua decisão de investimento.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/plans">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                    Começar Análise <ArrowRight size={16} />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-dark mb-4">Como nossa IA pode ajudar</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Oferecemos uma análise completa baseada em dados para validar seu próximo produto de e-commerce.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="text-primary" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Análise de Demanda</h3>
                <p className="text-gray-600">
                  Avaliamos tendências de busca e consumo para 
                  determinar se há real interesse pelo seu produto.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-primary" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Análise de Concorrência</h3>
                <p className="text-gray-600">
                  Identificamos seus competidores e avaliamos como seu produto 
                  se diferencia no mercado.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Search className="text-primary" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Potencial de Lucro</h3>
                <p className="text-gray-600">
                  Calculamos margens médias e estimamos o potencial de 
                  escala e lucratividade do seu negócio.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para validar sua próxima ideia?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Tenha acesso a insights valiosos que podem economizar seu tempo e dinheiro. 
              Nossa IA está pronta para analisar seu produto.
            </p>
            <Link to="/plans">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Começar Análise Gratuita
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
