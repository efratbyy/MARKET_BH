import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearch] = useSearchParams();

  const handleChange = ({ target }: any) => {
    setSearch({ q: target.value });
  };

  return (
    <Box display="inline-flex">
      <FormControl variant="standard">
        <OutlinedInput
          sx={{ backgroundColor: "#e3f2fd" }}
          placeholder="Search"
          size="small"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" onClick={() => handleChange}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};
export default SearchBar;
