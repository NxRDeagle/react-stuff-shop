import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { CartItem, Product } from '../lib/types';
import { addItemToCart } from '../features/user/userSlice';
import { addToFavorites } from '../features/favorites/favoritesSlice';

export const useProductDetails = (product: Product) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  const handleSizeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(event.target.value);
  }, []);

  const onAddToCart = useCallback(() => {
    if (!selectedSize) {
      toast.error('Select size first!');
      return;
    }
    const cartItem: CartItem = { ...product, quantity: 1 };
    dispatch(addItemToCart(cartItem));
    toast.success('Product added to cart!');
  }, [dispatch, product, selectedSize]);

  const onAddToFavorite = useCallback(() => {
    dispatch(addToFavorites(product));
    toast.success('Product added to favorites!');
  }, []);

  return {
    selectedSize,
    handleSizeChange,
    onAddToCart,
    onAddToFavorite,
  };
};
