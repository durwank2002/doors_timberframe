import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce fast changing values (e.g. search box inputs)
 * @param {any} value
 * @param {number} delayMs
 * @returns {any}
 */
export const useDebounce = (value, delayMs = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
};
