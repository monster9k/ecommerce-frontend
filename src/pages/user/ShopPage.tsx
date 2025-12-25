import Newsletter from "../../components/layout/user/home/Newsletter";
import Footer from "../../components/layout/user/home/Footer";
import ShopSidebar from "../../components/layout/user/shop/ShopSidebar";
import ShopProducts from "../../components/layout/user/shop/ShopProducts";
import { getProducts } from "../../utils/productApi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface ProductDataType {
  id: number;
  name: string;
  // Sửa đoạn này: Price nằm trong mảng variants
  variants: {
    price: string; // JSON trả về "300000" nên để string
  }[];
  images: {
    id: number;
    imageUrl: string;
  }[];
}
export interface FiltersType {
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  styles?: string[];
  page: number;
  categoryId?: number;
  limit: number;
}

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search"); // Lấy giá trị sau chữ ?search=
  const [products, setProducts] = useState<ProductDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({
    minPrice: 0,
    maxPrice: 10000000,
    size: "",
    color: "",
    styles: [],
    page: 1,
    limit: 9,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: filters.page,
        limit: filters.limit,
      };
      if (searchTerm) {
        params.search = searchTerm; //
      }
      if (filters.categoryId) params.categoryId = filters.categoryId;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.size) params.size = filters.size;
      if (filters.color) params.color = filters.color;

      if (filters.styles && filters.styles.length > 0) {
        params.style = filters.styles;
      }

      const res = await getProducts(params);
      console.log(res?.data.data);
      console.log(res?.data?.pagination);
      setProducts(res?.data?.data);
      setTotalPages(res?.data?.pagination?.totalPages);
      setTotalProducts(res?.data?.pagination?.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    window.scrollTo({
      top: 0,
      behavior: "smooth", // Tạo hiệu ứng trượt mượt mà thay vì nhảy "bụp" phát lên
    });
  }, [filters, searchTerm]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="min-h-screen bg-white mt-20">
      <main className="max-w-6xl mx-auto px-4">
        <div className="flex gap-6">
          <ShopSidebar filters={filters} setFilters={setFilters} />
          <ShopProducts
            products={products}
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalProducts={totalProducts}
          />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ShopPage;
