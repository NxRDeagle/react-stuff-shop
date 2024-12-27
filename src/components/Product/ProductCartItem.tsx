import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

interface ProductCartItemProps {
  id: number;
  setIsDrawerOpen: (state: boolean) => void;
  img: string;
  title: string;
  quantity: number;
  price: number;
}

export const ProductCartItem: React.FC<ProductCartItemProps> = ({
  id,
  setIsDrawerOpen,
  img,
  title,
  quantity,
  price,
}) => {
  const { onDecreaseQuantity, onIncreaseQuantity, isRemoved, onRemoveFromCartDelayed } = useCart({
    animationDelay: 300,
  });

  return (
    <div
      className={`w-full bg-heroGray px-2 xs:px-4 py-3 flex items-center justify-between transition-all duration-300
    ${isRemoved ? 'opacity-0 translate-x-10' : ''}`}>
      <Link
        onClick={() => setIsDrawerOpen(false)}
        to={`/product/${id}`}
        className="flex items-center">
        <div
          className="w-[70px] xs:w-[90px] h-[70px] xs:h-[90px]  rounded-md mr-2 xs:mr-4 bg-cover"
          style={{ backgroundImage: `url(${img})` }}></div>
        <div className="text-xs">
          <p className="text-white  xs:text-base min-w-[80px] max-w-[80px]">{title}</p>
        </div>
      </Link>
      <p className="text-buttonPink font-bold text-lg xs:text-[22px] leading-6 mr-3">{price}$</p>
      <div className="flex items-center gap-2 mr-3">
        <button className="text-2xl text-white" onClick={() => onDecreaseQuantity(id, quantity)}>
          -
        </button>
        <p className="text-white font-bold text-lg xs:text-[22px] leading-6">{quantity}</p>
        <button className="text-2xl text-white" onClick={() => onIncreaseQuantity(id)}>
          +
        </button>
      </div>
      <button className="group" onClick={() => onRemoveFromCartDelayed(id)}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="stroke-current text-gray-400 group-hover:text-buttonPink transition-colors duration-300"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.375 4.375L15.625 15.625"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.375 15.625L15.625 4.375"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
