import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useShopSearch = (
  title: string,
  categoryId: string,
  price: string,
  handleBlur: () => void,
  handleFocus: () => void,
) => {
  const navigate = useNavigate();
  const [localTitle, setLocalTitle] = useState(title);
  const [localPrice, setLocalPrice] = useState(price);

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  useEffect(() => {
    setLocalPrice(price);
  }, [price]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
    handleFocus();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPrice(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (localTitle) params.append('title', localTitle);
    if (categoryId) params.append('categoryId', categoryId);
    if (localPrice) params.append('price', localPrice);

    navigate(`/shop?${params.toString()}`);
    handleBlur();
  };

  return {
    localTitle,
    setLocalTitle,
    localPrice,
    handleTitleChange,
    handlePriceChange,
    handleSearchSubmit,
  };
};
