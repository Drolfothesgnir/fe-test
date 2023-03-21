import { Operator, Order, Range } from "../const";

interface FilterState {
  match: Record<string, string[]>
  pagination: { page: number; perPage: number };
  sort: Record<string, Order>
  search: string;
  range: Record<string, [number, number]>;
}

type FilterAction<T> = ((arg: T) => T) | T;
interface FilterAPI {
  state: FilterState;

  // Pagination
  nextPage(): void;
  prevPage(): void;
  setPage(page: number): void;
  setPerPage(perPage: number): void;

  sort(arg: FilterAction<FilterState["sort"]>): void;

  match(arg: FilterAction<FilterState["match"]>): void;

  search(arg: FilterAction<FilterState["search"]>): void;

  range(arg: FilterAction<FilterState["range"]>): void;

  getQueryString(): string;
}
