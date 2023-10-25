import React, { useCallback, useEffect, useState } from "react";
import {
  CartProductInterface,
  ProductInterface,
} from "../models/interfaces/interfaces.ts.js";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import Divider from "@mui/material/Divider";

import { useSnack } from "../providers/SnackbarProvider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductDialog from "./ProductDialog";
import { useUser } from "../providers/UserProvider";
import { log } from "console";
import { useCartProvider } from "../providers/CartProvider";
import { get } from "http";

type Props = {
  product: ProductInterface;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { title, barcode, brand, category, image, price, details } = product;
  const { user } = useUser();
  const snack = useSnack();
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
      updateCartProvider(barcode, 1);
      setTotalAmount(totalAmount + 1);
      snack("success", "!המוצר התווסף לעגלתך בהצלחה");
    },
    [totalAmount]
  );

  const handleRemoveFromCart = useCallback(
    async (userId: string, barcode: string, amount: number) => {
      if (totalAmount > 0) {
        updateCartProvider(barcode, -1);
        setTotalAmount(Number(totalAmount) - 1);
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
        minWidth: "280",
        display: "flax",
        flexDirection: "column",
        minHeight: "100%",
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
            width: "50%",
            marginTop: 2,
          }}
        />
      </CardActionArea>
      <CardContent sx={{ height: "150px" }}>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "auto", paddingRight: "10%" }}
        >
          {brand}
          {details && details.weightDisplay !== 0
            ? " | " + details.weightDisplay + " " + details.weightUnitDisplay
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
          ₪{price}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "auto", paddingRight: "10%", fontWeight: "lighter" }}
        >
          {details && details.weight
            ? "₪" +
              price / (details?.weight / details.divideBy) +
              " ל " +
              details?.weightUnit
            : ""}
        </Typography>
      </CardContent>

      {user && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RemoveIcon
            onClick={() => handleRemoveFromCart(user?._id, barcode, 1)}
            sx={{
              color: totalAmount > 0 ? "green" : "gray",
              paddingRight: "10%",
              fontSize: "40px",
            }}
          />

          <Typography variant="h4" sx={{ color: "green" }}>
            {String(totalAmount)}
          </Typography>
          <AddIcon
            onClick={() => handleAddToCart(user?._id, barcode, 1)}
            sx={{ color: "green", paddingLeft: "10%", fontSize: "40px" }}
          />
        </div>
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
