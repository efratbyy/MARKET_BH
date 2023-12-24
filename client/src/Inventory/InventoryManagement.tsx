import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import useProducts from "../product/useProducts";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ROUTES from "../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import { deleteUserApi } from "../apiService/userApiService";
import { useSnack } from "../providers/SnackbarProvider";
import SearchBar from "../search_filter/SearchBar";
import {
  deleteProductApi,
  updateProductInventoryApi,
  updateProductPriceApi,
} from "../apiService/productApiService";

const InventoryManagement = () => {
  const [products, setProducts] = useState<ProductInterface[] | undefined>(
    undefined
  );
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [barcodeToDelete, setBarcodeToDelete] = useState<string>("");
  const [editedInventory, setEditedInventory] = useState<{
    [barcode: string]: number;
  }>({});
  const [editedPrice, setEditedPrice] = useState<{
    [barcode: string]: number;
  }>({});
  const [searchParams, setSearch] = useSearchParams();
  const [query, setQuery] = useState<string>("");

  const { user } = useUser();

  const rowsPerPage = 10;
  const navigate = useNavigate();
  const snack = useSnack();

  const handleUpdatePrice = useCallback(
    async (barcode: string, newPrice: number) => {
      try {
        const updatedProduct = await updateProductPriceApi(barcode, newPrice);
        if (updatedProduct) {
          snack("success", "המחיר עודכן בהצלחה!");
        } else snack("error", "לא ניתן לעדכן את המחיר, נסה שוב מאוחר יותר!");
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    const query = searchParams.get("q");
    if (query != null) {
      setQuery(query);
    } else {
      setQuery("");
    }
  }, [searchParams]);

  const handlePriceChange = (
    event: ChangeEvent<HTMLInputElement>,
    barcode: string
  ) => {
    setEditedPrice((prevPrice) => ({
      ...prevPrice,
      [barcode]: Number(event.target.value),
    }));

    handleUpdatePrice(barcode, Number(event.target.value));
  };

  const handleUpdateInventory = useCallback(
    async (barcode: string, newInventory: number) => {
      try {
        const updatedProduct = await updateProductInventoryApi(
          barcode,
          newInventory
        );
        if (updatedProduct) {
          snack("success", "המלאי עודכן בהצלחה!");
        } else snack("error", "לא ניתן לעדכן את המלאי, נסה שוב מאוחר יותר!");
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const handleInventoryChange = (
    event: ChangeEvent<HTMLInputElement>,
    barcode: string
  ) => {
    setEditedInventory((prevInventory) => ({
      ...prevInventory,
      [barcode]: Number(event.target.value),
    }));

    handleUpdateInventory(barcode, Number(event.target.value));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (barcode: string) => {
    setBarcodeToDelete(barcode);
    setOpen(true);
  };

  const handleDeleteProduct = useCallback(async (barcode: string) => {
    try {
      const deletedProduct = await deleteProductApi(barcode);
      if (deletedProduct) {
        snack("success", "המוצר נמחק בהצלחה!");
        setDeleteTrigger((prev) => !prev);
      } else snack("error", "לא ניתן למחוק את המוצר, נסה שוב מאוחר יותר!");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const dataToDisplay = products?.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const { handleGetProducts } = useProducts();

  const getRowColor = (rowIndex: number) =>
    rowIndex % 2 === 0 ? "Lightgrey" : "white";

  useEffect(() => {
    handleGetProducts()
      .then((products) => {
        // TODO: filter
        // Filter by q
        let filteredProducts = products?.filter(
          (product) =>
            product.title.includes(query) ||
            product.barcode.includes(query) ||
            product.brand.includes(query)
        );
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteTrigger, query, handleGetProducts]);

  if (!user || !user.isAdmin) navigate(ROUTES.ROOT);

  return (
    user &&
    user.isAdmin && (
      <>
        <Navbar showSearchBar={false} />
        <Grid sx={{ display: { xs: "none", md: "block" } }}>
          {/* seach bar */}
          <SearchBar />
        </Grid>
        <Grid sx={{ display: { xs: "none", md: "block" } }}>
          <Table component={Paper} stickyHeader sx={{ textAlign: "right" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontSize: "20px", backgroundColor: "olivedrab" }}
                  align="right"
                >
                  שם המוצר
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", backgroundColor: "olivedrab" }}
                  align="right"
                >
                  ספק
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", backgroundColor: "olivedrab" }}
                  align="right"
                >
                  מחיר
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", backgroundColor: "olivedrab" }}
                  align="right"
                >
                  מלאי
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", backgroundColor: "olivedrab" }}
                  align="right"
                >
                  ברקוד
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", backgroundColor: "olivedrab" }}
                  align="right"
                >
                  ערוך מוצר
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", backgroundColor: "olivedrab" }}
                  align="right"
                >
                  מחק מוצר
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product, rowIndex) => (
                <TableRow
                  key={product.barcode}
                  sx={{ backgroundColor: getRowColor(rowIndex) }}
                >
                  <TableCell align="right">{product.title}</TableCell>
                  <TableCell align="right">{product.brand}</TableCell>
                  <TableCell align="right">
                    {/* price input */}
                    <TextField
                      type="number" // Assuming 'inventory' is a numeric value
                      value={editedPrice[product.barcode] || product.price}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handlePriceChange(event, product.barcode)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    {/* inventory input */}
                    <TextField
                      type="number" // Assuming 'inventory' is a numeric value
                      value={
                        editedInventory[product.barcode] || product.inventory
                      }
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleInventoryChange(event, product.barcode)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">{product.barcode}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ color: "green" }}
                      onClick={() =>
                        navigate(
                          `${ROUTES.EDIT_PRODUCT}?barcode=${product.barcode}`,
                          {
                            replace: true,
                          }
                        )
                      }
                    >
                      <EditTwoToneIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{ color: "red" }}
                      onClick={() => {
                        handleClickOpen(product.barcode);
                      }}
                    >
                      <DeleteTwoToneIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TablePagination
              style={{ position: "relative", marginBottom: "30px" }}
              onPageChange={handleChangePage}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              count={products?.length ?? 0} //(??) to provide a default value of 0 if products is undefined
            />
          </Table>
        </Grid>
        <Grid
          container
          sx={{
            display: { md: "none" },
            height: "100vh", // Set the height to 100% of the viewport height
            backgroundImage:
              'url("/assets/images/accessibility_statement.png")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
              fontSize: "50px",
              margin: "25%",
              zIndex: 5,
            }}
          >
            דף זה אינו נתמך במובייל!
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">מחיקת מוצר!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              האם הינך בטוח/ה כי בצונך למחוק מוצר זה? מוצר שימחק ימחק לצמיתות!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ביטול</Button>
            <Button
              onClick={() => {
                handleDeleteProduct(barcodeToDelete);
                handleClose();
              }}
              autoFocus
            >
              אישור
            </Button>
          </DialogActions>
        </Dialog>
        <Footer />
      </>
    )
  );
};

export default InventoryManagement;
