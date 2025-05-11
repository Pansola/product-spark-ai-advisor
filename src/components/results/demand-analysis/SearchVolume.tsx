
import React from "react";

interface SearchVolumeProps {
  volumeBusca: number;
}

const SearchVolume: React.FC<SearchVolumeProps> = ({ volumeBusca }) => {
  return (
    <div className="mt-16">
      <h4 className="text-lg font-medium mb-1">Volume de Busca Mensal Estimado</h4>
      <p className="text-2xl font-bold text-primary">{volumeBusca.toLocaleString()}</p>
      <p className="text-sm text-gray-600 mt-1">
        Baseado em palavras-chave relacionadas ao produto e nicho de mercado.
      </p>
    </div>
  );
};

export default SearchVolume;
