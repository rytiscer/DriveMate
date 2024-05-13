import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createService } from "../../api/service";
import { fetchCars } from "../../api/cars";
import { ROUTES } from "../../routes/consts";

const ServiceForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    note: "",
    status: "",
    carId: "",
    createdAt: "",
    updatedAt: "",
  });

  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        const carsData = await fetchCars();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars data:", error);
      }
    };
    fetchCarsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to add this note?");
    if (!confirmed) return;
    try {
      const currentTime = new Date().toISOString();
      const newData = {
        ...formData,
        createdAt: currentTime,
        updatedAt: currentTime,
      };
      await createService(newData);
      alert("Service added successfully!");
      navigate(ROUTES.SERVICE);
    } catch (error) {
      alert("Error adding service:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="note"
              label="Note"
              variant="outlined"
              fullWidth
              value={formData.note}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Car</InputLabel>
              <Select
                name="carId"
                value={formData.carId}
                onChange={handleChange}
                label="Car"
              >
                <MenuItem value="">None</MenuItem>
                {cars.map((car) => (
                  <MenuItem key={car._id} value={car._id}>
                    {car.brand} {car.model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          style={{ marginTop: "20px" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Service
        </Button>
      </form>
    </Container>
  );
};

export default ServiceForm;
