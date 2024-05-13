import { useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import PropTypes from "prop-types";

const AddCarForm = ({ onSubmit }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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

AddCarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddCarForm;
