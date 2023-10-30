import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";

const CategoryNavbar: React.FC = () => {
  const [menu1AnchorEl, setMenu1AnchorEl] = useState<null | HTMLElement>(null);
  const [menu2AnchorEl, setMenu2AnchorEl] = useState<null | HTMLElement>(null);
  const [menu3AnchorEl, setMenu3AnchorEl] = useState<null | HTMLElement>(null);
  const [menu4AnchorEl, setMenu4AnchorEl] = useState<null | HTMLElement>(null);
  const [menu5AnchorEl, setMenu5AnchorEl] = useState<null | HTMLElement>(null);
  const [menu6AnchorEl, setMenu6AnchorEl] = useState<null | HTMLElement>(null);
  const [menu7AnchorEl, setMenu7AnchorEl] = useState<null | HTMLElement>(null);
  const [menu8AnchorEl, setMenu8AnchorEl] = useState<null | HTMLElement>(null);
  const [menu9AnchorEl, setMenu9AnchorEl] = useState<null | HTMLElement>(null);
  const [menu10AnchorEl, setMenu10AnchorEl] = useState<null | HTMLElement>(
    null
  );

  const openMenu1 = Boolean(menu1AnchorEl);
  const openMenu2 = Boolean(menu2AnchorEl);
  const openMenu3 = Boolean(menu3AnchorEl);
  const openMenu4 = Boolean(menu4AnchorEl);
  const openMenu5 = Boolean(menu5AnchorEl);
  const openMenu6 = Boolean(menu6AnchorEl);
  const openMenu7 = Boolean(menu7AnchorEl);
  const openMenu8 = Boolean(menu8AnchorEl);
  const openMenu9 = Boolean(menu9AnchorEl);
  const openMenu10 = Boolean(menu10AnchorEl);

  const handleClickMenu1 = (event: React.MouseEvent<HTMLElement>) => {
    setMenu1AnchorEl(event.currentTarget);
  };

  const handleClickMenu2 = (event: React.MouseEvent<HTMLElement>) => {
    setMenu2AnchorEl(event.currentTarget);
  };

  const handleClickMenu3 = (event: React.MouseEvent<HTMLElement>) => {
    setMenu3AnchorEl(event.currentTarget);
  };

  const handleClickMenu4 = (event: React.MouseEvent<HTMLElement>) => {
    setMenu4AnchorEl(event.currentTarget);
  };

  const handleClickMenu5 = (event: React.MouseEvent<HTMLElement>) => {
    setMenu5AnchorEl(event.currentTarget);
  };

  const handleClickMenu6 = (event: React.MouseEvent<HTMLElement>) => {
    setMenu6AnchorEl(event.currentTarget);
  };

  const handleClickMenu7 = (event: React.MouseEvent<HTMLElement>) => {
    setMenu7AnchorEl(event.currentTarget);
  };

  const handleClickMenu8 = (event: React.MouseEvent<HTMLElement>) => {
    setMenu8AnchorEl(event.currentTarget);
  };

  const handleClickMenu9 = (event: React.MouseEvent<HTMLElement>) => {
    setMenu9AnchorEl(event.currentTarget);
  };

  const handleClickMenu10 = (event: React.MouseEvent<HTMLElement>) => {
    setMenu10AnchorEl(event.currentTarget);
  };

  const handleCloseMenu1 = () => {
    setMenu1AnchorEl(null);
  };

  const handleCloseMenu2 = () => {
    setMenu2AnchorEl(null);
  };

  const handleCloseMenu3 = () => {
    setMenu3AnchorEl(null);
  };

  const handleCloseMenu4 = () => {
    setMenu4AnchorEl(null);
  };

  const handleCloseMenu5 = () => {
    setMenu5AnchorEl(null);
  };

  const handleCloseMenu6 = () => {
    setMenu6AnchorEl(null);
  };

  const handleCloseMenu7 = () => {
    setMenu7AnchorEl(null);
  };

  const handleCloseMenu8 = () => {
    setMenu8AnchorEl(null);
  };

  const handleCloseMenu9 = () => {
    setMenu9AnchorEl(null);
  };

  const handleCloseMenu10 = () => {
    setMenu10AnchorEl(null);
  };

  return (
    <Grid
      sx={{ display: "flex", justifyContent: "space-between", padding: "16px" }}
    >
      <Button
        id="menu1-button"
        aria-controls={openMenu1 ? "menu1" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu1 ? "true" : undefined}
        onClick={handleClickMenu1}
        sx={{
          border: "3px solid #000",
          height: "60px",
          padding: "20px",
        }}
      >
        Menu 1
      </Button>
      <Menu
        id="menu1"
        anchorEl={menu1AnchorEl}
        open={openMenu1}
        onClose={handleCloseMenu1}
      >
        <MenuItem onClick={handleCloseMenu1}>Option 1</MenuItem>
        <MenuItem onClick={handleCloseMenu1}>Option 2</MenuItem>
        <MenuItem onClick={handleCloseMenu1}>Option 3</MenuItem>
      </Menu>

      <Button
        id="menu2-button"
        aria-controls={openMenu2 ? "menu2" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu2 ? "true" : undefined}
        onClick={handleClickMenu2}
        sx={{
          border: "3px solid #000",
          height: "60px",
          padding: "20px",
        }}
      >
        Menu 2
      </Button>
      <Menu
        id="menu2"
        anchorEl={menu2AnchorEl}
        open={openMenu2}
        onClose={handleCloseMenu2}
      >
        <MenuItem onClick={handleCloseMenu2}>Item A</MenuItem>
        <MenuItem onClick={handleCloseMenu2}>Item B</MenuItem>
        <MenuItem onClick={handleCloseMenu2}>Item C</MenuItem>
      </Menu>

      <Button
        id="menu3-button"
        aria-controls={openMenu3 ? "menu3" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu3 ? "true" : undefined}
        onClick={handleClickMenu3}
        sx={{
          border: "3px solid #000",
          height: "60px",
          padding: "20px",
        }}
      >
        Menu 3
      </Button>
      <Menu
        id="menu3"
        anchorEl={menu3AnchorEl}
        open={openMenu3}
        onClose={handleCloseMenu3}
      >
        <MenuItem onClick={handleCloseMenu3}>Choice 1</MenuItem>
        <MenuItem onClick={handleCloseMenu3}>Choice 2</MenuItem>
        <MenuItem onClick={handleCloseMenu3}>Choice 3</MenuItem>
      </Menu>

      <Button
        id="menu4-button"
        aria-controls={openMenu4 ? "menu4" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu4 ? "true" : undefined}
        onClick={handleClickMenu4}
        sx={{
          border: "3px solid #000",
          height: "60px",
          padding: "20px",
        }}
      >
        Menu 4
      </Button>
      <Menu
        id="menu4"
        anchorEl={menu4AnchorEl}
        open={openMenu4}
        onClose={handleCloseMenu4}
      >
        <MenuItem onClick={handleCloseMenu4}>Option 1</MenuItem>
        <MenuItem onClick={handleCloseMenu4}>Option 2</MenuItem>
        <MenuItem onClick={handleCloseMenu4}>Option 3</MenuItem>
      </Menu>

      <Button
        id="menu5-button"
        aria-controls={openMenu5 ? "menu5" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu5 ? "true" : undefined}
        onClick={handleClickMenu5}
        sx={{
          border: "3px solid #000",
          height: "60px",
          padding: "20px",
        }}
      >
        Menu 5
      </Button>
      <Menu
        id="menu5"
        anchorEl={menu5AnchorEl}
        open={openMenu5}
        onClose={handleCloseMenu5}
      >
        <MenuItem onClick={handleCloseMenu5}>Option 1</MenuItem>
        <MenuItem onClick={handleCloseMenu5}>Option 2</MenuItem>
        <MenuItem onClick={handleCloseMenu5}>Option 3</MenuItem>
      </Menu>

      <Button
        id="menu6-button"
        aria-controls={openMenu6 ? "menu6" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu6 ? "true" : undefined}
        onClick={handleClickMenu6}
        sx={{
          border: "3px solid #000",
          height: "60px",
          padding: "20px",
        }}
      >
        Menu 6
      </Button>
      <Menu
        id="menu6"
        anchorEl={menu6AnchorEl}
        open={openMenu6}
        onClose={handleCloseMenu6}
      >
        <MenuItem onClick={handleCloseMenu6}>Option 1</MenuItem>
        <MenuItem onClick={handleCloseMenu6}>Option 2</MenuItem>
        <MenuItem onClick={handleCloseMenu6}>Option 3</MenuItem>
      </Menu>

      <Button
        id="menu7-button"
        aria-controls={openMenu7 ? "menu7" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu7 ? "true" : undefined}
        onClick={handleClickMenu7}
        sx={{
          border: "3px solid #000",
          height: "60px",
          padding: "20px",
        }}
      >
        Menu 7
      </Button>
      <Menu
        id="menu7"
        anchorEl={menu7AnchorEl}
        open={openMenu7}
        onClose={handleCloseMenu7}
      >
        <MenuItem onClick={handleCloseMenu7}>Option 1</MenuItem>
        <MenuItem onClick={handleCloseMenu7}>Option 2</MenuItem>
        <MenuItem onClick={handleCloseMenu7}>Option 3</MenuItem>
      </Menu>

      <Button
        id="menu8-button"
        aria-controls={openMenu8 ? "menu8" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu8 ? "true" : undefined}
        onClick={handleClickMenu8}
        sx={{
          border: "3px solid #000",
          height: "60px",
          padding: "20px",
        }}
      >
        Menu 8
      </Button>
      <Menu
        id="menu8"
        anchorEl={menu8AnchorEl}
        open={openMenu8}
        onClose={handleCloseMenu8}
      >
        <MenuItem onClick={handleCloseMenu8}>Option 1</MenuItem>
        <MenuItem onClick={handleCloseMenu8}>Option 2</MenuItem>
        <MenuItem onClick={handleCloseMenu8}>Option 3</MenuItem>
      </Menu>

      <Button
        id="menu9-button"
        aria-controls={openMenu9 ? "menu9" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu9 ? "true" : undefined}
        onClick={handleClickMenu9}
        sx={{
          border: "3px solid #000",
          height: "60px",
          padding: "20px",
        }}
      >
        Menu 9
      </Button>
      <Menu
        id="menu9"
        anchorEl={menu9AnchorEl}
        open={openMenu9}
        onClose={handleCloseMenu9}
      >
        <MenuItem onClick={handleCloseMenu9}>Option 1</MenuItem>
        <MenuItem onClick={handleCloseMenu9}>Option 2</MenuItem>
        <MenuItem onClick={handleCloseMenu9}>Option 3</MenuItem>
      </Menu>

      <Button
        id="menu10-button"
        aria-controls={openMenu10 ? "menu10" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu10 ? "true" : undefined}
        onClick={handleClickMenu10}
        sx={{
          border: "3px solid #000",
          height: "60px",
          padding: "20px",
        }}
      >
        Menu 10
      </Button>
      <Menu
        id="menu10"
        anchorEl={menu10AnchorEl}
        open={openMenu10}
        onClose={handleCloseMenu10}
      >
        <MenuItem onClick={handleCloseMenu10}>Option 1</MenuItem>
        <MenuItem onClick={handleCloseMenu10}>Option 2</MenuItem>
        <MenuItem onClick={handleCloseMenu10}>Option 3</MenuItem>
      </Menu>
    </Grid>
  );
};

export default CategoryNavbar;
