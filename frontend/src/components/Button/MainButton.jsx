import PropTypes from "prop-types";
import Button from "@mui/material/Button";
// import styles from "../Button/MainButton.module.scss";

const MainButton = ({ children, ...props }) => {
  return (
    <div>
      <Button variant="contained" {...props}>
        {children}
      </Button>
    </div>
  );
};

MainButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainButton;
