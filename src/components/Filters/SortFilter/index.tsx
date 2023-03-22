import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { Order } from '../../../utils/const';

type Props = {
  names: string[];
  set: Shop.FilterAPI['sort'];
  state: Shop.FilterState['sort'];
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function SortFilter({ names, set, state }: Props) {
  const [name_0, order_0] = Object.entries(state)[0];
  const handleChangeName = (event: SelectChangeEvent) => {
    const newName = event.target.value;
    set({ [newName]: order_0 });
  };

  const handleChangeOrder = (event: SelectChangeEvent) => {
    const newOrder = event.target.value as Order;
    set({ [name_0]: newOrder });
  };

  return (
    <Stack direction='row' justifyContent='flex-end' sx={{ mb: 0 }}>
      <FormControl sx={{ m: 1, minWidth: 120, width: { xs: '50%', md: 'auto' } }}>
        <InputLabel id='sort-by'>Sort by</InputLabel>
        <Select
          id='sort-by'
          value={name_0}
          label='Sort by'
          onChange={handleChangeName}
          size='small'
          renderValue={capitalize}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} sx={{ textTransform: 'capitalize' }}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120, width: { xs: '50%', md: 'auto' } }}>
        <InputLabel id='sort-by-order'>Order</InputLabel>
        <Select
          id='sort-by-order'
          value={order_0}
          label='Order'
          onChange={handleChangeOrder}
          size='small'
        >
          <MenuItem value={Order.ASC}>Ascending</MenuItem>
          <MenuItem value={Order.DESC}>Descending</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
