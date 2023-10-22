import React, { useState } from "react";
import { LoginType } from "../types/userTypes";
import { loginApi } from "../apiService/userApiService";
import ROUTES from "../routes/routesModel";
import { getUser, saveUserToken } from "../services/LocalStorageService";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user: LoginType = { email: useremail, password: password };
      const token = await loginApi(user);
      saveUserToken(token);
      navigate(`${ROUTES.ROOT}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (getUser()) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <>
      <Navbar />
      <Grid
        sx={{
          minHeight: "100vh",
          backgroundImage: "url(/assets/images/login_page_image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          width: "100%",
          zIndex: -1,
        }}
      ></Grid>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "relative",
          minHeight: "90vh",
          marginRight: "150px",
          width: "30%",
          height: "30%",
        }}
      >
        <Grid item>
          <Typography
            variant="h4"
            component="div"
            sx={{ color: "darkslategrey" }}
          >
            התחבר
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="מייל"
            variant="outlined"
            color="success"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            sx={{ width: "300px" }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="סיסמא"
            variant="outlined"
            type="password"
            color="success"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "300px" }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" onClick={handleLogin}>
            התחבר
          </Button>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Login;
