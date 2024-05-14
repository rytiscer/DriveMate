import PropTypes from "prop-types";
import Button from "@mui/material/Button";

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
