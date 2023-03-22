import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type Props = {
  perPage: number;
  set: Shop.FilterAPI['setPerPage'];
  values: number[];
  match: Shop.FilterState['match'];
  setMatch: Shop.FilterAPI['setMatch'];
  unsetMatch: Shop.FilterAPI['unsetMatch'];
};

export default function PerPage({ perPage, set, values, match, setMatch, unsetMatch }: Props) {
  const handleChange = (e: SelectChangeEvent) => set(+e.target.value);
  const checked = match.available?.includes('true') || false;
  const handleCheck = () => {
    const f = checked ? unsetMatch : setMatch;
    f('available', 'true')
  }

  return (
    <Stack direction={{xs: 'row', md: 'row-reverse'}}>
      <FormControl sx={{ m: 1, minWidth: 80, width: { xs: '50%', md: 'auto' } }}>
        <InputLabel id='per-page'>Per page</InputLabel>
        <Select
          autoWidth
          id='per-page'
          value={perPage.toString()}
          label='Sort by'
          onChange={handleChange}
          size='small'
        >
          {values.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 80, width: { xs: '50%', md: 'auto' } }}>
        <FormControlLabel
          control={<Checkbox checked={checked} />}
          label='Only available'
          onChange={handleCheck}
        />
      </FormControl>
    </Stack>
  );
}
