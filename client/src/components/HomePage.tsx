import React from "react";
import Navbar from "../navbar/Navbar";
import ProductsPage from "../product/Products";
import ShoppingCart from "../cart/ShoppingCart";

import "./HomePage.css";
import { Grid } from "@mui/material";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item xs={12} md={9}>
          <ProductsPage />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: "none", md: "inline" },
          }}
        >
          <ShoppingCart />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
