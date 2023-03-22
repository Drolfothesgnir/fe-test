import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";

import getFilterRemovers from "../../../utils/filterApi/getFilterRemovers";

type Props = {
  filterApi: Shop.FilterAPI;
};

export default function FilterRemovers({ filterApi }: Props) {
  const removers = getFilterRemovers(filterApi);

  return (
    <Container maxWidth="xl" sx={{ minHeight: "2em", py: 3 }}>
      {removers.map(({ label, removeAction }) => (
        <Chip
          key={label}
          variant="outlined"
          label={label}
          onDelete={removeAction}
          onClick={removeAction}
          sx={{ mr: 1, mb: 1 }}
        />
      ))}
      {removers.length ? (
        <Chip
          variant="outlined"
          label="Clear All"
          color="error"
          onClick={filterApi.clear}
          onDelete={filterApi.clear}
          sx={{ mr: 1, mb: 1 }}
        />
      ) : null}
    </Container>
  );
}
