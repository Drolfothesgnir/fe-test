import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import useFilterApi from "./utils/filterApi";
import getProducts from "./utils/getProducts";

export default function MyApp() {
  const filterApi = useFilterApi();

  const [products, setProducts] = useState<Shop.Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts(filterApi.getQueryString()).then(
      ({ products: items, total: itemsCount }) => {
        setProducts(items);
        setTotal(itemsCount);
      }
    );
  }, [filterApi.state]);
  const { page, perPage } = filterApi.state.pagination;
  const count = Math.ceil(total / perPage);

  return (
    <div>
      <Header filterApi={filterApi} />
      <Container>
        <Gallery items={products} />
      </Container>
      <Pagination
        count={count}
        page={page}
        onChange={(_, _page) => filterApi.setPage(_page)}
      />
    </div>
  );
}
