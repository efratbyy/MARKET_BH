import React, { useCallback, useEffect, useState } from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts.js";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { getUser } from "../services/LocalStorageService";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { useSnack } from "../providers/SnackbarProvider";
import { addToCartApi, removeFromCartApi } from "../apiService/cartApiService";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  product: ProductInterface;
  amountInCart: number;
};

const ProductCard: React.FC<Props> = ({ product, amountInCart }) => {
  const { title, barcode, brand, category, image, price } = product;
  const user = getUser();
  const navigate = useNavigate();
  const snack = useSnack();
  const [totalAmount, setTotalAmount] = useState(0);

  const handleAddToCart = useCallback(
    async (userId: string, barcode: string, amount: number) => {
      try {
        const newCart = await addToCartApi(userId, barcode, 1);

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
          const newCart = await removeFromCartApi(userId, barcode, 1);
          setTotalAmount(Number(totalAmount) - 1);
          console.log("Cart response:", newCart);
          snack("success", "!המוצר הוסר מעגלתך בהצלחה");
          navigate(ROUTES.ROOT);
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
        <CardHeader title={title} subheader={brand} />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "auto", marginRight: "20px" }}
        >
          Category: {category}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "auto", marginRight: "20px" }}
        >
          Barcode: {barcode}
        </Typography>
      </CardContent>

      <Typography
        variant="h6"
        sx={{ marginTop: "auto", marginRight: "35px", color: "blue" }}
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
              marginRight: "130px",
              fontSize: "40px",
            }}
          />

          <Typography variant="h4" sx={{ color: "green" }}>
            {String(totalAmount)}
          </Typography>
          <AddIcon
            onClick={() => handleAddToCart(user?._id, barcode, 1)}
            sx={{ color: "green", marginLeft: "130px", fontSize: "40px" }}
          />
        </div>
      )}

      <CardActionArea>
        <CardMedia
          component="img"
          image={image.url}
          alt={image.alt}
          sx={{
            flex: 1,
            objectFit: "cover",
            marginTop: "auto",
            marginRight: "20px",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            width: "400px",
            height: "400px",
          }}
        />
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
