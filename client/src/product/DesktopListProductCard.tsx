import React, { useEffect, useState } from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import { ButtonGroup, Divider, Grid, Typography } from "@mui/material";
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
import GreenMark from "./GreenMark";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

type Props = {
  product: ProductInterface;
  setBarcodeAndOpenDialog: (barcode: string) => void;
};

const DesktopListProductCard: React.FC<Props> = ({
  product,
  setBarcodeAndOpenDialog,
}) => {
  const [totalAmount, setTotalAmount] = useState(0);

  const { cart, updateCartProvider } = useCartProvider();
  const { title, barcode, brand, image, price, details, inventory } = product;
  const { user } = useUser();

  const navigate = useNavigate();

  const getAmountInCart = (barcode: String) => {
    const findProductInCart = cart?.find(
      (product) => product.barcode === barcode
    );
    return findProductInCart?.amount || 0;
  };

  useEffect(() => {
    setTotalAmount(getAmountInCart(barcode));
  }, [cart]);

  return (
    <>
      <Divider orientation="vertical" flexItem />

      {/* Left inner Card */}
      {/* Product Image */}
      <Grid
        item
        xs={2}
        sx={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={image.url}
          alt={title}
          style={{
            maxWidth: "100%",
            width: "200px",
            height: "180px",
          }}
        />
      </Grid>

      <Grid item xs={3.9}>
        {/* Product Name */}
        <Grid item xs={12} sx={{ fontSize: "17px" }}>
          {title}
        </Grid>
        {/* Product Amount */}
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: "auto" }}
          >
            {details && details.weightTopDisplay !== 0
              ? details.weightTopDisplay + " " + details.weightUnitTopDisplay
              : ""}
          </Typography>
        </Grid>
        {/* Product Barcode, Ingredients, Content, ManufacturingCountry */}
        <Grid item xs={12}>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>ברקוד:</span> {barcode}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>רכיבים:</span>{" "}
            {details.ingredients}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <span style={{ fontWeight: "bold" }}>תכולה:</span> {details.content}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <span style={{ fontWeight: "bold" }}>ארץ ייצור:</span>{" "}
            {details.manufacturingCountry}
          </Typography>
        </Grid>
      </Grid>

      {/* Product Stickers */}
      <Grid item xs={2} sx={{ textAlign: "center" }}>
        {/* Product Brand */}
        <Grid
          item
          xs={12}
          sx={{
            fontSize: "17px",
            textAlign: "center",
            paddingLeft: "10%",
            paddingBottom: "20px",
          }}
        >
          {brand}
        </Grid>
        {details.isSodium === true && <SvgSodium />}
        {details.isSugar === true && <SvgSugar />}
        {details.isSaturatedFat === true && <SvgSaturatedFat />}
        {details.isSupervised === true && <SvgSupervisedProducts />}
        {details.isGreenMark === true && <GreenMark />}
      </Grid>
      <Divider orientation="vertical" flexItem />
      {/* Left inner Card */}
      {/* Price, Price per... and Add/Remove from Cart */}
      <Grid
        container
        item
        xs={4}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* Product Price */}
        <Grid
          item
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
                (price / (details?.weight / details.divideBy)).toFixed(2) +
                " ל " +
                details?.weightUnit
              : ""}
          </Typography>
        </Grid>

        {user && user.isAdmin && (
          <Grid
            container
            item
            justifyContent="space-between"
            sx={{
              marginTop: "auto",
            }}
          >
            <Button
              sx={{ color: "rgba(0, 0, 0, 0.87)", padding: 0, margin: 0 }}
              onClick={() => {
                navigate(ROUTES.EDIT_PRODUCT + `?barcode=${barcode}`);
              }}
            >
              <EditTwoToneIcon />
            </Button>

            <Button
              sx={{ color: "rgba(0, 0, 0, 0.87)", padding: 0, margin: 0 }}
              onClick={() => {
                setBarcodeAndOpenDialog(barcode);
              }}
            >
              <DeleteTwoToneIcon />
            </Button>
          </Grid>
        )}

        {user && inventory !== 0 && (
          <Grid item xs={12} margin={"10px"} textAlign={"center"}>
            {/* Add and Remove from cart */}

            <ButtonGroup
              orientation="horizontal"
              variant="contained"
              fullWidth
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
                  height: "50px",
                  borderRadius: "0px",
                }}
              >
                <Typography variant="body1">{String(totalAmount)}</Typography>
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
        {inventory === 0 && (
          <Grid
            item
            xs={12}
            margin={"10px"}
            textAlign={"center"}
            sx={{
              color: "red",
              paddingBottom: "7px",
              fontSize: "20px",
            }}
          >
            אזל המלאי!
          </Grid>
        )}
      </Grid>
      <Divider orientation="vertical" flexItem />

      {/* <Divider variant="middle" /> */}
    </>
  );
};

export default DesktopListProductCard;
