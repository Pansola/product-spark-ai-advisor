
import { useState, useEffect } from "react";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  thickness?: number;
  label?: string;
}

const ScoreGauge = ({
  score,
  size = 160,
  thickness = 10,
  label = "Pontuação",
}: ScoreGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayScore(score);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [score]);
  
  const radius = size / 2 - thickness;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  
  const getColor = () => {
    if (score >= 80) return "#9EEFE5"; // highlight
    if (score >= 60) return "#4F7CAC"; // primary
    if (score >= 40) return "#986C6A"; // support
    return "#ef4444"; // red-500
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={thickness}
            stroke="#e5e7eb"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={thickness}
            stroke={getColor()}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center flex-col"
        >
          <span className="text-3xl font-bold">{displayScore}</span>
          <span className="text-xs text-gray-500 mt-1">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
