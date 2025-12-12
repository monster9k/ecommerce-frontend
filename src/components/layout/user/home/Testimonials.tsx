import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Check } from "lucide-react";

type Testimonial = {
  name: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes...",
  },
  {
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge...",
  },
  {
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces...",
  },
  { name: "Anna P.", text: "Love the fast delivery and amazing quality!" },
  { name: "Michael B.", text: "Stylish and comfortable outfits every time." },
  { name: "Emma R.", text: "My go-to brand for casual and formal wear." },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerIdx, setCenterIdx] = useState(0); // index card chính giữa

  const prev = () => {
    setCenterIdx((prev) => Math.max(prev - 1, 0));
  };

  const next = () => {
    setCenterIdx((prev) => Math.min(prev + 1, testimonials.length - 1));
  };

  useEffect(() => {
    // cuộn card chính giữa vào view
    containerRef.current?.children[centerIdx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  }, [centerIdx]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 relative mt-14">
      <h2 className="text-4xl !font-bold  text-left flex items-center justify-between">
        OUR HAPPY CUSTOMERS
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={centerIdx === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={centerIdx === testimonials.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </h2>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth mt-10"
      >
        {testimonials.map((t, idx) => {
          // xác định độ mờ
          const opacity =
            idx === centerIdx
              ? 1
              : idx === centerIdx - 1 || idx === centerIdx + 1
              ? 0.5
              : 0.2;

          return (
            <div
              key={idx}
              className="flex-none w-80 border p-4 rounded shadow-sm transition-opacity duration-300"
              style={{ opacity }}
            >
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
              <p className="font-semibold flex items-center">
                {t.name}{" "}
                <Check className="w-3 h-3 ml-2 bg-green-600 rounded-full text-white" />
              </p>

              <p className="text-sm mb-2">{t.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
