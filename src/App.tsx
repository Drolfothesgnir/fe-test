import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import useFilterApi from "./utils/filterApi";
import getProducts, { getBrands, getColors } from "./utils/getProducts";
import FilterWrapper from "./components/Filters/FilterWrapper";
import MatchFilter from "./components/Filters/MatchFilter";

export default function MyApp() {
  const filterApi = useFilterApi();

  const [products, setProducts] = useState<Shop.Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts(filterApi.getQueryString()).then(
      ({ products: items, total: itemsCount }) => {
        setProducts(items);
        setTotal(itemsCount);
      }
    );
  }, [filterApi.state]);

  useEffect(() => {
    getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    getColors().then(setColors);
  }, []);

  const { page, perPage } = filterApi.state.pagination;
  const count = Math.ceil(total / perPage);

  return (
    <div>
      <Header filterApi={filterApi} />
      <Container component="main" maxWidth="xl">
        <Grid container spacing={2}>
          <Grid
            item
            xs={0}
            sm={3}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <FilterWrapper name="Brands" total={brands.length}>
              <MatchFilter
                param="brand"
                set={filterApi.setMatch}
                unset={filterApi.unsetMatch}
                items={brands}
                selectedItems={filterApi.state.match.brand || []}
              />
            </FilterWrapper>
            <FilterWrapper name="Colors" total={colors.length}>
              <MatchFilter
                param="color"
                set={filterApi.setMatch}
                unset={filterApi.unsetMatch}
                items={colors}
                selectedItems={filterApi.state.match.color || []}
              />
            </FilterWrapper>
          </Grid>
          <Grid item sm={9}>
            <Gallery items={products} />
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={count}
          page={page}
          onChange={(_, _page) => filterApi.setPage(_page)}
        />
      </Box>
    </div>
  );
}
