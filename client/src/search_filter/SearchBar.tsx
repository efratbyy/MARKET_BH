import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearch] = useSearchParams();

  const handleChange = ({ target }: any) => {
    const sort = searchParams.get("sort");
    const brand = searchParams.get("brand");
    const sticker = searchParams.get("sticker");
    setSearch({
      q: target.value,
      sort: sort || "",
      brand: brand || "",
      sticker: sticker || "",
    });
  };

  return (
    <Grid
      item
      display="inline-flex"
      xs={12}
      sx={{
        width: "100%",
      }}
    >
      <FormControl
        variant="standard"
        sx={{
          width: "100%",
        }}
      >
        <OutlinedInput
          sx={{
            backgroundColor: "#e3f2fd",
            width: "100%",
          }}
          placeholder="חיפוש מרקט גבעת בית הכרם"
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
    </Grid>
  );
};
export default SearchBar;