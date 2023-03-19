import queryString from "query-string";
import { useCallback, useMemo } from "react";
import { MatchParams, PaginationParams, SortParams } from "./filterApi";
import useMatch from "./match";
import usePagination from "./pagination";
import useSearch from "./search";
import useSort from "./sort";

type FilterParams = {
  sort: SortParams;
  match: MatchParams;
  search: string;
  pagination: PaginationParams;
};

export default function useFilterApi(init: Partial<FilterParams> = {}) {
  const sort = useSort(init.sort);
  const match = useMatch(init.match);
  const search = useSearch(init.search);
  const pagination = usePagination(init.pagination);

  const value = useMemo(
    () => ({
      sort: sort.value,
      match: match.value,
      search: search.value,
      pagination: pagination.value,
    }),
    [sort.value, match.value, search.value, pagination.value]
  );

  const getQueryString = useCallback(
    function () {
      return [sort, match, search, pagination]
        .map((item) =>
          queryString.stringify(item.toObject(), {
            arrayFormat: item._arrayFormat,
          })
        )
        .filter((str) => !!str)
        .join("&");
    },
    [value]
  );

  return { value, sort, match, search, pagination, getQueryString };
}
