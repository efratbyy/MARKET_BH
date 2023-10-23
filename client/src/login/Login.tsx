import React, { useState } from "react";
import { LoginType } from "../types/userTypes";
import { loginApi } from "../apiService/userApiService";
import ROUTES from "../routes/routesModel";
import { getUser, saveUserToken } from "../services/LocalStorageService";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useSnack } from "../providers/SnackbarProvider";
import loginSchema from "../models/joiValidation/loginSchema";
import { UserInterface } from "../models/interfaces/interfaces.ts";
import Joi from "joi";

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const snack = useSnack();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLogin = async () => {
    try {
      const user: LoginType = { email: useremail, password: password };
      const token = await loginApi(user);
      saveUserToken(token);
      navigate(`${ROUTES.ROOT}`);
    } catch (error) {
      snack("error", error);
      console.log(error);
    }
  };

  const validateForm = (formData: UserInterface) => {
    const validationResult = Joi.object(loginSchema).validate(formData, {
      abortEarly: false, // indicates that all validation errors should be collected rather than stopping at the first error
    });

    const newErrors: { [key: string]: string } = {}; // Define the type for newErrors
    if (validationResult.error) {
      validationResult.error.details.forEach((error: any) => {
        if (error.context.value) newErrors[error.path[0]] = error.message;
      });
    }
    setErrors(newErrors);
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
            sx={{
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                },
              },
            }}
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
            sx={{
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                },
              },
            }}
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
