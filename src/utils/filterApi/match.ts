import { useState, useCallback } from "react";
import deleteObjectProperty from "../deleteObjectProperty";

export default function useMatch() {
  const [items, setItems] = useState<{ [key: string]: string[] }>({});
console.log({items});

  const set = useCallback(
    function (name: string, value: string) {
      console.log({name, value});
      
      setItems((state) => {
        const result = { ...state };
        if (!result[name]) {
          result[name] = [];
        }
        result[name].push(value);
        return result;
      });
    },
    [items]
  );

  const unset = useCallback(
    function (name: string, value: string) {
      setItems((state) => {
        if (!state.hasOwnProperty(name)) return state;

        const filtered = state[name].filter((item) => item !== value);

        if (!filtered.length) return deleteObjectProperty(state, name);

        return { ...state, [name]: filtered };
      });
    },
    [items]
  );

  const toString = useCallback(
    function () {
      const entries = Object.entries(items);
      if (!entries.length) return "";
      const entry = entries[0];
      let result = concatValues(entry);
      for (let i = 1; i < entries.length; i++) {
        result += `&${concatValues(entries[i])}`;
      }
      return result;
    },
    [items]
  );

  return { items, set, unset, toString };
}

function concatValues([name, values]: [string, string[]]) {
  const value = values[0];
  let result = `${name}=${value}`;
  for (let i = 1; i < values.length; i++) {
    result += `&${name}=${values[i]}`;
  }
  return result;
}
