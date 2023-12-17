import React, { useCallback, useEffect, useState } from "react";
import { getUsersApi } from "../apiService/userApiService";
import { UserInterface } from "../models/interfaces/interfaces.ts";
import { Container, CssBaseline, Grid } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import ROUTES from "../routes/routesModel";

const EditUsersCRM = () => {
  const [users, setUsers] = useState<UserInterface[] | undefined>([]);
  const { user } = useUser();

  const navigate = useNavigate();

  const handleGetUsers = useCallback(async () => {
    try {
      const usersFromDB = await getUsersApi();
      return Promise.resolve(usersFromDB);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetUsers().then((data) => {
      setUsers(data || []);
      console.log(data);
    });
  }, []);

  if (!user || !user.isAdmin) navigate(ROUTES.ROOT);

  return (
    user &&
    user.isAdmin && (
      <>
        <Navbar showSearchBar={false} showDataFilter={false} />
        <CssBaseline />
        <Container
          sx={{
            backgroundImage: 'url("/assets/images/1.png")', // Replace with your image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh", // Adjust the height as needed
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black", // Text color
          }}
        >
          <Grid container>
            <Grid
              container
              sx={{
                border: "0.5px solid black",
              }}
            >
              <Grid xs={2} item>
                שם פרטי
              </Grid>
              <Grid xs={2} item>
                 שם משפחה
              </Grid>
              <Grid xs={2} item>
                טלפון
              </Grid>
              <Grid xs={4} item>
                כתובת
              </Grid>
              <Grid xs={2} item>
                אימייל
              </Grid>
              {users?.map((user: UserInterface, index) => (
                <React.Fragment>
                  <Grid xs={2} item>
                    {user.last}
                  </Grid>
                  <Grid xs={2} item>
                    {user.first}
                  </Grid>
                  <Grid xs={2} item>
                    {user.phone}
                  </Grid>
                  <Grid xs={4} item>
                    {`${user.city}, ${user.street} ${user.houseNumber}`}
                  </Grid>
                  <Grid xs={2} item>
                    {user.email}
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
    )
  );
};

export default EditUsersCRM;
