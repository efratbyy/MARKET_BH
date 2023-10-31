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
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    const query = searchParams.get("q");
    if (query != null) {
      setQuery(query);
    } else {
      setQuery("");
    }
  }, [searchParams]);

  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort != null) {
      setSort(sort);
    } else {
      setSort("");
    }
  }, [searchParams]);

  useEffect(() => {
    handleGetProducts()
      .then((products) => {
        const filteredProducts = products?.filter((product) =>
          product.title.includes(query)
        );
        // sort the products by default
        const sortedFilteredProducts =
          sort === "" || sort === "Asc"
            ? filteredProducts?.sort((a, b) => a.price - b.price)
            : filteredProducts?.sort((a, b) => b.price - a.price);
        setProducts(sortedFilteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [handleGetProducts, query, sort]);

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
