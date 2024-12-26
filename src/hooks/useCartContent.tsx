import { useMemo } from 'react';
import { ProductWithQuantity } from '../lib/types';
import { ProductCartItem } from '../components/Product/ProductCartItem';

export const useCartContent = (
  productsData: ProductWithQuantity[],
  setIsDrawerOpen: (state: boolean) => void,
) => {
  return useMemo(() => {
    return productsData.length ? (
      productsData.map((product) => (
        <ProductCartItem
          key={product.product.id}
          id={product.product.id}
          title={product.product.title}
          price={product.product.price * product.quantity}
          quantity={product.quantity}
          setIsDrawerOpen={setIsDrawerOpen}
          img={product.product.images[0]}
        />
      ))
    ) : (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col gap-5">
          <img src="images/box.png" alt="No items" />
          <h3 className="text-white text-3xl my-auto text-center">Cart is empty!</h3>
        </div>
      </div>
    );
  }, [productsData, setIsDrawerOpen]);
};
