import { Footer } from "antd/es/layout/layout";
import BrandStrip from "../../components/layout/user/home/BrandStrip";
import BrowseByStyle from "../../components/layout/user/home/BrowseByStyle";
import HeroSection from "../../components/layout/user/home/HeroSection";
import NewArrivals from "../../components/layout/user/home/NewArrivals";
import Newsletter from "../../components/layout/user/home/Newsletter";
import Testimonials from "../../components/layout/user/home/Testimonials";
import TopSelling from "../../components/layout/user/home/TopSelling";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BrandStrip />
      <main className="max-w-6xl mx-auto px-4">
        <div className="border-b border-b-gray-200">
          {" "}
          <NewArrivals />
        </div>

        <TopSelling />

        <BrowseByStyle />

        <Testimonials />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
