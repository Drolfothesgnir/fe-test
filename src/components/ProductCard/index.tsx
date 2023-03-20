interface Props {
  product: Shop.Product;
}

export default function ProductCard({product}:Props) {
  return (
    <div>
      <h2>{product.name}</h2>
      <h3>{product.brand}</h3>
    </div>
  )
}