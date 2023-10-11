import React, { useEffect, useState } from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts.js";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import useProducts from "./useProducts";

const Products = () => {
  const { handleGetProducts } = useProducts();

  const [products, setProducts] = useState<ProductInterface[] | undefined>([]);

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
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
