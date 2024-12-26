import React from 'react';
import { SearchInput } from './SearchInput';
import { useSearch } from '../../../hooks/useSearch';
import { useSearchUI } from '../../../hooks/useSearchUI';

interface SearchFormProps {
  handleCloseMobileNav?: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ handleCloseMobileNav }) => {
  const searchUI = useSearchUI();
  const { searchQuery, products, handleSearchChange, handleSubmit } = useSearch(
    '',
    searchUI.handleBlur,
  );

  return (
    <form onSubmit={(e) => handleSubmit(e, handleCloseMobileNav)} className="search-form">
      <SearchInput
        value={searchQuery}
        searchUI={searchUI}
        onChange={handleSearchChange}
        products={products}
      />
    </form>
  );
};
