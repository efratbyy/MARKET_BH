import React, { useCallback, useEffect, useState } from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts.js";
import {
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductDialog from "./ProductDialog";
import { useUser } from "../providers/UserProvider";
import { useCartProvider } from "../providers/CartProvider";

type Props = {
  product: ProductInterface;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { title, barcode, brand, image, price, details } = product;
  const { user } = useUser();
  const [totalAmount, setTotalAmount] = useState(0);
  const [isDialogOpen, setDialog] = useState(false);
  const { cart, updateCartProvider } = useCartProvider();
  const openDialog = () => {
    setDialog(true);
  };

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
    <Card
      sx={{
        // minWidth: "280",
        display: "flax",
        flexDirection: "column",
        minHeight: "100%",
        position: "relative",
      }}
      square
    >
      <CardActionArea
        sx={{ padding: "0%" }}
        onClick={() => {
          openDialog();
        }}
      >
        <CardMedia
          component="img"
          image={image.url}
          alt={image.alt}
          sx={{
            mx: "auto",
            display: "flex",
            flex: 1,
            objectFit: "fill",
            width: "40%",
            marginTop: 2,
            // height: "15vh",
          }}
        />
      </CardActionArea>
      <CardContent
        sx={{
          height: "150px",
          marginBottom: "50px",
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "auto", paddingRight: "10%" }}
        >
          {brand}
          {details && details.weightTopDisplay !== 0
            ? " | " +
              details.weightTopDisplay +
              " " +
              details.weightUnitTopDisplay
            : ""}
        </Typography>

        <Typography
          sx={{
            marginTop: "auto",
            paddingRight: "10%",
            color: "textSecondary",
            height: "50%",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            marginTop: "auto",
            paddingRight: "10%",
            color: "textSecondary",
          }}
        >
          ₪{price.toFixed(2)}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "auto", paddingRight: "10%", fontWeight: "lighter" }}
        >
          {details && details.weight
            ? "₪" +
              (price / (details?.weight / details.divideBy)).toFixed(2) +
              " ל " +
              details?.weightUnit
            : ""}
        </Typography>
      </CardContent>

      {user && (
        <Grid
          container
          sx={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            pb: "3%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <ButtonGroup
            orientation="horizontal"
            variant="contained"
            sx={{
              width: "90%", // Set the desired width to make it smaller
              height: "5.5vh",
            }}
          >
            <Button
              onClick={() => handleAddToCart(user?._id, barcode, 1)}
              sx={{
                borderRadius: "0px",
                width: "40%",
                backgroundColor: "#5b9822",
                "&:hover": {
                  backgroundColor: "#333", // Change color on hover
                },
                "&:active": {
                  backgroundColor: "#333", // Change color on press
                },
              }}
            >
              <AddIcon />
            </Button>

            <Button sx={{ width: "40%" }} disabled>
              <Typography variant="body1">{String(totalAmount)}</Typography>
            </Button>

            <Button
              onClick={() => handleRemoveFromCart(user?._id, barcode, 1)}
              sx={{
                borderRadius: "0px",
                width: "40%",
                backgroundColor: "#5b9822",
                "&:hover": {
                  backgroundColor: "#333", // Change color on hover
                },
                "&:active": {
                  backgroundColor: "#333", // Change color on press
                },
              }}
            >
              <RemoveIcon />
            </Button>
          </ButtonGroup>
        </Grid>
      )}

      <ProductDialog
        isDialogOpen={isDialogOpen}
        product={product}
        onClose={() => setDialog(false)}
        handleRemoveFromCart={handleRemoveFromCart}
        totalAmount={totalAmount}
        handleAddToCart={handleAddToCart}
      />
    </Card>
  );
};

export default ProductCard;
