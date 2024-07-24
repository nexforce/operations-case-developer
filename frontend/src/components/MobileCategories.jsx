import styles from "../styles/MobileCategories.module.css";
import CategoryItem from "./CategoryItem";
import useMakeRequest from "../hooks/useMakeRequest";

const MobileCategories = ({ setNavIsOpen }) => {
  const result = useMakeRequest("http://localhost:3000/api/products/categories");

  return (
    <div className={styles.mobileCategories}>
      <ul className={styles.mobileCategoriesMenu}>
        {result.data ? result.data.map((cat, index) => <CategoryItem data={cat.name} key={index} setNavIsOpen={setNavIsOpen} />) : <div>{result.error}</div>}
      </ul>
    </div>
  );
};

export default MobileCategories;
