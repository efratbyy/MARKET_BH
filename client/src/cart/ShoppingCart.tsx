import React, { useEffect, useState } from "react";
import { getUser } from "../services/LocalStorageService";
import useCart from "./useCart";
import { CartProductInterface } from "../models/interfaces/interfaces.ts";
import { Grid } from "@mui/material";

const ShoppingCart = () => {
  const user = getUser();
  const { handleGetCart } = useCart();
  const [cart, setCart] = useState<CartProductInterface[] | undefined>([]);

  useEffect(() => {
    if (user) {
      handleGetCart(user._id)
        .then((data) => {
          setCart(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [handleGetCart]);

  return (
    <>
      {cart?.map((item: CartProductInterface) => (
        <Grid item key={item.barcode} xs={12} sm={6} md={6} lg={4}>
          <li>{item.productName}</li>
        </Grid>
      ))}
    </>
  );
};

export default ShoppingCart;
