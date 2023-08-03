import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import Joi from "joi";
import ReCAPTCHA from "react-google-recaptcha"; // Import the recaptcha component
import registerSchema from "../models/joiValidation/registerJoiValidation";
import { UserInterface } from "../models/interfaces/interfaces.ts";

// interface FormData {
//   name: string;
//   email: string;
//   password: string;
// }

// const schema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email({ tlds: false }).required(),
//   password: Joi.string().min(6).required(),
// });

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<UserInterface>({
    _id: "",
    first: "",
    last: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    street: "",
    houseNumber: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null); // Store recaptcha value

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate the form data
      const validation = registerSchema.validate(formData, {
        abortEarly: false,
      });

      if (validation.error) {
        const newErrors: { [key: string]: string } = {}; // Define the type for newErrors
        validation.error.details.forEach((error: any) => {
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

      // Continue with the registration process if validation passes
      const response = await axios.post("/register", formData);
      console.log(response.data); // Assuming backend sends a success message
    } catch (error: any) {
      console.error(error.response.data); // Assuming backend sends an error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        User Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="first"
          label="First name"
          fullWidth
          margin="normal"
          value={formData.first}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          type="text"
          name="last"
          label="Last name"
          fullWidth
          margin="normal"
          value={formData.last}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
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
          type="city"
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

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegistrationForm;
