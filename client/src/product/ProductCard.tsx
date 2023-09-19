import React from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts.js";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
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
        <CardHeader subheader={"barcode: " + barcode} />
        <CardHeader subheader={"category: " + category} />
        <CardHeader title={"price: ₪" + price} />
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
