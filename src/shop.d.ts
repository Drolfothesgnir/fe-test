enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
declare namespace Shop {
  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    color: string;
    categories: string[];
    brand: string;
    available: boolean;
    rating: number;
  }

  interface FilterState {
    match: Record<string, string[]>;
    pagination: { page: number; perPage: number };
    sort: Record<string, Order>;
    search: string;
    range: Record<string, [number, number]>;
  }

  type FilterAction<T> = ((arg: T) => T) | T;
  interface FilterAPI {
    state: FilterState;

    nextPage(): void;
    prevPage(): void;
    setPage(page: number): void;
    setPerPage(perPage: number): void;

    sort(arg: FilterAction<FilterState['sort']>): void;
    setSort(name: string, order: Order): void;
    unsetSort(name: string): void;

    match(arg: FilterAction<FilterState['match']>): void;
    setMatch(name: string, value: string): void;
    unsetMatch(name: string, value: string): void;

    search(arg: FilterAction<FilterState['search']>): void;

    range(arg: FilterAction<FilterState['range']>): void;
    setRange(name: string, value: [number, number]): void;
    unsetRange(name: string): void;

    clear(): void;
  }
}
