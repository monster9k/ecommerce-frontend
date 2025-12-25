import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import aoKhoac from "../../../../assets/img/imageHomePage/aokhoacfake.jpg";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../../utils/productApi";
/* sample data */

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const handleViewAll = () => {
    // Chuyển sang trang Shop và yêu cầu Shop cũng sort theo hàng mới
    navigate("/shop?sortBy=createdAt&order=desc");
  };

  const fetchNewArrivals = async () => {
    try {
      // Gọi API với tham số sắp xếp mới cập nhật bên backend
      const res: any = await getProducts({
        limit: 4, // Chỉ lấy 4 sản phẩm
        page: 1,
        sortBy: "createdAt", // Sắp xếp theo ngày tạo (hoặc "id" nếu DB không có createdAt)
        order: "desc", // Giảm dần (Mới nhất lên đầu)
      });

      if (res && res.data) {
        // Map data API sang format của ProductCard (nếu cần)
        const mappedProducts = res.data.data.map((item: any) => ({
          id: item.id,
          title: item.name,
          // Lấy giá từ biến thể đầu tiên nếu có
          price: item.variants?.[0]?.price || 0,
          // Lấy ảnh từ mảng images nếu có
          img: item.images?.[0]?.imageUrl || "",
          // Các trường khác...
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    }
  };

  return (
    <section className="py-12 mt-10">
      <h2 className="text-center !text-4xl md:!text-4xl !font-extrabold tracking-wide">
        NEW ARRIVALS
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

export default NewArrivals;
