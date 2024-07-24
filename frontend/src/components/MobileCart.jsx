import styles from "../styles/MobileCart.module.css";
import emptyCardImg from "../images/empty_cart.svg";
import CartItem from "./CartItem";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import GetIcon from "./GetIcon";
import Title from "./Title";

const MobileCart = () => {
  const { cartItems, cartTotal: _cartTotal } = useContext(CartContext);

  return (
    <div className={styles.mobileCart}>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, key) => (
            <CartItem data={item} key={key} />
          ))}
          <div className={styles.cartTotal}>
            <div className={styles.total}>
              <Title txt="Total" size={23} transform="uppercase" />
              <GetIcon icon="BsFillCartCheckFill" size={25} />
            </div>
            <div className={styles.totalPrice}>
              <small>total</small>
              <div className={styles.price}>
                <span>{_cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button type="button" className={styles.confirmBtn}>
                Confirmar compra
            </button>
          </div>
        </>
      ) : (
        <div className={styles.emptyCart}>
          <img src={emptyCardImg} alt="" />
          <Title txt="Seu carrinho está vázio :(" size={23} transform="uppercase" />
        </div>
      )}
    </div>
  );
};

export default MobileCart;
