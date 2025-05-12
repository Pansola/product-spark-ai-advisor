import React from "react";
interface CompetitorComparisonProps {
  competitors: Array<{
    name: string;
    value: number;
  }>;
}
const CompetitorComparison: React.FC<CompetitorComparisonProps> = ({
  competitors
}) => {
  if (!competitors || competitors.length === 0) {
    return null;
  }
  return <div className="mt-32 py-0 my-[70px]">
      <h4 className="mb-4 py-0 text-lg font-medium text-left my-0">Comparação com Produtos Similares</h4>
      <div className="space-y-3">
        {competitors.map((competitor, index) => <div key={index} className="py-0">
            <div className="flex justify-between mb-1">
              <span>{competitor.name}</span>
              <span className="font-medium">{competitor.value}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary/70 rounded-full" style={{
            width: `${competitor.value}%`
          }}></div>
            </div>
          </div>)}
      </div>
    </div>;
};
export default CompetitorComparison;