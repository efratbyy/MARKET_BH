import React from "react";
import Navbar from "../navbar/Navbar";
import Products from "../product/Products";
import ShoppingCart from "../cart/ShoppingCart";
import "./HomePage.css";
import { Grid } from "@mui/material";
import Footer from "../footer/Footer";
import { useUser } from "../providers/UserProvider";
import CategoryNavbar from "../navbar/CategoryNavbar";
import DataFilter from "../search_filter/DataFilter";
import DesktopFooter from "../footer/DesktopFooter";

const HomePage = () => {
  const { user } = useUser();

  return (
    <>
      <Navbar />
      <CategoryNavbar />
      <Grid
        container
        sx={{
          background: `url("/assets/images/vegetables.png")`, // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px", //
        }}
      ></Grid>
      <Grid container sx={{ marginBottom: "27px" }}>
        <Grid item sx={{ display: { xs: "none", md: "block" } }} md={2}>
          <DataFilter />
        </Grid>
        <Grid item xs={12} md={7}>
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
