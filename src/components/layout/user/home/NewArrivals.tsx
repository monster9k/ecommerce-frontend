import React from "react";
import ProductCard from "./ProductCard";

/* sample data */
const products = [
  {
    id: "1",
    title: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5,
    img: "/assets/p1.jpg",
    oldPrice: null,
    badge: null,
  },
  {
    id: "2",
    title: "Skinny Fit Jeans",
    price: 240,
    rating: 3.5,
    img: "/assets/p2.jpg",
    oldPrice: 260,
    badge: "-20%",
  },
  {
    id: "3",
    title: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    img: "/assets/p3.jpg",
    oldPrice: null,
    badge: null,
  },
  {
    id: "4",
    title: "Sleeve Striped T-shirt",
    price: 130,
    rating: 4.5,
    img: "/assets/p4.jpg",
    oldPrice: 160,
    badge: "-30%",
  },
];

const NewArrivals: React.FC = () => {
  return (
    <section className="py-12">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide">
        NEW ARRIVALS
      </h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-2 border border-gray-300 rounded-full text-sm">
          View All
        </button>
      </div>
    </section>
  );
};

export default NewArrivals;
