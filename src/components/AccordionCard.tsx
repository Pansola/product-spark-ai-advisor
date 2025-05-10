
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface AccordionCardProps {
  title: string;
  icon: React.ReactNode;
  summary: React.ReactNode;
  details: React.ReactNode;
  defaultOpen?: boolean;
  id?: string; // Adicionamos um ID opcional para identificação única
}

const AccordionCard = ({ 
  title, 
  icon, 
  summary, 
  details,
  defaultOpen = false,
  id 
}: AccordionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden h-full" data-accordion-id={id}>
      <div className="bg-secondary p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-full p-2 text-white">
            {icon}
          </div>
          <h3 className="font-medium text-dark">{title}</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} /> 
              <span>Fechar Detalhes</span>
            </>
          ) : (
            <>
              <ChevronDown size={16} /> 
              <span>Abrir Detalhes</span>
            </>
          )}
        </Button>
      </div>

      <div className="p-6">
        {summary}
        
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            {details}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AccordionCard;
