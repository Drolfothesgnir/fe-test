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
}