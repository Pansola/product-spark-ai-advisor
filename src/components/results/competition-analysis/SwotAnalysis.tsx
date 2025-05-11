
import React from "react";

const SwotAnalysis: React.FC = () => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-3">Análise SWOT do Produto</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h5 className="font-medium text-green-700 mb-2">Forças</h5>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Preço competitivo</li>
            <li>Qualidade superior</li>
            <li>Design inovador</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h5 className="font-medium text-red-700 mb-2">Fraquezas</h5>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Marca desconhecida</li>
            <li>Limitações logísticas</li>
            <li>Baixo orçamento inicial</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-medium text-blue-700 mb-2">Oportunidades</h5>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Mercado em expansão</li>
            <li>Novos canais de divulgação</li>
            <li>Parcerias estratégicas</li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h5 className="font-medium text-yellow-700 mb-2">Ameaças</h5>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Novos entrantes</li>
            <li>Produtos substitutos</li>
            <li>Instabilidade econômica</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SwotAnalysis;
