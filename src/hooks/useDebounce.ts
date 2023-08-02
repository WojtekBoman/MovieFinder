import { useEffect, useState } from 'react';
import { DEFAULT_DEBOUNCE_DELAY } from '../constants/constants';

export function useDebounce<T>(value: T, callback = () => {}, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
      setDebouncedValue(value);
    }, delay || DEFAULT_DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
