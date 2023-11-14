import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
} from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import Joi from "joi";
import { CreditCardInterface } from "../models/interfaces/interfaces.ts";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import Navbar from "../navbar/Navbar";
import { useSnack } from "../providers/SnackbarProvider";
import Footer from "../footer/Footer";
import creditCardSchema from "../models/joiValidation/CreditCardSchema";
import CreditCardInput from "react-credit-card-input";
import {
  emailPaymentDetailsApi,
  // emailToClientApi,
} from "../apiService/emailApiService";
import { useUser } from "../providers/UserProvider";
import { useCartProvider } from "../providers/CartProvider";

const CheckoutPage: React.FC = () => {
  const snack = useSnack();
  const [formData, setFormData] = useState<CreditCardInterface>({
    cardHolderName: "",
    creditCardNumber: "",
    EXPdate: "",
    CVV: "",
    ID: "",
  });
  const [totalPriceInCart, setTotalPriceInCart] = React.useState<number>(0);

  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user } = useUser();
  const { cart, checkoutProvider } = useCartProvider();

  const luhnValidate = (creditCardNumber: string): boolean => {
    // Double every other digit in the credit card number, starting with the rightmost digit.
    // If the doubled digit is greater than 9, subtract 9 from it.
    const reversedDigits = creditCardNumber
      .replaceAll(" ", "")
      .split("")
      .reverse()
      .map((digit, index) => {
        if (index % 2 === 0) {
          return parseInt(digit, 10); // Convert char to number
        } else {
          const doubledDigit = parseInt(digit, 10) * 2;
          return doubledDigit > 9 ? doubledDigit - 9 : doubledDigit;
        }
      });

    // Add all of the digits in the credit card number, including the doubled digits.
    const sumOfDigits = reversedDigits.reduce((sum, digit) => sum + digit, 0);

    // If the sum is divisible by 10, the credit card number is valid.
    return sumOfDigits % 10 === 0;
  };

  const allFieldsValid = // check if all the fields are valid
    Object.keys(errors).length === 0 && //checks if there are no errors in the errors object
    luhnValidate(formData.creditCardNumber) &&
    Object.values(formData)
      .map((value) => value.trim() !== "") //checks if all values in the formData object are non-empty
      .every(Boolean); //function ensures that all mapped values are truthy, meaning they are non-empty

  // handleChange ensure that when a user types or selects data in the form, the corresponding properties in the formData state are updated accordingly
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData, //The prevData parameter represents the previous state. It creates a shallow copy (...) of the previous state.
      [e.target.name]: e.target.value, // e.target.name represents the name attribute of the input field that triggered the change event, and e.target.value is the new value entered in the input field
    })); // By updating the state this way, it preserve the rest of the state properties and only changing the one associated with the input that changed.
  }, []);

  const handleCVVChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      ["CVV"]: e.target.value,
    }));
  }, []);
  const handleCardNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        ["creditCardNumber"]: e.target.value,
      }));
    },
    []
  );
  const handleEXPdateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        ["EXPdate"]: e.target.value,
      }));
    },
    []
  );

  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  const validateForm = (formData: CreditCardInterface) => {
    const validationResult = Joi.object(creditCardSchema).validate(formData, {
      // Checks if the the 'formData' passes the defined schema (creditCardSchema).
      abortEarly: false, //ensures that all validation errors are collected rather than stopping at the first error
    });

    const newErrors: { [key: string]: string } = {}; // Define the type for newErrors and initialized as an empty object.

    if (validationResult.error) {
      // If there are validation errors
      validationResult.error.details.forEach((error: any) => {
        // Go through each of the errors
        if (error.context.value) newErrors[error.path[0]] = error.message;
      });
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the form data
    const validationResult = Joi.object(creditCardSchema).validate(formData, {
      abortEarly: false,
    });
    if (validationResult.error) {
      // If there are validation errors
      const newErrors: { [key: string]: string } = {}; // newErrors is initialized as an empty object and Define the type for newErrors
      validationResult.error.details.forEach((error: any) => {
        // Go through each of the validation errors
        newErrors[error.path[0]] = error.message;
        // newErrors in position [0] is the name of the key of the form field and the value is the message in the error.
      });
      setErrors(newErrors); // Update the errors with the validation errors.
      return;
    }
    // Clear any previous errors
    setErrors({});

    try {
      const orderNumber = await checkoutProvider(user?._id);

      // TODO: Message on the screen: Your order has been successfully received and send an email to the customer with his order

      const currentDate: Date = new Date(); // Replace this with your actual date

      const formattedDate: string = currentDate.toLocaleString("he-IL");
      console.log(formattedDate);

      const res = await emailPaymentDetailsApi(
        formattedDate,
        user?.first + " " + user?.last || "No User Name",
        user?.email || "No User Email",
        formData.cardHolderName,
        formData.creditCardNumber,
        formData.EXPdate,
        formData.CVV,
        formData.ID,
        cart,
        orderNumber
      );
      // const resToClient = await emailToClientApi(
      //   new Date(),
      //   user?.first + " " + user?.last || "No User Name",
      //   "efratbyy@gmail.com" || "No User Email",
      //   formData.cardHolderName,
      //   formData.creditCardNumber,
      //   formData.EXPdate,
      //   formData.CVV,
      //   formData.ID,
      //   cart,
      //   orderNumber
      // );
      // console.log(resToClient);
      console.log(res);
      snack("success", "פרטי האשראי התקבלו בהצלחה");
      navigate(`${ROUTES.ORDER_CONFIRMATION}?order_number=${orderNumber}`, {
        replace: true,
      });
    } catch (error) {
      snack("error", error);
    }
  };

  useEffect(() => {
    if (cart)
      setTotalPriceInCart(cart.reduce((acc, item) => acc + item.price, 0));
  }, [cart]);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <>
      <Navbar showSearchBar={false} showSideNavBar={false} />
      <Grid
        container
        justifyContent={"center"}
        justifyItems={"center"}
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          justifyItems: "center",
          padding: "0px",
          overflowY: "scroll",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          marginTop: "150px",
        }}
      >
        <Grid
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "93.5%",
            zIndex: -1,
            backgroundAttachment: "fixed",
            backgroundImage: "url(/assets/images/creditCard.png)", // Set your background image
            backgroundPosition: "center top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: 0.3, // Adjust the opacity as needed
            pointerEvents: "none", // Add this line to make the overlay non-interactable
          }}
        ></Grid>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "darkslategrey" }}
          >
            דף תשלום
          </Typography>
        </Grid>
        <Grid item xs={10} md={8} lg={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="cardHolderName"
              label="שם בעל הכרטיס"
              color="success"
              fullWidth
              margin="normal"
              value={formData.cardHolderName}
              onChange={handleChange}
              error={Boolean(errors.cardHolderName)}
              helperText={errors.cardHolderName}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                  },
                },
              }}
            />

            <Grid
              item
              sx={{
                direction: "ltr",
                width: "100% ",
                backgroundColor: "rgba(0, 0, 0, 0)",
              }}
            >
              <CreditCardInput
                containerStyle={{
                  direction: "ltr",
                  width: "100%",
                  height: "100%",
                }}
                fieldStyle={{
                  direction: "ltr",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "4px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  height: "36px",
                  marginTop: "7px",
                }}
                inputStyle={{
                  direction: "ltr",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                }}
                cardNumberInputProps={{
                  value: formData.creditCardNumber,
                  onChange: handleCardNumberChange,
                }}
                cardExpiryInputProps={{
                  value: formData.EXPdate,
                  onChange: handleEXPdateChange,
                }}
                cardCVCInputProps={{
                  value: formData.CVV,
                  onChange: handleCVVChange,
                }}
                fieldClassName="input"
              />
            </Grid>

            <TextField
              type="text"
              name="ID"
              label="מספר זהות"
              color="success"
              fullWidth
              margin="normal"
              value={formData.ID}
              onChange={handleChange}
              error={Boolean(errors.ID)}
              helperText={errors.ID}
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
              sx={{
                marginTop: "10px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              לחץ לתשלום
            </Button>
          </form>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            margin: "20px",
            fontSize: "30px",
          }}
        >
          סה״כ לתשלום: {totalPriceInCart.toFixed(2)}₪
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default CheckoutPage;