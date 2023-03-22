import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import useFilterApi from "./utils/filterApi";
import getProducts, {
  getBrands,
  getColors,
  getPriceRange,
} from "./utils/getProducts";
import FilterWrapper from "./components/Filters/FilterWrapper";
import MatchFilter from "./components/Filters/MatchFilter";
import RangeFilter from "./components/Filters/RangeFilter";
import FilterRemovers from "./components/Filters/FilterRemovers";
import { getQueryString } from "./utils/filterApi/getFilterQueryString";
import SortFilter from "./components/Filters/SortFilter";

const names = ['price', 'rating']

// TODO: Product skeleton, nothing found, tests, pagination, linter, per page

export default function MyApp() {
  
  const [products, setProducts] = useState<Shop.Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 10]);
  const [total, setTotal] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const filterApi = useFilterApi();

  const handleDrawerToggle = () => setMobileOpen((state) => !state);

  useEffect(() => {
    getProducts(getQueryString(filterApi.state)).then(
      ({ products: items, total: itemsCount }) => {
        setProducts(items);
        setTotal(itemsCount);
      }
    );
  }, [filterApi.state.pagination]);

  useEffect(() => {
    getBrands().then(setBrands);
    getColors().then(setColors);
    getPriceRange().then(setPriceRange);
  }, []);

  const { page, perPage } = filterApi.state.pagination;
  const count = Math.ceil(total / perPage);

  const filters = (
    <>
      <FilterWrapper name="Brand" total={brands.length} defaultExpanded>
        <MatchFilter
          param="brand"
          set={filterApi.setMatch}
          unset={filterApi.unsetMatch}
          items={brands}
          selectedItems={filterApi.state.match.brand}
        />
      </FilterWrapper>
      <FilterWrapper name="Color" total={colors.length}>
        <MatchFilter
          param="color"
          set={filterApi.setMatch}
          unset={filterApi.unsetMatch}
          items={colors}
          selectedItems={filterApi.state.match.color}
          label={colorFilterLabel}
        />
      </FilterWrapper>
      <FilterWrapper name="Price" defaultExpanded>
        <RangeFilter
          name="price"
          set={filterApi.setRange}
          defaultRange={priceRange}
          currentRange={filterApi.state.range.price}
        />
      </FilterWrapper>
    </>
  );

  return (
    <div>
      <Header filterApi={filterApi} toggleDrawer={handleDrawerToggle} />
        <Container component="main" maxWidth="xl">
      <Box>
        <FilterRemovers
          filterApi={filterApi}
          exclude={{ sort: { rating: true, price: true } }}
        />
      </Box>
      <SortFilter names={names} set={filterApi.sort} state={filterApi.state.sort} />
        <Grid
          container
          columns={{ xs: 12, sm: 12, md: 12, lg: 10, xl: 10 }}
          spacing={2}
        >
          <Grid
            item
            md={3}
            lg={2}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {filters}
          </Grid>
          <Grid item md={9} lg={8}>
            <Gallery items={products} />
          </Grid>
        </Grid>
      </Container>
      <Drawer
        container={window.document.body}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "90%" },
        }}
      >
        {filters}
      </Drawer>
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

function colorFilterLabel(name: string) {
  const color = name.replace(" ", "");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Typography
        component="span"
        sx={{ textTransform: "capitalize", fontSize: "14px" }}
      >
        {name}
      </Typography>
      <Box
        component="span"
        sx={{
          width: "15px",
          height: "15px",
          flexShrink: 0,
          borderRadius: "50%",
          bgcolor: color,
          ml: 2,
          border: "1px solid",
        }}
      />
    </Box>
  );
}
