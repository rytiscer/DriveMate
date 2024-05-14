import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2f7ce0",
        color: "white",
        py: 3,
        px: 2,
        textAlign: "center",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 1px 15px",
        marginTop: "3rem",
      }}
    >
      <Typography variant="body1">
        DriveMate &copy; 2024 All Rights Reserved
      </Typography>
      <Typography variant="body2">
        Made with ❤️ by
        <Link
          href="https://github.com/rytiscer/DriveMate"
          color="inherit"
          underline="hover"
        >
          Rytis Černiauskas
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
