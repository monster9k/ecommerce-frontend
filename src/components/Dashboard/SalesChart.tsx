import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Electronics", value: 4000, color: "#3b82f6" }, // xanh dương
  { name: "Fashion", value: 3000, color: "#ec4899" }, // hồng
  { name: "Home & Kitchen", value: 2000, color: "#f59e0b" }, // vàng cam
  { name: "Beauty", value: 1500, color: "#10b981" }, // xanh lá
];

const SalesChart = () => {
  const total = salesData.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="bg-white/80 dark:bg-slate-900 backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:!text-white">
          Sales by Category
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Production Distribution
        </p>
      </div>

      {/* Biểu đồ donut */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={salesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
            >
              {salesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom legend */}
      <div className="mt-4 space-y-3">
        {salesData.map((item, idx) => {
          const percent = ((item.value / total) * 100).toFixed(0);
          return (
            <div
              key={idx}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-slate-700 dark:!text-slate-200">
                  {item.name}
                </span>
              </div>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {percent}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalesChart;
