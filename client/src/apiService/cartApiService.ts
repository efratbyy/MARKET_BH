import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8188";

export const addToCartApi = async (
  userId: string,
  barcode: string,
  amount: number
) => {
  try {
    const { data } = await axios.patch(
      `${apiUrl}/cart/addToCart/${userId}/${barcode}/${amount}`
    );
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) return Promise.reject(error.response?.data);
    return Promise.reject("An unexpected error occurred!");
  }
};
