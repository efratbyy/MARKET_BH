import { useCallback } from "react";
import { getCartApi } from "../apiService/cartApiService";

const useCart = () => {
  const handleGetCart = useCallback(async (userId: String) => {
    try {
      //setLoading(true);
      const cart = await getCartApi(userId);
      //requestStatus(false, null, cart);
      return Promise.resolve(cart);
    } catch (error) {
      //if (typeof error === "string") requestStatus(false, error, null);
    }
  }, []);

  return {
    handleGetCart,
  };
};

export default useCart;
