import Grid from "@mui/material/Grid";
import ProductCard from "../ProductCard";

interface Props {
  items: Shop.Product[];
}

export default function Gallery({ items }: Props) {
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item md={3} key={item.id}>
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
  );
}
