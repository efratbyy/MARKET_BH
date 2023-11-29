import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Products from "../product/Products";
import ShoppingCart from "../cart/ShoppingCart";
import "./HomePage.css";
import { Button, Grid } from "@mui/material";
import Footer from "../footer/Footer";
import { useUser } from "../providers/UserProvider";
import CategoryNavbar from "../navbar/CategoryNavbar";
import DataFilter from "../search_filter/DataFilter";
import DesktopFooter from "../footer/DesktopFooter";
import { useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { getTranslatedCategoryCodeApi } from "../apiService/categoriesApi";

const HomePage = () => {
  const [searchParams, setSearch] = useSearchParams();
  const [q, setQ] = useState("");
  const [category_code, setCategory_code] = useState("");
  const [translated_category_code, setTranslated_category_code] = useState("");

  useEffect(() => {
    setQ(searchParams.get("q") || "");
    setCategory_code(searchParams.get("category_code") || "");
  }, [searchParams, q, category_code]);

  const { user } = useUser();

  const handleGetTranslatedCategory = useCallback(async () => {
    try {
      //setLoading(true);
      if (category_code) {
        const translatedCategory = await getTranslatedCategoryCodeApi(
          category_code
        );
        console.log("hey");
        //requestStatus(false, null, cart);
        setTranslated_category_code(translatedCategory);
      }
      return undefined;
    } catch (error) {
      //if (typeof error === "string") requestStatus(false, error, null);
    }
  }, [category_code, translated_category_code]);

  useEffect(() => {
    handleGetTranslatedCategory();
  }, [category_code, translated_category_code]);

  return (
    <>
      <Navbar />
      <CategoryNavbar />
      <Grid
        container
        sx={{
          background: `url("/assets/images/vegetables.png")`, // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px", //
        }}
      ></Grid>
      <Grid container sx={{ marginBottom: "27px" }}>
        <Grid item sx={{ display: { xs: "none", md: "block" } }} md={2}>
          <DataFilter />
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid xs={12} display={"flex"}>
            {/* filter reset */}
            <Button
              style={{
                backgroundColor: "orange",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "7px",
                borderRadius: "10px",
              }}
              onClick={() => setSearch("")}
            >
              <CloseIcon fontSize="small" />
              אפס סינון
            </Button>

            {/* q filter reset */}
            {q !== "" && (
              <Button
                style={{
                  backgroundColor: "orange",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "7px",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  searchParams.set("q", "");
                  setSearch(searchParams);
                }}
              >
                <CloseIcon fontSize="small" />
                {q}
              </Button>
            )}

            {/* categories filter reset */}
            {category_code !== "" && (
              <Button
                style={{
                  backgroundColor: "orange",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "7px",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  searchParams.set("category_code", "");
                  setSearch(searchParams);
                }}
              >
                <CloseIcon fontSize="small" />
                {translated_category_code}
              </Button>
            )}
          </Grid>
          <Products />
        </Grid>
        <Grid item sx={{ display: { xs: "none", md: "inline-flex" } }} md={3}>
          {user && <ShoppingCart />}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default HomePage;
