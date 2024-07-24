import styles from "../styles/CartItem.module.css";
import Title from "./Title";
import GetIcon from "./GetIcon";
import Quantity from "./Quantity";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const CartItem = ({ data }) => {
    const { cartItems, setCartItems, setCartTotal } = useContext(CartContext);

    const removeItemFromCart = () => {
        let arr = [...cartItems],
            removed = arr[arr.indexOf(data)].price * arr[arr.indexOf(data)].quantity;
        arr.splice(arr.indexOf(data), 1);
        setCartItems(arr);
        setCartTotal((total) => {
            return total - removed;
        });
    };

    const price = Number.parseFloat(data.price);

    return (
        <div className={styles.item}>
            <div className={styles.img}>
                <img src={data.image} alt="" />
            </div>
            <div className={styles.detail}>
                <div className={styles.title}>
                    <Title txt={data.title} size={16} transform="capitalize" />
                </div>
                <div className={styles.priceContainer}>
                    <small className={styles.singlePrice}>{price.toFixed(2)}</small>
                    <small className={styles.quantityN}>{data.quantity}</small>
                    <small className={styles.totalPrice}> {`R$ ${(price * data.quantity).toFixed(2)}`}</small>
                </div>
                <Quantity data={data} />
            </div>
            <div className={styles.removeItem}>
                <button type="button" onClick={removeItemFromCart}>
                    <span style={{display: "flex"}}> <GetIcon icon="BsDash" size={30} /></span>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
