import { useEffect, useState } from "react";

export default function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(function () {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initialState;
  });
  //Adding all data to my local storage using localStorage with useEffect hook
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
