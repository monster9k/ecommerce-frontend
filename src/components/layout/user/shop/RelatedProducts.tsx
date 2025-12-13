import { Star } from "lucide-react";
import aoKhoac from "../../../../assets/img/imageHomePage/aokhoacfake.jpg";

const RelatedProducts = () => {
  return (
    <section className=" mt-16 ">
      <h2 className="!text-4xl !font-extrabold text-center">
        YOU MIGHT ALSO LIKE
      </h2>

      <div className="grid grid-cols-4 gap-2 mt-8  ">
        {[1, 2, 3, 4].map((p) => (
          <div
            key={p}
            className="px-3 py-1 transform transition-transform duraiton-300 hover:scale-105"
          >
            <img src={aoKhoac} className="mb-2 !rounded-4xl" />
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400" />
              ))}
              <span className="text-sm text-gray-500">4.5/5</span>
            </div>

            <h4 className="text-sm font-medium">Graphic T-shirt</h4>
            <p className="font-semibold">$145</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
