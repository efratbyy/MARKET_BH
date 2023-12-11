import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
} from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Joi from "joi";
import registerSchema from "../models/joiValidation/registerJoiValidation";
import { UserInterface } from "../models/interfaces/interfaces.ts";
import {
  createResetPasswordKeyApi,
  editUserApi,
  getUserByIdApi,
} from "../apiService/userApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import Navbar from "../navbar/Navbar";
import { useSnack } from "../providers/SnackbarProvider";
import Footer from "../footer/Footer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "../providers/UserProvider";
import { getUserFromLocalStorage } from "../services/LocalStorageService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const snack = useSnack();
  const { user } = useUser();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  //   const handleResestPassword = useCallback(async () => {
  //     try {
  //     //   const userFromDB = await getUserByIdApi(
  //     //     getUserFromLocalStorage()?._id || ""
  //       );
  //     //   return Promise.resolve(userFromDB);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);

  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // validate email
    const validationResult = Joi.string()
      .pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      .message('user "mail" must be a valid mail')
      .required()
      .validate(value);

    // Handle other fields
    setEmail(value);

    if (validationResult.error) {
      setEmailError(validationResult.error.details[0].message);
    } else setEmailError("");
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const key = await createResetPasswordKeyApi(email);

      // TODO: send email to user API

      //TODO: GENERIC COMPONENT FOR MESSAGESS

      snack("success", "נשלח מייל לאיפוס הסיסמה");
      navigate(`${ROUTES.ROOT}`, { replace: true }); // { replace: true } - This means that if the user goes back in their browser, they won't revisit the form page
    } catch (error) {
      snack("error", error);
    }
  };

  return (
    <>
      <Navbar showSearchBar={false} />
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative !important",
          backgroundColor: "#fff",
          zIndex: 1,
          padding: "16px !important",
          overflowY: "scroll",
          height: "100vh",
          backgroundAttachment: "fixed",
          backgroundImage: "url(/assets/images/register.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid item>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "black" }}
          >
            איפוס סיסמה
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid item>
            <TextField
              type="email"
              name="email"
              label="מייל"
              color="success"
              margin="normal"
              value={email}
              onChange={handleChangeEmail}
              error={Boolean(emailError)}
              helperText={emailError}
              sx={{
                justifyItems: "center",
                justifyContent: "center",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                  },
                },
              }}
            />
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={emailError !== "" || email === ""}
              sx={{ margin: "10px" }}
            >
              עדכון
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ margin: "10px" }}
              onClick={() => {
                navigate(ROUTES.ROOT);
              }}
            >
              ביטול
            </Button>
          </Grid>
        </form>
      </Grid>
      <Footer />
    </>
  );
};

export default ForgotPassword;
