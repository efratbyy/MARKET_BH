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
  updateCartProvider: (barcode: string, amount: number) => void;
  updateCartNoteProvider: (barcode: string, note: string) => void;
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
    console.log(user);
    if (user && !cart) {
      handleGetCart(user?._id)
        .then((data) => {
          setCart(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cart, user]);

  const updateCartProvider = (barcode: string, amount: number) => {
    updateCart(barcode, amount)
      .then((data) => {
        setCart(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCartNoteProvider = (barcode: string, note: string) => {
    updateCartNote(barcode, note)
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
