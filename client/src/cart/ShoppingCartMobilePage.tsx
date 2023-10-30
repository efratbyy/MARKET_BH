import React, { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import ShoppingCart from "./ShoppingCart";
import Footer from "../footer/Footer";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useCartProvider } from "../providers/CartProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

const ShoppingCartMobilePage = () => {
  const { cart } = useCartProvider();
  const navigate = useNavigate();

  const [totalAmountInCart, setTotalAmountInCart] = React.useState<number>(0);

  useEffect(() => {
    if (cart)
      setTotalAmountInCart(
        cart.reduce((number, item) => number + item.amount, 0)
      );
  }, [cart]);
  return (
    <>
      <Navbar />
      <Grid
        container
        sx={{
          backgroundImage: 'url("./assets/images/vegetables.png")',
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
            <Typography
              variant="h5"
              sx={{ color: "white", paddingRight: "40px" }}
            >
              סל קניות | {totalAmountInCart} פריטים
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <ShoppingCart />

      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            marginTop: "auto", // Push the button to the bottom
          }}
        >
          <Paper>
            <Button
              onClick={() => navigate(ROUTES.ROOT)}
              variant="contained"
              sx={{
                backgroundColor: "#5b9822",
                color: "white",
                padding: "10px",
                width: "100%",
              }}
            >
              <Typography>לקופה</Typography>
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default ShoppingCartMobilePage;
