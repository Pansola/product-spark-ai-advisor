
import { Card } from "@/components/ui/card";

export interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ResultCard = ({ title, icon, children }: ResultCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="bg-secondary p-4 flex items-center gap-3">
        <div className="bg-primary rounded-full p-2 text-white">
          {icon}
        </div>
        <h3 className="font-medium text-dark">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </Card>
  );
};

export default ResultCard;
