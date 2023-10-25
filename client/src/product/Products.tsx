import React, { useEffect, useState } from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import useProducts from "./useProducts";
import { useSearchParams } from "react-router-dom";

type Props = {};

const Products: React.FC<Props> = () => {
  const { handleGetProducts } = useProducts();
  const [products, setProducts] = useState<ProductInterface[] | undefined>([]);
  const [query, setQuery] = useState<string>("");
  const [searchParams] = useSearchParams();

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
    <Grid
      container
      sx={{
        "--Grid-borderWidth": "0.5px",
        borderTop: "var(--Grid-borderWidth) 0px solid",
        borderLeft: "var(--Grid-borderWidth) solid",
        borderColor: "rgba(211, 211, 211, 0.05)",
        "& > div": {
          borderRight: "var(--Grid-borderWidth) solid",
          borderBottom: "var(--Grid-borderWidth) solid",
          borderColor: "rgba(211, 211, 211, 0.05)",
        },
      }}
    >
      <Typography title="Products Page" />
      {products?.map((product: ProductInterface) => (
        <Grid item key={product.barcode} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
