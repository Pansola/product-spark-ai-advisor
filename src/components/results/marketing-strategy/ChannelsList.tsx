
import React from "react";
import { AnalysisResults } from "@/types/product";

interface ChannelsListProps {
  channels: string[];
}

const ChannelsList: React.FC<ChannelsListProps> = ({ channels }) => {
  return (
    <div className="space-y-2">
      <p className="font-medium mb-2">Canais Recomendados:</p>
      <div className="flex flex-wrap gap-2 mt-1">
        {channels.map((channel, index) => (
          <div key={index} className="bg-secondary px-3 py-1 rounded-md text-xs font-medium">
            {channel}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelsList;
