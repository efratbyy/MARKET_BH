import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getPurchaseHistoryApi,
  getPurchaseHistoryDetailsApi,
} from "../apiService/userApiService";
import { useUser } from "../providers/UserProvider";
import { PurchaseHistoryInterface } from "../models/interfaces/interfaces.ts";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useCartProvider } from "../providers/CartProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const PurchaseHistoryDetails = () => {
  const { user } = useUser();
  const { cart } = useCartProvider();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order_number");
  const [purchaseHistory, setPurchaseHistory] = useState<
    PurchaseHistoryInterface | undefined
  >();

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
      handlePurchaseHistoryDetails(user?._id, orderNumber || "")
        .then((data) => {
          setPurchaseHistory(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orderNumber]);

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
      <Navbar showSearchBar={false} showSideNavBar={false} />
      <TableContainer>
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
                  <img style={{ width: "40px" }} src={item.image.url} />
                </TableCell>
                <TableCell align="center" sx={cellStyle}>
                  {item.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div>{orderNumber}</div> */}
      <Footer />
    </>
  );
};
export default PurchaseHistoryDetails;
