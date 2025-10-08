import {
  BarChart3,
  Calendar,
  ChevronDown,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingCartIcon,
  Users,
  Zap,
} from "lucide-react";
import avatar from "../../../assets/img/avatar.jpg";
import { useState } from "react";

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    lable: "Dashboard",

    badge: "New",
  },
  {
    id: "analytics",
    icon: BarChart3,
    lable: "Analytics",
    submenu: [
      { id: "overview", lable: "Overview" },
      { id: "reports", lable: "Reports" },
      { id: "insights", lable: "Insights" },
    ],
  },
  {
    id: "users",
    icon: Users,
    lable: "Users",
    count: "2.4k",
    submenu: [
      { id: "all-users", lable: "All users" },
      { id: "roles", lable: "Roles & Permission" },
      { id: "activity", lable: "User Activity" },
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingCartIcon,
    lable: "E-commerce",
    submenu: [
      { id: "products", lable: "Products" },
      { id: "orders", lable: "Oders" },
      { id: "customer", lable: "Customers" },
    ],
  },
  {
    id: "inventory",
    icon: Package,
    lable: "Inventory",
    count: "847",
  },
  {
    id: "transactions",
    icon: CreditCard,
    lable: "Transactions",
  },
  {
    id: "messages",
    icon: MessageSquare,
    lable: "Messages",
    badge: "12",
  },
  {
    id: "calendar",
    icon: Calendar,
    lable: "Calendar",
  },
  {
    id: "reports",
    icon: FileText,
    lable: "Reports",
  },
  {
    id: "settings",
    icon: Settings,
    lable: "Settings",
  },
];

const SidebarPage = ({
  collapsed,

  currentPage,
  onPageChange,
}: {
  collapsed: boolean;
  onToggle: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}) => {
  const [expandedItems, setExpandedItems] = useState(new Set(["analytics"]));

  const toggleExpanded = (itemid: string) => {
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(itemid)) {
      newExpanded.delete(itemid);
    } else {
      newExpanded.add(itemid);
    }
    setExpandedItems(newExpanded);
  };
  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10 `}
    >
      {/*Logo*/}
      <div className=" p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-10 h-5 text-white" />
          </div>

          {/* Conditional Rendering */}
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:!text-white">
                Nexus
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Admin panel
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          return (
            <div key={item.id}>
              <button
                className={`w-full flex items-center ${
                  collapsed ? "justify-center" : "justify-between"
                }  p-2 !rounded-xl transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 dark:!text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
                onClick={() => {
                  if (item.submenu) {
                    toggleExpanded(item.id);
                  } else {
                    onPageChange(item.id);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5`} />
                  {/* Conditional Rendering */}

                  {!collapsed && (
                    <>
                      {" "}
                      <span className="font-medium ml-2"> {item.lable}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.count && (
                        <span className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:!text-slate-200 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {!collapsed && item.submenu && (
                  <ChevronDown className={`w-4 h-4 transition-transform`} />
                )}
              </button>

              {/*Sub Menus*/}
              {!collapsed && item.submenu && expandedItems.has(item.id) && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((subitem) => {
                    return (
                      <button className="w-full text-left p-2 text-sm text-slate-600 dark:!text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all">
                        {subitem.lable}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img
              src={avatar}
              alt="user"
              className="w-10 h-10 rounded-full ring-2 ring-blue-500"
            />
            <div className="flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:!text-white truncate">
                  Khoa Minh
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarPage;
