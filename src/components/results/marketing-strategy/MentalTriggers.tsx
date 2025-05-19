
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MentalTriggersProps {
  triggers: string[];
}

const MentalTriggers: React.FC<MentalTriggersProps> = ({ triggers }) => {
  if (!triggers || triggers.length === 0) return null;
  
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <h4 className="text-lg font-medium mb-3">Gatilhos Mentais Recomendados</h4>
        <div className="flex flex-wrap gap-2">
          {triggers.map((trigger, index) => (
            <div 
              key={index} 
              className="bg-highlight text-dark px-3 py-1 rounded-md text-sm font-medium"
            >
              {trigger}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MentalTriggers;
