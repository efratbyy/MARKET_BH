import React, { useEffect, useState } from "react";
import { LoginType } from "../types/userTypes";
import { loginApi } from "../apiService/userApiService";
import ROUTES from "../routes/routesModel";
import { getUser, saveUserToken } from "../services/LocalStorageService";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useSnack } from "../providers/SnackbarProvider";
import loginSchema from "../models/joiValidation/loginSchema";
import Joi from "joi";
import { useUser } from "../providers/UserProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const snack = useSnack();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user, setToken, setUser } = useUser();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      <Navbar showSearchBar={false} />
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
        // alignItems="center"
        justifyContent="center"
        sx={{
          position: "relative",
          minHeight: "90vh",
          paddingRight: "15%",
          width: "100%",
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
              backgroundColor: "#999966",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 1)", // Change border color to fully opaque
                },
              },
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            type={showPassword ? "text" : "password"}
            variant="outlined"
            name="password"
            label="סיסמא"
            color="success"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
            sx={{
              backgroundColor: "#999966",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 1)", // Change border color to fully opaque
                },
              },
            }}
            InputProps={{
              dir: "ltr",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#5b9822" }}
            onClick={handleLogin}
          >
            התחבר
          </Button>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Login;
