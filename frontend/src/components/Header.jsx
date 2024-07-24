import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import GetIcon from "./GetIcon";
import clsx from "clsx";
import CategoryItem from "./CategoryItem";
import useMakeRequest from "../hooks/useMakeRequest";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const Header = () => {
    const result = useMakeRequest(`${import.meta.env.VITE_BASE_API_URL}/products/categories`);
    const { cartItems, setCartIsOpen } = useContext(CartContext);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/create-product">
                    <button>Criar Produto</button>
                </Link>
            </div>
            <div className={styles.logo}>
                <Link to="/">
                    <h2>NexStore</h2>
                </Link>
            </div>
            <div className={styles.navContainer}>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <Link to="/" onClick={(e) => e.preventDefault()} className={styles.a}>
                                Categorias
                            </Link>
                            <ul className={styles.subMenu}>{result.data ? result.data.map((cat, index) => <CategoryItem data={cat.name} key={index} />) : <div>{result.error}</div>}</ul>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className={clsx(styles.cartBtn, styles.a)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCartIsOpen((oldState) => !oldState);
                                }}
                            >
                                <GetIcon icon="BsCart4" size={25} color="#171717" />
                                {cartItems.length > 0 && <span className={styles.cartLength}> {cartItems.length} </span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
