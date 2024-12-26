import { ProductWithQuantity } from '../lib/types';

export const useCartTotalPrice = (productsData: ProductWithQuantity[]) => {
  return productsData.reduce((accumulator, product) => {
    return accumulator + product.product.price * product.quantity;
  }, 0);
};
