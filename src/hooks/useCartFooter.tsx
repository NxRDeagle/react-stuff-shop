import { useMemo } from 'react';
import { ProductWithQuantity } from '../lib/types';
import { Button } from '../components/Button/Button';

export const useCartFooter = (productsData: ProductWithQuantity[], totalPrice: number) => {
  return useMemo(
    () => (
      <div className="flex justify-between flex-col xs:flex-row gap-5 xs:items-center">
        <p className="text-center font-semibold text-xl text-lightGray">
          TOTAL PRICE: {totalPrice}$
        </p>
        <Button disabled={!productsData.length}>Proceed to checkout</Button>
      </div>
    ),
    [productsData, totalPrice],
  );
};
