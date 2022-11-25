import { useEffect, useState } from 'react';
import { request } from '~/services';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await request.get(url);
        setData(response);
      } catch (error) {
        console.log({ fetchDataError: error });
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return;
  }, [url]);

  return { data, isLoading, error };
}
