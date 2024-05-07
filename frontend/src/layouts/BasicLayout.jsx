import PropTypes from "prop-types";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import styles from "../layouts/BasicLayout.module.scss";

const BasicLayout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
