import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../features/user/userSlice';

type AnimationDelay = 100 | 300 | 500;

interface UseCartProps {
  animationDelay?: AnimationDelay;
}

export const useCart = ({ animationDelay = 300 }: UseCartProps) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const dispatch = useDispatch();

  const onDecreaseQuantity = useCallback(
    (id: number, quantity: number) => {
      if (quantity > 1) {
        dispatch(decreaseQuantity({ id }));
      } else {
        onRemoveFromCartDelayed(id);
      }
    },
    [dispatch],
  );

  const onIncreaseQuantity = useCallback(
    (id: number) => {
      dispatch(increaseQuantity({ id }));
    },
    [dispatch],
  );

  const onRemoveFromCart = useCallback(
    (id: number) => {
      dispatch(removeFromCart({ id }));
    },
    [dispatch],
  );

  const onRemoveFromCartDelayed = useCallback(
    (id: number) => {
      setIsRemoved(true);
      const timeout = setTimeout(() => {
        onRemoveFromCart(id);
      }, animationDelay);
      return () => clearTimeout(timeout);
    },
    [animationDelay, onRemoveFromCart],
  );

  return {
    onDecreaseQuantity,
    onIncreaseQuantity,
    onRemoveFromCart,
    isRemoved,
    onRemoveFromCartDelayed,
  };
};
