import { useState } from 'react';
import { SearchUI } from '../lib/types';

export const useSearchUI = (): SearchUI => {
  const [isExpanded, setExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const handleFocus = () => {
    setExpanded(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const handleBlur = () => {
    setIsAnimating(false);
    setTimeout(() => setExpanded(false), 300);
  };

  return {
    isExpanded,
    isAnimating,
    handleFocus,
    handleBlur,
  };
};
