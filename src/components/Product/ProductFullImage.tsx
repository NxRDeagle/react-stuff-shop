import React from 'react';

interface ProductFullImageProps {
  img: string;
  setProductFullImageOpen: (state: boolean) => void;
  isOpen: boolean;
}

export const ProductFullImage: React.FC<ProductFullImageProps> = ({
  img,
  isOpen,
  setProductFullImageOpen,
}) => {
  return (
    <div
      className={`fixed inset-0 transition-all duration-300 bg-heroGray bg-opacity-80 z-[300] visible ${
        isOpen ? '' : 'opacity-0 invisible -z-10'
      }`}
      onClick={() => setProductFullImageOpen(false)}>
      <div className="flex h-full justify-center items-center">
        <img src={img} className="object-cover  customFullImage:h-[96%]" alt="Product" />
      </div>
    </div>
  );
};
