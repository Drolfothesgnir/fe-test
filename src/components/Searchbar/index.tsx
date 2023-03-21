import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button'
import type { FormEventHandler } from "react";
import { useState } from "react";

type Props = {
  initialValue?: string;
  onSearch: (arg: string) => void;
}

export default function CustomizedInputBase({
  initialValue = "",
  onSearch,
}: Props) {
  const [value, setValue] = useState(initialValue);

  const submitHandler: FormEventHandler<HTMLFormElement>  = function (e) {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <Paper
      component="form"
      onSubmit={submitHandler}
      sx={{
        overflow: 'hidden',
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, p: "2px 4px", flex: 1 }}
        placeholder="Search..."
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button
        type="submit"
        sx={{ p: "10px", borderRadius: 0 }}
        aria-label="search"
        variant="contained"
        disableElevation
        color="warning"
      >
        <SearchIcon />
      </Button>
    </Paper>
  );
}
