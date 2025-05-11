
import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DemandTrendChartProps {
  data: Array<{
    month: string;
    value: number;
  }>;
}

const DemandTrendChart: React.FC<DemandTrendChartProps> = ({ data }) => {
  return (
    <div className="mt-12 h-80 w-full">
      <ChartContainer config={{
        trend: {
          color: "#4F7CAC"
        }
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{
              top: 30,
              right: 30,
              left: 20,
              bottom: 50
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }} 
              angle={0} 
              padding={{ left: 10, right: 10 }} 
              height={60} 
            />
            <YAxis tick={{ fontSize: 12 }} width={50} />
            <Tooltip />
            <Line 
              name="Procuras" 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-trend, #4F7CAC)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default DemandTrendChart;
