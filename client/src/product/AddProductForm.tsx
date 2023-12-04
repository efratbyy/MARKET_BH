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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Joi from "joi";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import Navbar from "../navbar/Navbar";
import { useSnack } from "../providers/SnackbarProvider";
import Footer from "../footer/Footer";
import { useUser } from "../providers/UserProvider";
import { addProductApi } from "../apiService/productApiService";
import productSchema from "../models/joiValidation/productJoiValidation";

const AddProductForm: React.FC = () => {
  const snack = useSnack();
  const [formData, setFormData] = useState<ProductInterface>({
    title: "",
    brand: "",
    barcode: "",
    categoryCode: [""],
    price: 0,
    image: { url: "", alt: "" },
    details: {
      ingredients: "",
      weightTopDisplay: 0,
      weightUnitTopDisplay: "",
      weight: 0,
      weightUnit: "",
      divideBy: 100,
      isSodium: false,
      isSugar: false,
      isSaturatedFat: false,
      isGreenMark: false,
      isSupervised: false,
      content: "",
      manufacturingCountry: "",
    },
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user } = useUser();

  const allFieldsValid =
    Object.keys(errors).length === 0 &&
    Object.values(formData)
      .map((value) => (typeof value === "string" ? value.trim() !== "" : true))
      .every(Boolean) &&
    Object.values(formData.details)
      .map((value) => (typeof value === "string" ? value.trim() !== "" : true))
      .every(Boolean);

  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log("name", name, "value", value);
    // Handle nested fields (details and image)
    if (name.startsWith("details.")) {
      setFormData((prevData) => ({
        ...prevData,
        details: {
          ...prevData.details,
          [name.replace("details.", "")]: value,
        },
      }));
    } else if (name.startsWith("image.")) {
      setFormData((prevData) => ({
        ...prevData,
        image: {
          ...prevData.image,
          [name.replace("image.", "")]: value,
        },
      }));
    } else {
      // Handle other fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }, []);

  const validateForm = (formData: ProductInterface) => {
    const validationResult = Joi.object(productSchema).validate(formData, {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the form data
    const validationResult = Joi.object(productSchema).validate(formData, {
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

    // Clear any previous errors
    setErrors({});

    try {
      const productRes = await addProductApi(formData);

      snack("success", "מוצר חדש נוצר בהצלחה");
      navigate(`${ROUTES.ROOT}`, { replace: true });
    } catch (error) {
      snack("error", error);
    }
  };

  return (
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
            יצירת מוצר חדש
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="title"
              label="שם המוצר"
              color="success"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
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
              name="brand"
              label="מותג"
              color="success"
              fullWidth
              margin="normal"
              value={formData.brand}
              onChange={handleChange}
              error={Boolean(errors.brand)}
              helperText={errors.brand}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <TextField
              type="text"
              name="barcode"
              label="ברקוד"
              color="success"
              fullWidth
              margin="normal"
              value={formData.barcode}
              onChange={handleChange}
              error={Boolean(errors.barcode)}
              helperText={errors.barcode}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <TextField
              type="text"
              name="categoryCode"
              label="קוד קטגוריה"
              color="success"
              fullWidth
              margin="normal"
              value={formData.categoryCode}
              onChange={handleChange}
              error={Boolean(errors.categoryCode)}
              helperText={errors.categoryCode}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />

            <TextField
              type="number"
              name="price"
              label="מחיר"
              color="success"
              fullWidth
              margin="normal"
              value={formData.price}
              onChange={handleChange}
              error={Boolean(errors.price)}
              helperText={errors.price}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                  },
                },
              }}
            />
            <TextField
              type="string"
              name="image.url"
              label="לינק תמונה"
              color="success"
              fullWidth
              margin="normal"
              value={formData.image.url}
              onChange={handleChange}
              error={Boolean(errors.imageUrl)}
              helperText={errors.imageUrl}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)", // Change border color to fully opaque
                  },
                },
              }}
            />
            <TextField
              type="string"
              name="image.alt"
              label="תיאור תמונה"
              color="success"
              fullWidth
              margin="normal"
              value={formData.image.alt}
              onChange={handleChange}
              error={Boolean(errors.imageAlt)}
              helperText={errors.imageAlt}
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
              name="details.ingredients"
              label="רכיבים"
              color="success"
              fullWidth
              margin="normal"
              value={formData.details.ingredients}
              onChange={handleChange}
              error={Boolean(errors.details_ingredients)}
              helperText={errors.details_ingredients}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <TextField
              type="number"
              name="details.weightTopDisplay"
              label="משקל עליון להצגה"
              color="success"
              fullWidth
              margin="normal"
              value={formData.details.weightTopDisplay}
              onChange={handleChange}
              error={Boolean(errors.details_weightTopDisplay)}
              helperText={errors.details_weightTopDisplay}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <TextField
              type="text"
              name="details.weightUnitTopDisplay"
              label="יחידת משקל עליון להצגה"
              color="success"
              fullWidth
              margin="normal"
              value={formData.details.weightUnitTopDisplay}
              onChange={handleChange}
              error={Boolean(errors.details_weightUnitTopDisplay)}
              helperText={errors.details_weightUnitTopDisplay}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <TextField
              type="number"
              name="details.weight"
              label="משקל"
              color="success"
              fullWidth
              margin="normal"
              value={formData.details.weight}
              onChange={handleChange}
              error={Boolean(errors.details_weight)}
              helperText={errors.details_weight}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <TextField
              type="text"
              name="details.weightUnit"
              label="יחידת משקל"
              color="success"
              fullWidth
              margin="normal"
              value={formData.details.weightUnit}
              onChange={handleChange}
              error={Boolean(errors.details_weightUnit)}
              helperText={errors.details_weightUnit}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <TextField
              type="number"
              name="details.divideBy"
              label="לחלק ב:"
              color="success"
              fullWidth
              margin="normal"
              value={formData.details.divideBy}
              onChange={handleChange}
              error={Boolean(errors.details_divideBy)}
              helperText={errors.details_divideBy}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <TextField
              type="text"
              name="details.content"
              label="תכולה"
              color="success"
              fullWidth
              margin="normal"
              value={formData.details.content}
              onChange={handleChange}
              error={Boolean(errors.details_content)}
              helperText={errors.details_content}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <TextField
              type="text"
              name="details.manufacturingCountry"
              label="ארץ ייצור"
              color="success"
              fullWidth
              margin="normal"
              value={formData.details.manufacturingCountry}
              onChange={handleChange}
              error={Boolean(errors.details_manufacturingCountry)}
              helperText={errors.details_manufacturingCountry}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 1)",
                  },
                },
              }}
            />
            <Grid item>
              <FormControlLabel
                name="details.isSodium"
                control={
                  <Checkbox
                    checked={formData.details.isSodium}
                    color="primary"
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        details: {
                          ...prevData.details,
                          isSodium: !prevData.details.isSodium,
                        },
                      }));
                    }}
                  />
                }
                label="נתרן ברמה גבוהה"
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                name="details.isSugar"
                control={
                  <Checkbox
                    checked={formData.details.isSugar}
                    color="primary"
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        details: {
                          ...prevData.details,
                          isSugar: !prevData.details.isSugar,
                        },
                      }));
                    }}
                  />
                }
                label="סוכר ברמה גבוהה"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                name="details.isSaturatedFat"
                control={
                  <Checkbox
                    checked={formData.details.isSaturatedFat}
                    color="primary"
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        details: {
                          ...prevData.details,
                          isSaturatedFat: !prevData.details.isSaturatedFat,
                        },
                      }));
                    }}
                  />
                }
                label="שומן רווי ברמה גבוהה"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                name="details.isGreenMark"
                control={
                  <Checkbox
                    checked={formData.details.isGreenMark}
                    color="primary"
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        details: {
                          ...prevData.details,
                          isGreenMark: !prevData.details.isGreenMark,
                        },
                      }));
                    }}
                  />
                }
                label="סימון ירוק"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                name="details.isSupervised"
                control={
                  <Checkbox
                    checked={formData.details.isSupervised}
                    color="primary"
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        details: {
                          ...prevData.details,
                          isSupervised: !prevData.details.isSupervised,
                        },
                      }));
                    }}
                  />
                }
                label="מוצר בפיקוח"
              />
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={!allFieldsValid}
              sx={{ margin: "10px" }}
            >
              הוסף מוצר
            </Button>
          </form>
        </Container>
      </Grid>
      <Footer />
    </>
  );
};

export default AddProductForm;
