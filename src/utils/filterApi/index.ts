import { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { Order } from '../const';
import usePagination from './pagination';

const defaultState: Shop.FilterState = {
  match: {},
  range: {},
  pagination: { perPage: 10, page: 1 },
  search: '',
  sort: { rating: Order.DESC },
};

export default function useFilterApi(
  _init: Partial<Shop.FilterState> = defaultState,
  resetPageOnFilterChange = true,
): Shop.FilterAPI {
  const init = { ...defaultState, ..._init };
  const {
    state: paginationState,
    nextPage,
    prevPage,
    setPage,
    setPerPage,
    setPagination,
  } = usePagination(init.pagination);
  const [matchState, match] = useState(init.match);
  const [sortState, sort] = useState(init.sort);
  const [searchState, search] = useState(init.search);
  const [rangeState, range] = useState(init.range);
  const firstLoadRef = useRef(true);

  const setMatch = useCallback(function (name: string, value: string) {
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
  }, []);

  const unsetMatch = useCallback(function (name: string, value: string) {
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
  }, []);

  const setRange = useCallback(function (name: string, value: [number, number]) {
    range((oldState) => {
      const newState = { ...oldState };
      newState[name] = value;
      return newState;
    });
  }, []);

  const unsetRange = useCallback(function (name: string) {
    range((oldState) => {
      if (!oldState[name]) return oldState;

      const newState = { ...oldState };
      delete newState[name];
      return newState;
    });
  }, []);

  const setSort = useCallback(function (name: string, order: Order) {
    sort((oldState) => ({ ...oldState, [name]: order }));
  }, []);

  const unsetSort = useCallback(function (name: string) {
    sort((oldState) => {
      if (!oldState[name]) return oldState;
      const newState = { ...oldState };
      delete newState[name];
      return newState;
    });
  }, []);

  const clear = useCallback(function () {
    match(defaultState.match);
    search(defaultState.search);
    sort(defaultState.sort);
    setPagination(defaultState.pagination);
    range(defaultState.range);
  }, []);

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
    [paginationState, matchState, sortState, searchState, rangeState],
  );

  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return;
    }

    if (resetPageOnFilterChange) {
      setPagination(({ perPage }) => ({ page: 1, perPage }));
    }
  }, [matchState, sortState, searchState, rangeState]);

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
    setMatch,
    unsetMatch,
    setRange,
    unsetRange,
    setSort,
    unsetSort,
    clear,
  };
}
