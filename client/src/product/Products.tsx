import React, { useEffect, useState } from "react";
import {
  CartProductInterface,
  ProductInterface,
} from "../models/interfaces/interfaces.ts";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import useProducts from "./useProducts";

type Props = {
  cart: CartProductInterface[] | undefined;
  updateCart: (barcode: string, amountToAdd: number) => any;
};

const Products: React.FC<Props> = ({ cart, updateCart }) => {
  const { handleGetProducts } = useProducts();
  const [products, setProducts] = useState<ProductInterface[] | undefined>([]);

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
  }, [handleGetProducts]);

  return (
    <Grid container spacing={2} pb={2}>
      <Typography title="Products Page" />
      {products?.map((product: ProductInterface) => (
        <Grid item key={product.barcode} xs={12} sm={6} md={6} lg={4}>
          <ProductCard
            product={product}
            amountInCart={getAmountInCart(product.barcode)}
            updateCart={updateCart}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
