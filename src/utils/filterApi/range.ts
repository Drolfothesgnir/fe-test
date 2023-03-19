import { useCallback, useState } from "react";
import { Operator } from "../const";
import { ParamManager, RangeParams } from "./filterApi";

export default function useRange(
  init: RangeParams = {}
): ParamManager<
  RangeParams,
  [name: string, operator: Operator, value: string | number]
> {
  const [value, setValue] = useState(init);

  const set = useCallback(
    function (name: string, operator: Operator, value: string | number) {
      const key = name + operator;
      setValue((state) => {
        if (state[key] === value) return state;

        return { ...state, [key]: value };
      });
    },
    [value]
  );

  const unset = useCallback(
    function (name: string, operator: Operator) {
      const key = name + operator;
      setValue((state) => {
        if (!state[key]) return state;

        const copy = { ...state };
        delete copy[key];
        return copy;
      });
    },
    [value]
  );

  const reset = useCallback(
    function (newValue: RangeParams) {
      setValue(newValue);
    },
    [value]
  );

  const toObject = useCallback(
    function () {
      return value as Readonly<RangeParams>;
    },
    [value]
  );

  return { value, set, unset, reset, toObject };
}
