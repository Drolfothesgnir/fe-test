import queryString from "query-string";
import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import { Order } from "./utils/const";
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
  const sortApi = useSort()

  useEffect(() => {
    console.log(sortApi.toString());
    
  }, [sortApi.items])

  function getProducts() {
    instance
      .get(`/api/shop/products?${queryString.stringify(filterConfig)}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch(console.log);
  }

  useEffect(() => {
    getProducts();
  }, [filterConfig]);

  function searchHandler(e: ChangeEvent) {
    setFilterConfig((config) =>
      searchFilter((e.target as HTMLInputElement).value, config)
    );
  }

  return (
    <div className="App">
      <input type="search" onChange={searchHandler} />
      <button onClick={() => sortApi.set('price', Order.DESC)}>Sort Price</button>
      <button onClick={() => sortApi.set('rating', Order.ASC)}>Sort Rating</button>
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
