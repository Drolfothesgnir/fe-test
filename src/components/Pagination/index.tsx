import MUIPagination from '@mui/material/Pagination';

type Props = {
  count: number;
  page: number;
  filterApi: Shop.FilterAPI;
};

export default function Pagination({ count, page, filterApi }: Props) {
  if (!count) return null;

  return (
    <MUIPagination
      count={count}
      page={page}
      color='primary'
      onChange={(_, _page) => filterApi.setPage(_page)}
    />
  );
}
