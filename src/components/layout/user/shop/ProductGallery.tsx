import { useEffect, useState } from "react";
import { Image } from "antd";

interface ProductGalleryProps {
  images: {
    id: number;
    imageUrl: string;
  }[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    setActiveImg(images[0]?.imageUrl);
  }, [images]);

  return (
    <div className="flex gap-4 h-[400px]">
      {/* Thumbnails */}

      <div className="flex flex-col gap-2 h-full w-24">
        {images.map((img) => (
          <Image
            key={img.id}
            src={img.imageUrl}
            height="100%"
            width="100%"
            style={{ objectFit: "contain", height: "100%", width: "100%" }}
            className="flex-1 object-contain border !rounded-2xl cursor-pointer"
          />
        ))}
      </div>

      {/* Main Image */}

      <div className="w-full h-full rounded-2xl overflow-hidden relative">
        <Image
          src={activeImg}
          alt="Product Main"
          // 2. Set width/height 100% để ảnh bung ra khớp với div cha
          height="100%"
          width="100%"
          // 3. Quan trọng: style object-fit để ảnh không bị méo
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
          // 4. Class này giúp Antd Image chiếm hết diện tích
          className="object-contain w-full h-full !rounded-2xl"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
