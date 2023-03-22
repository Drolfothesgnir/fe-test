import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProductCard from '../ProductCard';
import SkeletonCard from '../ProductCard/SkeletonCard';

type Props = {
  items: Shop.Product[];
  loading: boolean;
};

const skeletonCard = <SkeletonCard />;

const skeletonItems = Array.from({ length: 10 }).map((_, i) => (
  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
    {skeletonCard}
  </Grid>
));

export default function Gallery({ items, loading }: Props) {
  console.log({ loading, items });

  let data;
  if (loading) {
    data = skeletonItems;
  } else if (!loading) {
    data = items.map((item) => (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
        <ProductCard product={item} />
      </Grid>
    ));
  } else if (!items.length) {
    return (
      <Typography variant='h2' align='center' sx={{ fontWeight: '400' }}>
        Nothing Found!
      </Typography>
    );
  }
  return (
    <Grid container columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 10 }} spacing={2}>
      {data}
    </Grid>
  );
}
