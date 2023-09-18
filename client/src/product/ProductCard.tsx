import React from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts.js";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  product: ProductInterface;
  // image: { url: string; alt: string };
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { title, barcode, brand, category, image, price } = product;
  // const { url, alt } = image;

  return (
    <Card sx={{ minWidth: 280 }} square raised>
      <CardContent>
        <CardHeader title={title} subheader={brand} />
        <CardHeader subheader={":ברקוד" + barcode} />
        <CardHeader subheader={":קטגוריה" + category} />
        <CardHeader title={":מחיר" + price} />
        <Typography variant="body2" color="text.secondary">
          <Typography fontWeight={700} component="span">
            {title}:{" "}
          </Typography>
          {price}
        </Typography>
        <Typography>{image.url}</Typography>
      </CardContent>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image.url}
          alt={image.alt}
          sx={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
        />{" "}
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
