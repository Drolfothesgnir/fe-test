import { useState, useEffect } from 'react'
import './App.css'
import instance from './utils/http'

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    instance.get('/api/shop/products').then(res => {
      setProducts(res.data)
    }).catch(console.log)
  }, [])

  return (
    <div className="App">
      <ul>
        {products.map(item => {
          return <li key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <h3>{item.name}</h3>
            <h4>$ {item.price}</h4>
            <p>{item.description}</p>
          </li>
        })}
      </ul>
    </div>
  )
}

export default App
