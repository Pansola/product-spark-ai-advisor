
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface KeywordsProps {
  keywords: string[];
}

const Keywords: React.FC<KeywordsProps> = ({ keywords }) => {
  if (!keywords || keywords.length === 0) return null;

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <h4 className="text-lg font-medium mb-3">Palavras-chave Estratégicas</h4>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <div 
              key={index} 
              className="bg-gray-100 border border-gray-200 px-2 py-1 rounded-md text-xs"
            >
              {keyword}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Keywords;
