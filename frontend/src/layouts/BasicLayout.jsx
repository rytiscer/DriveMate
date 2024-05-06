import PropTypes from "prop-types";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import styles from "../layouts/BasicLayout.module.scss";
// import { ThemeContext } from "../contexts/ThemeContext";
// import { useContext } from "react";

const BasicLayout = ({ children }) => {
  // const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <NavigationBar />
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
      {/* <style>{`
        body {
          background-color: ${darkMode ? "black" : "white"};
          color: ${darkMode ? "white" : "black"}
        }
      `}</style> */}
    </>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
