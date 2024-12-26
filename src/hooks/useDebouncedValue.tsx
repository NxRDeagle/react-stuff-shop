import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

export const useDebouncedValue = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce(() => setDebouncedValue(value), delay);
    handler();

    return () => handler.cancel();
  }, [value, delay]);

  return debouncedValue;
};
