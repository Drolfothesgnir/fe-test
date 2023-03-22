import { useState, useCallback, useEffect } from 'react';
import debounce from '@mui/material/utils/debounce';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import type { FormEventHandler } from 'react';

type Props = {
  set: Shop.FilterAPI['setRange'];
  name: string;
  defaultRange: [number, number];
  currentRange: [number, number];
};

export default function PriceRange({
  set,
  name,
  defaultRange,
  currentRange = defaultRange,
}: Props) {
  const [value, setValue] = useState(defaultRange);
  const [min, max] = defaultRange;

  useEffect(() => {
    setValue(defaultRange);
  }, [defaultRange]);

  useEffect(() => {
    if (currentRange.some((n, i) => value[i] !== n)) {
      setValue(currentRange);
    }
  }, [currentRange]);

  const debounced = useCallback(
    debounce((value: [number, number]) => set(name, value), 500),
    [],
  );

  const handleChange = (_: any, newValue: number | number[]) => {
    setValue(newValue as [number, number]);
    debounced(newValue as [number, number]);
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    set(name, value);
  };

  return (
    <Box>
      <Box
        component='form'
        onSubmit={submitHandler}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <TextField
          variant='outlined'
          value={value[0]}
          label='Min'
          sx={{ width: '30%' }}
          inputProps={{ style: { fontSize: '14px' } }}
          onChange={(e) => setValue([+e.target.value, value[1]])}
          size='small'
        />
        <Divider orientation='horizontal' sx={{ flexShrink: 0, width: '5%' }} />
        <TextField
          variant='outlined'
          value={value[1]}
          label='Max'
          sx={{ width: '30%' }}
          inputProps={{ style: { fontSize: '14px' } }}
          size='small'
          onChange={(e) => setValue([value[0], +e.target.value])}
        />
        <Button variant='outlined' type='submit'>
          OK
        </Button>
      </Box>
      <Slider
        sx={{ width: '90%', display: 'block', mx: 'auto' }}
        onChange={handleChange}
        min={min}
        max={max}
        value={value}
        disableSwap
      />
    </Box>
  );
}
