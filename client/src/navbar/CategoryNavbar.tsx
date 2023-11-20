import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";

import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { BigCategoryInterface } from "../models/interfaces/interfaces.ts";
import { getCategoriesApi } from "../apiService/categoriesApi";
import { Grid } from "@mui/material";

const CategoryNavbar: React.FC = () => {
  const [categories, setCategories] = useState<BigCategoryInterface[]>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
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
          <React.Fragment key={category?.code}>
            <ListItem
              sx={{
                width: (99 / categories.length).toString() + "%",
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
              onClick={handlePopoverOpen}
            >
              <img
                src={category?.image?.url}
                alt={category?.image?.alt}
                width={"32px"}
                height={"24px"}
                // style={{ marginBottom: "3px" }}
              />
              <ListItem
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

            {index !== categories.length - 1 && (
              <ListDivider sx={{ padding: 0, margin: 0 }} />
            )}

            {/* Popover for each category */}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Grid onClick={handlePopoverClose}>
                {/* Add your popover content here, for example: */}
                <Typography>
                  <a href="#">Item 1</a>
                  <br />
                  <a href="#">Item 2</a>
                  {/* Add more items as needed */}
                  <Button
                    onClick={() => {
                      console.log("hey");
                    }}
                  >
                    text
                  </Button>
                </Typography>
              </Grid>
            </Popover>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default CategoryNavbar;
