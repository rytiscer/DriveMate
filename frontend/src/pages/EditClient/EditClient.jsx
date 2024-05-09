import { useEffect, useState } from "react";
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
import { ROUTES } from "../../routes/consts";
import { useParams } from "react-router-dom";
import { getClientById, updateClient } from "../../api/clients";
import { fetchCars } from "../../api/cars";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    driving_experience: "",
    carId: "",
  });

  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientData = await getClientById(id);
        setFormData(clientData);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };
    fetchData();

    const fetchCarsData = async () => {
      try {
        const carsData = await fetchCars();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars data:", error);
      }
    };
    fetchCarsData();
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
      "Are you sure you want to update this client?"
    );
    if (!confirmed) return;
    try {
      await updateClient(id, formData);
      alert("Client updated successfully!");
      navigate(ROUTES.CLIENTS);
    } catch (error) {
      alert("Error updating client:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="phone"
              label="Phone"
              variant="outlined"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="driving_experience"
              label="Driving Experience"
              variant="outlined"
              fullWidth
              value={formData.driving_experience}
              onChange={handleChange}
            />
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
        <Button type="submit" variant="contained" color="primary">
          Update Client
        </Button>
      </form>
    </Container>
  );
};

export default EditClient;
