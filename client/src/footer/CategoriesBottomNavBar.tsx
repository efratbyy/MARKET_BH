import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, BottomNavigationAction, IconButton } from "@mui/material";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import CloseIcon from "@mui/icons-material/Close";

const CategoriesBottomNavBar = () => {
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const toggleBottomDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setBottomDrawerOpen(open);
    };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <BottomNavigationAction
        // onClick={() => navigate(ROUTES.ROOT)}
        onClick={() => setBottomDrawerOpen(true)}
        label="מוצרים"
        icon={
          <Avatar
            sx={{
              border: "1px solid #555",
              color: isClicked ? "white" : "#555",
              bgcolor: isClicked ? "#5b9822" : "white",
              marginTop: "-30px",
              // height: "90%",
              // width: "36%",
              width: "55px",
              height: "55px",
            }}
          >
            <FormatListBulletedTwoToneIcon />
          </Avatar>
        }
      />
      <Drawer
        anchor="right"
        open={bottomDrawerOpen}
        onClose={toggleBottomDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: bottomDrawerOpen ? "100vw" : "auto",
          },
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={toggleBottomDrawer(false)}
          sx={{ position: "absolute", top: 10, left: 10 }}
        >
          <CloseIcon />
        </IconButton>
        hi
      </Drawer>
    </div>
  );
};

export default CategoriesBottomNavBar;
