import { useState, useCallback } from 'react';

const defaultState = { page: 1, perPage: 10 };

export default function usePagination(init: Shop.FilterState['pagination'] = defaultState) {
  const [state, setState] = useState(init);

  const nextPage = useCallback(function () {
    setState((oldState) => {
      return {
        perPage: oldState.perPage,
        page: oldState.page + 1,
      };
    });
  }, []);

  const prevPage = useCallback(function () {
    setState((oldState) => {
      return {
        perPage: oldState.perPage,
        page: oldState.page - 1,
      };
    });
  }, []);

  const setPage = useCallback(function (page: number) {
    setState((oldState) => {
      if (page < 1 || page === oldState.page) return oldState;
      return {
        perPage: oldState.perPage,
        page,
      };
    });
  }, []);

  const setPerPage = useCallback(function (perPage: number) {
    setState((oldState) => {
      if (perPage < 1 || perPage === oldState.perPage) return oldState;
      return {
        perPage,
        page: oldState.page,
      };
    });
  }, []);

  return { state, prevPage, nextPage, setPage, setPerPage, setPagination: setState };
}
