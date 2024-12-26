import { useSearchParams } from 'react-router-dom';
import { useSearchProductsQuery } from '../features/api/apiSlice';

export const useShopQueryParams = () => {
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get('categoryId') || '';
  const title = searchParams.get('title') || '';
  const price = searchParams.get('price') || '';
  const {
    data = [],
    isLoading,
    error,
    isFetching,
  } = useSearchProductsQuery({
    query: { categoryId, title, price },
  });
  return {
    title,
    isFetching,
    price,
    categoryId,
    data,
    isLoading,
    error,
  };
};
