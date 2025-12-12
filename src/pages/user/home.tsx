import BrandStrip from "../../components/layout/user/home/BrandStrip";
import HeroSection from "../../components/layout/user/home/HeroSection";
import NewArrivals from "../../components/layout/user/home/NewArrivals";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BrandStrip />
      <main className="max-w-6xl mx-auto px-4">
        <NewArrivals />
      </main>
    </div>
  );
};

export default HomePage;
