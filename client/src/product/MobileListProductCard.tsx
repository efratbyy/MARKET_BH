import React, { useCallback, useEffect, useState } from "react";
import {
  CartProductInterface,
  ProductInterface,
} from "../models/interfaces/interfaces.ts.js";
import {
  Box,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useUser } from "../providers/UserProvider";
import { useCartProvider } from "../providers/CartProvider";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router-dom";

type Props = {
  product: ProductInterface;
};

const MobileListProductCard: React.FC<Props> = ({ product }) => {
  const { title, barcode, brand, image, price, details } = product;
  const { user } = useUser();
  const [totalAmount, setTotalAmount] = useState(0);
  const [isDialogOpen, setDialog] = useState(false);
  const { cart, updateCartProvider } = useCartProvider();
  const openDialog = () => {
    setDialog(true);
  };

  const navigate = useNavigate();

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
    <>
      <Box>
        <div key={barcode}>
          <Grid
            container
            sx={{ marginBottom: "3%", marginTop: "3%", fontSize: "90%" }}
          >
            {/* Product Image */}
            <Grid
              item
              xs={4}
              md={4}
              sx={{
                textAlign: "center", // Center horizontally
                display: "flex",
                alignItems: "center", // Center vertically
                justifyContent: "center", // Center horizontally
              }}
            >
              <img
                src={image.url}
                alt={title}
                style={{
                  maxWidth: "100%",
                  width: "85%",
                  height: "auto",
                }}
              />
            </Grid>

            {/* Brand, Title, And handle Cart */}
            <Grid item xs={4} md={4.5}>
              <Grid sx={{ marginTop: "10%" }}>{brand}</Grid>
              <Grid sx={{ marginTop: "10%" }}>{title}</Grid>
              <Grid sx={{ marginTop: "10%" }}>
                {/* Add and Remove from cart */}
                <ButtonGroup
                  orientation="horizontal"
                  variant="contained"
                  sx={{
                    boxShadow: 0, // Set the desired width to make it smaller
                  }}
                >
                  <Button
                    onClick={() => updateCartProvider(user!._id, barcode, 1)}
                    // onClick={() => handleAddToCart(user?._id, barcode, 1)}

                    sx={{
                      borderRadius: "0px",
                      backgroundColor: "#5b9822",
                      minWidth: "0px !important",
                      width: "32px",
                      "&:hover": {
                        backgroundColor: "#333", // Change color on hover
                      },
                      "&:active": {
                        backgroundColor: "#333", // Change color on press
                      },
                    }}
                  >
                    <AddIcon sx={{ fontSize: "large" }} />
                  </Button>

                  <Button
                    disabled
                    sx={{
                      minWidth: "0px !important",
                      width: "32px",
                      borderRadius: "0px",
                    }}
                  >
                    <Typography variant="body1">
                      {String(totalAmount)}
                    </Typography>
                  </Button>

                  <Button
                    onClick={() => updateCartProvider(user!._id, barcode, -1)}
                    // onClick={() =>
                    //   handleRemoveFromCart(user?._id, barcode, 1)
                    // }
                    sx={{
                      borderRadius: "0px",
                      backgroundColor: "#5b9822",
                      minWidth: "0px !important",
                      width: "32px",
                      "&:hover": {
                        backgroundColor: "#333", // Change color on hover
                      },
                      "&:active": {
                        backgroundColor: "#333", // Change color on press
                      },
                    }}
                  >
                    <RemoveIcon sx={{ fontSize: "large" }} />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>

            {/* Price */}
            <Grid
              item
              xs={2}
              md={2}
              sx={{
                textAlign: "center", // Center horizontally
                display: "flex",
                alignItems: "center", // Center vertically
                justifyContent: "center", // Center horizontally
              }}
            >
              ₪{price.toFixed(2)}
            </Grid>
          </Grid>

          <Divider variant="middle" />
        </div>
      </Box>
    </>
  );
};

export default MobileListProductCard;
