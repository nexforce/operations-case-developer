import styles from "../styles/AddToCartBtn.module.css";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import GetIcon from "./GetIcon";

const AddToCartBtn = ({ data: product }) => {
  const { cartItems, setCartItems, setCartTotal, currentQuantity } = useContext(CartContext);

  const addToCart = (product) => {
    let arr = [...cartItems];
    let filtered = cartItems.filter((item) => item.id === product.id);
    if (filtered.length > 0) {
      filtered[0].quantity += 1;
      arr[arr.indexOf(filtered[0])] = filtered[0];
      setCartItems(arr);
    } else {
      setCartItems((oldState) => [
        ...oldState,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: currentQuantity,
        },
      ]);
    }

    setCartTotal((oldTotal) => (oldTotal += product.price * (currentQuantity || 1)));
  };

  return (
    <button
      className={styles.addToCart}
      onClick={(e) => {
        e.preventDefault();
        addToCart(product);
      }}
    >
      <GetIcon icon="BsFillCartPlusFill" size={18} /> Adicionar
    </button>
  );
};

export default AddToCartBtn;
