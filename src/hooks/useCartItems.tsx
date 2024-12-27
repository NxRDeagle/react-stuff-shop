import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, ProductWithQuantity } from '../lib/types';
import { RootState } from '../features/store';
import { removeFromCart } from '../features/user/userSlice';
import { getProductById } from '../utils/common';

export const useCartItems = () => {
  const [productsData, setProductsData] = useState<ProductWithQuantity[]>([]);
  const { cart } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cartItemsMapped = await Promise.all(
          cart.cartItems.map(async (cartItem: CartItem) => {
            try {
              const product = await getProductById(cartItem.id);
              return { product, quantity: cartItem.quantity };
            } catch (error) {
              dispatch(removeFromCart({ id: cartItem.id }));
              return { product: null, quantity: 0 };
            }
          }),
        );

        const validCartItems: ProductWithQuantity[] = cartItemsMapped.filter(
          (item): item is ProductWithQuantity => item.product !== null,
        );

        setProductsData(validCartItems);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [cart.cartItems, dispatch]);

  return productsData;
};
