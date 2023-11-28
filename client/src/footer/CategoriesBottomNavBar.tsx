import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, BottomNavigationAction, IconButton } from "@mui/material";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import { BigCategoryInterface } from "../models/interfaces/interfaces.ts";
import { getCategoriesApi } from "../apiService/categoriesApi";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CategoriesBottomNavBar: React.FC = () => {
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [categories, setCategories] = useState<BigCategoryInterface[]>();
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleGetCategories = useCallback(async () => {
    try {
      //setLoading(true);
      const categories = await getCategoriesApi();
      //requestStatus(false, null, cart);
      return Promise.resolve(categories);
    } catch (error) {
      //if (typeof error === "string") requestStatus(false, error, null);
    }
  }, []);

  useEffect(() => {
    handleGetCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleBottomDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setBottomDrawerOpen(open);
    };

  useEffect(() => {
    renderCategories();
  }, [currentCategory]);

  const bigCategoriesList = () => {
    return (
      <>
        <List sx={{ marginTop: "50px" }}>
          {categories?.map((category) => (
            <>
              <ListItem
                disablePadding
                onClick={() => setCurrentCategory(category.code)}
              >
                <ListItemButton
                  sx={{ textAlign: "right", paddingRight: 0 }}
                  onClick={() => setCurrentCategory(category.code)}
                >
                  <ListItemIcon sx={{ paddingRight: "10px" }}>
                    <img
                      src={category?.image?.url}
                      alt={category?.image?.alt}
                      width={"32px"}
                      height={"24px"}
                    />
                  </ListItemIcon>
                  <ListItemText primary={category.title} />
                  <ArrowBackIosNewIcon />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </>
    );
  };

  const middleCategoriesList = (bigCategoryCode: string) => {
    const bigCategory = categories?.find((category) =>
      category.code.startsWith(bigCategoryCode)
    );

    return (
      <>
        <List sx={{ marginTop: "50px" }}>
          <ListItem
            disablePadding
            sx={{ backgroundColor: "rgb(239, 239, 239)" }}
            onClick={() => setCurrentCategory("")}
          >
            <ListItemButton sx={{ textAlign: "right", paddingRight: 0 }}>
              <ListItemIcon sx={{ paddingRight: "10px" }}>
                <KeyboardArrowRightIcon
                  fontSize="large"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "5px",
                  }}
                />
              </ListItemIcon>

              <ListItemText primary="חזור אחורה" />
            </ListItemButton>
          </ListItem>
          <Divider />
          {bigCategory?.data.map((mdCategory) => (
            <>
              <ListItem
                disablePadding
                onClick={() => setCurrentCategory(mdCategory.code)}
              >
                <ListItemButton sx={{ textAlign: "right", paddingRight: 0 }}>
                  <ListItemIcon sx={{ paddingRight: "10px" }}>
                    <img
                      src={mdCategory?.image?.url}
                      alt={mdCategory?.image?.alt}
                      width={"32px"}
                      height={"24px"}
                    />
                  </ListItemIcon>
                  <ListItemText primary={mdCategory.title} />
                  <ArrowBackIosNewIcon />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </>
    );
  };

  const smallCategoriesList = (mdCategoryCode: string) => {
    const codesArr = mdCategoryCode.split("_");

    const bigCategory = categories?.find((category) =>
      category.code.startsWith(codesArr[0])
    );

    const mdCategory = bigCategory?.data.find((mdCategory) =>
      mdCategory.code.match(mdCategoryCode)
    );

    return (
      <>
        <List sx={{ marginTop: "50px" }}>
          <ListItem
            disablePadding
            sx={{ backgroundColor: "rgb(239, 239, 239)" }}
            onClick={() =>
              setCurrentCategory(
                currentCategory.slice(0, currentCategory.lastIndexOf("_"))
              )
            }
          >
            <ListItemButton sx={{ textAlign: "right", paddingRight: 0 }}>
              <ListItemIcon sx={{ paddingRight: "10px" }}>
                <KeyboardArrowRightIcon
                  fontSize="large"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "5px",
                  }}
                />
              </ListItemIcon>

              <ListItemText primary="חזור אחורה" />
            </ListItemButton>
          </ListItem>
          <Divider />
          {mdCategory?.data.map((smCategory) => (
            <>
              <ListItem
                disablePadding
                // onClick={() => setCurrentCategory(smCategory.code)}
              >
                <ListItemButton sx={{ textAlign: "right", paddingRight: 0 }}>
                  <ListItemIcon sx={{ paddingRight: "10px" }}></ListItemIcon>
                  <ListItemText primary={smCategory.title} />
                  <ArrowBackIosNewIcon />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </>
    );
  };

  const renderCategories = () => {
    const underScoreCount = (currentCategory.match(/_/g) || []).length;
    const strLength = currentCategory.length;

    if (strLength === 0) {
      return bigCategoriesList();
    } else if (underScoreCount === 0) {
      return middleCategoriesList(currentCategory);
    } else {
      return smallCategoriesList(currentCategory);
    }
  };

  return (
    <div>
      <BottomNavigationAction
        // onClick={() => navigate(ROUTES.ROOT)}
        onClick={() => setBottomDrawerOpen(true)}
        label="מוצרים"
        icon={
          <Avatar
            sx={{
              border: "1px solid #555",
              color: isClicked ? "white" : "#555",
              bgcolor: isClicked ? "#5b9822" : "white",
              marginTop: "-30px",
              width: "55px",
              height: "55px",
            }}
          >
            <FormatListBulletedTwoToneIcon />
          </Avatar>
        }
      />
      <Drawer
        anchor="right"
        open={bottomDrawerOpen}
        onClose={toggleBottomDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: bottomDrawerOpen ? "100vw" : "auto",
          },
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={toggleBottomDrawer(false)}
          sx={{ position: "absolute", top: 10, left: 10 }}
        >
          <CloseIcon />
        </IconButton>
        {/* {bigCategoriesList()} */}
        {/* {middleCategoriesList("7")} */}
        {/* {smallCategoriesList("15_2")} */}
        {renderCategories()}
      </Drawer>
    </div>
  );
};

export default CategoriesBottomNavBar;
