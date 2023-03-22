import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import type { FormEventHandler } from 'react';
import { useState, useEffect } from 'react';

type Props = {
  initialValue?: string;
  onSearch: (arg: string) => void;
  currentValue: Shop.FilterState['search'];
};

export default function CustomizedInputBase({ initialValue = '', onSearch, currentValue }: Props) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  const submitHandler: FormEventHandler<HTMLFormElement> = function (e) {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <Paper
      component='form'
      onSubmit={submitHandler}
      sx={{
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <InputBase
        sx={{ ml: 1, p: '2px 4px', flex: 1 }}
        placeholder='Search...'
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button
        type='submit'
        sx={{ p: '10px', borderRadius: 0 }}
        aria-label='search'
        variant='contained'
        disableElevation
        color='warning'
      >
        <SearchIcon />
      </Button>
    </Paper>
  );
}
