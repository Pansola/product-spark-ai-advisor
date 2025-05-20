
import React from "react";
import { RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PromotionalIdeaProps {
  promotionalIdea?: string;
  onGenerateNew: () => void;
}

const PromotionalIdea: React.FC<PromotionalIdeaProps> = ({ promotionalIdea, onGenerateNew }) => {
  if (!promotionalIdea) return null;

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-lg font-medium">Oferta Promocional Sugerida</h4>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onGenerateNew}
            className="h-7 px-2"
          >
            <RefreshCw size={14} className="mr-1" />
            <span className="text-xs">Gerar novamente</span>
          </Button>
        </div>
        <div className="bg-dark text-white p-3 rounded-lg font-medium text-sm">
          {promotionalIdea}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionalIdea;
