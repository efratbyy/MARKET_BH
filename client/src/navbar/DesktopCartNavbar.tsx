import React, { useEffect } from "react";
import { useCartProvider } from "../providers/CartProvider";
import { AppBar, Grid, Typography, Paper, Box } from "@mui/material";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";

const DesktopCartNavbar = () => {
  const { cart } = useCartProvider();
  const [totalAmountInCart, setTotalAmountInCart] = React.useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart)
      setTotalAmountInCart(cart.reduce((acc, item) => acc + item.amount, 0));
  }, [cart]);

  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          // display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#333",
          padding: "10px",
          color: "#fff",
          height: "fit-content",
        }}
      >
        <Grid
          item
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          xs={3}
        >
          <ShoppingCartTwoToneIcon fontSize="large" />
        </Grid>

        <Grid item container xs={4} lg={4} sx={{ display: "flex", gap: 2 }}>
          <Grid item sx={{ flexGrow: 1 }}>
            <Typography variant="body1">aaaa</Typography>
          </Grid>
          <Grid container sx={{ flexDirection: "column", flexGrow: 1 }}>
            <Grid item>
              <Typography variant="body1">bbbb</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={5}
          lg={5}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
        >
          {cart && cart.length !== 0 && (
            <Button
              onClick={() => {
                navigate(ROUTES.CHECKOUT);
              }}
              variant="contained"
              sx={{
                backgroundColor: "#5b9822",
                color: "white",
                // maxHeight: "36px",
                // padding: "30px",
              }}
            >
              <Typography>לקופה ({totalAmountInCart})</Typography>
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default DesktopCartNavbar;
