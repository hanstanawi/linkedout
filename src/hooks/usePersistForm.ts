import { useEffect } from 'react';

export function usePersistForm<T>({
  value,
  localStorageKey,
}: {
  value: T;
  localStorageKey: string;
}) {
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);
}
