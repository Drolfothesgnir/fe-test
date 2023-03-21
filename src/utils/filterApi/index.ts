import queryString from "query-string";
import { useCallback, useState, useMemo } from "react";
import usePagination from "./pagination";

const defaultState: Shop.FilterState = {
  match: {},
  range: {},
  pagination: { perPage: 10, page: 1 },
  search: "",
  sort: {},
};

function matchToObject(match: Shop.FilterState["match"]) {
  return match;
}

function rangeToObject(range: Shop.FilterState["range"]) {
  const entries = Object.entries(range);
  if (!entries.length) return {};
  const result: Record<string, number> = {};
  for (const [key, [gte, lte]] of entries) {
    if (gte > 0) {
      result[key + "_gte"] = gte;
    }

    if (lte > 0) {
      result[key + "_lte"] = lte;
    }
  }
  return result;
}

function searchToObject(search: Shop.FilterState["search"]) {
  if (!search) return {};
  return { q: search };
}

function sortToObject(sort: Shop.FilterState["sort"]) {
  const entries = Object.entries(sort);
  if (!entries.length) return {};
  const _sort = [];
  const _order = [];
  for (const [key, order] of entries) {
    _sort.push(key);
    _order.push(order);
  }
  return {
    _sort,
    _order,
  };
}

export default function useFilterApi(
  _init: Partial<Shop.FilterState> = defaultState
): Shop.FilterAPI {
  const init = { ...defaultState, ..._init };
  const {
    state: paginationState,
    nextPage,
    prevPage,
    setPage,
    setPerPage,
    toObject: paginationToObject,
  } = usePagination(init.pagination);
  const [matchState, match] = useState(init.match);
  const [sortState, sort] = useState(init.sort);
  const [searchState, search] = useState(init.search);
  const [rangeState, range] = useState(init.range);

  const setMatch = useCallback(
    function (name: string, value: string) {
      match((oldState) => {
        const newState = { ...oldState };
        if (!oldState[name]) {
          newState[name] = [value];
        } else {
          const copy = newState[name].slice();
          copy.push(value);
          newState[name] = copy;
        }
        return newState;
      });
    },
    [matchState]
  );

  const unsetMatch = useCallback(
    function (name: string, value: string) {
      match((oldState) => {
        if (!oldState[name]) return oldState;
        const newState = { ...oldState };
        const filtered = oldState[name].filter((item) => item !== value);
        newState[name] = filtered;
        if (!filtered.length) {
          delete newState[name];
        }
        return newState;
      });
    },
    [matchState]
  );

  const setRange = useCallback(
    function (name: string, value: [number, number]) {
      range((oldState) => {
        const newState = { ...oldState };
        newState[name] = value;
        return newState;
      });
    },
    [rangeState]
  );

  const unsetRange = useCallback(
    function (name: string) {
      range((oldState) => {
        if (!oldState[name]) return oldState;

        const newState = { ...oldState };
        delete newState[name];
        return newState;
      });
    },
    [rangeState]
  );

  const state = useMemo(
    function () {
      return {
        match: matchState,
        range: rangeState,
        pagination: paginationState,
        search: searchState,
        sort: sortState,
      };
    },
    [paginationState, matchState, sortState, searchState, rangeState]
  );

  const getQueryString = useCallback(
    function () {
      const arr = [
        [matchToObject(matchState), undefined],
        [rangeToObject(rangeState), undefined],
        [searchToObject(searchState), undefined],
        [sortToObject(sortState), { arrayFormat: "comma" }],
        [paginationToObject(), undefined],
      ];
      return (arr as [any, { arrayFormat: "commaa" } | undefined])
        .map(([obj, c]) => queryString.stringify(obj, c))
        .filter((str) => !!str)
        .join("&");
    },
    [state]
  );

  return {
    state,
    match,
    sort,
    search,
    range,
    nextPage,
    prevPage,
    setPerPage,
    setPage,
    getQueryString,
    setMatch,
    unsetMatch,
    setRange,
    unsetRange,
  };
}
