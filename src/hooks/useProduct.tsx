import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductQuery } from '../features/api/apiSlice';
import { RootState } from '../features/store';
import { getRelatedProducts } from '../features/products/productsSlice';
import { useLoading } from './useLoading';

export const useProduct = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetProductQuery({ id: Number(id) });
  const dispatch = useDispatch();
  const relatedProducts = useSelector((state: RootState) => state.products.related);

  const { showLoading, fadeIn } = useLoading(isLoading, isFetching);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    if (data && !isLoading && !isFetching) {
      const payload = { categoryId: data.category.id, productId: Number(id) };
      dispatch(getRelatedProducts(payload));
    }
  }, [data, isLoading, isFetching, dispatch, id]);

  return { data, isLoading, isFetching, showLoading, fadeIn, relatedProducts };
};
