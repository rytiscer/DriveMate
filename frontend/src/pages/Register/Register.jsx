import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { registerUser, checkExistingUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingUser = await checkExistingUser(formData.email);
    if (existingUser) {
      setError("Error. Email already exists");
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log(response);
      const confirmed = window.confirm(
        "Are you sure you want to add this car?"
      );
      if (!confirmed) return;
      alert("User created successfully!");
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error(error.message);
      setError("Error. Email already exists");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Registration
      </Typography>
      {error && <Typography color="error">{error}</Typography>}{" "}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          required
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
