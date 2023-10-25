import React from "react";
import Navbar from "../navbar/Navbar";
import Products from "../product/Products";
import ShoppingCart from "../cart/ShoppingCart";
import "./HomePage.css";
import { Grid } from "@mui/material";
import Footer from "../footer/Footer";
import { useUser } from "../providers/UserProvider";

const HomePage = () => {
  const { user } = useUser();

  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item xs={12} md={9}>
          <Products />
        </Grid>
        <Grid item sx={{ display: { xs: "none", md: "inline-flex" } }} md={3}>
          {user && <ShoppingCart />}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default HomePage;
