import queryString from "query-string";
import { useCallback, useMemo } from "react";
import { MatchParams, SortParams } from "./filterApi";
import useMatch from "./match";
import useSearch from "./search";
import useSort from "./sort";

type FilterParams = {
  sort: SortParams;
  match: MatchParams;
  search: string;
};

export default function useFilterApi(init: Partial<FilterParams> = {}) {
  const sort = useSort(init.sort);
  const match = useMatch(init.match);
  const search = useSearch(init.search);

  const value = useMemo(
    () => ({
      sort: sort.value,
      match: match.value,
      search: search.value,
    }),
    [sort.value, match.value, search.value]
  );

  const getQueryString = useCallback(
    function () {
      return [sort, match, search]
        .map((item) =>
          queryString.stringify(item.toObject(), {
            arrayFormat: item._arrayFormat,
          })
        )
        .filter(str => !!str)
        .join("&");
    },
    [sort.value, match.value, search.value]
  );

  return { value, sort, match, search, getQueryString };
}
