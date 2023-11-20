import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";

import { BigCategoryInterface } from "../models/interfaces/interfaces.ts";
import { getCategoriesApi } from "../apiService/categoriesApi";

const CategoryNavbar: React.FC = () => {
  const [categories, setCategories] = useState<BigCategoryInterface[]>();

  const handleGetCategories = useCallback(async () => {
    try {
      //setLoading(true);
      const categories = await getCategoriesApi();
      //requestStatus(false, null, cart);
      return Promise.resolve(categories);
    } catch (error) {
      //if (typeof error === "string") requestStatus(false, error, null);
    }
  }, [categories]);

  useEffect(() => {
    handleGetCategories()
      .then((data) => {
        setCategories(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box
      component="nav"
      aria-label="My site"
      sx={{ flexGrow: 1, maxWidth: "100%" }}
    >
      <List role="menubar" orientation="horizontal">
        {categories?.map((category: BigCategoryInterface, index: number) => (
          <>
            <ListItem
              key={category?.code}
              sx={{
                width: 100 / categories.length / 113,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 0,
                padding: 0,
                paddingTop: "5px",
                gap: 0,
                bottom: 0,
                justifyContent: "center",
                justifyItems: "center",
                marginTop: "15px",
                marginBottom: "10px",
              }}
              role="none"
            >
              <img
                src={category?.image?.url}
                alt={category?.image?.alt}
                width={"32px"}
                height={"24px"}
                // style={{ marginBottom: "3px" }}
              />
              <ListItem
                key={category?.code}
                role="menuitem"
                // component="a"
                // href="#horizontal-list"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  // marginBottom: "auto",
                  padding: 0,
                  textAlign: "center",
                  // bottom: 0,
                }} // Adjust the font size as needed
              >
                {category.title}
              </ListItem>
            </ListItem>

            {index !== categories.length - 1 && <ListDivider />}
          </>
        ))}
      </List>
    </Box>
  );
};

export default CategoryNavbar;
