
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const FloatingCards3D = () => {
  // Sample data for the demand chart
  const chartData = [
    { month: 'Jan', value: 20 },
    { month: 'Feb', value: 45 },
    { month: 'Mar', value: 80 },
    { month: 'Apr', value: 65 },
    { month: 'May', value: 90 },
    { month: 'Jun', value: 75 },
    { month: 'Jul', value: 95 },
    { month: 'Aug', value: 120 }
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* First Card - Demanda */}
        <div className="absolute animate-[rotate3d_20s_linear_infinite] transform-gpu">
          <div 
            className="w-80 h-60 bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl transform-gpu"
            style={{
              transform: 'perspective(1000px) rotateY(0deg) rotateX(5deg)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="p-6 h-full flex flex-col">
              <h3 className="text-white text-xl font-bold mb-4">Demanda</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                      domain={[0, 140]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#60a5fa', stroke: '#3b82f6', strokeWidth: 2 }}
                      filter="drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Second Card - Estrategias de marketing */}
        <div 
          className="absolute animate-[rotate3d_20s_linear_infinite] transform-gpu"
          style={{ animationDelay: '-10s' }}
        >
          <div 
            className="w-80 h-60 bg-gradient-to-br from-purple-800/40 to-pink-900/60 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl transform-gpu flex items-center justify-center"
            style={{
              transform: 'perspective(1000px) rotateY(180deg) rotateX(5deg) translateX(100px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="p-6 text-center">
              <h3 className="text-white text-2xl font-bold leading-tight">
                Estratégias de<br />marketing
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCards3D;
