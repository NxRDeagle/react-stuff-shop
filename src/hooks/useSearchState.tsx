import { useState } from 'react';

export const useSearchState = (initialValue: string) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return { searchQuery, setSearchQuery, handleSearchChange };
};
