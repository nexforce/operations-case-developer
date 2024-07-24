import styles from "../styles/Footer.module.css";
import GetIcon from "./GetIcon";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <GetIcon icon="BsFillHeartFill" size={22} color="#da0037" /> <a href="https://www.nexforce.co/">NexForce Case!</a>
      </p>
    </footer>
  );
};

export default Footer;
