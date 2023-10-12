import React, { useEffect, useState } from "react";
import {
  CartProductInterface,
  ProductInterface,
} from "../models/interfaces/interfaces.ts";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import useProducts from "./useProducts";
import useCart from "../cart/useCart";
import { getUser } from "../services/LocalStorageService";

const Products = () => {
  const { handleGetProducts } = useProducts();
  const { handleGetCart } = useCart();

  const [products, setProducts] = useState<ProductInterface[] | undefined>([]);
  const [cart, setCart] = useState<CartProductInterface[] | undefined>([]);

  const user = getUser();

  const getAmountInCart = (barcode: String) => {
    const findProductInCart = cart?.find(
      (product) => product.barcode === barcode
    );
    return findProductInCart?.amount || 0;
  };

  useEffect(() => {
    handleGetProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (user && user._id) {
      handleGetCart(user?._id)
        .then((data) => {
          setCart(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [handleGetProducts, handleGetCart]);

  return (
    <Grid container spacing={2} pb={2}>
      <Typography title="Products Page" />
      {products?.map((product: ProductInterface) => (
        <Grid item key={product.barcode} xs={12} sm={6} md={6} lg={4}>
          <ProductCard
            product={product}
            amountInCart={getAmountInCart(product.barcode)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
