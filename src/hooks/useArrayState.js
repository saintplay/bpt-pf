import { useState } from "react";

/**
 * This hook imitates the same functionality as react/useState, but is intended for arrays
 * The main difference is that it returns a index-base set State as second param
 *
 * @author Diego Jara
 *  */
export default (initialArr) => {
  const [arr, setArr] = useState(initialArr);

  const setArrIndex = (index, value) => {
    const actualValue = typeof value === "function" ? value(arr[index]) : value;
    const arrayCopy = [...arr];
    arrayCopy[index] = actualValue;
    setArr(arrayCopy);
  };

  return [arr, setArr, setArrIndex];
};
