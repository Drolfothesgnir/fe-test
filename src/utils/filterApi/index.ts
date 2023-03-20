import { useCallback, useState, useMemo } from "react";
import { Order } from "../const";
import { FilterAPI, FilterState } from "./filterApi";
import usePagination from "./pagination";

const defaultState: FilterState = {
  match: {},
  range: {},
  pagination: { perPage: 10, page: 1 },
  search: "",
  sort: {},
};

export default function useFilterApi(
  init: FilterState = defaultState
): FilterAPI {
  const {
    state: paginationState,
    nextPage,
    prevPage,
    setPage,
    setPerPage,
  } = usePagination(init.pagination);
  const [matchState, match] = useState(init.match);
  const [sortState, sort] = useState(init.sort);
  const [searchState, search] = useState(init.search);
  const [rangeState, range] = useState(init.range);

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
      return "";
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
  };
}
