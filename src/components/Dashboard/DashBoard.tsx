import ActivityFeed from "./ActivityFeed";
import ChartSection from "./ChartSection";
import StatsGrid from "./StatsGrid";
import TableSeciton from "./TableSection";

const DashBoardPage = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <StatsGrid />
      {/* Chart Sections */}
      <ChartSection />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TableSeciton />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
