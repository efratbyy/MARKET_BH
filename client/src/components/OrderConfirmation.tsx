import React, { useEffect, useState } from "react";
import DesktopNavbar from "../navbar/DesktopNavbar";
import Footer from "../footer/Footer";
import { Grid } from "@mui/material";
import { useCartProvider } from "../providers/CartProvider";
import {
  Navigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useUser } from "../providers/UserProvider";

const OrderConfirmation: React.FC = () => {
  // const { user } = useUser();
  // const { checkoutProvider } = useCartProvider();
  // const [orderNumber, setOrderNumber] = useState<number | null>(null);

  // useEffect(() => {
  //   const number = checkoutProvider(user?._id);
  //   setOrderNumber(number);
  // }, [user, checkoutProvider]);

  // if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  // Access the query string parameters from the location object
  const [searchParams] = useSearchParams();

  const orderNumber = searchParams.get("order_number");

  return (
    <>
      <DesktopNavbar />
      <Grid
        container
        sx={{
          backgroundImage: 'url("assets/images/orderConfirmation.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh", // Adjust this based on your layout
          backgroundColor: "rgba(255, 255, 255, 0.7)", // 0.7 is the alpha (transparency) value
        }}
      >
        <Grid item></Grid>
        <Grid item></Grid>
        <Grid item></Grid>
        <Grid item>{orderNumber}</Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
