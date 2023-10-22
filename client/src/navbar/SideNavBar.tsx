import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../services/LocalStorageService";
import HistoryIcon from "@mui/icons-material/History";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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

  const handleLogout = () => {
    removeUser();
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleLeftDrawer(false)}
      onKeyDown={toggleLeftDrawer(false)}
    >
      {/* Inbox Link */}
      <List>
        <ListItem
          // key={"Inbox"}
          disablePadding
          onClick={() => navigate(`${ROUTES.LOGIN}`)}
        >
          <ListItemButton>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={"היסטוריית הזמנות"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem
          // key={"Inbox"}
          disablePadding
          onClick={() => navigate(`${ROUTES.LOGIN}`)}
        >
          <ListItemButton>
            <ListItemIcon>
              <AccessibilityNewIcon />
            </ListItemIcon>
            <ListItemText primary={"הצהרת נגישות"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem
          // key={"Inbox"}
          disablePadding
          onClick={() => navigate(`${ROUTES.LOGIN}`)}
        >
          <ListItemButton>
            <ListItemIcon>
              <PhoneInTalkIcon />
            </ListItemIcon>
            <ListItemText primary={"צור קשר"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem
          // key={"Inbox"}
          disablePadding
          onClick={() => handleLogout()}
        >
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"התנתקות"} />
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
