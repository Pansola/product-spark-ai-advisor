
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionCardProps {
  title: string;
  icon?: React.ReactNode;
  summary: React.ReactNode;
  details: React.ReactNode;
  id?: string;
}

const AccordionCard: React.FC<AccordionCardProps> = ({
  title,
  icon,
  summary,
  details,
  id
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="shadow-md" id={id}>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <h3 className="text-lg font-semibold truncate">{title}</h3>
          </div>
          <div className="flex-shrink-0 ml-2">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Summary content that is always visible */}
        <div>
          {summary}
        </div>
        
        {/* Detailed content that appears when expanded */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in">
            {details}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccordionCard;
