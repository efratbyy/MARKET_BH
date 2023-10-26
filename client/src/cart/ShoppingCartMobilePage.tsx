import React from "react";
import Navbar from "../navbar/Navbar";
import ShoppingCart from "./ShoppingCart";
import Footer from "../footer/Footer";
import { Grid, Paper, Typography } from "@mui/material";

const ShoppingCartMobilePage = () => {
  return (
    <>
      <Navbar />
      <Grid
        container
        sx={{
          backgroundImage: 'url("./assets/images/cart-mobile.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px", // Adjust the height as needed
          position: "relative",
        }}
      >
        <Grid item xs={12}>
          <Paper
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color for text
              padding: "10px",
            }}
          >
            <Typography variant="h5" sx={{ color: "white" }}>
              Text that sticks to the bottom
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <ShoppingCart />
      <Footer />
    </>
  );
};

export default ShoppingCartMobilePage;
