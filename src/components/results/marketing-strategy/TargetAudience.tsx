
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TargetAudienceProps {
  ageRange?: string;
  interests?: string[];
  behaviors?: string[];
}

const TargetAudience: React.FC<TargetAudienceProps> = ({ ageRange, interests, behaviors }) => {
  if (!ageRange && (!interests || interests.length === 0) && (!behaviors || behaviors.length === 0)) {
    return null;
  }

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <h4 className="text-lg font-medium mb-3">Público-Alvo</h4>
        <div className="space-y-3">
          {ageRange && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium mb-1">Faixa etária:</p>
              <p className="text-sm">{ageRange}</p>
            </div>
          )}
          
          {interests && interests.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-1">Interesses:</p>
              <div className="flex flex-wrap gap-1">
                {interests.map((interest, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 px-2 py-0.5 rounded text-xs"
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {behaviors && behaviors.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-1">Comportamentos:</p>
              <div className="flex flex-wrap gap-1">
                {behaviors.map((behavior, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 px-2 py-0.5 rounded text-xs"
                  >
                    {behavior}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetAudience;
