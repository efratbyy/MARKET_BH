import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import Joi from "joi";
import ReCAPTCHA from "react-google-recaptcha";
import registerSchema from "../models/joiValidation/registerJoiValidation";
import { UserInterface } from "../models/interfaces/interfaces.ts";
import { makeFirstLetterCapital } from "../utils/algoMethods";
import { registrationApi } from "../apiService/userApiService";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import Navbar from "../navbar/Navbar";
import { useSnack } from "../providers/SnackbarProvider";

const RegistrationForm: React.FC = () => {
  const snack = useSnack();
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

  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null); // Store recaptcha value

  const allFieldsValid =
    Object.keys(errors).length === 0 &&
    recaptchaValue &&
    Object.values(formData)
      .map((value) => value.trim() !== "")
      .every(Boolean);

  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const validateForm = (formData: UserInterface) => {
    const validationResult = Joi.object(registerSchema).validate(formData, {
      abortEarly: false, // indicates that all validation errors should be collected rather than stopping at the first error
    });

    if (validationResult.error) {
      const newErrors: { [key: string]: string } = {}; // Define the type for newErrors
      validationResult.error.details.forEach((error: any) => {
        if (error.context.value) newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      return;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the form data
    const validationResult = Joi.object(registerSchema).validate(formData, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const newErrors: { [key: string]: string } = {}; // Define the type for newErrors
      validationResult.error.details.forEach((error: any) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      return;
    }
    // Validate reCAPTCHA
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA.");
      return;
    }
    // Clear any previous errors
    setErrors({});

    try {
      await registrationApi(formData);
      snack("success", "A new user has been created");
      navigate(ROUTES.ROOT, { replace: true });
    } catch (error) {
      snack("error", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          User Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="first"
            label={makeFirstLetterCapital("First name")}
            fullWidth
            margin="normal"
            value={formData.first}
            onChange={handleChange}
            error={Boolean(errors.first)}
            helperText={errors.first}
          />
          <TextField
            type="text"
            name="last"
            label="Last name"
            fullWidth
            margin="normal"
            value={formData.last}
            onChange={handleChange}
            error={Boolean(errors.last)}
            helperText={errors.last}
          />
          <TextField
            type="phone"
            name="phone"
            label="Phone"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          <TextField
            type="email"
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <TextField
            type="text"
            name="city"
            label="City"
            fullWidth
            margin="normal"
            value={formData.city}
            onChange={handleChange}
            error={Boolean(errors.city)}
            helperText={errors.city}
          />
          <TextField
            type="street"
            name="street"
            label="Street"
            fullWidth
            margin="normal"
            value={formData.street}
            onChange={handleChange}
            error={Boolean(errors.street)}
            helperText={errors.street}
          />
          <TextField
            type="houseNumber"
            name="houseNumber"
            label="HouseNumber"
            fullWidth
            margin="normal"
            value={formData.houseNumber}
            onChange={handleChange}
            error={Boolean(errors.houseNumber)}
            helperText={errors.houseNumber}
          />

          {/* Add the reCAPTCHA component */}
          <ReCAPTCHA
            sitekey="6LfT2HgnAAAAADAVSv1TUHbhkZvOz94uM-30XM-L"
            onChange={(value: any) => setRecaptchaValue(value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!allFieldsValid}
          >
            Register
          </Button>
        </form>
      </Container>
    </>
  );
};

export default RegistrationForm;
