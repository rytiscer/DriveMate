import Button from "@mui/material/Button";
import styles from "../Button/MainButton.module.scss";

const MainButton = () => {
  return (
    <div>
      <Button className={styles.button}>Contained</Button>
      <h1 className={styles.h1}>Hello</h1>
    </div>
  );
};

export default MainButton;
