import {useState, useCallback, useEffect} from 'react';

export function useAsync<T, E = Error>(fn: () => Promise<T>): {isLoading: boolean; data?: T; error?: E} {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setValue] = useState<T>();
  const [error, setError] = useState<E>();

  const execute = useCallback(() => {
    setIsLoading(true);
    setValue(undefined);

    setError(undefined);

    return fn()
      .then((response) => {
        setValue(response);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fn]);

  useEffect(() => {
    execute();
  }, [execute]);

  return {isLoading, data, error};
}
