
import React from "react";

interface PlanBadgeProps {
  plan: string;
}

const PlanBadge: React.FC<PlanBadgeProps> = ({ plan }) => {
  const formattedPlan = plan.charAt(0).toUpperCase() + plan.slice(1);
  
  return (
    <div className="text-sm text-right mb-1">
      <span className="inline-block px-3 py-1 bg-secondary rounded-full text-dark font-medium">
        Plano: {formattedPlan}
      </span>
    </div>
  );
};

export default PlanBadge;
