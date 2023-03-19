import queryString from "query-string";
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
  console.log(queryString.stringify({name: new RegExp('/\\d+')}));
  
  const [products, setProducts] = useState<Product[]>([]);
  
  const filterApi = useFilterApi({pagination: {perPage: 10, page: 1}})

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
      <button disabled={(filterApi.value.pagination.page) < 2} onClick={filterApi.pagination.prev}>Prev page</button>
      <input type="search" onChange={searchHandler} />
      <button onClick={() => filterApi.sort.set("price", Order.DESC)}>
        Sort Price
      </button>
      <button onClick={() => filterApi.sort.set("rating", Order.ASC)}>
        Sort Rating
      </button>
      <button onClick={() => filterApi.pagination.unset("perPage", 0)}>match test</button>
      <button onClick={filterApi.pagination.next}>Next page</button>
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
