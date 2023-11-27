import React from "react";
import MobileFooter from "./MobileFooter";
import DesktopFooter from "./DesktopFooter";
import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Grid sx={{ display: { lg: "none" } }}>
        <MobileFooter />
      </Grid>
      <Grid sx={{ display: { xs: "none", lg: "block" } }}>
        <DesktopFooter />
      </Grid>
    </>
  );
};

export default Footer;
