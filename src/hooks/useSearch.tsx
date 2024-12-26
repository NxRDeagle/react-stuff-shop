import { useNavigate } from 'react-router-dom';
import { useSearchUI } from './useSearchUI';
import { useDebouncedValue } from './useDebouncedValue';
import { useSearchState } from './useSearchState';
import { useProductSearch } from './useProductSearch';

export const useSearch = (initialValue: string, handleBlur: () => void) => {
  const { searchQuery, handleSearchChange } = useSearchState(initialValue);
  const debouncedQuery = useDebouncedValue(searchQuery, 300);
  const { products, isLoading, error } = useProductSearch(debouncedQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, handleCloseMobileNav?: () => void) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/shop?title=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/shop');
    }
    handleCloseMobileNav?.();
    handleBlur();
  };

  return {
    searchQuery,
    products,
    isLoading,
    error,
    handleSearchChange,
    handleSubmit,
  };
};
