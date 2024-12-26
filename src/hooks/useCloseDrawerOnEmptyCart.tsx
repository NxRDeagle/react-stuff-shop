import { useEffect } from 'react';
import { ProductWithQuantity } from '../lib/types';

export const useCloseDrawerOnEmptyCart = (
  productsData: ProductWithQuantity[],
  setIsDrawerOpen: (state: boolean) => void,
) => {
  useEffect(() => {
    if (!productsData.length) {
      setIsDrawerOpen(false);
    }
  }, [productsData, setIsDrawerOpen]);
};
