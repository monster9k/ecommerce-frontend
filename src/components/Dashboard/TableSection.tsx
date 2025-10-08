import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react";

// Tỷ giá hối đoái giả định để chuyển đổi từ VND lớn sang USD nhỏ hơn
const EXCHANGE_RATE = 20000;

const recentOrders = [
  {
    id: "#ORD001",
    customer: "Nguyễn Văn A",
    product: "Laptop Gaming X500",
    // 25,000,000 VND / 20,000 = $1250.00
    amount: 1250.0,
    status: "completed",
    date: "2025-09-28",
  },
  {
    id: "#ORD002",
    customer: "Trần Thị B",
    product: "Điện thoại Z Flip",
    // 18,500,000 VND / 20,000 = $925.00
    amount: 925.0,
    status: "pending",
    date: "2025-09-30",
  },
  {
    id: "#ORD003",
    customer: "Lê Văn C",
    product: "Tai nghe Bluetooth Pro",
    // 2,800,000 VND / 20,000 = $140.00
    amount: 140.0,
    status: "cancelled",
    date: "2025-10-01",
  },
  {
    id: "#ORD004",
    customer: "Phạm Thị D",
    product: "Máy ảnh DSLR",
    // 32,000,000 VND / 20,000 = $1600.00
    amount: 1600.0,
    status: "completed",
    date: "2025-10-02",
  },
  {
    id: "#ORD005",
    customer: "Vũ Đình E",
    product: "Bàn phím cơ RGB",
    // 1,950,000 VND / 20,000 = $97.50
    amount: 97.5,
    status: "pending",
    date: "2025-10-03",
  },
];

// Hàm định dạng tiền tệ sang Đô la Mỹ (USD)
const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const topProducts = [
  {
    name: "Laptop Gaming X500",
    sales: 150,
    revenue: 187500.0, // $1,875,000.00
    trend: "up",
    change: 5.2, // 5.2% tăng trưởng
  },
  {
    name: "Máy ảnh DSLR",
    sales: 85,
    revenue: 136000.0, // $1,360,000.00
    trend: "up",
    change: -1.5, // 1.5% giảm trưởng
  },
  {
    name: "Điện thoại Z Flip",
    sales: 110,
    revenue: 101750.0, // $1,017,500.00
    trend: "down",
    change: 12.8, // 12.8% tăng trưởng
  },
  {
    name: "Tai nghe Bluetooth Pro",
    sales: 320,
    revenue: 44800.0, // $44,800.00
    trend: "down",
    change: 3.1, // 3.1% tăng trưởng
  },
];

// ... (Phần TableSeciton không thay đổi)

const TableSeciton = () => {
  const getStatusColor = (status: any) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/** Recent Order*/}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        {/* ... (Phần tiêu đề không đổi) ... */}
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:!text-white">
                Recent Orders
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Lastest customer orders
              </p>
            </div>
            <button className="!text-blue-600 hover:!text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
        </div>

        {/** Table*/}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Order Id
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Customer
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Product
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Date
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => {
                return (
                  <tr
                    key={order.id}
                    className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {/* Cột 1: Order Id */}
                    <td className="p-4">
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">
                        {order.id}
                      </span>
                    </td>

                    {/* Cột 2: Customer */}
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {order.customer}
                      </span>
                    </td>

                    {/* Cột 3: Product */}
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {order.product}
                      </span>
                    </td>

                    {/* Cột 4: Amount (Đã định dạng tiền tệ USD) */}
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white font-medium">
                        {formatCurrency(order.amount)}
                      </span>
                    </td>

                    {/* Cột 5: Status (Badge màu) */}
                    <td className="p-4">
                      <span
                        className={`font-medium text-xs px-3 py-1 rounded-full capitalize ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Cột 6: Date (Văn bản thường) */}
                    <td className="p-4">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {order.date}
                      </span>
                    </td>

                    {/* Cột 7: Actions */}
                    <td className="p-4">
                      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Producats */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-slate-800 dark:text-white">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Top Products
              </h3>
              <button className="!text-blue-600 hover:!text-blue-800  font-medium">
                View All
              </button>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                best performing products
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Data */}
        {topProducts.map((product, index) => {
          return (
            <div className="p-2 " key={index}>
              <div className="flex items-center justify-between p-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex-1">
                  <h4 className="!text-sm font-semibold text-slate-800 dark:!text-white">
                    {product.name}
                  </h4>
                  <p className=" text-slate-500 dark:!text-slate-400">
                    ${product.sales}
                  </p>
                </div>
                <div className="text-right">
                  <p className="!text-sm font-semibold text-slate-800 dark:!text-white">
                    {formatCurrency(product.revenue)}
                  </p>
                  <div className="flex items-center space-x-1">
                    {product.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        product.trend === "up"
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {product.change}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableSeciton;
