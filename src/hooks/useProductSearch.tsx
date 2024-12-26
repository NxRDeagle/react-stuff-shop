import { useEffect, useState } from 'react';
import { useSearchProductsQuery } from '../features/api/apiSlice';
import { Product } from '../lib/types';

export const useProductSearch = (query: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { data, isLoading, error } = useSearchProductsQuery(
    { query: { title: query } },
    { skip: query === '' },
  );

  useEffect(() => {
    if (query === '') {
      setProducts([]);
    } else if (data) {
      setProducts(data);
    }
  }, [query, data]);

  return { products, isLoading, error };
};
