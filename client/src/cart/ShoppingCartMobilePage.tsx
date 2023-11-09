import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import ShoppingCart from "./ShoppingCart";
import Footer from "../footer/Footer";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import { useCartProvider } from "../providers/CartProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { CartProductInterface } from "../models/interfaces/interfaces.ts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { useUser } from "../providers/UserProvider";

const ShoppingCartMobilePage = () => {
  const { cart, updateCartProvider, updateCartNoteProvider } =
    useCartProvider();
  const navigate = useNavigate();
  const { user } = useUser();

  const [totalAmountInCart, setTotalAmountInCart] = React.useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [searchParams] = useSearchParams();

  const handleNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    barcode: string
  ): void => {
    if (user)
      updateCartNoteProvider(user?._id, barcode, event.target.value.toString());
  };

  useEffect(() => {
    const query = searchParams.get("q");
    if (query != null) {
      setQuery(query);
    } else {
      setQuery("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (cart) {
      setTotalAmountInCart(
        cart.reduce((number, item) => number + item.amount, 0)
      );
    }
  }, [cart]);
  return (
    <>
      <Navbar />
      <Grid
        container
        sx={{
          backgroundImage: 'url("./assets/images/vegetables.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px", // Adjust the height as needed
          position: "relative",
        }}
      >
        <Grid item xs={12}>
          <Paper
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color for text
              padding: "10px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "white", paddingRight: "40px" }}
            >
              סל קניות | {totalAmountInCart} פריטים
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* <ShoppingCart /> */}
      <Box sx={{ height: "60%" }}>
        {cart
          ?.filter((item) => item.title.includes(query))
          .map((item: CartProductInterface, index) => (
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
                      onClick={() =>
                        updateCartProvider(user!._id, item.barcode, 1)
                      }
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
                      updateCartProvider(
                        user!._id,
                        item.barcode,
                        item.amount * -1
                      )
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
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          // minHeight: "100vh",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            marginTop: "auto", // Push the button to the bottom
          }}
        >
          {cart && cart?.length !== 0 && (
            <Paper sx={{ marginTop: "40px" }}>
              <Button
                onClick={() => {
                  navigate(ROUTES.CHECKOUT);
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#5b9822",
                  color: "white",
                  padding: "10px",
                  width: "100%",
                  marginBottom: "0px",
                }}
              >
                <Typography>לקופה ({totalAmountInCart})</Typography>
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default ShoppingCartMobilePage;
