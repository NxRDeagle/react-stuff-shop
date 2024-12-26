import React from 'react';
import { SizeRadio } from '../SizeRadio/SizeRadio';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { useProductDetails } from '../../hooks/useProductDetails';
import { Product } from '../../lib/types';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { selectedSize, handleSizeChange, onAddToCart, onAddToFavorite } =
    useProductDetails(product);

  return (
    <div className="flex flex-col justify-between w-full gap-10">
      <div>
        <h2 className="text-lg font-medium leading-5 text-white mb-[10px] mt-5 customMl:mt-0">
          {product.title}
        </h2>
        <p className="text-xl font-bold leading-6 text-white mb-5">{product.price}$</p>
        <div className="flex gap-4 font-medium text-sm leading-4 items-center mb-4">
          <p className="text-lighterGray">Color:</p>
          <span className="text-heroWhite">{product.color || 'White'}</span>
        </div>
        <div className="flex gap-4 font-medium text-sm leading-4 items-center mb-4">
          <p className="text-lighterGray">Sizes:</p>
          <SizeRadio size="4.5" selectedSize={selectedSize} onChange={handleSizeChange} />
          <SizeRadio size="5.5" selectedSize={selectedSize} onChange={handleSizeChange} />
          <SizeRadio size="6.5" selectedSize={selectedSize} onChange={handleSizeChange} />
        </div>
        <p className="text-[12px] leading-5 font-normal text-lightGray max-w-full customMl:max-w-[338px] mb-5">
          {product.description}
        </p>
        <div className="flex gap-[10px] flex-col lg:flex-row">
          <Button disabled={!selectedSize} className="disabled:bg-heroGray" onClick={onAddToCart}>
            Add to cart
          </Button>
          <Button onClick={onAddToFavorite} variant="gray">
            Add to favorites
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center font-medium text-[10px] text-lighterGray leading-3">
        <span>{product.numberSold || 19} people purchased</span>
        <Link to={'/'} className="underline">
          Find in a store
        </Link>
      </div>
    </div>
  );
};
