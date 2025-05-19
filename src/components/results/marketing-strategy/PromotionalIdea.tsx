
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PromotionalIdeaProps {
  promotionalIdea?: string;
}

const PromotionalIdea: React.FC<PromotionalIdeaProps> = ({ promotionalIdea }) => {
  if (!promotionalIdea) return null;

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <h4 className="text-lg font-medium mb-2">Oferta Promocional Sugerida</h4>
        <div className="bg-dark text-white p-3 rounded-lg font-medium text-sm">
          {promotionalIdea}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionalIdea;
