
import React from "react";
import { Package, Check } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";

interface SuppliersCardProps {
  suppliers: string[];
}

const SuppliersCard: React.FC<SuppliersCardProps> = ({ suppliers }) => {
  // Conteúdo resumido que é sempre exibido
  const summaryContent = (
    <div className="space-y-3">
      <p className="text-gray-700 mb-3">
        Baseado no seu produto e mercado-alvo, recomendamos os seguintes fornecedores:
      </p>
      <div className="space-y-2">
        {suppliers.map((supplier, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check size={16} className="text-primary" /> 
            <span>{supplier}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Conteúdo detalhado que é exibido apenas quando expandido
  const detailedContent = (
    <div className="space-y-6">
      <h4 className="text-lg font-medium mb-3">Detalhes dos Fornecedores Recomendados</h4>
      
      <div className="space-y-4">
        {suppliers.map((supplier, index) => {
          // Dados simulados específicos para cada fornecedor
          const details = {
            "AliExpress Premium Sellers": {
              description: "Vendedores certificados com histórico de qualidade e entregas pontuais.",
              vantagens: ["Proteção ao comprador", "Frete rápido disponível", "Pedidos em pequenas quantidades"],
              desvantagens: ["Preços ligeiramente mais altos", "Algumas limitações em personalizações"]
            },
            "CJ Dropshipping": {
              description: "Solução completa de dropshipping com armazéns em vários países.",
              vantagens: ["Integração com e-commerces", "Serviço de fotos profissionais", "Envio direto para o cliente"],
              desvantagens: ["Taxa de serviço adicional", "Alguns produtos com MOQ"]
            },
            "Alibaba Selected": {
              description: "Fabricantes verificados para pedidos em maior quantidade e personalizados.",
              vantagens: ["Preços mais baixos para grandes volumes", "Alta personalização", "Controle de qualidade"],
              desvantagens: ["Pedido mínimo geralmente alto", "Tempos de produção mais longos"]
            }
          };
          
          const supplierDetails = details[supplier as keyof typeof details] || {
            description: "Fornecedor verificado com bom histórico de qualidade.",
            vantagens: ["Produtos de qualidade", "Preços competitivos"],
            desvantagens: ["Verifique os detalhes de envio"]
          };
          
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-primary text-lg mb-2">{supplier}</h5>
              <p className="text-gray-700 mb-3">{supplierDetails.description}</p>
              
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">Vantagens:</p>
                  <ul className="ml-5 list-disc text-sm space-y-1 mt-1">
                    {supplierDetails.vantagens.map((vantagem, i) => (
                      <li key={i} className="text-gray-700">{vantagem}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium text-sm">Considerações:</p>
                  <ul className="ml-5 list-disc text-sm space-y-1 mt-1">
                    {supplierDetails.desvantagens.map((desvantagem, i) => (
                      <li key={i} className="text-gray-700">{desvantagem}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Dicas para Negociar com Fornecedores</h4>
        <ul className="ml-5 list-disc space-y-1">
          <li className="text-gray-700">Sempre solicite amostras antes de fazer grandes pedidos.</li>
          <li className="text-gray-700">Compare preços entre diferentes fornecedores do mesmo produto.</li>
          <li className="text-gray-700">Negocie melhores preços para pedidos maiores.</li>
          <li className="text-gray-700">Verifique os termos de garantia e políticas de devolução.</li>
          <li className="text-gray-700">Estabeleça expectativas claras sobre qualidade e prazos de entrega.</li>
        </ul>
      </div>
    </div>
  );

  return (
    <AccordionCard
      title="Fornecedores Recomendados"
      icon={<Package size={18} />}
      summary={summaryContent}
      details={detailedContent}
    />
  );
};

export default SuppliersCard;
