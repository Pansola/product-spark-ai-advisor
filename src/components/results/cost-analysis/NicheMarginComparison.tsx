
import React from "react";

interface NicheMarginComparisonProps {
  currentMargin: number;
  nicheAverageMargin: number;
}

const NicheMarginComparison: React.FC<NicheMarginComparisonProps> = ({ 
  currentMargin, 
  nicheAverageMargin 
}) => {
  const isLowMargin = currentMargin < 20;

  return (
    <div className="mt-12">
      <h4 className="text-lg font-medium mb-3">Comparativo com o Nicho</h4>
      <div className="flex items-center mt-2">
        <div className="flex-1">
          <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden relative">
            <div 
              className="h-full rounded-full absolute left-0" 
              style={{ width: `${currentMargin}%`, backgroundColor: "#4F7CAC" }}
            ></div>
            <div 
              className="h-full w-1 bg-dark absolute" 
              style={{ left: `${nicheAverageMargin}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        <div className="ml-4 text-right">
          <p className="text-sm font-medium text-slate-900">
            Sua margem: <span style={{ color: "#4F7CAC" }}>
              {currentMargin.toFixed(1)}%
            </span>
          </p>
          <p className="text-sm font-medium">Média do nicho: {nicheAverageMargin}%</p>
        </div>
      </div>
    </div>
  );
};

export default NicheMarginComparison;
