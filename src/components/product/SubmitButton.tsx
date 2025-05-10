
import React from "react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => {
  return (
    <Button 
      type="submit" 
      className="w-full bg-primary hover:bg-primary/90"
      disabled={isLoading}
    >
      {isLoading ? "Analisando..." : "Analisar Produto"}
    </Button>
  );
};

export default SubmitButton;
