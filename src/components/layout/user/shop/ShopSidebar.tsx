import { Slider } from "antd";
import { SlidersHorizontal, ChevronRight, ChevronUp } from "lucide-react";

const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#eab308" },
];

const ShopSidebar = () => {
  return (
    <aside className="w-64 border rounded-2xl p-4 space-y-6 self-start">
      <div className="flex justify-between items-center border-b border-gray-200">
        <h3 className="!font-semibold !text-xl">Filters</h3>
        <SlidersHorizontal className="w-4 h-4 text-gray-600" />
      </div>

      <div className="border-b border-gray-200">
        <ul className="space-y-2 text-sm text-gray-600 list-none p-0">
          <li className="flex items-center justify-between">
            T-shirts{" "}
            <ChevronRight className="w-4 h-4 text-gray-600"></ChevronRight>
          </li>
          <li className="flex items-center justify-between">
            Shorts{" "}
            <ChevronRight className="w-4 h-4 text-gray-600"></ChevronRight>{" "}
          </li>
          <li className="flex items-center justify-between">
            Shirts{" "}
            <ChevronRight className="w-4 h-4 text-gray-600"></ChevronRight>
          </li>
          <li className="flex items-center justify-between">
            Jeans{" "}
            <ChevronRight className="w-4 h-4 text-gray-600"></ChevronRight>
          </li>
        </ul>
      </div>
      {/* Price */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="!font-semibold !text-xl ">Price</h4>
          <ChevronUp className="w-4 h-4 text-black" />
        </div>

        <Slider
          range
          min={0}
          max={1000000}
          step={50000}
          defaultValue={[200000, 400000]}
          tooltip={{
            formatter: (value) =>
              value ? `${value.toLocaleString("vi-VN")} ₫` : "",
          }}
        />
      </div>
      {/* Size */}
      <div className="border-b border-gray-200 pb-4">
        <h4 className="!font-semibold !text-xl mb-4">Size</h4>
        <div className="grid grid-cols-2 gap-2">
          {["XS", "S", "M", "L", "XL"].map((s) => (
            <button
              key={s}
              className="border-none !rounded-2xl px-2 py-1 text-sm bg-gray-100 hover:!bg-black hover:!text-white"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {/* Color */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="!font-semibold !text-xl ">Color</h4>
          <ChevronUp className="w-4 h-4 text-black" />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((c) => (
            <button
              key={c.name}
              title={c.name}
              className="w-8 h-8 !rounded-full border border-gray-300 hover:scale-110 transition"
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>
      </div>

      <div className=" pb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="!font-semibold !text-xl ">Dress Style</h4>
          <ChevronUp className="w-4 h-4 text-black" />
        </div>
        <ul className="space-y-2 text-sm text-gray-600 list-none p-0">
          <li className="flex items-center justify-between">
            Casual{" "}
            <ChevronRight className="w-4 h-4 text-gray-600"></ChevronRight>
          </li>
          <li className="flex items-center justify-between">
            Formal{" "}
            <ChevronRight className="w-4 h-4 text-gray-600"></ChevronRight>{" "}
          </li>
          <li className="flex items-center justify-between">
            Party{" "}
            <ChevronRight className="w-4 h-4 text-gray-600"></ChevronRight>
          </li>
          <li className="flex items-center justify-between">
            Gym <ChevronRight className="w-4 h-4 text-gray-600"></ChevronRight>
          </li>
        </ul>
      </div>

      <button className="w-full bg-black text-white py-2 !rounded-4xl hover:!bg-gray-300 hover:!text-black">
        Apply Filter
      </button>
    </aside>
  );
};

export default ShopSidebar;
