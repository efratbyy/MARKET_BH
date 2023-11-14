import React, { useCallback, useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { getPurchaseHistory } from "../apiService/userApiService";
import { useUser } from "../providers/UserProvider";
import { PurchaseHistoryInterface } from "../models/interfaces/interfaces.ts";
import "./PurchaseHistory.css";
import { Grid } from "@mui/material";
import Navbar from "../navbar/Navbar";
//import Sheet from "styled-components/dist/sheet";

const PurchaseHistory = () => {
  const { user } = useUser();
  const [purchaseHistory, setPurchaseHistory] = useState<
    PurchaseHistoryInterface[] | undefined
  >();
  const [rows, setRows] = useState<any[]>([]);

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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "",
      headerAlign: "center",
      width: 20,
      align: "center",
    },
    {
      field: "col1",
      headerName: "מספר הזמנה",
      // width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "col2",
      headerName: "תאריך הזמנה",
      // width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "col3",
      headerName: "מספר פריטים",
      // width: 150,
      width: 20,
      headerClassName: "custom-header",
    },
    {
      field: "col4",
      headerName: "סכום ההזמנה",
      // width: 150,
      headerClassName: "custom-header",
    },
  ];

  useEffect(() => {
    if (user) {
      handlePurchaseHistory(user?._id)
        .then((data) => {
          setPurchaseHistory(data);

          //
          let initRows: any[] = [
            // {
            //   id: "",
            //   col1: "הזמנה",
            //   col2: "תאריך",
            //   col3: "מס פריטים",
            //   col4: "סכום",
            // },
          ];
          let inc = 1;
          data?.forEach((purchase) => {
            let totalCost = 0;
            let totalItems = 0;
            purchase.order.forEach((cartProduct) => {
              totalCost += cartProduct.price * cartProduct.amount;
              totalItems += cartProduct.amount;
            });

            initRows.push({
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

          setRows(initRows);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      <Navbar showSearchBar={false} showSideNavBar={false} />
      <Grid
        sx={{
          backgroundImage:
            "https://cdn.pixabay.com/photo/2015/06/15/20/21/register-810546_1280.jpg",
        }}
      >
        <Grid
          sx={{
            textAlign: "center",
            fontSize: "60px",
            textDecoration: "underline",
            color: "white",
          }}
        >
          היסטוריית הזמנות
        </Grid>
        <Grid
          container
          xs={10}
          lg={6}
          sx={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            sx={{
              height: "85vh",
              // m: 2,
              boxShadow: 2,
              border: 5,
              borderColor: "grey",
              "& .MuiDataGrid-cell:hover": {
                color: "white",
              },
              marginBottom: "30px",
              "& .MuiTablePagination-root": {
                fontSize: "16px",
                color: "white",
              },
              marginRight: "auto",
              marginLeft: "auto",
              // "& .css-jowncd-MuiDataGrid-root .MuiDataGrid-withBorderColor": {
              //   color: "white",
              // },
            }}
            pagination
            pageSizeOptions={[5, 10, 25]}
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default PurchaseHistory;
