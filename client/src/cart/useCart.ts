import { useCallback } from "react";
import {
  addCartNoteApi,
  addToCartApi,
  getCartApi,
  removeFromCartApi,
} from "../apiService/cartApiService";
import { useUser } from "../providers/UserProvider";
import { useSnack } from "../providers/SnackbarProvider";

const useCart = () => {
  const { user } = useUser();
  const snack = useSnack();

  const handleGetCart = useCallback(async (userId: string) => {
    try {
      //setLoading(true);
      const cart = await getCartApi(userId);
      //requestStatus(false, null, cart);
      return Promise.resolve(cart);
    } catch (error) {
      //if (typeof error === "string") requestStatus(false, error, null);
    }
  }, []);

  const updateCart = async (barcode: string, amount: number) => {
    if (user) {
      let newCart;
      if (amount > 0) {
        newCart = await addToCartApi(user?._id, barcode, amount);
        snack("success", "המוצר התווסף לעגלה בהצלחה!");
      } else {
        newCart = await removeFromCartApi(user?._id, barcode, amount * -1);
        snack("success", "המוצר הוסר מהעגלה בהצלחה!");
      }
      return newCart;
    }
  };

  const updateCartNote = async (barcode: string, note: string) => {
    if (user) {
      const newCart = await addCartNoteApi(user?._id, barcode, note);
      return newCart;
    }
  };
  return {
    handleGetCart,
    updateCart,
    updateCartNote,
  };
};

export default useCart;
