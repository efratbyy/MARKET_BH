import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSearchParams } from "react-router-dom";

const DataFilter = () => {
  const [open, setOpen] = React.useState(true);
  const [searchParams, setSearch] = useSearchParams();

  const handleSortAsc = () => {
    const query = searchParams.get("q");
    setSearch({ sort: "Asc", q: query || "" });
  };

  const handleSortDesc = () => {
    const query = searchParams.get("q");
    setSearch({ sort: "Desc", q: query || "" });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
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
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="מיינו מוצרים ע״פ" sx={{ textAlign: "start" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={handleSortDesc} sx={{ pl: 4 }}>
            <ListItemIcon sx={{ minWidth: "0px" }}>₪</ListItemIcon>
            <ListItemText primary="מחיר מהגבוה לנמוך" />
          </ListItemButton>
        </List>
      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={handleSortAsc} sx={{ pl: 4 }}>
            <ListItemIcon sx={{ minWidth: "0px" }}>₪</ListItemIcon>
            <ListItemText primary="מחיר מהנמוך לגבוה" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default DataFilter;
