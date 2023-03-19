export interface ParamManager<T, K extends unknown[]> {
  set(...args: K): void;
  unset(...args: K): void;
  reset(value: T): void
  value: T;
  toObject(): { [key: string]: string | string[] } | {};
  _arrayFormat?: "comma";
}

export type MatchParams = { [key: string]: string[] };

export type SortParams = { [key: string]: Order };

export type PaginationParams = {page: number, perPage: number}