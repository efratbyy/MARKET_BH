import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { CartProductInterface } from "../models/interfaces/interfaces.ts";
import { useUser } from "../providers/UserProvider";
import useCart from "../cart/useCart";

type ContextArgs = {
  cart: CartProductInterface[] | undefined;
  updateCartProvider: (userId: string, barcode: string, amount: number) => void;
  updateCartNoteProvider: (
    userId: string,
    barcode: string,
    note: string
  ) => void;
};

const CartContext = React.createContext<null | ContextArgs>(null);

type Props = {
  children: ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartProductInterface[] | undefined>(
    undefined
  );

  const { user } = useUser();
  const { updateCart, updateCartNote, handleGetCart } = useCart();

  useEffect(() => {
    if (user) {
      handleGetCart(user?._id)
        .then((data) => {
          setCart(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const updateCartProvider = (
    userId: string,
    barcode: string,
    amount: number
  ) => {
    if (userId)
      updateCart(userId, barcode, amount)
        .then((data) => {
          setCart(data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const updateCartNoteProvider = (
    userId: string,
    barcode: string,
    note: string
  ) => {
    updateCartNote(userId, barcode, note)
      .then((data) => {
        setCart(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = useMemo(() => {
    return { cart, updateCartProvider, updateCartNoteProvider };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartProvider = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useUser must be used within a CartProvider");
  return context;
};

export default CartProvider;
