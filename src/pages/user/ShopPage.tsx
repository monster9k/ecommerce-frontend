import Newsletter from "../../components/layout/user/home/Newsletter";
import Footer from "../../components/layout/user/home/Footer";
import ShopSidebar from "../../components/layout/user/shop/ShopSidebar";
import ShopProducts from "../../components/layout/user/shop/ShopProducts";

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-white mt-20">
      <main className="max-w-6xl mx-auto px-4">
        <div className="flex gap-6">
          <ShopSidebar />
          <ShopProducts />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ShopPage;
