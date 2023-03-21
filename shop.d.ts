declare namespace Shop {
  enum Order {
    ASC = "asc",
    DESC = "desc",
  }

  enum Range {
    GTE = "_gte",
    LTE = "_lte",
  }

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

    // Pagination
    nextPage(): void;
    prevPage(): void;
    setPage(page: number): void;
    setPerPage(perPage: number): void;

    sort(arg: FilterAction<FilterState["sort"]>): void;

    // Match
    match(arg: FilterAction<FilterState["match"]>): void;
    setMatch(name: string, value: string): void;
    unsetMatch(name: string, value: string): void;

    search(arg: FilterAction<FilterState["search"]>): void;

    range(arg: FilterAction<FilterState["range"]>): void;

    getQueryString(): string;

    
  }
}
