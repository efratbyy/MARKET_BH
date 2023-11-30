import React, { useCallback, useEffect, useState } from "react";
import {
  CartProductInterface,
  ProductInterface,
} from "../models/interfaces/interfaces.ts";
import {
  Box,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useUser } from "../providers/UserProvider";
import { useCartProvider } from "../providers/CartProvider";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";
import SvgSodium from "./SvgSodium";
import SvgSugar from "./SvgSugar";
import SvgSaturatedFat from "./SvgSaturatedFat";
import SvgSupervisedProducts from "./SvgSupervisedProducts";

type Props = {
  product: ProductInterface;
};

const DesktopListProductCard: React.FC<Props> = ({ product }) => {
  const {
    title,
    barcode,
    brand,
    image,
    price,
    details,
    content,
    ingredients,
    manufacturingCountry,
  } = product;
  const { user } = useUser();
  const [totalAmount, setTotalAmount] = useState(0);
  const [isDialogOpen, setDialog] = useState(false);
  const { cart, updateCartProvider } = useCartProvider();
  const openDialog = () => {
    setDialog(true);
  };

  const navigate = useNavigate();

  const getAmountInCart = (barcode: String) => {
    const findProductInCart = cart?.find(
      (product) => product.barcode === barcode
    );
    return findProductInCart?.amount || 0;
  };

  const handleAddToCart = useCallback(
    async (userId: string, barcode: string, amount: number) => {
      updateCartProvider(userId, barcode, amount);
      setTotalAmount(totalAmount + 1);
    },
    [totalAmount]
  );

  const handleRemoveFromCart = useCallback(
    async (userId: string, barcode: string, amount: number) => {
      if (totalAmount > 0) {
        updateCartProvider(userId, barcode, -1 * amount);
        setTotalAmount(Number(totalAmount) - amount);
      }
    },
    [totalAmount]
  );

  useEffect(() => {
    setTotalAmount(getAmountInCart(barcode));
  }, [cart]);

  return (
    <>
      <Divider variant="middle" />

      <Box>
        <div key={barcode}>
          <Grid container sx={{ fontSize: "90%" }}>
            <Divider orientation="vertical" flexItem />

            {/* Product Image */}
            <Grid
              item
              xs={3}
              sx={{
                textAlign: "center", // Center horizontally
                display: "flex",
                alignItems: "center", // Center vertically
                justifyContent: "center", // Center horizontally
              }}
            >
              <img
                src={image.url}
                alt={title}
                style={{
                  maxWidth: "100%",
                  width: "85%",
                  height: "auto",
                }}
              />
            </Grid>

            <Grid item xs={4.95}>
              <Grid container xs={12} justifyContent={"space-between"}>
                <Grid xs={5}>{title}</Grid>

                <Grid xs={5} sx={{ textAlign: "left", paddingLeft: "10%" }}>
                  {brand}
                </Grid>
              </Grid>
              <Grid xs={12}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: "auto" }}
                >
                  {details && details.weightTopDisplay !== 0
                    ? details.weightTopDisplay +
                      " " +
                      details.weightUnitTopDisplay
                    : ""}
                </Typography>
              </Grid>
              <Grid xs={12}> ברקוד: {barcode} </Grid>{" "}
              <Grid xs={12}> רכיבים: {ingredients} </Grid>
              <Grid xs={12}> תכולה: {content} </Grid>
              <Grid xs={12}> ארץ ייצור: {manufacturingCountry} </Grid>
              <Grid sx={{ margin: "20px" }}>
                {details.isSodium === true && <SvgSodium />}
                {details.isSugar === true && <SvgSugar />}
                {details.isSaturatedFat === true && <SvgSaturatedFat />}
                {details.isSupervised === true && <SvgSupervisedProducts />}
              </Grid>{" "}
            </Grid>
            <Divider orientation="vertical" flexItem />

            {/* Left inner Card */}
            {/* Price, Price per, And handle Cart */}
            <Grid
              container
              xs={4}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid xs={12}> </Grid>
              <Grid xs={12} sx={{ paddingRight: "10%" }}>
                ₪{price.toFixed(2)}{" "}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    marginTop: "auto",

                    fontWeight: "lighter",
                  }}
                >
                  {details && details.weight
                    ? "₪" +
                      (price / (details?.weight / details.divideBy)).toFixed(
                        2
                      ) +
                      " ל " +
                      details?.weightUnit
                    : ""}
                </Typography>
              </Grid>
              {user && (
                <Grid xs={12} textAlign={"center"}>
                  {/* Add and Remove from cart */}
                  <ButtonGroup
                    orientation="horizontal"
                    variant="contained"
                    sx={{
                      boxShadow: 0, // Set the desired width to make it smaller
                    }}
                  >
                    <Button
                      onClick={() => updateCartProvider(user!._id, barcode, 1)}
                      // onClick={() => handleAddToCart(user?._id, barcode, 1)}

                      sx={{
                        borderRadius: "0px",
                        backgroundColor: "#5b9822",
                        minWidth: "0px !important",
                        width: "32px",
                        "&:hover": {
                          backgroundColor: "#333", // Change color on hover
                        },
                        "&:active": {
                          backgroundColor: "#333", // Change color on press
                        },
                      }}
                    >
                      <AddIcon sx={{ fontSize: "large" }} />
                    </Button>

                    <Button
                      disabled
                      sx={{
                        minWidth: "0px !important",
                        width: "32px",
                        borderRadius: "0px",
                      }}
                    >
                      <Typography variant="body1">
                        {String(totalAmount)}
                      </Typography>
                    </Button>

                    <Button
                      onClick={() => updateCartProvider(user!._id, barcode, -1)}
                      // onClick={() =>
                      //   handleRemoveFromCart(user?._id, barcode, 1)
                      // }
                      sx={{
                        borderRadius: "0px",
                        backgroundColor: "#5b9822",
                        minWidth: "0px !important",
                        width: "32px",
                        "&:hover": {
                          backgroundColor: "#333", // Change color on hover
                        },
                        "&:active": {
                          backgroundColor: "#333", // Change color on press
                        },
                      }}
                    >
                      <RemoveIcon sx={{ fontSize: "large" }} />
                    </Button>
                  </ButtonGroup>
                </Grid>
              )}
            </Grid>
            <Divider orientation="vertical" flexItem />
          </Grid>

          <Divider variant="middle" />
        </div>
      </Box>
    </>
  );
};

export default DesktopListProductCard;
