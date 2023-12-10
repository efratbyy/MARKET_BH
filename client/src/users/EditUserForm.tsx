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
import { editUserApi, getUserByIdApi } from "../apiService/userApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import Navbar from "../navbar/Navbar";
import { useSnack } from "../providers/SnackbarProvider";
import Footer from "../footer/Footer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "../providers/UserProvider";
import { getUser } from "../services/LocalStorageService";
import { error } from "console";

const EditUserForm = () => {
  const navigate = useNavigate();
  const snack = useSnack();
  const { user } = useUser();
  // console.log(user?._id);

  const [allFieldsValid, setAllFieldsValid] = useState<Boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState<UserInterface>({
    first: "",
    last: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    street: "",
    houseNumber: 0,
  });
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");

  const handleGetUser = useCallback(async () => {
    try {
      const userFromDB = await getUserByIdApi(getUser()?._id || "");
      return Promise.resolve(userFromDB);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleChangeNewPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      // validate new password
      const validationResult = Joi.string()
        .pattern(
          /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
        )
        .rule({
          message:
            'user "password" must be at least 8 characters long and contain an uppercase letter, a lowercase letter, at least 4 numbers and one of the following characters !@#$%^&*-',
        })
        .validate(value);

      // Handle other fields
      setNewPassword(value);

      if (validationResult.error) {
        setNewPasswordError(validationResult.error.details[0].message);
      } else setNewPasswordError("");
    },
    []
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Handle other fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const validateForm = (formData: UserInterface) => {
    const validationResult = Joi.object(registerSchema).validate(formData, {
      // abortEarly: false, // indicates that all validation errors should be collected rather than stopping at the first error
      // allowUnknown: true, // ignore another fields which is not in the schema (extra fields)
    });

    const newErrors: { [key: string]: string } = {}; // Define the type for newErrors
    if (validationResult.error) {
      validationResult.error.details.forEach((error: any) => {
        if (error.context.value) newErrors[error.path[0]] = error.message;
      });
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the form data
    // const validationResult = Joi.object(registerSchema).validate(formData, {
    //   abortEarly: false,
    // });
    // if (validationResult.error) {
    //   const newErrors: { [key: string]: string } = {}; // Define the type for newErrors
    //   validationResult.error.details.forEach((error: any) => {
    //     newErrors[error.path[0]] = error.message;
    //   });
    //   setErrors(newErrors);
    //   return;
    // }
    // // Clear any previous errors
    // setErrors({});

    try {
      //TODO: Check if there are new passpowrd
      const userRes = await editUserApi(formData, newPassword);

      snack("success", "המשתמש עודכן בהצלחה!");
      navigate(`${ROUTES.ROOT}`, { replace: true });
    } catch (error) {
      snack("error", error);
    }
  };
  useEffect(() => {
    setAllFieldsValid(
      (newPassword === "" || (newPassword !== "" && newPasswordError === "")) &&
        Object.keys(errors).length === 0 &&
        Object.values(formData)
          .map((value) =>
            typeof value === "string" ? value.trim() !== "" : true
          )
          .every(Boolean)
    );
  }, [formData, errors, newPassword]);

  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  useEffect(() => {
    handleGetUser().then((data) => {
      if (data) {
        setFormData(data);
      }
    });
  }, []);

  if (!user) navigate(ROUTES.ROOT);

  return (
    user && (
      <>
        <Navbar showSearchBar={false} />
        <Grid
          sx={{
            position: "relative !important",
            backgroundColor: "#fff", // Set your desired background color
            zIndex: 1,
            padding: "16px !important",
            overflowY: "scroll",
            height: "100vh",
            backgroundAttachment: "fixed",
            backgroundImage: "url(/assets/images/register.png)", // Set your background image
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "white" }}
            >
              עדכון פרטים אישיים
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                name="first"
                label="שם פרטי"
                color="success"
                fullWidth
                margin="normal"
                value={formData.first}
                onChange={handleChange}
                error={Boolean(errors.first)}
                helperText={errors.first}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type="text"
                name="last"
                label="שם משפחה"
                color="success"
                fullWidth
                margin="normal"
                value={formData.last}
                onChange={handleChange}
                error={Boolean(errors.last)}
                helperText={errors.last}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type="phone"
                name="phone"
                label="טלפון"
                color="success"
                fullWidth
                margin="normal"
                value={formData.phone}
                onChange={handleChange}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type="email"
                name="email"
                label="מייל"
                color="success"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                name="password"
                label="סיסמא נוכחית"
                color="success"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
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
              <TextField
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                label="סיסמא חדשה"
                color="success"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={handleChangeNewPassword}
                error={Boolean(newPasswordError)}
                helperText={newPasswordError}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
                InputProps={{
                  dir: "ltr",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleNewPasswordVisibility}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="text"
                name="city"
                label="עיר"
                color="success"
                fullWidth
                margin="normal"
                value={formData.city}
                onChange={handleChange}
                error={Boolean(errors.city)}
                helperText={errors.city}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type="street"
                name="street"
                label="רחוב"
                color="success"
                fullWidth
                margin="normal"
                value={formData.street}
                onChange={handleChange}
                error={Boolean(errors.street)}
                helperText={errors.street}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <TextField
                type="houseNumber"
                name="houseNumber"
                label="מספר בית"
                color="success"
                fullWidth
                margin="normal"
                value={formData.houseNumber !== 0 ? formData.houseNumber : ""}
                onChange={handleChange}
                error={Boolean(errors.houseNumber)}
                helperText={errors.houseNumber}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={!allFieldsValid}
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
            </form>
          </Container>
        </Grid>
        <Footer />
      </>
    )
  );
};

export default EditUserForm;
