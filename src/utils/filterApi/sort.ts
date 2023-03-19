import { useState, useCallback } from "react";
import { Order } from "../const";
import deleteObjectProperty from "../deleteObjectProperty";

export default function useSort() {
  const [items, setItems] = useState<{ [key: string]: Order }>({});

  const set = useCallback(
    function (name: string, order: Order) {
      setItems((state) => ({ ...state, ...{ [name]: order } }));
    },
    [items]
  );

  const unset = useCallback(
    function (name: string) {
      setItems((state) => deleteObjectProperty(state, name));
    },
    [items]
  );

  const toString = useCallback(
    function () {
      const entries = Object.entries(items);
      if (!entries.length) return "";
      const [name, order] = entries[0];
      let _sort = `_sort=${name}`;
      let _order = `_order=${order}`;
      for (let i = 1; i < entries.length; i++) {
        const [name_i, order_i] = entries[i];
        _sort += `,${name_i}`;
        _order += `,${order_i}`;
      }
      return `${_sort}&${_order}`;
    },
    [items]
  );

  return { set, unset, toString, items };
}
