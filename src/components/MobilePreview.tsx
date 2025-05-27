
import React, { useState } from "react";
import { Smartphone, Monitor, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobilePreviewProps {
  children: React.ReactNode;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ children }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  if (!isMobileView) {
    return (
      <>
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setIsMobileView(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
            size="icon"
          >
            <Smartphone className="h-5 w-5" />
          </Button>
        </div>
        {children}
      </>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center p-4">
      <div className="bg-black rounded-3xl p-4 shadow-2xl">
        {/* Phone frame */}
        <div className="bg-gray-800 rounded-2xl p-2">
          <div className="bg-white rounded-xl overflow-hidden" style={{ width: "375px", height: "667px" }}>
            {/* Phone content area */}
            <div className="h-full overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="fixed top-4 right-4 flex gap-2">
        <Button
          onClick={() => setIsMobileView(false)}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm"
          size="icon"
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setIsMobileView(false)}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm"
          size="icon"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MobilePreview;
