
import { useState, useEffect } from 'react';
import WebStorage from '../WebStorage';

export function useStorage(key, initialValue = []) {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    const loadData = async () => {
      const stored = await WebStorage.getItem(key);
      if (stored) setData(stored);
    };
    loadData();
  }, [key]);

  const updateData = async (newData) => {
    await WebStorage.setItem(key, newData);
    setData(newData);
  };

  return [data, updateData];
}
