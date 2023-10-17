import React from "react";
import { CartProductInterface } from "../models/interfaces/interfaces.ts";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  cart: CartProductInterface[] | undefined;
  updateCart: (barcode: string, amountToAdd: number) => any;
};

const ShoppingCart: React.FC<Props> = ({ cart, updateCart }) => {
  return (
    <Box>
      {cart?.map((item: CartProductInterface, index) => (
        <div key={item.barcode}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={3}
              container
              alignContent="center"
              alignItems="center"
            >
              <ButtonGroup orientation="vertical" variant="contained">
                <Button onClick={() => updateCart(item.barcode, -1)}>
                  <RemoveIcon />
                </Button>
                <Button disabled>
                  <Typography variant="body1">{item.amount}</Typography>
                </Button>
                <Button onClick={() => updateCart(item.barcode, 1)}>
                  <AddIcon />
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <div>
                <img
                  src={item.image.url}
                  alt={item.productName}
                  style={{
                    maxWidth: "100%",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3}>
              <div style={{ marginTop: "10%" }}>{item.brand}</div>
              <div style={{ marginTop: "10%" }}>{item.productName}</div>
              <div style={{ marginTop: "10%" }}>{item.barcode}</div>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <div>{item.price.toFixed(2)}</div>
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
