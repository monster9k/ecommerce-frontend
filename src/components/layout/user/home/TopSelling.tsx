import ProductCard from "./ProductCard";
import aoKhoac from "../../../../assets/img/imageHomePage/aokhoacfake.jpg";
/* sample data */
const products = [
  {
    id: "1",
    title: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5,
    img: aoKhoac,
    oldPrice: null,
    badge: null,
  },
  {
    id: "2",
    title: "Skinny Fit Jeans",
    price: 240,
    rating: 3.5,
    img: aoKhoac,
    oldPrice: 260,
    badge: "-20%",
  },
  {
    id: "3",
    title: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    img: aoKhoac,
    oldPrice: null,
    badge: null,
  },
  {
    id: "4",
    title: "Sleeve Striped T-shirt",
    price: 130,
    rating: 4.5,
    img: aoKhoac,
    oldPrice: 160,
    badge: "-30%",
  },
];

const TopSelling = () => {
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
        <button className="!px-14 py-2 border border-gray-300 !rounded-full text-sm hover:!bg-black hover:!text-white">
          View All
        </button>
      </div>
    </section>
  );
};

export default TopSelling;
