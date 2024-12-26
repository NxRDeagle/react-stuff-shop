import React from 'react';
import { ProductFullImage } from './ProductFullImage';
import { useImageGallery } from '../../hooks/useImageGallery';

interface ProductImageGalleryProps {
  images: string[];
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const {
    selectedImgIndex,
    sliderLineStyle,
    handleSlideLeft,
    handleSlideRight,
    handleThumbnailClick,
    handleImageClick,
    productFullImageOpen,
    setProductFullImageOpen,
    imageRef,
  } = useImageGallery(images);

  return (
    <>
      <ProductFullImage
        img={images[selectedImgIndex]}
        isOpen={productFullImageOpen}
        setProductFullImageOpen={setProductFullImageOpen}
      />

      <div className="relative rounded-md overflow-hidden h-auto max-w-full customMl:w-[201%]">
        <div
          className="flex rounded-md transition-transform duration-300"
          style={sliderLineStyle()}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              ref={index === 0 ? imageRef : null}
              onClick={handleImageClick}
              className="cursor-zoom-in rounded-md object-cover max-w-full h-auto"
              alt="Product"
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 ml-5 bg-[#363636] hover:bg-[#4a4c4c] opacity-70 w-11 h-11 flex items-center justify-center"
              onClick={handleSlideLeft}>
              <img src="images/leftArrow.svg" alt="Left arrow" className="w-[18px] h-[22px]" />
            </button>

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 mr-5 bg-[#363636] hover:bg-[#4a4c4c] opacity-70 w-11 h-11 flex items-center justify-center"
              onClick={handleSlideRight}>
              <img src="images/rightArrow.svg" alt="Right arrow" className="w-[18px] h-[22px]" />
            </button>
          </>
        )}
      </div>

      <div className="mr-[31px] min-w-[90px] ml-5 cursor-pointer hidden customMl:block">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            onClick={() => handleThumbnailClick(index)}
            className={`hover:shadow-customPink transition-all duration-300 object-cover rounded-md w-[90px] h-[90px] mb-[5px] ${
              index === selectedImgIndex ? 'shadow-customPink transition-shadow' : ''
            }`}
            alt="Product thumbnail"
          />
        ))}
      </div>
    </>
  );
};

export default ProductImageGallery;
