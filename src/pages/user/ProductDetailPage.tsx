import Footer from "../../components/layout/user/home/Footer";
import Newsletter from "../../components/layout/user/home/Newsletter";
import ProductGallery from "../../components/layout/user/shop/ProductGallery";
import ProductInfo from "../../components/layout/user/shop/ProductInfo";
import RelatedProducts from "../../components/layout/user/shop/RelatedProducts";

const ProductDetailPage = () => {
  return (
    <div className="min-h-screen bg-white mt-20">
      <main className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductGallery />
          <ProductInfo />
        </div>

        <RelatedProducts />
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
