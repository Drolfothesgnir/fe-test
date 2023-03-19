import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import { Order } from "./utils/const";
import useFilterApi from "./utils/filterApi/useFilterApi";


import instance from "./utils/http";

// TODO asObject() method for filtersApi; Operators api for filtersApi; remove toString() method from *Api

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
  
  const filterApi = useFilterApi()

  useEffect(function () {
    
    console.log(filterApi.getQueryString());
    
  }, [filterApi.value])

  function getProducts() {
    instance
      .get(`/api/shop/products?${filterApi.getQueryString()}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch(console.log);
  }

  useEffect(() => {
    getProducts();
  }, [filterApi.value]);

  function searchHandler(e: ChangeEvent) {
    filterApi.search.set((e.target as HTMLInputElement).value)
  }

  return (
    <div className="App">
      <input type="search" onChange={searchHandler} />
      <button onClick={() => filterApi.sort.set("price", Order.DESC)}>
        Sort Price
      </button>
      <button onClick={() => filterApi.sort.set("rating", Order.ASC)}>
        Sort Rating
      </button>
      <button onClick={() => filterApi.match.set('zaloopa', new Date().getSeconds().toString())}>match test</button>
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
