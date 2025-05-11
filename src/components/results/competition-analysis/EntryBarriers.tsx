
import React from "react";
import { Check, X } from "lucide-react";

const EntryBarriers: React.FC = () => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Barreiras de Entrada</h4>
      <ul className="space-y-2">
        <li className="flex items-center">
          <Check size={18} className="text-green-600 mr-2" />
          <span>Baixo custo inicial para entrar no mercado</span>
        </li>
        <li className="flex items-center">
          <Check size={18} className="text-green-600 mr-2" />
          <span>Poucos competidores estabelecidos</span>
        </li>
        <li className="flex items-center">
          <Check size={18} className="text-green-600 mr-2" />
          <span>Nicho com baixa lealdade à marca</span>
        </li>
        <li className="flex items-center">
          <X size={18} className="text-red-600 mr-2" />
          <span className="text-red-600 font-medium">Fácil replicação do produto (risco)</span>
        </li>
      </ul>
    </div>
  );
};

export default EntryBarriers;
