import * as React from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";

export default function SideNavBar() {
  const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleLeftDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setLeftDrawerOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleLeftDrawer(false)}
      onKeyDown={toggleLeftDrawer(false)}
    >
      <List>
        {/* Inbox Link */}
        <ListItem
          key={"Inbox"}
          disablePadding
          onClick={() => navigate(`${ROUTES.LOGIN}`)}
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Inbox"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <MenuIcon onClick={() => setLeftDrawerOpen(true)}></MenuIcon>
      <Drawer
        anchor="right"
        open={leftDrawerOpen}
        onClose={toggleLeftDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
