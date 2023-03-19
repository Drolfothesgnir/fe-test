import { useState, useCallback } from "react";
import { Order } from "../const";
import { ParamManager, SortParams } from "./filterApi";

export default function useSort(
  init: SortParams = {}
): ParamManager<SortParams, [name: string, order: Order]> {
  const [items, setItems] = useState<SortParams>(init);

  const set = useCallback(
    function (name: string, order: Order) {
      setItems((state) =>
        state[name] !== order ? { ...state, ...{ [name]: order } } : state
      );
    },
    [items]
  );

  const unset = useCallback(
    function (name: string) {
      setItems((state) => {
        if (!state[name]) return state
        const copy = { ...state };
        delete copy[name];
        return copy;
      });
    },
    [items]
  );

  const reset = useCallback(function (value: SortParams) {
    setItems(value)
  }, [items])

  const toObject = useCallback(
    function () {
      const entries = Object.entries(items);
      const { length } = entries;
      if (!entries.length) return {};
      const _sort = Array.from({ length });
      const _order = Array.from({ length });
      for (let i = 0; i < length; i++) {
        const [name_i, order_i] = entries[i];
        _sort[i] = name_i;
        _order[i] = order_i;
      }
      return {
        _sort,
        _order,
      };
    },
    [items]
  );

  return {
    set,
    unset,
    toObject,
    reset,
    value: items,
    _arrayFormat: "comma",
  };
}
