import { Slider, Checkbox } from "antd";
import { SlidersHorizontal, ChevronUp } from "lucide-react";
import type { FiltersType } from "../../../../pages/user/ShopPage";

const colors = [
  { name: "black", value: "#000000" },
  { name: "white", value: "#ffffff" },
  { name: "red", value: "#ef4444" },
  { name: "blue", value: "#3b82f6" },
  { name: "green", value: "#22c55e" },
  { name: "yellow", value: "#eab308" },
];

const dressStyles = [
  { id: 1, name: "Casual" },
  { id: 2, name: "Formal" },
  { id: 3, name: "Party" },
  { id: 4, name: "Gym" },
];
const categories = [
  { id: 26, name: "T-shirts" },
  { id: 27, name: "Shorts" },
  { id: 28, name: "Shirts" },
  { id: 29, name: "Jeans" },
  { id: 30, name: "Jackets" },
  { id: 31, name: "Hoodies" },
];

interface ShopSidebarProps {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}

const ShopSidebar = ({ filters, setFilters }: ShopSidebarProps) => {
  const handleCategoryChange = (categoryId: number) => {
    setFilters((prev: FiltersType) => ({
      ...prev,
      categoryId: prev.categoryId === categoryId ? undefined : categoryId,
      page: 1, // set ve trang dau
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev: FiltersType) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  const handleSizeChange = (size: string) => {
    setFilters((prev: FiltersType) => ({
      ...prev,
      size: prev.size === size ? "" : size,
      page: 1,
    }));
  };

  const handleColorChange = (color: string) => {
    setFilters((prev: FiltersType) => ({
      ...prev,
      color: prev.color === color ? "" : color,
      page: 1,
    }));
  };

  const handleStyleChange = (checkedValues: any[]) => {
    setFilters((prev: FiltersType) => ({
      ...prev,
      styles: checkedValues as string[],
      page: 1,
    }));
  };

  const handleResetAll = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 10000000,
      size: "",
      color: "",
      styles: [],
      page: 1,
      limit: 9,
    });
  };

  return (
    <aside className="w-64 border rounded-2xl p-4 space-y-6 self-start">
      <div className="flex justify-between items-center border-b border-gray-200">
        <h3 className="!font-semibold !text-xl">Filters</h3>
        <SlidersHorizontal className="w-4 h-4 text-gray-600" />
      </div>

      <div className="border-b border-gray-200">
        <div className="pb-4">
          <h4 className="!font-semibold !text-xl mb-3">Category</h4>
          <div className="grid grid-cols-2 items-center gap-2">
            {categories.map((style) => (
              <div
                key={style.id}
                className="flex items-center cursor-pointer"
                onClick={() => handleCategoryChange(style.id)}
              >
                {" "}
                <span className="text-sm text-gray-600 mr-2">{style.name}</span>
                <Checkbox
                  value={style.name}
                  checked={filters.categoryId === style.id}
                />
              </div>
            ))}
          </div>
        </div>
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
          defaultValue={[filters.minPrice || 0, filters.maxPrice || 10000000]}
          onChangeComplete={handlePriceChange}
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
              onClick={() => handleSizeChange(s)}
              className={`border-none !rounded-2xl px-2 py-1 text-sm bg-gray-100 hover:!bg-black hover:!text-white ${
                filters.size === s
                  ? "bg-black text-white border-black"
                  : "bg-gray-100"
              }`}
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
              className={`w-8 h-8 !rounded-full  hover:scale-110 transition ${
                filters.color === c.name
                  ? "border-2 border-black-800"
                  : "border border-gray-300"
              }`}
              style={{ backgroundColor: c.value }}
              onClick={() => handleColorChange(c.name)}
            />
          ))}
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="pb-4">
          <h4 className="!font-semibold !text-xl mb-3">Dress Style</h4>
          <Checkbox.Group
            value={filters.styles}
            className="flex items-center justify-between gap-2"
            onChange={handleStyleChange}
          >
            {dressStyles.map((style) => (
              <div key={style.id} className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{style.name}</span>
                <Checkbox value={style.name} />
              </div>
            ))}
          </Checkbox.Group>
        </div>
      </div>

      <button
        className="w-full bg-black text-white py-2 !rounded-4xl hover:!bg-gray-300 hover:!text-black"
        onClick={handleResetAll}
      >
        Reset Filter
      </button>
    </aside>
  );
};

export default ShopSidebar;
