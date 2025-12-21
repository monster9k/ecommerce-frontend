import Footer from "../../components/layout/user/home/Footer";
import Newsletter from "../../components/layout/user/home/Newsletter";
import ProductGallery from "../../components/layout/user/shop/ProductGallery";
import ProductInfo from "../../components/layout/user/shop/ProductInfo";
import RelatedProducts from "../../components/layout/user/shop/RelatedProducts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../utils/productApi";
export interface productDetailType {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  images: {
    id: number;
    imageUrl: string;
  }[];
  variants: {
    id: number;
    size: string;
    color: string;
    price: string | number; // Backend có thể trả về string hoặc number
    stock: number;
  }[];
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<productDetailType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) fetchProductDetail(Number(id));
  }, [id]);

  const fetchProductDetail = async (productId: number) => {
    try {
      setLoading(true);
      const res = await getProductById(productId);
      setProduct(res?.data);
      //gan chon cai dau
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="min-h-screen pt-24 text-center">Loading...</div>;

  if (!product)
    return (
      <div className="min-h-screen pt-24 text-center">Product not found</div>
    );

  return (
    <div className="min-h-screen bg-white mt-20">
      <main className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        <RelatedProducts />
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
