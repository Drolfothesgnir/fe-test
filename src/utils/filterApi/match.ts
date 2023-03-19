import { useState, useCallback } from "react";
import { MatchParams, ParamManager } from "./filterApi";

export default function useMatch(init: MatchParams = {}): ParamManager<MatchParams, [name:string, value:string]> {
  const [items, setItems] = useState<MatchParams>(init);

  const set = useCallback(
    function (name: string, value: string) {
      setItems((state) => {
        const result = { ...state };
        if (!result[name]) {
          result[name] = [value];
        } else {
          const copy = result[name].slice();
          copy.push(value);
          result[name] = copy;
        }
        return result;
      });
    },
    [items]
  );

  const reset = useCallback(function (value: MatchParams) {
    setItems(value)
  }, [items])

  const unset = useCallback(
    function (name: string, value: string) {
      setItems((state) => {
        if (!state.hasOwnProperty(name)) return state;

        const filtered = state[name].filter((item) => item !== value);

        if (!filtered.length) {
          const copy = { ...state };
          delete copy[name];
          return copy;
        }

        return { ...state, [name]: filtered };
      });
    },
    [items]
  );

  const toObject = useCallback(
    function () {
      return items as Readonly<MatchParams>;
    },
    [items]
  );

  return { value: items, set, unset, toObject, reset };
}
