import styles from "../styles/CartSidebar.module.css";
import emptyCardImg from "../images/empty_cart.svg";
import GetIcon from "./GetIcon";
import Title from "./Title";
import clsx from "clsx";
import CartItem from "./CartItem";
import { CartContext } from "../context/CartContext";
import { useContext, useRef } from "react";

const CartSidebar = () => {
  const { cartIsOpen, setCartIsOpen, cartItems, cartTotal: _cartTotal } = useContext(CartContext);
  const container = useRef();

  return (
    <div
      className={clsx(styles.sidebarContainer, cartIsOpen ? styles.show : styles.hide)}
      ref={container}
      onClick={(event) => event.target === container.current && setCartIsOpen(false)}
    >
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.title}>
            <Title txt="Seu carrinho" size={20} transform="uppercase" />
            {<small>seu carrinho tem {cartItems.length} produtos</small>}
          </div>
          <button className={styles.close} onClick={() => setCartIsOpen(false)}>
            <GetIcon icon="BsX" size={30} />
          </button>
        </div>
        {cartItems.length > 0 ? (
          <>
            <div className={styles.items}>
              {cartItems?.map((item, key) => (
                <CartItem data={item} key={key} />
              ))}
            </div>
            <div className={styles.cartTotal}>
              <div className={styles.total}>
                <Title txt="Total" size={23} transform="uppercase" />
                <GetIcon icon="BsFillCartCheckFill" size={25} />
              </div>
              <div className={styles.totalPrice}>
                <small>Total a pagar</small>
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
            <Title txt="Seu carrinho está vazio :(" size={23} transform="uppercase" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
