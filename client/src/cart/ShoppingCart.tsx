import React from "react";
import { CartProductInterface } from "../models/interfaces/interfaces.ts";
import { Box, Divider, Grid, Input, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCartProvider } from "../providers/CartProvider";
import { useUser } from "../providers/UserProvider";

type Props = {};

const ShoppingCart: React.FC<Props> = () => {
  const { user } = useUser();
  const { cart, updateCartNoteProvider, updateCartProvider } =
    useCartProvider();
  // Function to handle changes in the input field
  const handleNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    barcode: string
  ): void => {
    if (user)
      updateCartNoteProvider(user?._id, barcode, event.target.value.toString());
  };

  return (
    <Box sx={{ height: "60%" }}>
      {cart?.map((item: CartProductInterface, index) => (
        <div key={item.barcode}>
          <Grid
            container
            sx={{ marginBottom: "3%", marginTop: "3%", fontSize: "90%" }}
          >
            <Grid
              item
              xs={2}
              md={2}
              container
              alignContent="center"
              alignItems="center"
              justifyContent="center"
              padding={"3%"}
            >
              <ButtonGroup
                orientation="vertical"
                variant="contained"
                sx={{
                  width: "100%",
                  boxShadow: 0, // Set the desired width to make it smaller
                }}
              >
                <Button
                  onClick={() =>
                    updateCartProvider(user!._id, item.barcode, -1)
                  }
                >
                  <RemoveIcon />
                </Button>
                <Button disabled>
                  <Typography variant="body1">{item.amount}</Typography>
                </Button>
                <Button
                  onClick={() => updateCartProvider(user!._id, item.barcode, 1)}
                >
                  <AddIcon />
                </Button>
              </ButtonGroup>
            </Grid>

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
              <div>
                <img
                  src={item.image.url}
                  alt={item.title}
                  style={{
                    maxWidth: "100%",
                    width: "85%",
                    height: "auto",
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={4} md={4}>
              <div style={{ marginTop: "10%" }}>{item.brand}</div>
              <div style={{ marginTop: "10%" }}>{item.title}</div>
              <div style={{ marginTop: "10%" }}>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleNoteChange(e, item.barcode)
                  } // Handle input changes
                  value={item.note}
                  placeholder="הוסף הערה:"
                  sx={{
                    border: "1px solid rgba(0,0,0,0.3)",
                    borderRadius: "2px",
                  }}
                  // onKeyDown={(e) => {
                  //   if (e.key === " ") {
                  //     e.preventDefault(); // Prevent the default behavior of the space key
                  //   }
                  // }}
                ></Input>
              </div>
            </Grid>
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
              ₪{item.price.toFixed(2)}
            </Grid>
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
              <Button
                onClick={() =>
                  updateCartProvider(user!._id, item.barcode, item.amount * -1)
                }
              >
                <DeleteIcon sx={{ color: "#ce0a0a" }} />
              </Button>
            </Grid>
            {/* <div className={`weight ${item.isProductOutOfStock ? 'disabled' : ''}`}>{item.product.weight}</div> */}
          </Grid>
          {index < cart.length - 1 && <Divider variant="middle" />}
        </div>
      ))}
    </Box>
  );
};

export default ShoppingCart;
