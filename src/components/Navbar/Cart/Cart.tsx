import React from 'react';
import { Drawer } from '../Drawer/Drawer';
import { ProductWithQuantity } from '../../../lib/types';
import { useCartItems } from '../../../hooks/useCartItems';
import { useCartTotalPrice } from '../../../hooks/useCartTotalPrice';
import { useCartContent } from '../../../hooks/useCartContent';
import { useCartFooter } from '../../../hooks/useCartFooter';
import { useCloseDrawerOnEmptyCart } from '../../../hooks/useCloseDrawerOnEmptyCart';

interface CartProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (state: boolean) => void;
}

export const Cart: React.FC<CartProps> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const productsData = useCartItems();
  const totalPrice = useCartTotalPrice(productsData);

  const content = useCartContent(productsData, setIsDrawerOpen);
  const footer = useCartFooter(productsData, totalPrice);

  useCloseDrawerOnEmptyCart(productsData, setIsDrawerOpen);
  return (
    <Drawer
      isOpen={isDrawerOpen}
      setIsOpen={setIsDrawerOpen}
      content={
        <>
          <h4 className="font-normal text-sm text-center text-white py-6">Cart</h4>
          <div className="overflow-y-auto overflow-x-hidden purple__scroll max-h-[83vh] h-full">
            {content}
          </div>
        </>
      }
      footer={footer}
      isAllwaysHidden={false}
    />
  );
};
