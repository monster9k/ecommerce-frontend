import { Clock, User, ShoppingCart, Truck, XCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "user",
    icon: User, // Biểu tượng người dùng
    title: "New user registered",
    description: "John Smith created an account",
    time: "2 minutes ago",
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: 2,
    type: "order",
    icon: ShoppingCart, // Biểu tượng giỏ hàng
    title: "New order received",
    description: "Order #3847 for $2,399",
    time: "5 minutes ago",
    color: "text-emerald-500",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    id: 3,
    type: "shipping",
    icon: Truck, // Biểu tượng vận chuyển
    title: "Order out for delivery",
    description: "Order #3840 is on its way",
    time: "1 hour ago",
    color: "text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    id: 4,
    type: "error",
    icon: XCircle, // Biểu tượng lỗi
    title: "Payment Failed",
    description: "Order #3841 payment was declined",
    time: "2 hours ago",
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/30",
  },
];

const ActivityFeed = () => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div>
          {" "}
          <h3 className="text-lg font-bold text-slate-800 dark:!text-white">
            Activity Feed
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Recenet System Activities
          </p>
        </div>
        <button className="!text-blue-600 hover:!text-blue-800  font-medium">
          View All
        </button>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => {
            return (
              <div
                className="flex items-start space-x-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                key={index}
              >
                <div className={`p-2 rounded-lg ${activity.color} `}>
                  <activity.icon
                    className={`w-6 h-6 p-1 rounded-lg ${activity.color} ${activity.bgColor} `}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="!text-sm text-slate-800 dark:!text-white">
                    {activity.title}
                  </h4>
                  <p className="!text-sm text-slate-600 dark:text-slate-400 truncate">
                    {activity.description}
                  </p>
                  <div className="flex items-center-safe space-x-1 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
