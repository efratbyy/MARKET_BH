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

            {/* Left inner Card */}
            {/* Product Image */}
            <Grid
              container
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
              {/* Product Stickers */}
              <Grid>
                {details.isSodium === true && <SvgSodium />}
                {details.isSugar === true && <SvgSugar />}
                {details.isSaturatedFat === true && <SvgSaturatedFat />}
                {details.isSupervised === true && <SvgSupervisedProducts />}
              </Grid>
            </Grid>

            <Grid sx={{ padding: "15px" }} item xs={4.95}>
              <Grid container xs={12} justifyContent={"space-between"}>
                {/* Product Name */}
                <Grid sx={{ fontSize: "17px" }} xs={5}>
                  {title}
                </Grid>

                {/* Product Brand */}
                <Grid
                  xs={5}
                  sx={{
                    fontSize: "17px",
                    textAlign: "left",
                    paddingLeft: "10%",
                    paddingBottom: "20px",
                  }}
                >
                  {brand}
                </Grid>
              </Grid>
              {/* Product Amount */}
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
              {/* Product Barcode, Ingredients, Content, ManufacturingCountry */}
              <Grid xs={12}>
                <Typography variant="body1">
                  <span style={{ fontWeight: "bold" }}>ברקוד:</span> {barcode}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body1">
                  <span style={{ fontWeight: "bold" }}>רכיבים:</span>{" "}
                  {ingredients}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography>
                  <span style={{ fontWeight: "bold" }}>תכולה:</span> {content}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body1">
                  <span style={{ fontWeight: "bold" }}>ארץ ייצור:</span>{" "}
                  {manufacturingCountry}
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />

            {/* Left inner Card */}
            {/* Price, Price per... and Add/Remove from Cart */}
            <Grid
              container
              xs={4}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {/* <Grid xs={12}> </Grid> */}

              {/* Product Price */}
              <Grid
                xs={12}
                sx={{
                  paddingRight: "10%",
                  fontSize: "17px",
                  fontWeight: "bold",
                }}
              >
                ₪{price.toFixed(2)}
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
                      boxShadow: 0,
                    }}
                  >
                    <Button
                      onClick={() => updateCartProvider(user!._id, barcode, 1)}
                      sx={{
                        borderTopRightRadius: "10px !important",
                        borderBottomRightRadius: "10px !important",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        backgroundColor: "#5b9822",
                        minWidth: "0px !important",
                        width: "50px",
                        height: "50px",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                        "&:active": {
                          backgroundColor: "#333",
                        },
                      }}
                    >
                      <AddIcon sx={{ fontSize: "large" }} />
                    </Button>

                    <Button
                      disabled
                      sx={{
                        minWidth: "0px !important",
                        width: "50px",
                        height: "50px",
                        borderRadius: "0px",
                      }}
                    >
                      <Typography variant="body1">
                        {String(totalAmount)}
                      </Typography>
                    </Button>

                    <Button
                      onClick={() => updateCartProvider(user!._id, barcode, -1)}
                      sx={{
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                        borderTopLeftRadius: "10px !important",
                        borderBottomLeftRadius: "10px !important",
                        backgroundColor: "#5b9822",
                        minWidth: "0px !important",
                        width: "50px",
                        height: "50px",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                        "&:active": {
                          backgroundColor: "#333",
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
