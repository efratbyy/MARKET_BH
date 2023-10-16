import React, { useState } from "react";
import { LoginType } from "../types/userTypes";
import { loginApi } from "../apiService/userApiService";
import ROUTES from "../routes/routesModel";
import { getUser, saveUserToken } from "../services/LocalStorageService";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

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
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Typography variant="h4" component="div">
            Login
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Useremail"
            variant="outlined"
            fullWidth
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
