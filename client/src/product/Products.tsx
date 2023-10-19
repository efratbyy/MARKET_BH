import React, { useEffect, useState } from "react";
import {
  CartProductInterface,
  ProductInterface,
} from "../models/interfaces/interfaces.ts";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import useProducts from "./useProducts";
import { useSearchParams } from "react-router-dom";

type Props = {
  cart: CartProductInterface[] | undefined;
  updateCart: (barcode: string, amountToAdd: number) => any;
};

const Products: React.FC<Props> = ({ cart, updateCart }) => {
  const { handleGetProducts } = useProducts();
  const [products, setProducts] = useState<ProductInterface[] | undefined>([]);
  const [query, setQuery] = useState<string>("");
  const [searchParams] = useSearchParams();

  const getAmountInCart = (barcode: String) => {
    const findProductInCart = cart?.find(
      (product) => product.barcode === barcode
    );
    return findProductInCart?.amount || 0;
  };

  useEffect(() => {
    const query = searchParams.get("q");
    if (query != null) {
      setQuery(query);
    } else {
      setQuery("");
    }
  }, [searchParams]);

  useEffect(() => {
    handleGetProducts()
      .then((products) => {
        console.log(products);

        // TODO: filter data
        const filteredProducts = products?.filter((product) =>
          product.title.includes(query)
        );
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [handleGetProducts, query]);

  return (
    <Grid container>
      <Typography title="Products Page" />
      {products?.map((product: ProductInterface) => (
        <Grid item key={product.barcode} xs={12} sm={6} md={4} lg={3}>
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
