import Grid from "@mui/material/Grid";
import ProductCard from "../ProductCard";

type Props = {
  items: Shop.Product[];
};

export default function Gallery({ items }: Props) {
  return (
    <Grid
      container
      columns={{ xs: 12, sm: 12, md: 12, lg: 10, xl: 10 }}
      spacing={2}
    >
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={item.id}>
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
  );
}
