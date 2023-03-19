import { useCallback, useState } from "react";
import { PaginationParams, ParamManager } from "./filterApi";

interface Paginator {
  next(): void;
  prev(): void;
}
const defaultValues = { page: 1, perPage: 10 };

export default function usePagination(
  init: PaginationParams = defaultValues
): ParamManager<PaginationParams, [name: "page" | "perPage", value: number]> &
  Paginator {
  const [value, setValue] = useState(init);

  const set = useCallback(
    function (name: "page" | "perPage", value: number) {
      if (value < 1) return;

      setValue((state) => {
        if (state[name] === value) return state;
        return { ...state, [name]: value };
      });
    },
    [value]
  );

  const unset = useCallback(
    function (name: "page" | "perPage") {
      setValue((state) => {
        if (state[name] === defaultValues[name]) return state;
        const copy = { ...state };
        copy[name] = defaultValues[name];
        return copy;
      });
    },
    [value]
  );

  const reset = useCallback(
    function (newValue: PaginationParams) {
      setValue(newValue);
    },
    [value]
  );

  const toObject = useCallback(
    function () {
      const result: { _page?: number; _limit?: number } = {};
      if (value.page > 1) {
        result._page = value.page;
      }
      result._limit = value.perPage;
      return result;
    },
    [value]
  );

  const next = useCallback(
    function () {
      setValue((state) => {
        return { ...state, page: (state.page || 1) + 1 };
      });
    },
    [value]
  );

  const prev = useCallback(
    function () {
      setValue((state) => {
        if (!state.page) return state;

        return { ...state, page: state.page - 1 };
      });
    },
    [value]
  );

  return { value, set, unset, reset, toObject, next, prev };
}
