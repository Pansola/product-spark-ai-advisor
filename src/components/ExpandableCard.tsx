
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExpandableCardProps {
  title: string;
  icon: React.ReactNode;
  summary: React.ReactNode;
  details: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

const ExpandableCard = ({ 
  title, 
  icon, 
  summary, 
  details,
  defaultOpen = false,
  id 
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    
    // Quando expandir, desabilitar o scroll do body para evitar scroll duplo
    if (!isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
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
            onClick={handleToggle}
            className="flex items-center gap-1"
          >
            <ChevronDown size={16} /> 
            <span>Expandir Detalhes</span>
          </Button>
        </div>

        <div className="p-6">
          {summary}
        </div>
      </Card>

      {/* Overlay que aparece quando o card está expandido */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => handleToggle()}
        >
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-secondary p-4 sticky top-0 z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary rounded-full p-2 text-white">
                  {icon}
                </div>
                <h3 className="font-medium text-dark">{title}</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggle}
                className="flex items-center gap-1"
              >
                <X size={16} /> 
                <span>Fechar Detalhes</span>
              </Button>
            </div>

            <div className="p-6">
              {summary}
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                {details}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpandableCard;
