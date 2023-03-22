import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProductCard from "../ProductCard";

type Props = {
  items: Shop.Product[];
};

export default function Gallery({ items }: Props) {
  if (!items.length) {
    return (
      <Typography variant="h2" align="center" sx={{ fontWeight: "400" }}>
        Nothing Found!
      </Typography>
    );
  }
  return (
    <Grid
      container
      columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 10 }}
      spacing={2}
    >
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
  );
}
