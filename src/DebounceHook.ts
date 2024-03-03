import { useEffect, useState } from "react";



export const useDebounce = (value: string, delay = 500) => {
  const [debauncedValue, setDebauncedValue] = useState<string>(value);

  useEffect(() => {
    if (value == "") {
      setDebauncedValue(value);
      return;
    }
    const timeout = setTimeout(() => {
      setDebauncedValue(value);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [value, delay]);

 
  return debauncedValue;
};
// const currTime = new Date().toLocaleString();
//     const log: logType = { debauncedValue, currTime };
//     logs?.unshift(log);