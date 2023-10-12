import axios from "axios";
import { CartProductInterface } from "../models/interfaces/interfaces.ts";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8188";

const token = localStorage.getItem("token_key");

export const addToCartApi = async (
  userId: string,
  barcode: string,
  amount: number
) => {
  try {
    const { data } = await axios.patch(
      `${apiUrl}/cart/addToCart/${userId}/${barcode}/${amount}`,
      null,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) return Promise.reject(error.response?.data);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const removeFromCartApi = async (
  userId: string,
  barcode: string,
  amount: number
) => {
  try {
    const { data } = await axios.patch(
      `${apiUrl}/cart/removeFromCart/${userId}/${barcode}/${amount}`,
      null,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) return Promise.reject(error.response?.data);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getCartApi = async (userId: String) => {
  try {
    const { data } = await axios.get<CartProductInterface[]>(
      `${apiUrl}/cart/${userId}`,
      {
        headers: { "x-auth-token": token },
      }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
