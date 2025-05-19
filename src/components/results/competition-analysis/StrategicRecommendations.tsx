
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const StrategicRecommendations: React.FC = () => {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <h4 className="text-lg font-medium mb-3">Recomendações Estratégicas</h4>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-3 py-1 bg-blue-50/50 rounded">
            <h5 className="font-medium">Curto Prazo (1-3 meses)</h5>
            <p className="text-sm text-gray-600">Investimento em tráfego pago para gerar as primeiras vendas e feedback de clientes.</p>
          </div>
          <div className="border-l-4 border-green-500 pl-3 py-1 bg-green-50/50 rounded">
            <h5 className="font-medium">Médio Prazo (3-6 meses)</h5>
            <p className="text-sm text-gray-600">Construção de autoridade através de reviews, parcerias com influenciadores e conteúdo educativo.</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-3 py-1 bg-purple-50/50 rounded">
            <h5 className="font-medium">Longo Prazo (6+ meses)</h5>
            <p className="text-sm text-gray-600">Estratégia de diferenciação através de branding, programa de assinatura exclusivo e construção de comunidade.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategicRecommendations;
