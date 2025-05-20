
import React, { useState } from "react";
import { RefreshCw, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface VisualSuggestionProps {
  format?: string;
  description?: string;
  onGenerateNew: () => void;
}

const VisualSuggestion: React.FC<VisualSuggestionProps> = ({ format, description, onGenerateNew }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Função para gerar vídeo
  const generateVideo = () => {
    setIsGenerating(true);
    toast.info("Gerando vídeo promocional...");
    
    // Simulação de geração de vídeo (na vida real seria uma chamada de API)
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Link para vídeo promocional gerado! Confira em seu e-mail.");
    }, 1500);
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-medium">Sugestão de Criativo Visual</h4>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onGenerateNew}
            disabled={isGenerating}
            className="h-7 px-2"
          >
            <RefreshCw size={14} className={isGenerating ? "animate-spin mr-1" : "mr-1"} />
            <span className="text-xs">Gerar novamente</span>
          </Button>
        </div>
        <div className="space-y-3">
          {format && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Formato ideal:</p>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={generateVideo}
                  disabled={isGenerating}
                  className="h-7"
                >
                  <Video size={14} className="mr-1" />
                  <span className="text-xs">Gerar Vídeo</span>
                </Button>
              </div>
              <p className="text-sm bg-gray-50 p-3 rounded-lg">{format}</p>
            </>
          )}
          
          {description && (
            <>
              <p className="text-sm font-medium">Descrição:</p>
              <p className="text-sm bg-gray-50 p-3 rounded-lg">{description}</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualSuggestion;
