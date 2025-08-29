import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; // 👈 toast ইম্পোর্ট করুন

function getStoredValue<T>(key: string, initialValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // 👇 console.error-এর পরিবর্তে toast.error
    toast.error("Could not load saved settings. Your preferences won't be saved.");
    console.error(error); // ডিবাগিং-এর জন্য কনসোলে রাখাও ভালো
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getStoredValue(key, initialValue);
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // 👇 console.error-এর পরিবর্তে toast.error
      toast.error("Could not save your settings. This might happen in private browsing mode.");
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}