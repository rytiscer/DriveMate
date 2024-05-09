import { useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { createCar } from "../../api/cars";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    carType: "",
    gearbox: "",
    img: "",
    fuelType: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to add this car?");
    if (!confirmed) return;
    try {
      await createCar(formData);
      alert("Car added successfully!");
      navigate(ROUTES.CARS);
    } catch (error) {
      alert("Error adding car:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="brand"
              label="Brand"
              variant="outlined"
              value={formData.brand}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="model"
              label="Model"
              variant="outlined"
              value={formData.model}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="year"
              label="Year"
              variant="outlined"
              value={formData.year}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="color"
              label="Color"
              variant="outlined"
              value={formData.color}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="carType"
              label="Car Type"
              variant="outlined"
              value={formData.carType}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="gearbox"
              label="Gearbox"
              variant="outlined"
              value={formData.gearbox}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="img"
              label="Image URL"
              variant="outlined"
              value={formData.img}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="fuelType"
              label="Fuel Type"
              variant="outlined"
              value={formData.fuelType}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Car
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddCar;
