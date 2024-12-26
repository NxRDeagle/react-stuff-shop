import { useState, useEffect } from 'react';

export const useLoading = (isLoading: boolean, isFetching: boolean) => {
  const [showLoading, setShowLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    let fadeInTimer: NodeJS.Timeout;
    let loaderTimer: NodeJS.Timeout;

    if (isLoading || isFetching) {
      setShowLoading(true);
      setFadeIn(false);
    } else {
      loaderTimer = setTimeout(() => {
        setShowLoading(false);
        fadeInTimer = setTimeout(() => setFadeIn(true), 100);
      }, 500);
    }

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(fadeInTimer);
    };
  }, [isLoading, isFetching]);

  return { showLoading, fadeIn };
};
