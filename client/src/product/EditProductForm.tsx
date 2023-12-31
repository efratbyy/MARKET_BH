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
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useSnack } from "../providers/SnackbarProvider";
import { useUser } from "../providers/UserProvider";
import {
  editProductApi,
  getProductByBarcodeApi,
} from "../apiService/productApiService";
import productSchema from "../models/joiValidation/productJoiValidation";
import { ProductClientType } from "../types/productTypes.js";
import convertToDbType from "../helpers/convertToDbType";
import convertToClientType from "../helpers/convertToClientType";
import BackgroundImageLayout from "../layout/BackgroundImageLayout";

const EditProductForm = () => {
  const navigate = useNavigate();
  const snack = useSnack();
  const { user } = useUser();

  const [searchParams] = useSearchParams();
  const [allFieldsValid, setAllFieldsValid] = useState<Boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<ProductClientType>({
    title: "",
    brand: "",
    barcode: "",
    categoryCode: [""],
    price: 0,
    imageUrl: "",
    imageAlt: "",
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
    inventory: 0,
  });

  const handleGetProduct = useCallback(async () => {
    try {
      const barcode = searchParams.get("barcode");
      const productFromDB = await getProductByBarcodeApi(barcode || "");
      return Promise.resolve(productFromDB);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetProduct().then((data) => {
      if (data) setFormData(convertToClientType(data));
    });
  }, []);

  useEffect(() => {
    validateForm(formData);
    setAllFieldsValid(
      Object.keys(errors).length === 0 &&
        Object.values(formData)
          .map((value) =>
            typeof value === "string" ? value.trim() !== "" : true
          )
          .every(Boolean)
    );
  }, [formData]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Handle other fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const validateForm = (formData: ProductClientType) => {
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
      const productToDB = convertToDbType(formData);
      const productRes = await editProductApi(productToDB);

      snack("success", "המוצר עודכן בהצלחה!");
      navigate(`${ROUTES.ROOT}`, { replace: true });
    } catch (error) {
      snack("error", error);
    }
  };

  if (!user || !user.isAdmin) navigate(ROUTES.ROOT);

  return (
    user &&
    user.isAdmin && (
      <>
        <BackgroundImageLayout backgroundImage="/assets/images/register.png">
          <Container maxWidth="sm">
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "white" }}
            >
              עריכת מוצר
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
                      borderColor: "rgba(0, 0, 0, 1)",
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
                value={
                  formData.categoryCode.length > 0
                    ? formData.categoryCode[0]
                    : ""
                }
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    categoryCode: [e.target.value], // Put the text value as the first item in the array
                  }));
                }}
                error={Boolean(errors.categoryCode)}
                helperText={errors.categoryCode}
                InputLabelProps={{ shrink: false }}
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
                value={formData.price !== 0 ? formData.price : ""}
                onChange={handleChange}
                error={Boolean(errors.price)}
                helperText={errors.price}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)",
                    },
                  },
                }}
              />
              <TextField
                type="string"
                name="imageUrl"
                label="לינק תמונה"
                color="success"
                fullWidth
                margin="normal"
                value={formData.imageUrl}
                onChange={handleChange}
                error={Boolean(errors.imageUrl)}
                helperText={errors.imageUrl}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 1)",
                    },
                  },
                }}
              />
              <TextField
                type="string"
                name="imageAlt"
                label="תיאור תמונה"
                color="success"
                fullWidth
                margin="normal"
                value={formData.imageAlt}
                onChange={handleChange}
                error={Boolean(errors.imageAlt)}
                helperText={errors.imageAlt}
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
                name="ingredients"
                label="רכיבים"
                color="success"
                fullWidth
                margin="normal"
                value={formData.ingredients}
                onChange={handleChange}
                error={Boolean(errors.ingredients)}
                helperText={errors.ingredients}
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
                name="weightTopDisplay"
                label="משקל עליון להצגה"
                color="success"
                fullWidth
                margin="normal"
                value={
                  formData.weightTopDisplay !== 0
                    ? formData.weightTopDisplay
                    : ""
                }
                onChange={handleChange}
                error={Boolean(errors.weightTopDisplay)}
                helperText={errors.weightTopDisplay}
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
                name="weightUnitTopDisplay"
                label="יחידת משקל עליון להצגה"
                color="success"
                fullWidth
                margin="normal"
                value={formData.weightUnitTopDisplay}
                onChange={handleChange}
                error={Boolean(errors.weightUnitTopDisplay)}
                helperText={errors.weightUnitTopDisplay}
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
                name="weight"
                label="משקל"
                color="success"
                fullWidth
                margin="normal"
                value={formData.weight !== 0 ? formData.weight : ""}
                onChange={handleChange}
                error={Boolean(errors.weight)}
                helperText={errors.weight}
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
                name="weightUnit"
                label="יחידת משקל"
                color="success"
                fullWidth
                margin="normal"
                value={formData.weightUnit}
                onChange={handleChange}
                error={Boolean(errors.weightUnit)}
                helperText={errors.weightUnit}
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
                name="divideBy"
                label="לחלק ב:"
                color="success"
                fullWidth
                margin="normal"
                value={formData.divideBy}
                onChange={handleChange}
                error={Boolean(errors.divideBy)}
                helperText={errors.divideBy}
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
                name="content"
                label="תכולה"
                color="success"
                fullWidth
                margin="normal"
                value={formData.content}
                onChange={handleChange}
                error={Boolean(errors.content)}
                helperText={errors.content}
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
                name="manufacturingCountry"
                label="ארץ ייצור"
                color="success"
                fullWidth
                margin="normal"
                value={formData.manufacturingCountry}
                onChange={handleChange}
                error={Boolean(errors.manufacturingCountry)}
                helperText={errors.manufacturingCountry}
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
                name="inventory"
                label="מלאי"
                color="success"
                fullWidth
                margin="normal"
                value={formData.inventory === 0 ? "" : formData.inventory}
                onChange={handleChange}
                error={Boolean(errors.inventory)}
                helperText={errors.inventory}
                variant="outlined"
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
                  name="isSodium"
                  control={
                    <Checkbox
                      checked={formData.isSodium}
                      color="primary"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          isSodium: !prevData.isSodium,
                        }));
                      }}
                    />
                  }
                  label="נתרן ברמה גבוהה"
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  name="isSugar"
                  control={
                    <Checkbox
                      checked={formData.isSugar}
                      color="primary"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          isSugar: !prevData.isSugar,
                        }));
                      }}
                    />
                  }
                  label="סוכר ברמה גבוהה"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  name="isSaturatedFat"
                  control={
                    <Checkbox
                      checked={formData.isSaturatedFat}
                      color="primary"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          isSaturatedFat: !prevData.isSaturatedFat,
                        }));
                      }}
                    />
                  }
                  label="שומן רווי ברמה גבוהה"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  name="isGreenMark"
                  control={
                    <Checkbox
                      checked={formData.isGreenMark}
                      color="primary"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          isGreenMark: !prevData.isGreenMark,
                        }));
                      }}
                    />
                  }
                  label="סימון ירוק"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  name="isSupervised"
                  control={
                    <Checkbox
                      checked={formData.isSupervised}
                      color="primary"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          isSupervised: !prevData.isSupervised,
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
                עדכן מוצר
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
        </BackgroundImageLayout>
      </>
    )
  );
};

export default EditProductForm;
