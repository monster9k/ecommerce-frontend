import { Star } from "lucide-react";

import { getRelatedProducts } from "../../../../utils/productApi";
import { useEffect, useState } from "react";
import type { ProductDataType } from "../../../../pages/user/ShopPage";
import { Link } from "react-router-dom";

interface RelatedProductProps {
  categoryId: number;
  styles: string[];
  currentProductId: number;
}

const RelatedProducts = ({
  categoryId,
  styles,
  currentProductId,
}: RelatedProductProps) => {
  const [relatedProduct, setRelatedProduct] = useState<ProductDataType[]>([]);

  const fetchRelatedProducts = async () => {
    try {
      const res = await getRelatedProducts(categoryId, styles);
      // console.log(res?.data);

      if (res?.data?.data) {
        const filtered = res.data.data
          .filter((p: any) => p.id !== currentProductId)
          .slice(0, 4);

        setRelatedProduct(filtered);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [categoryId, styles, currentProductId]);
  // console.log("currentProductID: ", currentProductId);
  // console.log("related Product: ", relatedProduct);
  return (
    <section className=" mt-16 ">
      <h2 className="!text-4xl !font-extrabold text-center">
        YOU MIGHT ALSO LIKE
      </h2>

      <div className="grid grid-cols-4 gap-2 mt-8  ">
        {relatedProduct.map((p) => (
          <Link
            key={p.id}
            to={`/shop/${p.id}`}
            className="px-3 py-1 transform transition-transform duraiton-300 hover:scale-105 !text-inherit !no-underline"
          >
            <img src={p.images[0]?.imageUrl} className="mb-2 !rounded-4xl" />
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400" />
              ))}
              <span className="text-sm text-gray-500">4.5/5</span>
            </div>

            <h4 className="text-sm font-medium">{p.name}</h4>
            <p className="font-semibold">
              {Number(p.variants[0].price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
