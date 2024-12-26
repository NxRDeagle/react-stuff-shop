import React from 'react';
import { Loading } from '../Loading/Loading';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductDetails } from './ProductDetails';
import { Showcase } from '../Showcase/Showcase';
import { useProduct } from '../../hooks/useProduct';

export const Product: React.FC = () => {
  const { data, showLoading, fadeIn, relatedProducts } = useProduct();

  if (showLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`transition-all duration-700 ${
        fadeIn ? 'opacity-100' : 'opacity-0 translate-y-12'
      }`}>
      <div className="flex gap-5 mb-5">
        <div className="bg-customGray w-full">
          {!data ? (
            <div className="flex justify-center items-center flex-col">
              <img src="images/no-product-found.png" alt="No product found" />
              <span className="text-white text-2xl pb-5">Product not found.</span>
            </div>
          ) : (
            <div className="p-2 xs:p-6 flex flex-col customMl:flex-row">
              <ProductImageGallery images={data.images} />
              <ProductDetails product={data} />
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <Showcase header="Related products" data={relatedProducts} />
      </div>
    </div>
  );
};
