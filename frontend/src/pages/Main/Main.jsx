import image from "../../assets/bmw_logo.png";
import styles from "../Main/Main.module.scss";

const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>
          Welcome to <span className={styles.title}>DriveMate</span>
        </h1>
        <h3 className={styles.subtitle}>Streamline car rental management</h3>{" "}
      </div>
      <div className={styles.imageContainer}>
        <img src={image} alt="DriveMate Image" className={styles.image} />
      </div>
    </div>
  );
};

export default Main;
