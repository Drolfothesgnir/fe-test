import { useState, useCallback } from "react";

export default function useSearch() {
  const [searchValue, set] = useState('');

  const unset = useCallback(function () {
    set('')
  }, [searchValue])

  const toString = useCallback(function () {
    if (searchValue === '') return '';

    return `q=${searchValue}`
  }, [searchValue])

  return {searchValue, set, unset, toString}
}