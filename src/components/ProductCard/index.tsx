import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";

type Props = {
  product: Shop.Product;
};

export default function ProductCard({ product }: Props) {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(product.price);

  const [open, setOpen] = useState(false);

  return (
    <Paper elevation={2} sx={{ position: "relative" }}>
      <Box sx={{ position: "relative", pt: "75%", cursor: "pointer" }}>
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
      <Box sx={{ p: "10px" }}>
        <Typography
          variant="body1"
          gutterBottom
          noWrap
          sx={{ cursor: "pointer" }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" noWrap gutterBottom>
          {product.brand}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">{formattedNumber}</Typography>
          <Box
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              bgcolor: product.color,
              border: "1px solid",
            }}
          />
        </Stack>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "row" }}
          mb={1}
        >
          <Rating
            name="read-only"
            value={product.rating}
            readOnly
            precision={0.2}
            size="small"
          />

          <Typography
            gutterBottom
            color={product.available ? "success.main" : "error.main"}
          >
            {product.available ? "Available" : "Not available"}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            color="success"
            startIcon={<AddShoppingCartIcon />}
            disabled={!product.available}
          >
            Add to cart
          </Button>
          <Tooltip title="Learn more">
            <IconButton
              size="large"
              color="primary"
              onClick={() => setOpen((prev) => !prev)}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <Collapse in={open} sx={{ position: "absolute", zIndex: 2 }}>
        <Paper sx={{ p: 1 }}>
          <Typography gutterBottom variant="subtitle2">
            Description:
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
        </Paper>
      </Collapse>
    </Paper>
  );
}
