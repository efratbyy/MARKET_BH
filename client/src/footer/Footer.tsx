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
import { Grid } from "@mui/material";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        className="container"
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Paper
          elevation={3}
          sx={{ flex: 1, position: "fixed", bottom: 0, left: 0, right: 0 }}
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
      </Grid>
    </>
  );
};

export default Footer;
