import { Operator, Order, Range } from "../const";

export interface ParamManager<T, K extends unknown[]> {
  set(...args: K): void;
  unset(...args: K): void;
  reset(value: T): void;
  value: T;
  toObject(): { [key: string]: string | string[] } | {};
  _arrayFormat?: "comma";
}

export type MatchParams = { [key: string]: string[] };

export type SortParams = { [key: string]: Order };

export type PaginationParams = { page: number; perPage: number };

export type RangeParams = {
  [key: string]: number | string;
};

interface FilterState {
  match: {[key:string]: string[]};
  pagination: {page: number, perPage: number};
  sort: { [key: string]: Order };
  search: string;
  range: {[key:string]: [number, number]}
}

type FilterAction<T> = ((arg: T) => T) | T
interface FilterAPI {
  state: FilterState;

  // Pagination
  nextPage(): void;
  prevPage(): void;
  setPage(page: number): void;
  setPerPage(perPage: number): void;

  // sort(name: string, order: Order): void;
  sort(arg: FilterAction<FilterState['sort']>): void;

  // match(name: string, value: string): void;
  match(arg: FilterAction<FilterState['match']>): void;

  // search(value: string): void;
  search(arg: FilterAction<FilterState['search']>): void;

  // range(name: string, operator: Range, value: number);
  range(arg: FilterAction<FilterState['range']>): void;

  getQueryString(): string;
}