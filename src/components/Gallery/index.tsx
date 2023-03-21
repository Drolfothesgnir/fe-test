import Grid from "@mui/material/Grid";
import ProductCard from "../ProductCard";

type Props = {
  items: Shop.Product[];
}

export default function Gallery({ items }: Props) {
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item md={4} key={item.id}>
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
  );
}
