
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export interface PlanFeature {
  title: string;
  included: boolean;
}

export interface PlanProps {
  name: string;
  price: string | React.ReactNode;
  description: string;
  features: PlanFeature[];
  highlighted?: boolean;
  onClick: () => void;
}

const PlanCard = ({
  name,
  price,
  description,
  features,
  highlighted = false,
  onClick,
}: PlanProps) => {
  return (
    <div 
      className={`rounded-xl p-6 transition-all duration-300 h-full flex flex-col ${
        highlighted 
          ? "bg-gradient-to-br from-primary to-primary/80 text-white scale-105 shadow-xl" 
          : "bg-white border border-gray-200 shadow-md"
      }`}
    >
      <div className="mb-4">
        <h3 className={`text-xl font-bold ${highlighted ? "text-white" : "text-dark"}`}>
          {name}
        </h3>
        <div className="mt-4 mb-2">
          {typeof price === "string" ? (
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold">{price}</span>
              {price !== "Grátis" && <span className="text-sm opacity-80">/mês</span>}
            </div>
          ) : (
            price
          )}
        </div>
        <p className={`text-sm ${highlighted ? "text-white/90" : "text-gray-600"}`}>
          {description}
        </p>
      </div>
      
      <div className="space-y-3 mb-6 flex-1">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            {feature.included ? (
              <Check size={18} className={highlighted ? "text-highlight" : "text-primary"} />
            ) : (
              <div className="w-[18px] h-[18px]" />
            )}
            <span className={`text-sm ${
              highlighted ? "text-white/90" : feature.included ? "text-gray-700" : "text-gray-400"
            }`}>
              {feature.title}
            </span>
          </div>
        ))}
      </div>
      
      <Button 
        onClick={onClick}
        className={highlighted 
          ? "bg-white text-primary hover:bg-white/90 transition-colors w-full" 
          : "bg-primary text-white hover:bg-primary/90 transition-colors w-full"
        }
      >
        Selecionar Plano
      </Button>
    </div>
  );
};

export default PlanCard;
