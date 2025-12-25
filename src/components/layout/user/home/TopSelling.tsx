import ProductCard from "./ProductCard";
import aoKhoac from "../../../../assets/img/imageHomePage/aokhoacfake.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../../../utils/productApi";
/* sample data */

const TopSelling = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopSelling();
  }, []);

  const fetchTopSelling = async () => {
    try {
      // Gọi API lấy 4 sản phẩm bán chạy nhất
      const res: any = await getProducts({
        limit: 4,
        page: 1,
        sortBy: "sold", // <--- Sort theo cột sold
        order: "desc", // <--- Giảm dần (số lượng bán nhiều nhất lên đầu)
        disablePagination: "true", // Tối ưu như bài trước đã bàn
      });

      if (res && res.data) {
        const mappedProducts = res.data.data.map((item: any) => ({
          id: item.id,
          title: item.name,
          price: item.variants?.[0]?.price || 0,
          img: item.images?.[0]?.imageUrl || "",
          // Bạn có thể hiển thị số lượng đã bán nếu muốn demo cho đẹp
          // badge: `Sold: ${item.sold}`,
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error("Error fetching top selling:", error);
    }
  };

  const handleViewAll = () => {
    // Chuyển sang trang shop, filter theo bán chạy
    navigate("/shop?sortBy=sold&order=desc");
  };

  return (
    <section className="py-12 mt-6">
      <h2 className="text-center !text-4xl md:text-4xl !font-extrabold tracking-wide">
        TOP SELLING
      </h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          className="!px-14 py-2 border border-gray-300 !rounded-full text-sm hover:!bg-black hover:!text-white"
          onClick={handleViewAll}
        >
          View All
        </button>
      </div>
    </section>
  );
};

export default TopSelling;
