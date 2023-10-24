import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CardMedia, Typography } from "@mui/material";
import { useUser } from "../providers/UserProvider";
import SvgSugar from "./SvgSugar";
import SvgSodium from "./SvgSodium";

type Props = {
  isDialogOpen: boolean;
  product: ProductInterface;
  onClose: () => void;
  handleRemoveFromCart: (
    userId: string,
    barcode: string,
    amount: number
  ) => void;
  totalAmount: number;
  handleAddToCart: (userId: string, barcode: string, amount: number) => void;
};

const ProductDialog: FC<Props> = ({
  product,
  isDialogOpen,
  onClose,
  handleRemoveFromCart,
  totalAmount,
  handleAddToCart,
}) => {
  const { user } = useUser();
  const { title, barcode, brand, image, price, details } = product;

  return (
    <Dialog
      open={isDialogOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {brand}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          ברקוד: {barcode}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          ₪{price}
        </DialogContentText>
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
        <DialogContentText id="alert-dialog-description">
          רכיבים: {}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          סימון תזונתי: {}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          תכולה: {}
        </DialogContentText>

        {details.isSodium === true && <SvgSodium />}
        {details.isSugar === true && <SvgSugar />}
      </DialogContent>
      <DialogActions>
        <RemoveIcon
          onClick={() => handleRemoveFromCart(user!._id, barcode, 1)}
          sx={{
            color: totalAmount > 0 ? "green" : "gray",
            marginRight: "10%",
            fontSize: "40px",
          }}
        />
        <Typography variant="h4" sx={{ color: "green" }}>
          {String(totalAmount)}
        </Typography>
        <AddIcon
          onClick={() => handleAddToCart(user!._id, barcode, 1)}
          sx={{ color: "green", marginLeft: "10%", fontSize: "40px" }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
