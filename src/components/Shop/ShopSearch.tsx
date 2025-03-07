import React from 'react';
import { SearchInput } from '../Navbar/SearchInput/SearchInput';
import { SearchUI } from '../../lib/types';
import { useSearch } from '../../hooks/useSearch';

interface ShopSearchProps {
  localTitle: string;
  searchUI: SearchUI;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ShopSearch: React.FC<ShopSearchProps> = ({
  localTitle,
  searchUI,
  handleTitleChange,
}) => {
  const { products, handleSearchChange } = useSearch(localTitle, searchUI.handleBlur);

  return (
    <SearchInput
      products={products}
      searchUI={searchUI}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchChange(e);
        handleTitleChange(e);
      }}
      value={localTitle}
      variant={'heroGray'}
      className="h-8"
      animation={'delay3s'}></SearchInput>
  );
};
