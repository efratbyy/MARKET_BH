import React, { useCallback, useEffect, useState } from "react";
import {
  CartProductInterface,
  ProductInterface,
} from "../models/interfaces/interfaces.ts.js";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { getUser } from "../services/LocalStorageService";
import { useSnack } from "../providers/SnackbarProvider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductDialog from "./ProductDialog";

type Props = {
  product: ProductInterface;
  amountInCart: number;
  updateCart: (barcode: string, amountToAdd: number) => CartProductInterface[];
};

const ProductCard: React.FC<Props> = ({
  product,
  updateCart,
  amountInCart,
}) => {
  const { productName, barcode, brand, category, image, price } = product;
  const user = getUser();
  const snack = useSnack();
  const [totalAmount, setTotalAmount] = useState(0);
  const [isDialogOpen, setDialog] = useState(false);

  const openDialog = () => {
    setDialog(true);
  };

  const handleAddToCart = useCallback(
    async (userId: string, barcode: string, amount: number) => {
      try {
        const newCart = updateCart(barcode, 1);

        if (newCart) {
          setTotalAmount(totalAmount + 1);

          snack("success", "!המוצר התווסף לעגלתך בהצלחה");
        } else {
          snack("error", "!נכשל בהוספת המוצר לעגלתך");
        }
      } catch (error) {
        console.error("Cart API error:", error);

        // if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [totalAmount]
  );

  const handleRemoveFromCart = useCallback(
    async (userId: string, barcode: string, amount: number) => {
      try {
        if (totalAmount > 0) {
          const newCart = updateCart(barcode, -1);
          if (newCart) {
            setTotalAmount(Number(totalAmount) - 1);
            snack("success", "!המוצר הוסר מעגלתך בהצלחה");
          } else {
            snack("error", "!נכשל בהוספת המוצר לעגלתך");
          }
        }
      } catch (error) {
        console.error("Cart API error:", error);

        // if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [totalAmount]
  );

  useEffect(() => {
    setTotalAmount(amountInCart);
  }, [amountInCart]);

  return (
    <Card
      sx={{
        minWidth: 280,
        display: "flax",
        flexDirection: "column",
        minHeight: "100%",
        borderRadius: "16px",
        border: "5px solid #ccc",
      }}
      square
      raised
    >
      <CardContent>
        <CardHeader title={productName} subheader={brand} />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "auto", paddingRight: "10%" }}
        >
          Category: {category}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "auto", paddingRight: "10%" }}
        >
          Barcode: {barcode}
        </Typography>
      </CardContent>

      <Typography
        variant="h6"
        sx={{ marginTop: "auto", paddingRight: "10%", color: "blue" }}
      >
        Price: ₪{price}
      </Typography>

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

      <CardActionArea
        onClick={() => {
          openDialog();
        }}
      >
        <CardMedia
          component="img"
          image={image.url}
          alt={image.alt}
          sx={{
            flex: 1,
            objectFit: "cover",
            marginTop: "auto",
            width: "100%",
          }}
        />
      </CardActionArea>
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
