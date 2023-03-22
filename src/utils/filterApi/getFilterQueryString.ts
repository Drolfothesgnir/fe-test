import queryString from 'query-string';

export function getQueryString({ search, match, range, pagination, sort }: Shop.FilterState) {
  const arr = [
    [matchToObject(match), undefined],
    [rangeToObject(range), undefined],
    [searchToObject(search), undefined],
    [sortToObject(sort), { arrayFormat: 'comma' }],
    [paginationToObject(pagination), undefined],
  ];
  return (arr as [any, { arrayFormat: 'commaa' } | undefined])
    .map(([obj, c]) => queryString.stringify(obj, c))
    .filter((str) => !!str)
    .join('&');
}

function matchToObject(match: Shop.FilterState['match']) {
  return match;
}

function rangeToObject(range: Shop.FilterState['range']) {
  const entries = Object.entries(range);
  if (!entries.length) return {};
  const result: Record<string, number> = {};
  for (const [key, [gte, lte]] of entries) {
    if (gte > 0) {
      result[key + '_gte'] = gte;
    }

    if (lte > 0) {
      result[key + '_lte'] = lte;
    }
  }
  return result;
}

function searchToObject(search: Shop.FilterState['search']) {
  if (!search) return {};
  return { q: search };
}

function sortToObject(sort: Shop.FilterState['sort']) {
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

function paginationToObject(pagination: Shop.FilterState['pagination']) {
  return {
    _page: pagination.page,
    _limit: pagination.perPage,
  };
}
