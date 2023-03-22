import { Order } from "../const";

type FilterRemover = {
  name: string;
  value: string | number | Order | [number, number];
  removeAction(): void;
  label: string;
};

function match({
  state: { match: state },
  unsetMatch: unset,
}: Shop.FilterAPI): FilterRemover[] {
  const result = [];
  for (const key in state) {
    const values = state[key];
    for (let i = 0; i < values.length; i++) {
      result.push({
        name: key,
        value: values[i],
        label: `${key}: ${values[i]}`,
        removeAction: () => unset(key, values[i]),
      });
    }
  }
  return result;
}

function sort({
  state: { sort: state },
  unsetSort: unset,
}: Shop.FilterAPI): FilterRemover[] {
  const result = [];

  for (const key in state) {
    const labelOrder = state[key] === Order.ASC ? "ascending" : "descending";
    result.push({
      name: key,
      value: state[key],
      label: `${key} in ${labelOrder} order`,
      removeAction: () => unset(key),
    });
  }
  return result;
}

function range({
  state: { range: state },
  unsetRange: unset,
}: Shop.FilterAPI): FilterRemover[] {
  const result = [];
  for (const key in state) {
    const [gte, lte] = state[key];
    result.push({
      name: key,
      value: state[key],
      label: `${key}: ${gte} - ${lte}`,
      removeAction: () => unset(key),
    });
  }
  return result;
}

function search({
  state: { search: state },
  search: set,
}: Shop.FilterAPI): FilterRemover[] {
  if (!state) return []

  return [
    {
      name: "search",
      value: state,
      label: `'${state}'`,
      removeAction: () => set(""),
    },
  ];
}

export default function getFilterRemovers(
  api: Shop.FilterAPI
): FilterRemover[] {
  return [match, sort, search, range]
    .map((f) => f(api))
    .reduce((acc, current) => acc.concat(current));
}
