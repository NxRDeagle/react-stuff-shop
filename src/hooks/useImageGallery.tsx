import { useEffect, useState, useRef, useCallback } from 'react';

const MAX_IMAGE_WIDTH = 765;

export const useImageGallery = (images: string[]) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [mainImageWidth, setMainImageWidth] = useState<number>(0);
  const [productFullImageOpen, setProductFullImageOpen] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const updateImageWidth = () => {
      if (imageRef.current) {
        setMainImageWidth(imageRef.current.clientWidth);
      }
    };

    const resizeObserver = new ResizeObserver(updateImageWidth);

    if (imageRef.current) {
      resizeObserver.observe(imageRef.current);
    }

    updateImageWidth();

    return () => {
      if (imageRef.current) {
        resizeObserver.unobserve(imageRef.current);
      }
    };
  }, []);

  const sliderLineStyle = useCallback(
    () => ({
      transform: `translateX(-${
        (mainImageWidth > MAX_IMAGE_WIDTH ? MAX_IMAGE_WIDTH : mainImageWidth) * selectedImgIndex
      }px)`,
    }),
    [mainImageWidth, selectedImgIndex],
  );

  const handleSlideLeft = useCallback(() => {
    setSelectedImgIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  const handleSlideRight = useCallback(() => {
    setSelectedImgIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedImgIndex(index);
  }, []);

  const handleImageClick = useCallback(() => {
    setProductFullImageOpen(true);
  }, []);

  return {
    selectedImgIndex,
    mainImageWidth,
    sliderLineStyle,
    handleSlideLeft,
    handleSlideRight,
    handleThumbnailClick,
    handleImageClick,
    productFullImageOpen,
    setProductFullImageOpen,
    imageRef,
  };
};
