import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSearchParams } from "react-router-dom";
import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import useProducts from "../product/useProducts";
import { ProductInterface } from "../models/interfaces/interfaces.ts";

const DataFilter = () => {
  const [openSort, setOpenSort] = useState(true);
  const [openBrands, setOpenBrands] = useState(true);
  const [searchParams, setSearch] = useSearchParams();
  const [brands, setBrands] = useState<string[] | undefined>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[] | undefined>(
    []
  ); // Array to hold selected brand IDs

  const { handleGetProducts } = useProducts();

  const handleSortAsc = () => {
    const query = searchParams.get("q");
    setSearch({ sort: "Asc", q: query || "" });
  };

  const handleSortDesc = () => {
    const query = searchParams.get("q");
    setSearch({ sort: "Desc", q: query || "" });
  };

  const toggleBrand = (brand: string) => {
    if (selectedBrands?.includes(brand)) {
      // remove from selected brands array
      setSelectedBrands(selectedBrands?.filter((x) => x !== brand));
    } else {
      // add to selected brands array
      setSelectedBrands([...(selectedBrands ?? []), brand]);
    }
  };

  useEffect(() => {
    handleGetProducts()
      .then((products) => {
        let bransFromProducts = products?.map((obj) => obj.brand);
        console.log(new Set(bransFromProducts));
        bransFromProducts = Array.from(new Set(bransFromProducts));
        setBrands(bransFromProducts);
        console.log(bransFromProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [handleGetProducts]);

  useEffect(() => {
    const joinedString = selectedBrands?.join(", ");
    const query = searchParams.get("q");
    const sort = searchParams.get("sort");
    setSearch({ sort: sort || "", q: query || "", brand: joinedString || "" });
  }, [selectedBrands]);

  return (
    <>
      {/* Sort products */}
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            מיון מוצרים
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => setOpenSort(!openSort)}>
          <ListItemText primary="מיון מוצרים ע״פ" sx={{ textAlign: "start" }} />
          {openSort ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSort} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={handleSortDesc} sx={{ pl: 4 }}>
              <ListItemIcon sx={{ minWidth: "0px" }}>₪</ListItemIcon>
              <ListItemText primary="מחיר מהגבוה לנמוך" />
            </ListItemButton>
          </List>
        </Collapse>
        <Collapse in={openSort} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={handleSortAsc} sx={{ pl: 4 }}>
              <ListItemIcon sx={{ minWidth: "0px" }}>₪</ListItemIcon>
              <ListItemText primary="מחיר מהנמוך לגבוה" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <Divider />

      {/* Filter products */}
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            סינון מוצרים
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => setOpenBrands(!openBrands)}>
          <ListItemText primary="מותג" sx={{ textAlign: "start" }} />
          {openBrands ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openBrands} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {brands?.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands?.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                }
                label={brand}
                sx={{ pl: 4 }}
              />
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default DataFilter;
