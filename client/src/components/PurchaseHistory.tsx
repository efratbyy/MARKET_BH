import React, { useCallback, useEffect, useState } from "react";
import DesktopNavbar from "../navbar/DesktopNavbar";
import Footer from "../footer/Footer";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { getPurchaseHistory } from "../apiService/userApiService";
import { useUser } from "../providers/UserProvider";
import { PurchaseHistoryInterface } from "../models/interfaces/interfaces.ts";
import "./PurchaseHistory.css";
import { Grid } from "@mui/material";

const PurchaseHistory = () => {
  const { user } = useUser();
  const [purchaseHistory, setPurchaseHistory] = useState<
    PurchaseHistoryInterface[] | undefined
  >();
  const [rows, setRows] = useState<any[]>([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "",
      headerAlign: "center",
      align: "center",
    },
    { field: "col1", headerName: "מספר הזמנה", width: 150 },
    { field: "col2", headerName: "תאריך הזמנה", width: 150 },
    { field: "col3", headerName: "מספר פריטים", width: 150 },
    { field: "col4", headerName: "סכום ההזמנה", width: 150 },
  ];

  const handlePurchaseHistory = useCallback(async (userId: string) => {
    try {
      //setLoading(true);
      if (userId) {
        const purchaseHistory = await getPurchaseHistory(userId);
        //requestStatus(false, null, cart);
        return Promise.resolve(purchaseHistory);
      }
      return undefined;
    } catch (error) {
      //if (typeof error === "string") requestStatus(false, error, null);
    }
  }, []);

  useEffect(() => {
    if (user) {
      handlePurchaseHistory(user?._id)
        .then((data) => {
          setPurchaseHistory(data);

          //
          let initrows: any[] = [];
          let inc = 1;
          data?.forEach((purchase) => {
            let totalCost = 0;
            let totalItems = 0;
            purchase.order.forEach((cartProduct) => {
              totalCost += cartProduct.price * cartProduct.amount;
              totalItems += cartProduct.amount;
            });

            initrows.push({
              id: inc++,
              col1: purchase.orderNumber,
              col2: new Date(purchase.orderDate).toLocaleDateString("en-IL", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                timeZone: "Asia/Jerusalem",
              }),
              col3: totalItems,
              col4: totalCost.toFixed(2),
            });
          });

          setRows(initrows);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      <DesktopNavbar />
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          sx={{ height: "85vh" }}
          //autoHeight
          pagination
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
      <Grid sx={{ marginTop: "500px" }}>
        <Footer />
      </Grid>
    </>
  );
};

export default PurchaseHistory;
