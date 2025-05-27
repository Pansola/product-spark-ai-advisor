
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingCards3D from "@/components/FloatingCards3D";
import { ArrowRight, TrendingUp, Users, Search } from "lucide-react";

const Index = () => {
  return <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section - Full Screen with integrated navigation */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 h-screen flex flex-col overflow-hidden">
          <AnimatedBackground />
          
          {/* Navigation integrated in hero */}
          <div className="relative z-10 container flex items-center justify-between py-4 px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-primary rounded-lg p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white sm:w-6 sm:h-6">
                  <path d="m7.9 20 6.2-16h2l-6.2 16Z"></path>
                  <path d="M4 14h8"></path>
                  <path d="M15 4h5l-5 16h5"></path>
                </svg>
              </span>
              <span className="text-lg sm:text-xl font-bold text-white">Product Validator AI</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-white/80 hover:text-white font-medium">Home</Link>
              <Link to="/plans" className="text-white/80 hover:text-white font-medium">Planos</Link>
            </nav>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">
                Login
              </Button>
              <Button className="bg-transparent text-white border border-white/30 hover:bg-white/10 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">
                Registrar
              </Button>
            </div>
          </div>
          
          {/* Mobile: Cards 3D positioned behind content */}
          <div className="md:hidden absolute inset-0 flex items-center justify-center opacity-30">
            <FloatingCards3D />
          </div>
          
          {/* Hero content - Centralized on mobile, left-aligned on desktop */}
          <div className="container relative z-10 flex items-center flex-grow px-4 sm:px-6">
            <div className="w-full max-w-2xl text-center md:text-left mx-auto md:mx-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-4 sm:mb-6 opacity-0 animate-[fade-in_1s_ease-out_0.2s_forwards] font-extralight">
                Melhor IA para Análise de{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block sm:inline text-4xl sm:text-5xl lg:text-7xl">
                  Produtos E-commerce
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 opacity-0 animate-[fade-in_1s_ease-out_0.6s_forwards] leading-relaxed">
                Crie análises otimizadas e livres de risco para seus produtos,
                blogs, anúncios, e-mails e website 10x mais rápido.
              </p>
              <div className="flex flex-wrap gap-4 opacity-0 animate-[fade-in_1s_ease-out_1s_forwards] justify-center md:justify-start">
                <Link to="/plans">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white gap-2 px-6 py-3 text-base sm:px-8 sm:text-lg w-full sm:w-auto">
                    Começar Análise Gratuita
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Desktop: Cards 3D positioned on the right */}
          <div className="hidden md:block">
            <FloatingCards3D />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 sm:py-20 bg-gray-50">
          <div className="container px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16 opacity-0 animate-[fade-in_1s_ease-out_1.4s_forwards]">
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-4">Como nossa IA pode ajudar</h2>
              <p className="text-gray-600 max-w-2xl mx-auto px-4">
                Oferecemos uma análise completa baseada em dados para validar seu próximo produto de e-commerce.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md opacity-0 animate-[fade-in_1s_ease-out_1.6s_forwards]">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="text-purple-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Análise de Demanda</h3>
                <p className="text-gray-600">
                  Avaliamos tendências de busca e consumo para 
                  determinar se há real interesse pelo seu produto.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md opacity-0 animate-[fade-in_1s_ease-out_1.8s_forwards]">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-purple-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Análise de Concorrência</h3>
                <p className="text-gray-600">
                  Identificamos seus competidores e avaliamos como seu produto 
                  se diferencia no mercado.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md opacity-0 animate-[fade-in_1s_ease-out_2s_forwards] sm:col-span-2 lg:col-span-1">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Search className="text-purple-600" size={20} />
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
        <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-12 sm:py-16 opacity-0 animate-[fade-in_1s_ease-out_2.2s_forwards]">
          <div className="container text-center px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Pronto para validar sua próxima ideia?
            </h2>
            <p className="text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Tenha acesso a insights valiosos que podem economizar seu tempo e dinheiro. 
              Nossa IA está pronta para analisar seu produto.
            </p>
            <Link to="/plans">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 text-base sm:px-8 sm:text-lg w-full sm:w-auto">
                Começar Análise Gratuita
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};

export default Index;
