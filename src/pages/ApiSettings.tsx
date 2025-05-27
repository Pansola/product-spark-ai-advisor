
import React from "react";
import Footer from "@/components/Footer";
import ApiKeysConfig from "@/components/settings/ApiKeysConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ApiSettings: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-8 sm:py-12 bg-gray-50">
        <div className="container px-4 sm:px-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 p-4 sm:p-6">
            <div className="mb-6 flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold">Configurações de Integração</h1>
            </div>
            
            <Tabs defaultValue="api-keys" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="api-keys" className="text-xs sm:text-sm">Chaves de API</TabsTrigger>
                <TabsTrigger value="data-sources" className="text-xs sm:text-sm">Fontes de Dados</TabsTrigger>
                <TabsTrigger value="sync" className="text-xs sm:text-sm">Sincronização</TabsTrigger>
              </TabsList>
              
              <TabsContent value="api-keys" className="space-y-6">
                <ApiKeysConfig />
              </TabsContent>
              
              <TabsContent value="data-sources">
                <div className="p-6 text-center text-muted-foreground">
                  <p className="text-sm sm:text-base">Configurações de fontes de dados serão adicionadas em breve.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="sync">
                <div className="p-6 text-center text-muted-foreground">
                  <p className="text-sm sm:text-base">Configurações de sincronização serão adicionadas em breve.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApiSettings;
