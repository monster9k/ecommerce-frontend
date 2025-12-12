const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];

const BrandStrip = () => {
  return (
    <div className="-mt-12 bg-black w-full text-white py-4 relative z-10">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4 overflow-x-auto">
        {brands.map((b) => (
          <div
            key={b}
            className="flex-shrink-0 px-6 py-2 text-lg font-semibold"
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandStrip;
