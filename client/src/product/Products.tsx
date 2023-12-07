import React, { useCallback, useEffect, useState } from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import useProducts from "./useProducts";
import { useSearchParams } from "react-router-dom";
import DesktopListProductCard from "./DesktopListProductCard";
import { deleteProductApi } from "../apiService/productApiService";
import { useSnack } from "../providers/SnackbarProvider";

type Props = { productListShow: boolean };

const Products: React.FC<Props> = ({ productListShow = false }) => {
  const { handleGetProducts } = useProducts();
  const [products, setProducts] = useState<ProductInterface[] | undefined>([]);
  const [query, setQuery] = useState<string>("");
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState<string>("");
  const [brands, setBrands] = useState<string>("");
  const [stickers, setStickers] = useState<string>("");
  const [categoryCode, setCategoryCode] = useState<string>("");
  const snack = useSnack();
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(true);

  const handleDeleteProduct = useCallback(async (barcode: string) => {
    try {
      const deletedProduct = await deleteProductApi(barcode);
      if (deletedProduct) {
        snack("success", "The product has been successfully deleted");
        setDeleteTrigger((prev) => !prev);
      } else snack("error", "Could not delete this product, try later");
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    const brand = searchParams.get("brand");
    if (brand != null) {
      setBrands(brand);
    } else {
      setBrands("");
    }
  }, [searchParams]);

  useEffect(() => {
    const sticker = searchParams.get("sticker");
    if (sticker != null) {
      setStickers(sticker);
    } else {
      setStickers("");
    }
  }, [searchParams]);

  useEffect(() => {
    const categoryCodeParam = searchParams.get("category_code");
    if (categoryCodeParam != null) {
      setCategoryCode(categoryCodeParam);
    } else {
      setCategoryCode("");
    }
  }, [searchParams]);

  useEffect(() => {
    handleGetProducts()
      .then((products) => {
        // Filter by q
        let filteredProducts = products?.filter(
          (product) =>
            product.title.includes(query) || product.barcode.includes(query)
        );

        // Filter by brand
        if (brands !== "") {
          // If brands searchParams is empty, no need to filter
          const brandsArray = brands.split(", ");
          filteredProducts = filteredProducts?.filter((product) =>
            brandsArray.includes(product.brand)
          );
        }

        // Filter by sticker
        if (stickers !== "") {
          const stickersArray = stickers.split(", ");

          let sugarProducts: ProductInterface[] | undefined = [];
          let saturatedFatProducts: ProductInterface[] | undefined = [];
          let sodiumProducts: ProductInterface[] | undefined = [];
          let greenMarkProducts: ProductInterface[] | undefined = [];
          let supervisedProducts: ProductInterface[] | undefined = [];

          // Convert search param text to the product's field true/false
          if (stickersArray.includes("סוכר"))
            sugarProducts = filteredProducts?.filter(
              (x) => x.details.isSugar === true
            );

          if (stickersArray.includes("שומן רווי"))
            saturatedFatProducts = filteredProducts?.filter(
              (x) => x.details.isSaturatedFat === true
            );

          if (stickersArray.includes("נתרן"))
            sodiumProducts = filteredProducts?.filter(
              (x) => x.details.isSodium === true
            );

          if (stickersArray.includes("הסימון הירוק"))
            greenMarkProducts = filteredProducts?.filter(
              (x) => x.details.isGreenMark === true
            );

          if (stickersArray.includes("מוצר בפיקוח"))
            supervisedProducts = filteredProducts?.filter(
              (x) => x.details.isSupervised === true
            );

          // Create array thant contains all the products with chosen stickers
          // it may contains duplicate products
          const mergedArray = ([] as ProductInterface[]).concat(
            sugarProducts || [],
            saturatedFatProducts || [],
            sodiumProducts || [],
            greenMarkProducts || [],
            supervisedProducts || []
          );

          // Set is type that cannot contains duplicates
          filteredProducts = Array.from(new Set(mergedArray));
        }

        // Filter by category
        if (categoryCode !== "") {
          console.log(filteredProducts);
          console.log(
            filteredProducts?.filter((product) =>
              product.categoryCode.some((code) => code.startsWith(categoryCode))
            )
          );

          // If category searchParams is empty, no need to filter
          filteredProducts = filteredProducts?.filter((product) =>
            product.categoryCode.some((code) => code.startsWith(categoryCode))
          );
        }

        // sort the products by default
        const sortedFilteredProducts =
          sort === "" || sort === "Asc"
            ? filteredProducts?.sort((a, b) => a.price - b.price)
            : filteredProducts?.sort((a, b) => b.price - a.price);
        setProducts(sortedFilteredProducts);

        console.log("products updates");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    handleGetProducts,
    handleDeleteProduct,
    deleteTrigger,
    query,
    sort,
    brands,
    stickers,
    categoryCode,
  ]);

  return (
    <>
      {!productListShow && (
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
            <Grid item key={product.barcode} xs={6} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                deleteProduct={handleDeleteProduct}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {productListShow && (
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
            <Grid item key={product.barcode} xs={12}>
              <DesktopListProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Products;
