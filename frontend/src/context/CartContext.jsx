import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const values = {
    cartIsOpen,
    setCartIsOpen,
    cartItems,
    setCartItems,
    cartTotal,
    setCartTotal,
    currentQuantity,
    setCurrentQuantity,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
