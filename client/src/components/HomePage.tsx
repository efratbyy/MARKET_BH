import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import ProductsPage from "../product/Products";
import ShoppingCart from "../cart/ShoppingCart";

import "./HomePage.css";
import { Grid } from "@mui/material";
import { CartProductInterface } from "../models/interfaces/interfaces.ts";
import useCart from "../cart/useCart";
import { getUser } from "../services/LocalStorageService";
import { addToCartApi, removeFromCartApi } from "../apiService/cartApiService";

const HomePage = () => {
  const [cart, setCart] = useState<CartProductInterface[] | undefined>([]);
  const { handleGetCart } = useCart();
  const user = getUser();

  useEffect(() => {
    if (user && user._id) {
      handleGetCart(user?._id)
        .then((data) => {
          setCart(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [handleGetCart]);

  const updateCart = async (barcode: string, amount: number) => {
    if (user) {
      let newCart;
      if (amount > 0) {
        newCart = await addToCartApi(user?._id, barcode, amount);
      } else {
        newCart = await removeFromCartApi(user?._id, barcode, amount * -1);
      }
      if (newCart) setCart(newCart);
    }
  };

  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item xs={12} md={9}>
          <ProductsPage updateCart={updateCart} cart={cart} />
        </Grid>
        <Grid
          item
          xs={0}
          md={3}
          // sx={{
          //   display: { xs: "none", md: "block" },
          // }}
        >
          <ShoppingCart updateCart={updateCart} cart={cart} />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
