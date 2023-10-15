import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getUser } from "../services/LocalStorageService";
import { CardMedia, Typography } from "@mui/material";

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
  const user = getUser();
  const { productName, barcode, brand, category, image, price } = product;

  return (
    <Dialog
      open={isDialogOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{productName}</DialogTitle>
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
          // TODO:
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
        <DialogContentText id="alert-dialog-description">
          רכיבים: {}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          סימון תזונתי: {}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          תכולה: {}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <RemoveIcon
          onClick={() => handleRemoveFromCart(user!._id, barcode, 1)}
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
          onClick={() => handleAddToCart(user!._id, barcode, 1)}
          sx={{ color: "green", marginLeft: "130px", fontSize: "40px" }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
