
import React from "react";

interface DemandScoreProps {
  score: number;
  trend: string;
}

const DemandScore: React.FC<DemandScoreProps> = ({ score, trend }) => {
  return (
    <div className="space-y-3">
      <div>
        <p className="font-medium">Demanda no Mercado:</p>
        <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full" 
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Baixa</span>
          <span>Alta</span>
        </div>
      </div>
      <p className="text-gray-700">
        <span className="font-medium">Tendência:</span> {trend}
      </p>
    </div>
  );
};

export default DemandScore;
