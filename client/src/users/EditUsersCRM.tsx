import React, { useCallback, useEffect, useState } from "react";
import { deleteUserApi, getUsersApi } from "../apiService/userApiService";
import { UserInterface } from "../models/interfaces/interfaces.ts";
import { Button, CssBaseline, Fab, Grid } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import ROUTES from "../routes/routesModel";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import AddIcon from "@mui/icons-material/Add";
import { useSnack } from "../providers/SnackbarProvider";

const EditUsersCRM = () => {
  const [users, setUsers] = useState<UserInterface[] | undefined>([]);
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(true);

  const { user } = useUser();

  const navigate = useNavigate();
  const snack = useSnack();

  const handleGetUsers = useCallback(async () => {
    try {
      const usersFromDB = await getUsersApi();
      return Promise.resolve(usersFromDB);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteUser = useCallback(async (userEmail: string) => {
    try {
      const deletedUser = await deleteUserApi(userEmail);
      if (deletedUser) {
        snack("success", "הלקוח נמחק בהצלחה!");
        setDeleteTrigger((prev) => !prev);
      } else snack("error", "לא ניתן למחוק את הלקוח, נסה שוב מאוחר יותר!");
    } catch (error) {
      console.log(error);
    }
  }, []);

  //   useEffect(() => {
  //     handleGetUsers().then((data) => {
  //       setUsers(data || []);
  //       console.log(data);
  //     });
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetUsers();
        setUsers(data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // Ensure user is logged in and is an admin before navigating
    if (!user || !user.isAdmin) {
      navigate(ROUTES.ROOT);
    }
  }, [handleGetUsers, user, navigate, deleteTrigger]);

  return (
    user &&
    user.isAdmin && (
      <>
        <Navbar showSearchBar={false} showDataFilter={false} />
        <CssBaseline />

        <Grid
          sx={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2017/11/12/22/50/exhibition-2944064_1280.jpg')", // Set your background image
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "fixed",
            width: "100%",
            zIndex: -1,
            minHeight: "100vh",
            opacity: 0.3,
          }}
        ></Grid>

        <Grid
          sx={{
            display: { xs: "none", lg: "block" },
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "10px",
            fontSize: "50px",
            textDecoration: "underline",
            zIndex: 5,
          }}
        >
          ניהול לקוחות
        </Grid>

        <Grid
          sx={{
            display: { lg: "none" },
            textAlign: "center",
            fontSize: "50px",
            margin: "25%",
            // textDecoration: "underline",
            zIndex: 5,
          }}
        >
          דף זה אינו נתמך במובייל / טאבלט!
        </Grid>

        <Grid
          container
          item
          sx={{
            border: "0.5px solid black",
            textAlign: "center",
            alignItems: "center",
            borderRadius: "2px solid black",
            zIndex: 8,
            boxShadow: 2,
            justifyItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "80%",
            marginRight: "auto",
            marginLeft: "auto",
            display: { xs: "none", lg: "flex" },
          }}
        >
          <Grid
            container
            key={user.email}
            sx={{
              borderBottom: "2px solid black",
              alignItems: "center",
              height: "20%",
              lineHeight: "65px",
            }}
          >
            <Grid sx={{ fontWeight: "bold" }} xs={1} item>
              שם משפחה
            </Grid>
            <Grid
              sx={{ fontWeight: "bold", borderRight: "1px solid black" }}
              xs={2}
              item
            >
              שם פרטי
            </Grid>
            <Grid
              sx={{ fontWeight: "bold", borderRight: "1px solid black" }}
              xs={2}
              item
            >
              טלפון
            </Grid>
            <Grid
              sx={{ fontWeight: "bold", borderRight: "1px solid black" }}
              xs={3}
              item
            >
              כתובת
            </Grid>
            <Grid
              sx={{ fontWeight: "bold", borderRight: "1px solid black" }}
              xs={2}
              item
            >
              אימייל
            </Grid>
            <Grid
              sx={{ fontWeight: "bold", borderRight: "1px solid black" }}
              xs={1}
              item
            >
              ערוך לקוח
            </Grid>
            <Grid
              sx={{ fontWeight: "bold", borderRight: "1px solid black" }}
              xs={1}
              item
            >
              מחק לקוח
            </Grid>
          </Grid>
          {users?.map((user: UserInterface, index) => (
            <Grid
              container
              key={user.email}
              sx={{
                borderBottom: "1px solid black",
                alignItems: "center",
                lineHeight: "50px",
              }}
            >
              <Grid xs={1} item>
                {user.last}
              </Grid>
              <Grid xs={2} item sx={{ borderRight: "1px solid black" }}>
                {user.first}
              </Grid>
              <Grid xs={2} item sx={{ borderRight: "1px solid black" }}>
                {user.phone}
              </Grid>
              <Grid xs={3} item sx={{ borderRight: "1px solid black" }}>
                {`${user.city}, ${user.street} ${user.houseNumber}`}
              </Grid>
              <Grid xs={2} item sx={{ borderRight: "1px solid black" }}>
                {user.email}
              </Grid>
              <Grid xs={1} item sx={{ borderRight: "1px solid black" }}>
                <Button
                  sx={{ color: "green" }}
                  onClick={() =>
                    navigate(`${ROUTES.EDIT_USER}`, {
                      replace: true,
                      state: {
                        // Pass the props
                        userEmail: user.email,
                      },
                    })
                  }
                >
                  <EditTwoToneIcon />
                </Button>
              </Grid>

              <Grid xs={1} item sx={{ borderRight: "1px solid black" }}>
                <Button
                  sx={{ color: "red" }}
                  onClick={() => {
                    handleDeleteUser(user.email);
                  }}
                >
                  <DeleteTwoToneIcon />
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Fab
          onClick={() => navigate(ROUTES.ADD_USER)}
          color="primary"
          aria-label="add"
          sx={{
            position: "relative",
            bottom: 75,
            right: 16,
            display: { xs: "none", lg: "block" },
          }}
        >
          <AddIcon />
        </Fab>
        <Footer />
      </>
    )
  );
};

export default EditUsersCRM;
