import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

import getFilterRemovers from '../../../utils/filterApi/getFilterRemovers';

type Props = {
  filterApi: Shop.FilterAPI;
  exclude?: Partial<Record<keyof Shop.FilterState, Record<string, boolean>>>;
};

export default function FilterRemovers({ filterApi, exclude }: Props) {
  let removers = getFilterRemovers(filterApi);
  if (exclude) {
    removers = removers.filter(({ name, param }) => !exclude[param]?.[name]);
  }

  return (
    <Box sx={{ minHeight: '2em', py: 3 }}>
      {removers.map(({ label, removeAction }) => (
        <Chip
          key={label}
          variant='outlined'
          label={label}
          onDelete={removeAction}
          onClick={removeAction}
          sx={{ mr: 1, mb: 1 }}
        />
      ))}
      {removers.length ? (
        <Chip
          variant='outlined'
          label='Clear all'
          color='error'
          onClick={filterApi.clear}
          onDelete={filterApi.clear}
          sx={{ mr: 1, mb: 1 }}
        />
      ) : null}
    </Box>
  );
}
