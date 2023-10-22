import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          onClick={() => navigate(ROUTES.ROOT)}
          label="אודות"
          icon={<InfoIcon />}
        />

        <BottomNavigationAction
          onClick={() => navigate(ROUTES.ROOT)}
          label="הצהרת נגישות"
          icon={<AccessibilityNewIcon />}
        />

        <BottomNavigationAction
          onClick={() => navigate(ROUTES.ROOT)}
          label="צור קשר"
          icon={<PhoneInTalkIcon />}
        />

        <BottomNavigationAction
          onClick={() => navigate(ROUTES.ROOT)}
          label="הצהרת נגישות"
          icon={<AccessibilityNewIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
