import styles from "../styles/MobileBottomNav.module.css";
import GetIcon from "./GetIcon";
import MobileCategories from "./MobileCategories";
import { useState } from "react";
import MobileCart from "./MobileCart";
import clsx from "clsx";

const MobileBottomNav = () => {
  const [currentComponent, setCurrentComponent] = useState("");
  const [navIsOpen, setNavIsOpen] = useState(false);

  return (
    <div className={clsx(styles.bottomNav, navIsOpen ? styles.fullHeight : styles.removeHeight)}>
      <div className={styles.content}>
        {(() => {
          switch (currentComponent) {
            case "categories":
              return <MobileCategories setNavIsOpen={setNavIsOpen} />;
            case "cart":
              return <MobileCart />;
            default:
              return <div></div>;
          }
        })()}
      </div>
      <div className={styles.navContainer}>
        <button
          className={styles.navItem}
          onClick={() => {
            setCurrentComponent("");
            setNavIsOpen(false);
          }}
        >
          <GetIcon icon="BsHouseFill" size={20} />
        </button>
        <button
          className={styles.navItem}
          onClick={() => {
            setCurrentComponent("categories");
            setNavIsOpen((oldState) => !oldState);
          }}
        >
          <GetIcon icon="BsList" size={20} />
        </button>
        <button
          className={styles.navItem}
          onClick={() => {
            setCurrentComponent("cart");
            setNavIsOpen((oldState) => !oldState);
          }}
        >
          <GetIcon icon="BsCartFill" size={20} />
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
