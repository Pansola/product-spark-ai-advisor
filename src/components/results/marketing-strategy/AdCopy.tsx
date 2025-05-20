
import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdCopyProps {
  shortCopy?: string;
  longCopy?: string;
  onGenerateShort: () => void;
  onGenerateLong: () => void;
}

const AdCopy: React.FC<AdCopyProps> = ({ 
  shortCopy, 
  longCopy, 
  onGenerateShort, 
  onGenerateLong 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!shortCopy && !longCopy) return null;

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <h4 className="text-lg font-medium mb-3">Copy para Anúncios</h4>
        <div className="space-y-4">
          {shortCopy && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-sm">Versão Curta (Meta/Google Ads):</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onGenerateShort}
                  disabled={isGenerating}
                  className="h-7 px-2"
                >
                  <RefreshCw size={14} className={isGenerating ? "animate-spin mr-1" : "mr-1"} />
                  <span className="text-xs">Gerar novamente</span>
                </Button>
              </div>
              <p className="bg-white p-3 rounded border border-gray-100 text-sm">
                {shortCopy}
              </p>
            </div>
          )}
          {longCopy && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-sm">Versão Longa (Email/Landing Page):</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onGenerateLong}
                  disabled={isGenerating}
                  className="h-7 px-2"
                >
                  <RefreshCw size={14} className={isGenerating ? "animate-spin mr-1" : "mr-1"} />
                  <span className="text-xs">Gerar novamente</span>
                </Button>
              </div>
              <p className="bg-white p-3 rounded border border-gray-100 text-sm">
                {longCopy}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdCopy;
