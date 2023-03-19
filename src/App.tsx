import queryString from "query-string";
import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import { Order } from "./utils/const";
import useMatch from "./utils/filterApi/match";
import useSearch from "./utils/filterApi/search";
import useSort from "./utils/filterApi/sort";
import searchFilter from "./utils/filters/searchFilter";
import instance from "./utils/http";

type CategorySet = { [key: string]: boolean };
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  color: string;
  categories: CategorySet;
  brand: string;
  availability: boolean;
  rating: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterConfig, setFilterConfig] = useState<Record<string, any>>({});
  const sortApi = useSort();
  const searchApi = useSearch();
  const matchApi = useMatch()

  useEffect(() => {
    console.log(sortApi.toString());
    console.log(searchApi.toString());
    console.log(matchApi.toString());
  }, [sortApi.items, searchApi.searchValue, matchApi.items]);

  function getProducts() {
    instance
      .get(`/api/shop/products?${queryString.stringify(filterConfig)}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch(console.log);
  }

  useEffect(() => {
    // getProducts();
  }, []);

  function searchHandler(e: ChangeEvent) {
    searchApi.set((e.target as HTMLInputElement).value)
  }

  return (
    <div className="App">
      <input type="search" onChange={searchHandler} />
      <button onClick={() => sortApi.set("price", Order.DESC)}>
        Sort Price
      </button>
      <button onClick={() => sortApi.set("rating", Order.ASC)}>
        Sort Rating
      </button>
      <button onClick={() => matchApi.set('zaloopa', new Date().getSeconds().toString())}>match test</button>
      <ul>
        {products.map((item) => {
          return (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.name} />
              <h3>{item.name}</h3>
              <h4>$ {item.price}</h4>
              <p>{item.description}</p>
              <span>{item.color}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
