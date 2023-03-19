import { useState, useCallback } from "react";
import { ParamManager } from "./filterApi";

export default function useSearch(
  init: string = ""
): ParamManager<string, [value: string]> {
  const [searchValue, set] = useState(init);

  const unset = useCallback(
    function () {
      set("");
    },
    [searchValue]
  );

  const toObject = useCallback(
    function () {
      if (searchValue === "") return {};

      return { q: searchValue };
    },
    [searchValue]
  );

  return { value: searchValue, set, unset, reset: unset, toObject };
}
