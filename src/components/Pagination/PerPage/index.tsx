import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box'

type Props = {
  perPage: number;
  set: Shop.FilterAPI["setPerPage"];
  values: number[];
};

export default function PerPage({ perPage, set, values }: Props) {
  const handleChange = (e: SelectChangeEvent) => set(+e.target.value);

  return (
    <Stack direction="row">
      <FormControl sx={{ m: 1, minWidth: 80, width: { xs: "50%" } }}>
        <InputLabel id="per-page">Per page</InputLabel>
        <Select
          autoWidth
          id="per-page"
          value={perPage.toString()}
          label="Sort by"
          onChange={handleChange}
          size="small"
        >
          {values.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 80, width: { xs: "50%" }, display: {md: 'none'} }}>

      <Box  />
      </FormControl>
    </Stack>
  );
}
