import React, { useEffect, useState } from "react";
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
import Joi from "joi";
import { useUser } from "../providers/UserProvider";

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const snack = useSnack();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user, setToken, setUser } = useUser();
  const handleLogin = async () => {
    try {
      validateForm(useremail, password);
      const user: LoginType = { email: useremail, password: password };
      const token = await loginApi(user);
      saveUserToken(token); // Save token to local storage
      setToken(token); // update state of the token (UserProvider)
      const decryptedUser = getUser();
      setUser(decryptedUser); // update state of the user (UserProvider)
      navigate(`${ROUTES.ROOT}`);
    } catch (error) {
      snack("error", error);
    }
  };

  const validateForm = (useremail: string, password: string) => {
    const validationResult = Joi.object(loginSchema).validate(
      { email: useremail, password: password },
      {
        abortEarly: false, // indicates that all validation errors should be collected rather than stopping at the first error
      }
    );

    const newErrors: { [key: string]: string } = {}; // Define the type for newErrors
    if (validationResult.error) {
      validationResult.error.details.forEach((error: any) => {
        if (error.context.value) newErrors[error.path[0]] = error.message;
      });
    }
    setErrors(newErrors);
  };

  useEffect(() => {
    validateForm(useremail, password);
  }, [useremail, password]);

  if (user) return <Navigate replace to={ROUTES.ROOT} />;

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
            error={Boolean(errors.email)}
            helperText={errors.email}
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
            error={Boolean(errors.password)}
            helperText={errors.password}
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
