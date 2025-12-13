import aoKhoac from "../../../../assets/img/imageHomePage/aokhoacfake.jpg";
import aoxam from "../../../../assets/img/imageHomePage/aoxam.jpg";
import aoCasual from "../../../../assets/img/imageHomePage/aocasualfake.jpg";
const images = [aoKhoac, aoxam, aoCasual];

const ProductGallery = () => {
  return (
    <div className="flex gap-4 h-[400px]">
      {/* Thumbnails */}

      <div className="flex flex-col gap-2 h-full w-24">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            className="flex-1 object-contain border !rounded-2xl cursor-pointer"
          />
        ))}
      </div>

      {/* Main Image */}
      <img
        src={images[0]}
        className="flex-1 h-full object-contain bg-gray-100 !rounded-2xl"
      />
    </div>
  );
};

export default ProductGallery;
