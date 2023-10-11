import React, { useCallback } from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts.js";
import {
  Button,
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
import { addToCartApi } from "../apiService/cartApiService";

type Props = {
  product: ProductInterface;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { title, barcode, brand, category, image, price, amount = 1 } = product;
  const user = getUser();
  const navigate = useNavigate();
  const snack = useSnack();

  const handleAddToCart = useCallback(
    async (userId: string, barcode: string, amount: number) => {
      try {
        const cart = await addToCartApi(userId, barcode, amount);
        console.log("Cart response:", cart);
        snack("success", "!המוצר התווסף לעגלתך בהצלחה");
        navigate(ROUTES.ROOT);
      } catch (error) {
        console.error("Cart API error:", error);

        // if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    []
  );

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
        <Button
          onClick={() => handleAddToCart(user?._id, barcode, amount)}
          sx={{ marginTop: "auto", marginRight: "35px", color: "blue" }}
        >
          הוסף לסל +
        </Button>
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
