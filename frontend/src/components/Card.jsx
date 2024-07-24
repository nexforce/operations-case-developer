import styles from "../styles/Card.module.css";
import { Link } from "react-router-dom";
import slugify from "slugify";

import AddToCartBtn from "./AddToCartBtn";

const Card = ({ product }) => {
    return (
        <div className={styles.card}>
            <Link to={`/product/${slugify(product.title, { lower: true, strict: true })}-${product.id}`} className={styles.content}>
                <div className={styles.img}>
                    <img src={product.image} alt="" />
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>
                        <h3>{product.title}</h3>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.price}>
                            <small>R$ </small>{Number.parseFloat(product.price).toFixed(2)}
                        </div>
                        <div className={styles.btn}>
                            <AddToCartBtn data={product} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card;
