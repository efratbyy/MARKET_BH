import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPurchaseHistoryDetailsApi } from "../apiService/userApiService";
import { useUser } from "../providers/UserProvider";
import { PurchaseHistoryInterface } from "../models/interfaces/interfaces.ts";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const PurchaseHistoryDetails = () => {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  // const orderNumber = searchParams.get("order_number");
  const [orderNumber, setOrderNumber] = useState<string | null>(
    searchParams.get("order_number")
  );
  const [purchaseHistory, setPurchaseHistory] = useState<
    PurchaseHistoryInterface | undefined
  >();
  const [totalAmountInOrder, setTotalAmountInOrder] = React.useState<number>(0);

  const handlePurchaseHistoryDetails = useCallback(
    async (userId: string, orderNumber: string) => {
      try {
        //setLoading(true);
        if (userId) {
          const purchaseHistoryDetails = await getPurchaseHistoryDetailsApi(
            userId,
            orderNumber
          );

          //requestStatus(false, null, cart);
          return Promise.resolve(purchaseHistoryDetails);
        }
        return undefined;
      } catch (error) {
        //if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    []
  );

  useEffect(() => {
    if (user) {
      setOrderNumber(searchParams.get("order_number"));
      handlePurchaseHistoryDetails(user._id, orderNumber || "")
        .then((data) => {
          setPurchaseHistory(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  useEffect(() => {
    setTotalAmountInOrder((prevTotal) => {
      const order = purchaseHistory?.order;
      if (order) {
        return order.reduce(
          (acc, item) => acc + (item.price || 0) * item.amount,
          0
        );
      }

      return prevTotal;
    });
  }, [purchaseHistory?.order]);

  const headerCellStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "center",
    padding: "8px",
  };

  const cellStyle = {
    border: "1px solid #dddddd",
    textAlign: "center",
    padding: "8px",
  };

  return (
    <>
      <Navbar showSearchBar={false} showDataFilter={false} />

      <Grid
        container
        sx={
          {
            //backgroundColor: "rgba(255, 255, 255, 0.7)",
            // backgroundImage: `url("assets/images/order-details.png")`,
            // backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "center",
            // height: "100vh",
          }
        }
      >
        <Grid
          item
          xs={12}
          sx={{
            fontSize: "30px",
            padding: "10px",
            color: "purple",
            textDecoration: "underline",
            textAlign: "center",
          }}
        >
          הזמנה מספר: {orderNumber}
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ fontSize: "25px", color: "blue", padding: "10px" }}
        >
          סכום ההזמנה: ₪{totalAmountInOrder.toFixed(2)}
        </Grid>

        <Grid
          item
          lg={6}
          xs={10}
          sx={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <TableContainer
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={headerCellStyle}>
                    הערות
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyle}>
                    מותג
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyle}>
                    ברקוד
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyle}>
                    מחיר
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyle}>
                    כמות
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyle}>
                    תמונה
                  </TableCell>
                  <TableCell align="center" sx={headerCellStyle}>
                    פריט
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchaseHistory?.order?.map((item) => (
                  <TableRow key={item.barcode}>
                    <TableCell align="center" sx={cellStyle}>
                      {item.note}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {item.brand}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {item.barcode}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      ₪{item.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {item.amount}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        style={{ width: "40px" }}
                        src={item.image.url}
                        alt={item.image.alt}
                      />
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {item.title}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};
export default PurchaseHistoryDetails;
