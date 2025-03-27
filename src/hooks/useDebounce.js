import React from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const hanlde = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(hanlde);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
