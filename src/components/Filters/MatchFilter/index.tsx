import { useState, useMemo, useCallback } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import debounce from "@mui/material/utils/debounce";

type Props = {
  param: string;
  items: string[];
  selectedItems: string[];
  set: Shop.FilterAPI["setMatch"];
  unset: Shop.FilterAPI["unsetMatch"];
};

export default function MatchFilter({
  param,
  items,
  selectedItems,
  set,
  unset,
}: Props) {
  const [search, setSearch] = useState("");

  const selected = useMemo(() => {
    const data: Record<string, boolean> = {};
    selectedItems.forEach((name) => (data[name] = true));
    return data;
  }, [selectedItems]);

  const sorted = useMemo(() => items.sort(), [items]);

  function change(name: string) {
    const fn = selected[name] ? unset : set;
    fn(param, name);
  }

  let filtered = sorted;
  if (search !== "") {
    filtered = sorted.filter((item) =>
      item.toLocaleLowerCase().includes(search)
    );
  }

  return (
    <>
      <SearchField onChange={setSearch} />
      <Box sx={{ maxHeight: 400, overflow: "auto" }}>
        {filtered.map((name) => {
          return (
            <FormControlLabel
              sx={{ display: "flex", fontSize: "14px" }}
              key={name}
              control={
                <Checkbox
                  onChange={() => change(name)}
                  checked={!!selected[name]}
                  size="small"
                />
              }
              label={
                <Typography component="span" sx={{ fontSize: "14px" }}>
                  {name}
                </Typography>
              }
            />
          );
        })}
      </Box>
    </>
  );
}

function SearchField({ onChange }: { onChange: (arg: string) => void }) {
  const [search, setSearch] = useState("");
  const debounced = useCallback(
    debounce((value: string) => onChange(value), 500),
    []
  );
  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      sx={{ mb: 1 }}
      fullWidth
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        debounced(e.target.value);
      }}
    />
  );
}
