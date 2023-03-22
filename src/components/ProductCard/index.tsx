import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

type Props = {
  product: Shop.Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Paper elevation={2}>
      <Box sx={{ position: "relative", pt: "75%" }}>
        <Box
          component="img"
          src={product.imageUrl}
          sx={{
            display: "block",
            width: "100%",
            position: "absolute",
            height: "100%",
            objectFit: "contain",
            top: 0,
            left: 0,
          }}
          alt={product.name}
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <h2>{product.name}</h2>
        <h3>{product.brand}</h3>
        <Rating
          name="read-only"
          value={product.rating}
          readOnly
          precision={0.2}
          size="small"
        />
      </Box>
    </Paper>
  );
}
