import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 600) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    console.log('useDebounce');
    const timeOutId = setTimeout(() => {
      console.log('set debouncedValue', value);
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
