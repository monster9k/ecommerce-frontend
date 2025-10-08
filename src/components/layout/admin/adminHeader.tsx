import {
  Bell,
  ChevronDown,
  Filter,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import avatar from "../../../assets/img/avatar.jpg";
import { useTheme } from "../../context/admin.theme.context";

const AdminHeader = ({
  sidebarCollapsed,
  onToggleSideBar,
}: {
  sidebarCollapsed: boolean;
  onToggleSideBar: () => void;
}) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 p-3 ">
      <div className="flex items-center justify-between">
        {/** Left section */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-lg text-slate-600 dark:!text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={onToggleSideBar}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden md:block">
            <h1 className="text-xl font-black text-slate-800 dark:!text-white">
              Dashboard
            </h1>
            <p className=" text-slate-800 dark:!text-white">
              Welcome back, Khoa! here's what's happening today
            </p>
          </div>
        </div>

        {/*Center*/}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="w-3 h-3 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Anything"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:!text-white placeholder-slate-500 focus:ouline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent trasition-all"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 dark:!text-slate-200  hover::text-slate-600 dark:hover:text-slate-300">
              <Filter />
            </button>
          </div>
        </div>

        {/*Right*/}
        <div className="flex items-center space-x-3">
          {/*Quick action*/}

          <button className="hidden lg:flex items-center space-x-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white !rounded-2xl hover:shadow-lg transition-all appearance-none border-none outline-none">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New</span>
          </button>

          {/* toggle */}
          <button
            className="p-2.5 rounded-xl text-slate-600 dark:!text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Notification */}
          <button className="relative p-2.5 rounded-xl text-slate-600 dark:!text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-color">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Setting */}
          <button className="relative p-2.5 rounded-xl text-slate-600 dark:!text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-color">
            <Settings className="w-5 h-5" />
          </button>

          {/* User profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
            <img
              src={avatar}
              alt="User"
              className="w-8 h-8 rounded-full ring-2 ring-blue-500"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Khoa
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
