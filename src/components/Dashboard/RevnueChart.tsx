import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 12000, expenses: 8000 },
  { month: "Feb", revenue: 15000, expenses: 9000 },
  { month: "Mar", revenue: 18000, expenses: 11000 },
  { month: "Apr", revenue: 20000, expenses: 12000 },
  { month: "May", revenue: 22000, expenses: 15000 },
  { month: "Jun", revenue: 25000, expenses: 16000 },
  { month: "Jul", revenue: 24000, expenses: 17000 },
  { month: "Aug", revenue: 26000, expenses: 18000 },
  { month: "Sep", revenue: 23000, expenses: 14000 },
  { month: "Oct", revenue: 28000, expenses: 19000 },
  { month: "Nov", revenue: 30000, expenses: 20000 },
  { month: "Dec", revenue: 35000, expenses: 22000 },
];

const RevnueChart = () => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:!text-white">
            Revenue Chart
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly revenue and expenses
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <span>Revenue</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-slate-500 to-slate-500 rounded-full"></div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <span>Expense</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ right: 20, left: 20, bottom: 2 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="url(#colorRevenue)"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              fill="url(#colorExpenses)"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9333ea" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#475569" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevnueChart;
