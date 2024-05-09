import { useEffect, useState } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getCarById, updateCar } from "../../api/cars";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

const EditCar = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData = await getCarById(id);
        setFormData(carData);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to update this car?"
    );
    if (!confirmed) return;
    try {
      await updateCar(id, formData);
      alert("Car updated successfully!");
      navigate(ROUTES.CARS);
    } catch (error) {
      alert("Error updating car:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>
        Edit Car
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="brand"
              label="Brand"
              variant="outlined"
              fullWidth
              value={formData.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="model"
              label="Model"
              variant="outlined"
              fullWidth
              value={formData.model}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="year"
              label="Year"
              variant="outlined"
              fullWidth
              value={formData.year}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="color"
              label="Color"
              variant="outlined"
              fullWidth
              value={formData.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="carType"
              label="Car Type"
              variant="outlined"
              fullWidth
              value={formData.carType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="gearbox"
              label="Gearbox"
              variant="outlined"
              fullWidth
              value={formData.gearbox}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="img"
              label="Image URL"
              variant="outlined"
              fullWidth
              value={formData.img}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="fuelType"
              label="Fuel Type"
              variant="outlined"
              fullWidth
              value={formData.fuelType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              fullWidth
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Update Car
        </Button>
      </form>
    </Container>
  );
};

export default EditCar;
