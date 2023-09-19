import axios from "axios";
import { ProductInterface } from "../models/interfaces/interfaces.ts";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8188";

export const getProductsApi = async () => {
  try {
    const { data } = await axios.get<ProductInterface[]>(`${apiUrl}/products`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
